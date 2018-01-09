import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';


import ViewText from '../../../../components/form/ViewText';

const createMarkup = (value) => {
    return {__html: value};
};

const EmailFormView = props => {
    const {from, to, cc, bcc, contact, subject, html_body, created_at, date_sent} = props.email;

    return (
        <div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Ontvangen datum tijd"}
                    value={created_at ? moment(created_at.date).format('DD-MM-YYYY hh:mm') : ''}
                />
                <ViewText
                    label={"Verzonden datum tijd"}
                    value={date_sent ? moment(date_sent.date).format('DD-MM-YYYY hh:mm') : ''}
                />
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Van"}
                    value={from}
                />
                <ViewText
                    label={"Aan"}
                    value={to && to.map((to) => to).join(', ')}
                />
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Cc"}
                    value={cc && cc.map((cc) => cc).join(', ')}
                />
                <ViewText
                    label={"Bcc"}
                    value={bcc && bcc.map((bcc) => bcc).join(', ')}
                />
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Contact"}
                    value={contact ? contact.fullName : ''}
                    link={contact ? 'contact/' + contact.id : ''}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <div className='col-sm-12'>
                    <div className="row">
                        <div className="col-sm-3">
                            <label className="col-sm-12">Onderwerp</label>
                        </div>
                        <div className="col-sm-8">
                            {subject}
                        </div>
                    </div>
                </div>
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <div className="col-sm-12" dangerouslySetInnerHTML={createMarkup(html_body)} />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        email: state.email,
    }
};

export default connect(mapStateToProps)(EmailFormView);