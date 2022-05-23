export default function(state = [], action) {
    switch (action.type) {
        case 'REVENUES_KWH_ENERGY_SUPPLIER_EXCEL_REPORT':
            return {
                ...action.data,
            };
        case 'CLEAR_REVENUES_KWH_ENERGY_SUPPLIER_EXCEL_REPORT':
            return (state.revenuesKwhReportEnergySupplierExcel = []);

        default:
            return state;
    }
}
