import React from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../../components/button/ButtonIcon';

function FinancialOverviewContactPreviewToolbar({ financialOverviewContactDetails, zoomIn, zoomOut }) {
    const navigate = useNavigate();

    return (
        <div className="row">
            <div className="col-md-3">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'arrowLeft'} onClickAction={browserHistory.goBack} />
                    <ButtonIcon iconName={'searchPlus'} onClickAction={zoomIn} />
                    <ButtonIcon iconName={'searchMinus'} onClickAction={zoomOut} />
                </div>
            </div>
            <div className="col-md-6">
                <h4 className="text-center">
                    {'Contact: ' + financialOverviewContactDetails.financialOverviewContact.contact.full_name}
                    <br />
                    {'Waardestaat: ' +
                        financialOverviewContactDetails.financialOverviewContact.financial_overview.description}
                    <br />

                    <span
                        className={
                            financialOverviewContactDetails.financialOverviewContact.status_id === 'concept'
                                ? 'text-danger'
                                : ''
                        }
                    >
                        {'Status: ' + financialOverviewContactDetails.financialOverviewContact.status}
                    </span>
                </h4>
            </div>
            <div className="col-md-3" />
        </div>
    );
}

export default FinancialOverviewContactPreviewToolbar;
