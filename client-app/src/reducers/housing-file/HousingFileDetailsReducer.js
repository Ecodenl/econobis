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
            };
        case 'UPDATE_HOUSING_FILE_USE':
            return {
                ...state,
                ...action.housingFileDetails,
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
        // // ToDo WM: nog aanpassen !!!
        // case 'UPDATE_HOUSING_FILE_HOUSING_STATUS':
        //     return {
        //         ...state,
        //         // housingFileSpecifications: [
        //         //     ...state.housingFileSpecifications.map(housingFileSpecification => {
        //         //         if (housingFileSpecification.id == action.housingFileSpecification.id) {
        //         //             housingFileSpecification = action.housingFileSpecification;
        //         //             return housingFileSpecification;
        //         //         } else {
        //         //             return housingFileSpecification;
        //         //         }
        //         //     }),
        //         // ],
        //     };
        // // ToDo WM: nog aanpassen !!!
        // case 'ADD_HOUSING_FILE_HOUSING_STATUS':
        //     return {
        //         ...state,
        //         // housingFileSpecifications: [
        //         //     ...state.housingFileSpecifications,
        //         //     {
        //         //         ...action.housingFileSpecification,
        //         //     },
        //         // ],
        //     };
        // // ToDo WM: nog aanpassen !!!
        // case 'DELETE_HOUSING_FILE_HOUSING_STATUS_SUCCESS':
        //     return {
        //         ...state,
        //         // housingFileSpecifications: state.housingFileSpecifications.filter(
        //         //     housingFileSpecification => housingFileSpecification.id !== action.housingFileSpecificationId
        //         // ),
        //     };
        default:
            return state;
    }
}
