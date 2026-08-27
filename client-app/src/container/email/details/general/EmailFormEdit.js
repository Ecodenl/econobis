import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import InputSelect from '../../../../components/form/InputSelect';
import ViewHtmlAsText from '../../../../components/form/ViewHtmlAsText';
import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from '../../../../components/panel/PanelFooter';
import ViewText from '../../../../components/form/ViewText';
import ContactsAPI from '../../../../api/contact/ContactsAPI';
import EmailAPI from '../../../../api/email/EmailAPI';

import { fetchEmail } from '../../../../actions/email/EmailDetailsActions';
import QuotationRequestsAPI from '../../../../api/quotation-request/QuotationRequestsAPI';
import TasksAPI from '../../../../api/task/TasksAPI';
import MeasureAPI from '../../../../api/measure/MeasureAPI';
import IntakesAPI from '../../../../api/intake/IntakesAPI';
import OpportunitiesAPI from '../../../../api/opportunity/OpportunitiesAPI';
import InputReactSelect from '../../../../components/form/InputReactSelect';
import OrdersAPI from '../../../../api/order/OrdersAPI';
import InvoicesAPI from '../../../../api/invoice/InvoicesAPI';
import InputSelectGroup from '../../../../components/form/InputSelectGroup';
import validator from 'validator';
import AsyncSelectSet from '../../../../components/form/AsyncSelectSet';

function EmailFormEdit(props) {
    const [searchTermContact, setSearchTermContact] = useState('');
    const [isLoadingContact, setLoadingContact] = useState(false);
    const [valueSelectedContacts, setValueSelectedContacts] = useState([]);
    // const [contactsIds, setContacts] = useState([]);
    const [email, setEmail] = useState({});
    const [orders, setOrders] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [quotationRequests, setQuotationRequests] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [measures, setMeasures] = useState([]);
    const [intakes, setIntakes] = useState([]);
    const [opportunities, setOpportunities] = useState([]);

    const {
        id,
        responsibleUserId,
        responsibleTeamId,
        contacts,
        intake,
        task,
        quotationRequest,
        measure,
        opportunity,
        order,
        invoice,
        status,
        removedBy,
        dateRemoved,
        from,
        toWithGroup,
        cc,
        bcc,
        subject,
        htmlBodyWithEmbeddedImages,
        createdAt,
        dateSent,
        folder,
        sentByUser,
    } = props.email;

    let responsibleInitial = '';
    if (responsibleUserId) {
        responsibleInitial = 'user' + responsibleUserId;
    }
    if (responsibleTeamId) {
        responsibleInitial = 'team' + responsibleTeamId;
    }

    useEffect(() => {
        setEmail({
            id,
            contactIds: contacts && contacts.map(contact => contact.id).join(','),
            intakeId: intake ? intake.id : '',
            taskId: task ? task.id : '',
            quotationRequestId: quotationRequest ? quotationRequest.id : '',
            measureId: measure ? measure.id : '',
            statusId: status ? status.id : '',
            opportunityId: opportunity ? opportunity.id : '',
            orderId: order ? order.id : '',
            invoiceId: invoice ? invoice.id : '',
            responsibleUserId,
            responsibleTeamId,
            responsible: responsibleInitial,
        });
        OrdersAPI.peekOrders().then(payload => {
            setOrders(payload);
        });
        InvoicesAPI.peekInvoices().then(payload => {
            setInvoices(payload);
        });
        QuotationRequestsAPI.peekQuotationRequests().then(payload => {
            setQuotationRequests(payload);
        });
        TasksAPI.peekTasks().then(payload => {
            setTasks(payload);
        });
        MeasureAPI.peekMeasures().then(payload => {
            setMeasures(payload);
        });
        IntakesAPI.peekIntakes().then(payload => {
            setIntakes(payload);
        });
        OpportunitiesAPI.peekOpportunities().then(payload => {
            setOpportunities(payload);
        });
    }, []);

    useEffect(() => {
        setValueSelectedContacts(getSelectedContacts());
    }, [contacts]);

    function getSelectedContacts() {
        let toArray = contacts.map(contact => contact.id);
        let selectedTo = [];
        toArray.map(item => {
            let contact = contacts.find(contact => contact.id === Number(item));
            selectedTo.push({
                id: contact.id,
                fullName: contact.fullName,
            });
        });
        return selectedTo;
    }

    function handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setEmail({
            ...email,
            [name]: value,
        });
    }

    function handleContactIds(selectedOption) {
        const contactIds = selectedOption ? selectedOption.map(item => item.id).join(',') : '';
        setEmail({
            ...email,
            contactIds: contactIds,
        });
        setValueSelectedContacts(selectedOption);
    }

    function handleInputReactSelect(selectedOption, name) {
        setEmail({
            ...email,
            [name]: selectedOption,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (email.statusId) {
            EmailAPI.setStatus(email.id, email.statusId).then(payload => {
                props.fetchEmail(email.id);
            });
        }

        if (validator.isEmpty(email.responsible.toString())) {
            email.responsibleUserId = '';
            email.responsibleTeamId = '';
        }

        if (email.responsible.search('user') >= 0) {
            email.responsibleUserId = email.responsible.replace('user', '');
            email.responsibleTeamId = '';
        }

        if (email.responsible.search('team') >= 0) {
            email.responsibleUserId = '';
            email.responsibleTeamId = email.responsible.replace('team', '');
        }

        EmailAPI.updateEmail(email).then(payload => {
            props.fetchEmail(email.id);
        });

        props.switchToView();
    }

    const getContactOptions = async () => {
        if (searchTermContact.length <= 1) return;

        setLoadingContact(true);

        try {
            const results = await ContactsAPI.fetchContactSearch(searchTermContact);
            setLoadingContact(false);
            return results.data.data;
        } catch (error) {
            setLoadingContact(false);
            // console.log(error);
        }
    };

    function handleInputSearchChange(value) {
        setSearchTermContact(value);
    }

    const {
        statusId,
        intakeId,
        taskId,
        quotationRequestId,
        measureId,
        opportunityId,
        orderId,
        invoiceId,
        responsible,
    } = email;

    const maxContactsToShowDirectly = 5;
    const manyContacts = contacts.length > maxContactsToShowDirectly;

    return (
        <div>
            {folder === 'removed' ? (
                <React.Fragment>
                    <div className="row">
                        <ViewText
                            label={'Verwijderd door'}
                            value={removedBy ? removedBy.fullName : 'Onbekend'}
                            link={removedBy ? '/gebruiker/' + removedBy.id : ''}
                        />
                        <ViewText
                            label={'Datum verwijderd'}
                            value={dateRemoved ? moment(dateRemoved).format('DD-MM-YYYY HH:mm') : ''}
                        />
                    </div>
                    <hr />
                </React.Fragment>
            ) : null}
            <div className="row">
                <ViewText label={'Van'} value={from} />
                <ViewText
                    label={'Ontvangen datum tijd'}
                    value={createdAt ? moment(createdAt).format('DD-MM-YYYY HH:mm') : ''}
                />
            </div>
            <div className="row">
                <ViewText label={'Aan'} value={toWithGroup && toWithGroup.map(toWithGroup => toWithGroup).join(', ')} />
                <ViewText
                    label={'Verzonden datum tijd'}
                    value={dateSent ? moment(dateSent).format('DD-MM-YYYY HH:mm') : ''}
                />
            </div>
            <div className="row">
                <div className={'form-group col-md-6'} />
                <ViewText label={'Verzonden door gebruiker'} value={sentByUser ? sentByUser.fullName : ''} />
            </div>
            <div className="row">
                <ViewText label={'Cc'} value={cc && cc.map(cc => cc).join(', ')} />
                <ViewText label={'Bcc'} value={bcc && bcc.map(bcc => bcc).join(', ')} />
            </div>

            <div className="row">
                {manyContacts && !props.showContacten ? (
                    <ViewText
                        label={'Contacten'}
                        value={
                            <ButtonText
                                buttonClassName={'btn-success btn-padding-small'}
                                buttonText={'Toon contacten (' + contacts.length + ')'}
                                onClickAction={props.toggleShowContacten}
                            />
                        }
                    />
                ) : (
                    <AsyncSelectSet
                        label={'Contacten'}
                        name={'contacts'}
                        value={valueSelectedContacts}
                        loadOptions={getContactOptions}
                        optionName={'fullName'}
                        onChangeAction={handleContactIds}
                        isLoading={isLoadingContact}
                        handleInputChange={handleInputSearchChange}
                    />
                )}
            </div>

            {manyContacts && props.showContacten && (
                <div className="row" onClick={props.toggleShowContacten}>
                    <ViewText
                        label={''}
                        className={'form-group col-sm-6'}
                        value={
                            <ButtonText
                                buttonClassName={'btn-success btn-padding-small'}
                                buttonText={'Verberg contacten'}
                                onClickAction={props.toggleShowContacten}
                            />
                        }
                    />
                    <div className="form-group col-md-6" />
                </div>
            )}

            <div className="row">
                <InputReactSelect
                    label={'Intake'}
                    size={'col-sm-6'}
                    name={'intakeId'}
                    options={intakes}
                    value={intakeId}
                    clearable={true}
                    onChangeAction={handleInputReactSelect}
                />
            </div>

            <div className="row">
                <InputSelect
                    label={'Taak'}
                    size={'col-sm-6'}
                    name={'taskId'}
                    options={tasks}
                    value={taskId}
                    onChangeAction={handleInputChange}
                />
                <InputSelect
                    label={'Kansactie'}
                    size={'col-sm-6'}
                    name={'quotationRequestId'}
                    options={quotationRequests}
                    value={quotationRequestId}
                    onChangeAction={handleInputChange}
                />
            </div>

            <div className="row">
                <InputSelect
                    label={'Maatregel'}
                    size={'col-sm-6'}
                    name={'measureId'}
                    options={measures}
                    value={measureId}
                    onChangeAction={handleInputChange}
                />
                <InputSelect
                    label={'Kans'}
                    size={'col-sm-6'}
                    name={'opportunityId'}
                    options={opportunities}
                    value={opportunityId}
                    onChangeAction={handleInputChange}
                />
            </div>

            <div className="row">
                <InputSelect
                    label={'Order'}
                    size={'col-sm-6'}
                    name={'orderId'}
                    options={orders}
                    value={orderId}
                    onChangeAction={handleInputChange}
                />
                <InputSelect
                    label={'Nota'}
                    size={'col-sm-6'}
                    name={'invoiceId'}
                    options={invoices}
                    value={invoiceId}
                    onChangeAction={handleInputChange}
                />
            </div>

            <div className="row margin-10-top">
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-3">
                            <label className="col-sm-12">Onderwerp</label>
                        </div>
                        <div className="col-sm-9">{subject}</div>
                    </div>
                </div>
            </div>

            <div className="row">
                <ViewHtmlAsText label={'Tekst'} value={htmlBodyWithEmbeddedImages} />
            </div>

            {((folder == 'inbox' && status) || (folder == 'inbox' && status == null)) && (
                <div className="row">
                    <InputSelect
                        label={'Status'}
                        size={'col-sm-6'}
                        name={'statusId'}
                        options={props.emailStatuses}
                        value={statusId}
                        onChangeAction={handleInputChange}
                    />
                </div>
            )}

            {folder == 'inbox' && (
                <div className="row">
                    <InputSelectGroup
                        label={'Verantwoordelijke'}
                        size={'col-sm-6'}
                        name={'responsible'}
                        optionsInGroups={[
                            {
                                name: 'user',
                                label: 'Gebruikers',
                                options: props.users,
                                optionName: 'fullName',
                            },
                            { name: 'team', label: 'Teams', options: props.teams },
                        ]}
                        value={responsible}
                        onChangeAction={handleInputChange}
                    />
                </div>
            )}

            <PanelFooter>
                <div className="pull-right btn-group" role="group">
                    <ButtonText
                        buttonClassName={'btn-default'}
                        buttonText={'Annuleren'}
                        onClickAction={props.switchToView}
                    />
                    <ButtonText buttonText={'Opslaan'} onClickAction={handleSubmit} type={'submit'} value={'Submit'} />
                </div>
            </PanelFooter>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    fetchEmail: id => {
        dispatch(fetchEmail(id));
    },
});

const mapStateToProps = state => {
    return {
        email: state.email,
        emailStatuses: state.systemData.emailStatuses,
        teams: state.systemData.teams,
        users: state.systemData.users,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailFormEdit);
