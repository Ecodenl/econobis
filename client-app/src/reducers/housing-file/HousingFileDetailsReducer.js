export default function(state = {}, action) {
    switch (action.type) {
        case 'FETCH_HOUSING_FILE_DETAILS_SUCCESS':
            return {
                ...state,
                ...action.housingFileDetails,
            };
        case 'UPDATE_HOUSING_FILE':
            return {
                ...state,
                ...action.housingFileDetails,
                deleteSuccess: false,
            };
        case 'UPDATE_HOUSING_FILE_USE':
            return {
                ...state,
                ...action.housingFileDetails,
                deleteSuccess: false,
            };
        case 'DELETE_HOUSING_FILE_SUCCESS':
            return {
                ...state,
                deleteSuccess: true,
            };
        case 'RESET_DELETE_HOUSING_FILE_SUCCESS':
            return {
                ...state,
                deleteSuccess: false,
            };
        case 'UPDATE_HOUSING_FILE_SPECIFICATION':
            return {
                ...state,
                housingFileSpecifications: [
                    ...state.housingFileSpecifications.map(housingFileSpecification => {
                        if (housingFileSpecification.id == action.housingFileSpecification.id) {
                            housingFileSpecification = action.housingFileSpecification;
                            return housingFileSpecification;
                        } else {
                            return housingFileSpecification;
                        }
                    }),
                ],
            };
        case 'ADD_HOUSING_FILE_SPECIFICATION':
            return {
                ...state,
                housingFileSpecifications: [
                    ...state.housingFileSpecifications,
                    {
                        ...action.housingFileSpecification,
                    },
                ],
            };
        case 'DELETE_HOUSING_FILE_SPECIFICATION_SUCCESS':
            return {
                ...state,
                housingFileSpecifications: state.housingFileSpecifications.filter(
                    housingFileSpecification => housingFileSpecification.id !== action.housingFileSpecificationId
                ),
            };
        case 'UPDATE_HOUSING_FILE_HOUSING_STATUS':
            return {
                ...state,
                housingFileHousingStatuses: [
                    ...state.housingFileHousingStatuses.map(housingFileHousingStatus => {
                        if (housingFileHousingStatus.id == action.housingFileHousingStatus.id) {
                            housingFileHousingStatus = action.housingFileHousingStatus;
                            return housingFileHousingStatus;
                        } else {
                            return housingFileHousingStatus;
                        }
                    }),
                ],
            };
        case 'ADD_HOUSING_FILE_HOUSING_STATUS':
            return {
                ...state,
                housingFileHousingStatuses: [
                    ...state.housingFileHousingStatuses,
                    {
                        ...action.housingFileHousingStatus,
                    },
                ],
            };
        case 'DELETE_HOUSING_FILE_HOUSING_STATUS_SUCCESS':
            return {
                ...state,
                housingFileHousingStatuses: state.housingFileHousingStatuses.filter(
                    housingFileHousingStatus => housingFileHousingStatus.id !== action.housingFileHousingStatusId
                ),
            };
        default:
            return state;
    }
}
