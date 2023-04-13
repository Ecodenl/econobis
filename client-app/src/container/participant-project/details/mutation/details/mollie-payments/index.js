import React, { useState } from 'react';
import PanelHeader from '../../../../../../components/panel/PanelHeader';
import ParticipantDetailsMutationMolliePaymentsList from './List';
import Icon from 'react-icons-kit';
import { angleRight } from 'react-icons-kit/fa/angleRight';
import { angleDown } from 'react-icons-kit/fa/angleDown';

const ParticipantDetailsMutationMolliePayments = ({ molliePayments }) => {
    const [showMolliePayments, toggleMolliePayments] = useState(false);

    return (
        <div>
            <PanelHeader>
                <div className="row" onClick={() => toggleMolliePayments(!showMolliePayments)}>
                    {showMolliePayments ? <Icon size={21} icon={angleDown} /> : <Icon size={21} icon={angleRight} />}
                    <span className="h5">Online betalingtransacties</span>
                </div>
            </PanelHeader>
            {showMolliePayments ? (
                <ParticipantDetailsMutationMolliePaymentsList molliePayments={molliePayments} />
            ) : null}
        </div>
    );
};

export default ParticipantDetailsMutationMolliePayments;
