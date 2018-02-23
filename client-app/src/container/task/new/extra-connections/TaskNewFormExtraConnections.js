import React from 'react';

import InputReactSelect from "../../../../components/form/InputReactSelect";

const TaskNewFormExtraConnections = ({task, campaigns, intakes, contactGroups, opportunities, housingFiles, handleReactSelectChange, peekLoading}) => {
    const {
        intakeId,
        contactGroupId,
        opportunityId,
        campaignId,
        housingFileId,
    } = task;

    return (
        <div>
            <div className="row">
                <InputReactSelect
                    label={"Campagne"}
                    name={"campaignId"}
                    options={campaigns}
                    value={campaignId}
                    onChangeAction={handleReactSelectChange}
                    multi={false}
                    isLoading={peekLoading.campaigns}
                />
                <InputReactSelect
                    label={"Intake"}
                    size={"col-sm-6"}
                    name={"intakeId"}
                    options={intakes}
                    value={intakeId}
                    onChangeAction={handleReactSelectChange}
                    multi={false}
                    isLoading={peekLoading.intakes}
                />
            </div>

            <div className="row">
                <InputReactSelect
                    label={"Groep"}
                    size={"col-sm-6"}
                    name={"contactGroupId"}
                    options={contactGroups}
                    value={contactGroupId}
                    onChangeAction={handleReactSelectChange}
                    multi={false}
                    isLoading={peekLoading.contactGroups}
                />
                <InputReactSelect
                    label={"Kans"}
                    size={"col-sm-6"}
                    name={"opportunityId"}
                    options={opportunities}
                    value={opportunityId}
                    onChangeAction={handleReactSelectChange}
                    multi={false}
                    isLoading={peekLoading.opportunities}
                />
            </div>
            <div className="row">
                <InputReactSelect
                    label={"Woningdossier"}
                    size={"col-sm-6"}
                    name={"housingFileId"}
                    options={housingFiles}
                    value={housingFileId}
                    onChangeAction={handleReactSelectChange}
                    multi={false}
                    isLoading={peekLoading.housingFiles}
                />
            </div>
        </div>
    )
};

export default TaskNewFormExtraConnections;