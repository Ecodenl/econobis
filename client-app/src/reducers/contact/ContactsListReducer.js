export default function(state = { isLoading: false }, action) {
    switch (action.type) {
        case 'FETCH_CONTACTS_LOADING':
            return {
                ...state,
                isLoading: true,
            };
        case 'FETCH_CONTACTS_SUCCESS':
            return {
                data: action.contacts.data.data,
                meta: {
                    total: action.contacts.data.meta.total,
                    useExportAddressConsumption: action.contacts.data.meta.useExportAddressConsumption,
                    // todo WM: opschonen
                    //
                    // totalWithConsumptionGas: action.contacts.data.meta.totalWithConsumptionGas
                    //     ? action.contacts.data.meta.totalWithConsumptionGas
                    //     : 0,
                    // totalWithConsumptionElectricity: action.contacts.data.meta.totalWithConsumptionElectricity
                    //     ? action.contacts.data.meta.totalWithConsumptionElectricity
                    //     : 0,
                },
                isLoading: false,
            };
        case 'CLEAR_CONTACTS':
            return {
                ...state,
                data: [],
                meta: {},
                isLoading: false,
            };
        case 'DELETE_CONTACT_SUCCESS':
            return {
                ...state,
                data: state.data.filter(contact => contact.id !== action.id),
                meta: {
                    total: state.meta.total - 1,
                },
            };
        case 'DELETE_SELECTED_CONTACTS':
            return {
                ...state,
                data: state.data.filter(contact => contact.checked !== true),
            };
        case 'SET_CHECKED_CONTACT':
            return {
                ...state,
                data: state.data.map(contact => {
                    if (contact.id === action.id) {
                        return {
                            ...contact,
                            checked: !contact.checked,
                            checkedAt: new Date().getTime(), // Timestamp toevoegen; Zo kunnen we bij het aanroepen van de merge functie bepalen welk contact als eerst was aangevinkt.
                        };
                    } else {
                        return contact;
                    }
                }),
            };
        case 'SET_CHECKED_CONTACT_ALL':
            return {
                ...state,
                data: state.data.map(contact => {
                    return {
                        ...contact,
                        checked: action.checkedValue,
                    };
                }),
            };
        default:
            return state;
    }
}
