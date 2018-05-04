export const fetchAdministrations = () => {
    return {
        type: 'FETCH_ADMINISTRATIONS',
    };
};

export const clearAdministrations = () => {
    return {
        type: 'CLEAR_ADMINISTRATIONS'
    };
};

export const deleteAdministration = (id) => {
    return  {
        type: 'DELETE_ADMINISTRATION',
        id,
    };
};

