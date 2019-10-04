export default currentRouteParams => {
    let activeMenuItem = 'orders';
    let activeParent = null;

    switch (currentRouteParams.type) {
        case 'orders':
            if (currentRouteParams.filter) {
                activeParent = 'orders';
                switch (currentRouteParams.filter) {
                    case 'concepten':
                        activeMenuItem = 'orders/concepts';
                        break;
                    case 'aankomend':
                        activeMenuItem = 'orders/active';
                        break;
                    case 'te-factureren':
                        activeMenuItem = 'orders/to-create';
                        break;
                    case 'te-verzenden':
                        activeMenuItem = 'orders/to-send';
                        break;
                    case 'beeindigd':
                        activeMenuItem = 'orders/closed';
                        break;
                }
            } else {
                activeMenuItem = 'orders';
                break;
            }
            break;
        case 'notas':
            if (currentRouteParams.filter) {
                activeParent = 'invoices';
                switch (currentRouteParams.filter) {
                    case 'te-verzenden-incasso':
                        activeMenuItem = 'invoices/to-send-collection';
                        break;
                    case 'te-verzenden-overboeken':
                        activeMenuItem = 'invoices/to-send-transfer';
                        break;
                    case 'verzonden':
                        activeMenuItem = 'invoices/sent';
                        break;
                    case 'geexporteerd':
                        activeMenuItem = 'invoices/exported';
                        break;
                    case 'herinnering':
                        activeMenuItem = 'invoices/reminder';
                        break;
                    case 'aanmaning':
                        activeMenuItem = 'invoices/exhortation';
                        break;
                    case 'betaald':
                        activeMenuItem = 'invoices/paid';
                        break;
                    case 'oninbaar':
                        activeMenuItem = 'invoices/irrecoverable';
                        break;
                }
            } else {
                activeMenuItem = 'invoices';
                break;
            }
            break;
        case 'uitkering-notas':
            if (currentRouteParams.filter) {
                activeParent = 'payment-invoices';
                switch (currentRouteParams.filter) {
                    case 'verzonden':
                        activeMenuItem = 'payment-invoices/sent';
                        break;
                    case 'niet-betaald':
                        activeMenuItem = 'payment-invoices/not-paid';
                        break;
                }
            } else {
                activeMenuItem = 'payment-invoices';
                break;
            }
            break;
    }

    return { activeMenuItem, activeParent };
};
