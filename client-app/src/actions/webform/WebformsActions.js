export const fetchWebforms = () => {
    return {
        type: 'FETCH_WEBFORMS',
    };
};

export const clearWebforms = () => {
    return {
        type: 'CLEAR_WEBFORMS',
    };
};

export const deleteWebform = id => {
    return {
        type: 'DELETE_WEBFORM',
        id,
    };
};
