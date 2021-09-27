import React from 'react';
import moment from 'moment/moment';

moment.locale('nl');

const TwinfieldLogPaymentsFormView = props => {
    const { createdAt, messageText, isError } = props.twinfieldMessage;
    const classNameError = isError ? 'alert-warning' : '';
    return (
        <div className={`row border`}>
            <div>
                <div className={`col-sm-2 ${classNameError}`}>
                    {createdAt ? moment(createdAt).format('L HH:mm') : ''}
                </div>
                <div className={`col-sm-10 ${classNameError}`}>{messageText}</div>
            </div>
        </div>
    );
};

export default TwinfieldLogPaymentsFormView;
