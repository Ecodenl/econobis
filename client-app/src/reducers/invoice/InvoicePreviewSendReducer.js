export default function (state = [], action) {
    switch (action.type) {
        case 'INVOICE_PREVIEW_SEND':
            return {
                ...action.data,
            };
        case 'CLEAR_INVOICE_PREVIEW_SEND':
            return state.invoicePreviewSend = [];

        default:
            return state;
    }
}