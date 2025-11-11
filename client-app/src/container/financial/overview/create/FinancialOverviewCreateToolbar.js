import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../../components/button/ButtonIcon';
import ButtonText from '../../../../components/button/ButtonText';
import FinancialOverviewCreateConfirm from './FinancialOverviewCreateConfirm';
import FinancialOverviewCreateConfirmPost from './FinancialOverviewCreateConfirmPost';

export default function FinancialOverviewCreateToolbar({
    type,
    selectedIds = [],
    amountOfFinancialOverviewContacts = 0,
    financialOverviewId,
}) {
    const navigate = useNavigate();
    const [showSend, setShowSend] = useState(false);

    const toggleSend = () => setShowSend(prev => !prev);

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group btn-group-flex margin-small" role="group">
                    <ButtonIcon iconName={'arrowLeft'} onClickAction={() => navigate(-1)} />

                    {amountOfFinancialOverviewContacts > 0 && type === 'email' && (
                        <ButtonText buttonText={'Waardestaten e-mailen'} onClickAction={toggleSend} />
                    )}

                    {amountOfFinancialOverviewContacts > 0 && type === 'post' && (
                        <ButtonText buttonText={'Waardestaten downloaden'} onClickAction={toggleSend} />
                    )}
                </div>
            </div>
            <div className="col-md-4">
                <h4 className="text-center">
                    Te verzenden waardestaten versturen ({amountOfFinancialOverviewContacts})
                </h4>
            </div>
            <div className="col-md-4" />

            {showSend && type === 'email' && (
                <FinancialOverviewCreateConfirm
                    type={type}
                    financialOverviewContactIds={selectedIds}
                    closeModal={toggleSend}
                    financialOverviewId={financialOverviewId}
                />
            )}

            {showSend && type === 'post' && (
                <FinancialOverviewCreateConfirmPost
                    type={type}
                    financialOverviewContactIds={selectedIds}
                    closeModal={toggleSend}
                    financialOverviewId={financialOverviewId}
                />
            )}
        </div>
    );
}
