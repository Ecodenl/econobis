export const fetchWebformDetails = (id) => {
    return {
        type: 'FETCH_WEBFORM_DETAILS',
        id,
    }
};

export const updateWebform = (webform, switchToView) => {
    return {
        type: 'UPDATE_WEBFORM',
        webform,
        switchToView,
    }
};