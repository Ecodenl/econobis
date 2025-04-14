import React from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../../../../components/button/ButtonIcon';
import ButtonText from '../../../../../../components/button/ButtonText';

const PaymentInvoiceCreateToolbar = ({ amountOfDistributions, createRevenueReport, showOnPortal }) => {
    const navigate = useNavigate();

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group btn-group-flex margin-small" role="group">
                    <ButtonIcon iconName={'arrowLeft'} onClickAction={browserHistory.goBack} />
                    {amountOfDistributions > 0 && (
                        <ButtonText buttonText={'Rapportage versturen'} onClickAction={() => createRevenueReport()} />
                    )}
                </div>
            </div>
            <div className="col-md-4">
                <h4 className="text-center">Rapportage aanmaken ({amountOfDistributions})</h4>
                {showOnPortal ? (
                    <div className="text-center text-success">
                        Deze rapportage zal ook beschikbaar/zichtbaar worden op de Portal
                    </div>
                ) : (
                    <div className="text-center text-danger">
                        Deze rapportage zal NIET beschikbaar/zichtbaar worden op de Portal
                    </div>
                )}
            </div>
            <div className="col-md-4" />
        </div>
    );
};

export default PaymentInvoiceCreateToolbar;
