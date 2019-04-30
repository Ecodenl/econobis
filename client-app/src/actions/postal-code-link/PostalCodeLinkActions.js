export const fetchPostalCodeLinks = () => {
    return {
        type: 'FETCH_POSTAL_CODE_LINKS',
    };
};

export const clearPostalCodeLinks = () => {
    return {
        type: 'CLEAR_POSTAL_CODE_LINKS',
    };
};

export const deletePostalCodeLink = id => {
    return {
        type: 'DELETE_POSTAL_CODE_LINK',
        id,
    };
};
