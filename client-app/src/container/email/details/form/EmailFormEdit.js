import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import InputSelect from '../../../../components/form/InputSelect';
import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from "../../../../components/panel/PanelFooter";
import ViewText from '../../../../components/form/ViewText';
import ContactsAPI from '../../../../api/contact/ContactsAPI';
import EmailAPI from '../../../../api/email/EmailAPI';

import { fetchEmail } from '../../../../actions/email/EmailDetailsActions';


class EmailFormEdit extends Component {
    constructor(props) {
        super(props);

        const {id, contactId} = props.email;

        this.state = {
            email: {
                id,
                contactId: contactId,
            },
            contacts: [],
        }
    };

    createMarkup = (value) => {
        return {__html: value};
    };

    componentWillMount() {
        ContactsAPI.getContactsPeek().then(payload => {
            this.setState({
                contacts: payload
            });
        });
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            email: {
                ...this.state.email,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const {email} = this.state;

        EmailAPI.associateContact(email.id, email.contactId).then(payload => {
            this.props.fetchEmail(email.id);
            this.props.switchToView();
        });
    };

    render() {
        const {contactId} = this.state.email;
        const {from, to, cc, bcc, subject, html_body, created_at, date_sent} = this.props.email;
        return (
            <div>
                <div className="row">
                    <ViewText
                        label={"Ontvangen datum tijd"}
                        value={created_at ? moment(created_at.date).format('DD-MM-YYYY hh:mm') : ''}
                    />
                    <ViewText
                        label={"Verzonden datum tijd"}
                        value={date_sent ? moment(date_sent.date).format('DD-MM-YYYY hh:mm') : ''}
                    />
                </div>
                <div className="row">
                    <ViewText
                        label={"Van"}
                        value={from}
                    />
                    <ViewText
                        label={"Aan"}
                        value={to && to.map((to) => to).join(', ')}
                    />
                </div>
                <div className="row">
                    <ViewText
                        label={"Cc"}
                        value={cc && cc.map((cc) => cc).join(', ')}
                    />
                    <ViewText
                        label={"Bcc"}
                        value={bcc && bcc.map((bcc) => bcc).join(', ')}
                    />
                </div>
                <div className="row">
                    <InputSelect
                        label={"Contact"}
                        size={"col-sm-6"}
                        name={"contactId"}
                        options={this.state.contacts}
                        value={contactId}
                        onChangeAction={this.handleInputChange}
                        optionName={'fullName'}
                    />

                </div>

                <div className="row">
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

                <div className="row">
                    <div className="col-sm-12" dangerouslySetInnerHTML={this.createMarkup(html_body)} />
                </div>

                <PanelFooter>
                    <div className="pull-right btn-group" role="group">
                        <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"}
                                    onClickAction={this.props.switchToView}/>
                        <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit} type={"submit"}
                                    value={"Submit"}/>
                    </div>
                </PanelFooter>
            </div>
        );
    };
};

const mapDispatchToProps = dispatch => ({
    fetchEmail: (id) => {
        dispatch(fetchEmail(id));
    },
});

const mapStateToProps = (state) => {
    return {
        email: state.email,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailFormEdit);
