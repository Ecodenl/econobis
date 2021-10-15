import React from 'react';
import { connect } from 'react-redux';

import TwinfieldLogInvoicesFormItem from './TwinfieldLogInvoicesFormItem';

const TwinfieldLogInvoicesFormList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-2">Datum</div>
                <div className="col-sm-10">Melding</div>
            </div>
            {props.twinfieldMessages.length > 0 ? (
                props.twinfieldMessages.map(twinfieldMessage => {
                    return (
                        <TwinfieldLogInvoicesFormItem key={twinfieldMessage.id} twinfieldMessage={twinfieldMessage} />
                    );
                })
            ) : (
                <div>Geen Twinfield meldingen.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        twinfieldMessages: state.invoiceDetails.twinfieldMessagesInvoice,
    };
};

export default connect(mapStateToProps)(TwinfieldLogInvoicesFormList);
