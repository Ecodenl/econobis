import React, {useEffect, useState} from 'react';
import IntakesAPI from "../../../api/intake/IntakesAPI";
import InputReactSelect from "../../../components/form/InputReactSelect";
import TasksAPI from "../../../api/task/TasksAPI";
import QuotationRequestsAPI from "../../../api/quotation-request/QuotationRequestsAPI";
import MeasureAPI from "../../../api/measure/MeasureAPI";
import OpportunitiesAPI from "../../../api/opportunity/OpportunitiesAPI";
import OrdersAPI from "../../../api/order/OrdersAPI";
import InvoicesAPI from "../../../api/invoice/InvoicesAPI";
import AsyncSelectSet from "../../../components/form/AsyncSelectSet";
import ContactsAPI from "../../../api/contact/ContactsAPI";
import EmailDetailsModalLayout from "./EmailDetailsModalLayout";
import InputTextArea from "../../form/InputTextArea";

export default function EmailDetailsModalEdit({email, updateEmailAttributes, onRemoved}) {
    const [intakes, setIntakes] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [quotationRequests, setQuotationRequests] = useState([]);
    const [measures, setMeasures] = useState([]);
    const [opportunities, setOpportunities] = useState([]);
    const [orders, setOrders] = useState([]);
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        IntakesAPI.peekIntakesForContacts(email.contacts.map(c => c.id)).then(payload => {
            setIntakes(payload);
        });
        TasksAPI.peekTasksForContacts(email.contacts.map(c => c.id)).then(payload => {
            setTasks(payload);
        });
        QuotationRequestsAPI.peekQuotationRequestsForContacts(email.contacts.map(c => c.id)).then(payload => {
            setQuotationRequests(payload);
        });
        MeasureAPI.peekMeasures().then(payload => {
            setMeasures(payload);
        });
        OpportunitiesAPI.peekOpportunitiesForContacts(email.contacts.map(c => c.id)).then(payload => {
            setOpportunities(payload);
        });
        OrdersAPI.peekOrdersForContacts(email.contacts.map(c => c.id)).then(payload => {
            setOrders(payload);
        });
        InvoicesAPI.peekInvoices().then(payload => {
            setInvoices(payload);
        });
    }, [email.contacts]);

    const getContactOptions = (searchTerm) => {
        return ContactsAPI.fetchContactSearch(searchTerm).then(payload => payload.data.data);
    };

    return (
        <EmailDetailsModalLayout
            email={email}
            updateEmailAttributes={updateEmailAttributes}
            onRemoved={onRemoved}
            contactsComponent={(
                <AsyncSelectSet
                    label={'Contacten'}
                    name={'contacts'}
                    value={email.contacts}
                    loadOptions={getContactOptions}
                    optionName={'fullName'}
                    onChangeAction={(value) => updateEmailAttributes({contacts: value ? value : []})}
                    clearable={true}
                />
            )}
            intakeComponent={(
                <InputReactSelect
                    label={'Intake'}
                    size={'col-sm-6'}
                    name={'intakeId'}
                    options={intakes}
                    value={email.intakeId}
                    clearable={true}
                    onChangeAction={(value) => updateEmailAttributes({intakeId: value})}
                />
            )}
            taskComponent={(
                <InputReactSelect
                    label={'Taak'}
                    size={'col-sm-6'}
                    name={'taskId'}
                    options={tasks}
                    value={email.taskId}
                    clearable={true}
                    onChangeAction={(value) => updateEmailAttributes({taskId: value})}
                />
            )}
            quotationRequestComponent={(
                <InputReactSelect
                    label={'Kansactie'}
                    size={'col-sm-6'}
                    name={'quotationRequestId'}
                    options={quotationRequests}
                    value={email.quotationRequestId}
                    clearable={true}
                    onChangeAction={(value) => updateEmailAttributes({quotationRequestId: value})}
                />
            )}
            measureComponent={(
                <InputReactSelect
                    label={'Maatregel'}
                    size={'col-sm-6'}
                    name={'quotationRequestId'}
                    options={measures}
                    value={email.measureId}
                    clearable={true}
                    onChangeAction={(value) => updateEmailAttributes({measureId: value})}
                />
            )}
            opportunityComponent={(
                <InputReactSelect
                    label={'Kans'}
                    size={'col-sm-6'}
                    name={'opportunityId'}
                    options={opportunities}
                    value={email.opportunityId}
                    clearable={true}
                    onChangeAction={(value) => updateEmailAttributes({opportunityId: value})}
                />
            )}
            orderComponent={(
                <InputReactSelect
                    label={'Order'}
                    size={'col-sm-6'}
                    name={'orderId'}
                    options={orders}
                    value={email.orderId}
                    clearable={true}
                    onChangeAction={(value) => updateEmailAttributes({orderId: value})}
                />
            )}
            invoiceComponent={(
                <InputReactSelect
                    label={'Nota'}
                    size={'col-sm-6'}
                    name={'invoiceId'}
                    options={invoices}
                    value={email.invoiceId}
                    clearable={true}
                    onChangeAction={(value) => updateEmailAttributes({invoiceId: value})}
                />
            )}
            noteComponent={(
                <InputTextArea
                    label={'Opmerking'}
                    name={'note'}
                    value={email.note ? email.note : ''}
                    onChangeAction={(e) => updateEmailAttributes({note: e.target.value})}
                    textToolTip={"let op: deze opmerking is alleen zichtbaar bij deze specifieke e-mail. als iemand een reply stuurt is daar de opmerking niet meer te zien"}
                    sizeInput={'col-sm-8'}
                />
            )}
        />
    );
}
