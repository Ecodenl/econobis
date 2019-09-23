import React from 'react';

import InputReactSelect from '../../../../components/form/InputReactSelect';

const TaskNewFormExtraConnections = ({
    task,
    campaigns,
    intakes,
    contactGroups,
    opportunities,
    housingFiles,
    projects,
    participants,
    orders,
    invoices,
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
                    multi={false}
                    isLoading={peekLoading.campaigns}
                />
                <InputReactSelect
                    label={'Intake'}
                    size={'col-sm-6'}
                    name={'intakeId'}
                    options={intakes}
                    value={intakeId}
                    onChangeAction={handleReactSelectChange}
                    multi={false}
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
                    multi={false}
                    isLoading={peekLoading.contactGroups}
                />
                <InputReactSelect
                    label={'Kans'}
                    size={'col-sm-6'}
                    name={'opportunityId'}
                    options={opportunities}
                    value={opportunityId}
                    onChangeAction={handleReactSelectChange}
                    multi={false}
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
                    multi={false}
                    isLoading={peekLoading.housingFiles}
                />
                <InputReactSelect
                    label={'Project'}
                    size={'col-sm-6'}
                    name={'projectId'}
                    options={projects}
                    value={projectId}
                    onChangeAction={handleReactSelectChange}
                    multi={false}
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
                    multi={false}
                    isLoading={peekLoading.participants}
                />
                <InputReactSelect
                    label={'Order'}
                    size={'col-sm-6'}
                    name={'orderId'}
                    options={orders}
                    value={orderId}
                    onChangeAction={handleReactSelectChange}
                    multi={false}
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
                    multi={false}
                    isLoading={peekLoading.invoices}
                />
            </div>
        </div>
    );
};

export default TaskNewFormExtraConnections;
