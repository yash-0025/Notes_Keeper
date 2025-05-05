const Note = require('../models/notesModel')





// create_note
exports.createNote = async (req, res) => {
    // res.status(201).json({
    //     msg: "Routing works"
    // })
    try {
        const { title, content, tags, isPinned } = await req.body;
        const userId = await req.user.id


        if (!title || !content) {
            return res.status(400).json({
                error: true,
                message: "Please Fill in the required fields."
            })
        }

        const note = new Note({
            userId,
            title,
            content,
            tags,
            isPinned,
        })
        await note.save();
        return res.json({
            error: false,
            note,
            message: "Note created successfully"
        });
    } catch (error) {
        console.error(error)
        res.status(401).json({
            error: true,
            message: "Note creation ERrOr!!!"
        });
    }
}
// edit_note
exports.editNote = async (req, res) => {
    try {
        const noteId = await req.params.noteId;
        const { title, content, tags, isPinned } = await req.body
        const userId = await req.user.id

        if (!title && !content && !tags) {
            return res.status(400).json({
                error: true,
                message: "Please update the required fields"
            })
        }
        const note = await Note.findById(noteId);
        if (!note) {
            return res.status(400).json({
                error: true,
                message: "Note didn't exist !!"
            })
        }

        if (note.userId !== userId) {
            return res.status(400).json({
                error: true,
                message: "This is not you note"
            })
        }

        note.title = title || note.title,
            note.content = content || note.content,
            note.tags = tags || note.tags,
            note.isPinned = isPinned || note.isPinned,
            await note.save();

        return res.status(201).json({
            error: false,
            message: "Note Edited Successfully"
        });

    } catch (error) {
        console.error(error)
        res.status(401).json({
            error: true,
            message: "Note Edit ERrOr!!!"
        });
    }
}
    // get_note
    exports.getNotes = async (req, res) => {
        try {
            const userId = await req.user.id;

            const notes = await Note.find({
                userId: userId
            }).sort({
                isPinned: -1,
                createdAt: -1
            });

            if (!notes) {
                return res.json({
                    error: false,
                    message: "You didn't have any notes",
                })
            }

            return res.json({
                error: false,
                notes,
                message: "All of your notes retrieved successfully"
            })

        } catch (error) {
            console.error(error)
            res.status(401).json({
                error: true,
                message: "No Notes found or Error fetching notes !!"
            });
        }
    }
        // delete_note
        exports.deleteNote = async (req, res) => {
            try {
                const noteId = req.params.noteId;
                const userId = req.user.id;

                const note = await Note.findById({
                    _id: noteId,
                    userId: userId
                })

                if (!note) {
                    return res.status(400).json({
                        error: true,
                        message: "No Notes found"
                    })
                }

                if (note.userId !== userId) {
                    return res.status(400).json({
                        error: true,
                        message: "You are not authorized to delete this note"
                    })
                }

                await Note.deleteOne({
                    _id: noteId,
                    userId: userId
                })

                return res.json({
                    error: false,
                    message: "Note Deleted successfully !!!"
                })
            } catch (error) {
                console.error(error)
                res.status(401).json({
                    error: true,
                    message: "ErrOR Deleting Notes"
                });
            }
        }
            // pin_note
            exports.pinNote = async (req, res) => {
                try {
                    const noteId = req.params.noteId;
                    const userId = req.user.id;

                    const note = await Note.findById({
                        _id: noteId,
                        userId: userId,
                    })

                    if (!note) {
                        return res.status(400).json({
                            error: true,
                            message: "No Notes found"
                        })
                    }

                    if (note.userId !== userId) {
                        return res.status(400).json({
                            error: true,
                            message: "You are not authorized to pinned this note!!"
                        })
                    }
                    note.isPinned = !note.isPinned;

                    await note.save();

                    return res.json({
                        error: false,
                        message: "Note Pinned successfully"
                    })
                } catch (error) {
                    console.error(error)
                    res.status(401).json({
                        error: true,
                        message: "ErrOR Pinning Notes"
                    });
                }
            }
// search_note
exports.searchNote = async(req,res) => {
    try{
        const query = await req.params.query;
        const userId = await req.user.id;

        if (!query) {
            return res.status(400).json({
                error: true,
                message: "Please enter a search query"
            })
        }

        const search = new RegExp(query, 'i');

        const notes = await Note.find({
            userId: userId,
            $or: [
                {title: {$regex:search}},
                {content: {$regex: search}},
                {tags: {$regex: search}}
            ]
        });
        if(!notes) {
            return res.status(400).json({
                error: true,
                message: "No notes found"
            })
        }
        return res.json({
            error:false,
            notes,
            message:"No Search matches found!!"
        })
    } catch(error) {
        res.status(401).json({
            error: true,
            message:"Error searching Notes"
        });
    }
}