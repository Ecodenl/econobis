import React from 'react';
import {connect} from 'react-redux';

import InputSelect from '../../../components/form/InputSelect';
import InputDate from '../../../components/form/InputDate';
import InputTinyMCE from '../../../components/form/InputTinyMCE';
import ButtonText from '../../../components/button/ButtonText';
import PanelFooter from '../../../components/panel/PanelFooter';
import InputReactSelect from "../../../components/form/InputReactSelect";

const OpportunityFormEdit = props => {
    const { contactId, desiredDate, measureId, quotationText, reactionId, statusId, ownedById, registrationId, campaignId } = props.opportunity;

    return (
        <form className="form-horizontal col-md-12" onSubmit={props.handleSubmit}>

            <div className="row">
                <InputSelect
                    label={"Type kans"}
                    size={"col-sm-6"}
                    name={"measureId"}
                    value={measureId}
                    options={props.measures}
                    onChangeAction={props.handleInputChange}
                    required={"required"}
                    error={props.errors.measure}
                />
            </div>

            <div className="row">
                <InputReactSelect
                    label={"Contact"}
                    name={"contactId"}
                    value={contactId}
                    options={props.contacts}
                    onChangeAction={props.handleReactSelectChange}
                    optionName={'fullName'}
                    required={"required"}
                    error={props.errors.contact}
                    multi={false}
                />
                <InputSelect
                    label={"Reactie"}
                    size={"col-sm-6"}
                    name={"reactionId"}
                    value={reactionId}
                    options={props.reactions}
                    onChangeAction={props.handleInputChange}
                />
            </div>

            <div className="row">
                <InputReactSelect
                    label={"Aanmelding"}
                    name={"registrationId"}
                    value={registrationId}
                    options={props.registrations}
                    onChangeAction={props.handleReactSelectChange}
                    multi={false}
                />
                <InputSelect
                    label={"Status"}
                    size={"col-sm-6"}
                    name={"statusId"}
                    value={statusId}
                    options={props.status}
                    onChangeAction={props.handleInputChange}
                    required={"required"}
                    error={props.errors.status}
                />
            </div>

            <div className="row">
                <InputReactSelect
                    label={"Campagne"}
                    name={"campaignId"}
                    value={campaignId}
                    options={props.campaigns}
                    onChangeAction={props.handleReactSelectChange}
                    multi={false}
                />
            </div>

            <div className="row">
                <div className="form-group col-sm-12">
                    <div className="row">
                        <InputTinyMCE
                            label={"Offerte tekst"}
                            value={quotationText}
                            onChangeAction={props.handleEditorChange}
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <InputDate
                    label={"Gewenste realisatie"}
                    size={"col-sm-6"}
                    name={"desiredDate"}
                    value={desiredDate}
                    onChangeAction={props.handleChangeDesiredDate}
                />
                <InputSelect
                    label={"Verantwoordelijke"}
                    size={"col-sm-6"}
                    name={"ownedById"}
                    value={ownedById}
                    options={props.users}
                    onChangeAction={props.handleInputChange}
                    optionName={'fullName'}
                />
            </div>

            <PanelFooter>
                <div className="pull-right btn-group" role="group">
                    <ButtonText buttonText={"Opslaan"} onClickAction={props.handleSubmit} type={"submit"}
                                value={"Submit"}/>
                </div>
            </PanelFooter>
        </form>
    );
};

const mapStateToProps = (state) => {
    return {
        status: state.systemData.opportunityStatus,
        reactions: state.systemData.opportunityReactions,
        measures: state.systemData.measures,
        campaigns: state.systemData.campaigns,
    }
};

export default connect(mapStateToProps)(OpportunityFormEdit);
