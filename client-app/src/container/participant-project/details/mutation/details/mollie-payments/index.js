import React, { useState } from 'react';
import PanelHeader from '../../../../../../components/panel/PanelHeader';
import ParticipantDetailsMutationMolliePaymentsList from './List';

const ParticipantDetailsMutationMolliePayments = ({ molliePayments }) => {
    const [showMolliePayments, toggleMolliePayments] = useState(false);

    return (
        <div>
            <PanelHeader>
                <div className="row" onClick={() => toggleMolliePayments(!showMolliePayments)}>
                    {showMolliePayments ? (
                        <span className="glyphicon glyphicon-menu-down" />
                    ) : (
                        <span className="glyphicon glyphicon-menu-right" />
                    )}
                    <span className="h5">Online betalingtransacties</span>
                </div>
            </PanelHeader>
            {showMolliePayments ? <ParticipantDetailsMutationMolliePaymentsList molliePayments={molliePayments} /> : null}
        </div>
    );
};

export default ParticipantDetailsMutationMolliePayments;
