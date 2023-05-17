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

export default function EmailDetailsModalEdit({email, updateEmailAttributes}) {
    const [intakes, setIntakes] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [quotationRequests, setQuotationRequests] = useState([]);
    const [measures, setMeasures] = useState([]);
    const [opportunities, setOpportunities] = useState([]);
    const [orders, setOrders] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [searchTermContact, setSearchTermContact] = useState('');
    const [isLoadingContact, setLoadingContact] = useState(false);

    useEffect(() => {
        IntakesAPI.peekIntakes().then(payload => {
            setIntakes(payload);
        });
        TasksAPI.peekTasks().then(payload => {
            setTasks(payload);
        });
        QuotationRequestsAPI.peekQuotationRequests().then(payload => {
            setQuotationRequests(payload);
        });
        MeasureAPI.peekMeasures().then(payload => {
            setMeasures(payload);
        });
        OpportunitiesAPI.peekOpportunities().then(payload => {
            setOpportunities(payload);
        });
        OrdersAPI.peekOrders().then(payload => {
            setOrders(payload);
        });
        InvoicesAPI.peekInvoices().then(payload => {
            setInvoices(payload);
        });
    }, []);

    const getContactOptions = async () => {
        if (searchTermContact.length <= 1) return;

        setLoadingContact(true);

        try {
            const results = await ContactsAPI.fetchContactSearch(searchTermContact);
            setLoadingContact(false);
            return results.data.data;
        } catch (error) {
            setLoadingContact(false);
        }
    };

    return (
        <EmailDetailsModalLayout
            email={email}
            updateEmailAttributes={updateEmailAttributes}
            contactsComponent={(
                <AsyncSelectSet
                    label={'Contacten'}
                    name={'contacts'}
                    value={email.contacts}
                    loadOptions={getContactOptions}
                    optionName={'fullName'}
                    onChangeAction={(value) => updateEmailAttributes({contacts: value ? value : []})}
                    isLoading={isLoadingContact}
                    handleInputChange={setSearchTermContact}
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
        />
    );
}

