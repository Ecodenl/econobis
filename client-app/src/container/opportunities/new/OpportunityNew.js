import React from 'react';
import {connect} from 'react-redux';

import InputSelect from '../../../components/form/InputSelect';
import InputDate from '../../../components/form/InputDate';
import ButtonText from '../../../components/button/ButtonText';
import PanelFooter from '../../../components/panel/PanelFooter';
import InputText from "../../../components/form/InputText";
import InputTextArea from "../../../components/form/InputTextarea";

const OpportunityNew = props => {
    const { statusId, quotationText, evaluationAgreedDate, desiredDate } = props.opportunity;

    return (
        <form className="form-horizontal col-md-12" onSubmit={props.handleSubmit}>

            <div className="row">
                <InputText
                    label={"Contact"}
                    name={"contact"}
                    value={props.intake.contact ? props.intake.contact.fullName : ''}
                    readOnly={true}
                />
                <InputText
                    label={"Adres"}
                    name={"address"}
                    value={props.intake ? props.intake.fullAddress : ''}
                    readOnly={true}
                />
            </div>

            <div className="row">
                <InputText
                    label={"Maatregel - categorie"}
                    name={"measureCategory"}
                    value={props.measure.measureCategory ? props.measure.measureCategory.name : ''}
                    readOnly={true}
                />
                <InputText
                    label={"Campagne"}
                    name={"campaign"}
                    value={props.intake.campaign ? props.intake.campaign.name : ''}
                    readOnly={true}
                />
            </div>

            <div className="row">
                <InputText
                    label={"Maatregel - specifiek"}
                    name={"measure"}
                    value={props.measure ? props.measure.name : ''}
                    readOnly={true}
                />
                <InputSelect
                    label={"Status"}
                    size={"col-sm-6"}
                    name={"statusId"}
                    options={props.status}
                    value={statusId}
                    onChangeAction={props.handleInputChange}
                    required={"required"}
                    error={props.errors.statusId}

                />
            </div>

            <div className="row">
                <InputTextArea label={"Toelichting op maatregel"} name={"quotationText"} value={quotationText} onChangeAction={props.handleInputChange} />
            </div>

            <div className="row">
                <InputDate
                    label="Datum realisatie gepland"
                    name="desiredDate"
                    value={desiredDate}
                    onChangeAction={props.handleInputChangeDate}
                />
                <InputDate
                    label="Datum evaluatie akkoord"
                    name="evaluationAgreedDate"
                    value={evaluationAgreedDate}
                    onChangeAction={props.handleInputChangeDate}
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
    }
};

export default connect(mapStateToProps)(OpportunityNew);
