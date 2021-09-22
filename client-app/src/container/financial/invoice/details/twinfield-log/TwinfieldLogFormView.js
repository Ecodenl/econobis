import React from 'react';
import moment from 'moment/moment';

moment.locale('nl');

const TwinfieldLogFormView = props => {
    const { messageType, createdAt, messageText, isError } = props.twinfieldMessage;

    return (
        <div className={`row border`}>
            <div>
                <div className="col-sm-2">
                    {messageType == 'invoice' ? 'Nota' : messageType == 'payment' ? 'Betaling' : messageType}
                </div>
                <div className="col-sm-2">{createdAt ? moment(createdAt).format('L HH:mm') : ''}</div>
                <div className="col-sm-8">{messageText}</div>
            </div>
        </div>
    );
};

export default TwinfieldLogFormView;
