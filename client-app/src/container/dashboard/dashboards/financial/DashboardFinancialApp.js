import React, { Component } from 'react';

import ButtonEmails from "./../../buttons/ButtonEmails";
import ButtonIntakes from "./../../buttons/ButtonIntakes";
import ButtonOpportunities from "./../../buttons/ButtonOpportunities";
import ButtonTasks from "./../../buttons/ButtonTasks";
import ButtonQuotationRequests from "../../buttons/ButtonQuotationRequests";
import ButtonCollectionOrders from "../../buttons/ButtonCollectionOrders";
import ButtonUnpaidInvoices from "../../buttons/ButtonUnpaidInvoices";

class DashboardFinancialApp extends Component {
    render() {
        return (
            <div>
                <div className={'row'}>
                    <ButtonEmails size={'col-xs-3'}/>
                    <ButtonTasks size={'col-xs-3'}/>
                    <ButtonCollectionOrders size={'col-xs-3'}/>
                    <ButtonUnpaidInvoices size={'col-xs-3'}/>
                </div>
            </div>
        )
    }
}

export default DashboardFinancialApp;