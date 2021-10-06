import React from 'react';

import InputReactSelect from '../../../../../components/form/InputReactSelect';

const TaskDetailsFormGeneralEditExtraConnections = ({
    task,
    invoices,
    campaigns,
    intakes,
    contactGroups,
    opportunities,
    housingFiles,
    projects,
    participants,
    orders,
    handleReactSelectChange,
    peekLoading,
}) => {
    const {
        intakeId,
        contactGroupId,
        opportunityId,
        campaignId,
        housingFileId,
        projectId,
        participantId,
        orderId,
        invoiceId,
    } = task;

    return (
        <div>
            <div className="row">
                <InputReactSelect
                    label={'Campagne'}
                    name={'campaignId'}
                    options={campaigns}
                    value={campaignId}
                    onChangeAction={handleReactSelectChange}
                    isLoading={peekLoading.campaigns}
                />
                <InputReactSelect
                    label={'Intake'}
                    size={'col-sm-6'}
                    name={'intakeId'}
                    options={intakes}
                    value={intakeId}
                    onChangeAction={handleReactSelectChange}
                    isLoading={peekLoading.intakes}
                />
            </div>

            <div className="row">
                <InputReactSelect
                    label={'Groep'}
                    size={'col-sm-6'}
                    name={'contactGroupId'}
                    options={contactGroups}
                    value={contactGroupId}
                    onChangeAction={handleReactSelectChange}
                    isLoading={peekLoading.contactGroups}
                />
                <InputReactSelect
                    label={'Kans'}
                    size={'col-sm-6'}
                    name={'opportunityId'}
                    options={opportunities}
                    value={opportunityId}
                    onChangeAction={handleReactSelectChange}
                    isLoading={peekLoading.opportunities}
                />
            </div>

            <div className="row">
                <InputReactSelect
                    label={'Woningdossier'}
                    size={'col-sm-6'}
                    name={'housingFileId'}
                    options={housingFiles}
                    value={housingFileId}
                    onChangeAction={handleReactSelectChange}
                    isLoading={peekLoading.housingFiles}
                />
                <InputReactSelect
                    label={'Project'}
                    size={'col-sm-6'}
                    name={'projectId'}
                    options={projects}
                    value={projectId}
                    onChangeAction={handleReactSelectChange}
                    isLoading={peekLoading.projects}
                />
            </div>
            <div className="row">
                <InputReactSelect
                    label={'Participant project'}
                    size={'col-sm-6'}
                    name={'participantId'}
                    options={participants}
                    value={participantId}
                    onChangeAction={handleReactSelectChange}
                    isLoading={peekLoading.participants}
                />
                <InputReactSelect
                    label={'Order'}
                    size={'col-sm-6'}
                    name={'orderId'}
                    options={orders}
                    value={orderId}
                    onChangeAction={handleReactSelectChange}
                    isLoading={peekLoading.orders}
                />
            </div>

            <div className="row">
                <InputReactSelect
                    label={'Nota'}
                    size={'col-sm-6'}
                    name={'invoiceId'}
                    options={invoices}
                    value={invoiceId}
                    onChangeAction={handleReactSelectChange}
                    isLoading={peekLoading.invoices}
                />
            </div>
        </div>
    );
};

export default TaskDetailsFormGeneralEditExtraConnections;
