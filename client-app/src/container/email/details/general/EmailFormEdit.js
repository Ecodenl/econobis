import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import InputSelect from '../../../../components/form/InputSelect';
import ViewHtmlAsText from '../../../../components/form/ViewHtmlAsText';
import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from "../../../../components/panel/PanelFooter";
import ViewText from '../../../../components/form/ViewText';
import ContactsAPI from '../../../../api/contact/ContactsAPI';
import EmailAPI from '../../../../api/email/EmailAPI';

import { fetchEmail } from '../../../../actions/email/EmailDetailsActions';
import QuotationRequestsAPI from "../../../../api/quotation-request/QuotationRequestsAPI";
import TasksAPI from "../../../../api/task/TasksAPI";
import MeasureAPI from "../../../../api/measure/MeasureAPI";
import IntakesAPI from "../../../../api/intake/IntakesAPI";
import OpportunitiesAPI from "../../../../api/opportunity/OpportunitiesAPI";
import InputReactSelect from "../../../../components/form/InputReactSelect";
import OrdersAPI from "../../../../api/order/OrdersAPI";

class EmailFormEdit extends Component {
    constructor(props) {
        super(props);

        const {id, contacts, intake, task, quotationRequest, measure, opportunity, order, status} = props.email;

        this.state = {
            email: {
                id,
                contactIds: contacts && contacts.map((contact) => contact.id).join(','),
                intakeId: intake ? intake.id : '',
                taskId: task ? task.id : '',
                quotationRequestId: quotationRequest ? quotationRequest.id : '',
                measureId: measure ? measure.id : '',
                statusId: status ? status.id : '',
                opportunityId: opportunity ? opportunity.id : '',
                orderId: order ? order.id : '',
            },
            orders: [],
            contacts: [],
            quotationRequests: [],
            tasks: [],
            measures: [],
            intakes: [],
            opportunities: [],
            peekLoading: {
                contacts: true,
            },
        }
    };

    componentWillMount() {
        ContactsAPI.getContactsPeek().then((payload) => {
            this.setState({
                contacts: payload,
                peekLoading: {
                    ...this.state.peekLoading,
                    contacts: false,
                },
            });
        });

        QuotationRequestsAPI.peekQuotationRequests().then((payload) => {
            this.setState({ quotationRequests: payload });
        });

        TasksAPI.peekTasks().then((payload) => {
            this.setState({ tasks: payload });
        });

        MeasureAPI.peekMeasures().then((payload) => {
            this.setState({ measures: payload });
        });

        IntakesAPI.peekIntakes().then((payload) => {
            this.setState({ intakes: payload });
        });

        OpportunitiesAPI.peekOpportunities().then((payload) => {
            this.setState({ opportunities: payload });
        });

        OrdersAPI.peekOrders().then((payload) => {
            this.setState({ orders: payload });
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

    handleContactIds = (selectedOption) => {
        this.setState({
            ...this.state,
            email: {
                ...this.state.email,
                contactIds: selectedOption
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const {email} = this.state;

        if(email.statusId){
            EmailAPI.setStatus(email.id, email.statusId).then(payload => {
                this.props.fetchEmail(email.id);
            });
        }

        EmailAPI.updateEmail(email).then(payload => {
            this.props.fetchEmail(email.id);
        });

        this.props.switchToView();
    };

    render() {
        const {contactIds, statusId, intakeId, taskId, quotationRequestId, measureId, opportunityId, orderId} = this.state.email;
        const {from, to, cc, bcc, subject, htmlBody, createdAt, dateSent, folder, status} = this.props.email;
        return (
            <div>
                <div className="row">
                    <ViewText
                        label={"Van"}
                        value={from}
                    />
                    <ViewText
                        label={"Ontvangen datum tijd"}
                        value={createdAt ? moment(createdAt.date).format('DD-MM-YYYY HH:mm') : ''}
                    />

                </div>
                <div className="row">
                    <ViewText
                        label={"Aan"}
                        value={to && to.map((to) => to).join(', ')}
                    />
                    <ViewText
                        label={"Verzonden datum tijd"}
                        value={dateSent ? moment(dateSent.date).format('DD-MM-YYYY HH:mm') : ''}
                    />
                </div>
                <div className="row">
                    <ViewText
                        label={"Cc"}
                        value={cc && cc.map((cc) => cc).join(', ')}
                    />
                    <InputReactSelect
                        label={"Contact"}
                        name={"contactIds"}
                        options={this.state.contacts}
                        value={contactIds}
                        onChangeAction={this.handleContactIds}
                        optionName={'fullName'}
                        isLoading={this.state.peekLoading.contacts}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={"Intake"}
                        size={"col-sm-6"}
                        name={"intakeId"}
                        options={this.state.intakes}
                        value={intakeId}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputSelect
                        label={"Taak"}
                        size={"col-sm-6"}
                        name={"taskId"}
                        options={this.state.tasks}
                        value={taskId}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={"Offerteverzoek"}
                        size={"col-sm-6"}
                        name={"quotationRequestId"}
                        options={this.state.quotationRequests}
                        value={quotationRequestId}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputSelect
                        label={"Maatregel"}
                        size={"col-sm-6"}
                        name={"measureId"}
                        options={this.state.measures}
                        value={measureId}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={"Kans"}
                        size={"col-sm-6"}
                        name={"opportunityId"}
                        options={this.state.opportunities}
                        value={opportunityId}
                        onChangeAction={this.handleInputChange}
                    />

                    <InputSelect
                        label={"Order"}
                        size={"col-sm-6"}
                        name={"orderId"}
                        options={this.state.orders}
                        value={orderId}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row margin-10-top">
                    <div className='col-sm-12'>
                        <div className="row">
                            <div className="col-sm-3">
                                <label className="col-sm-12">Onderwerp</label>
                            </div>
                            <div className="col-sm-9">
                                {subject}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <ViewHtmlAsText label={"Tekst"} value={htmlBody}/>
                </div>

                {((folder == 'inbox' && status && status.id != 'closed') || (folder == 'inbox' && status == null)) &&
                <div className="row">
                    <InputSelect
                        label={"Status"}
                        size={"col-sm-6"}
                        name={"statusId"}
                        options={this.props.emailStatuses}
                        value={statusId}
                        onChangeAction={this.handleInputChange}
                    />
                </div>
                }

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
        emailStatuses: state.systemData.emailStatuses
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailFormEdit);
