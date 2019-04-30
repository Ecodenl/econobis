export const setSelectedDate = date => {
    return {
        type: 'SET_SELECTED_DATE',
        date,
    };
};

export const setSelectedView = view => {
    return {
        type: 'SET_SELECTED_VIEW',
        view,
    };
};
