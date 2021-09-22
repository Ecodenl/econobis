import React from 'react';
import { connect } from 'react-redux';

import TwinfieldLogFormItem from './TwinfieldLogFormItem';

const TwinfieldLogFormList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-2">Type</div>
                <div className="col-sm-2">Datum</div>
                <div className="col-sm-8">Melding</div>
            </div>
            {props.twinfieldMessages.length > 0 ? (
                props.twinfieldMessages.map(twinfieldMessage => {
                    return <TwinfieldLogFormItem key={twinfieldMessage.id} twinfieldMessage={twinfieldMessage} />;
                })
            ) : (
                <div>Geen Twinfield meldingen.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        twinfieldMessages: state.invoiceDetails.twinfieldMessages,
    };
};

export default connect(mapStateToProps)(TwinfieldLogFormList);
