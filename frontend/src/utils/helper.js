export const validateEmail = (email) => {
    const regex = /.+@.+\..+/;
    return regex.test(email);
}

export const getInitials = (name) => {
    if(!name) return '';

    const nameArray = name.split(' ');
    if(nameArray === 1 ) return (nameArray[0][0].toUpperCase());
    return(nameArray[0][0] + nameArray[1][0]).toUpperCase();
}

