import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import InputText from '../../../../components/form/InputText';
import InputSelect from '../../../../components/form/InputSelect';
import InputDate from '../../../../components/form/InputDate';
import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from '../../../../components/panel/PanelFooter';

import OpportunityDetailsAPI from '../../../../api/opportunity/OpportunityDetailsAPI';

import { fetchOpportunity } from '../../../../actions/opportunity/OpportunityDetailsActions';
import InputTextArea from '../../../../components/form/InputTextArea';
import InputMultiSelect from '../../../../components/form/InputMultiSelect';
import MeasuresOfCategory from '../../../../selectors/MeasuresOfCategory';
import moment from 'moment';
import ViewText from '../../../../components/form/ViewText';
import MoneyPresenter from '../../../../helpers/MoneyPresenter';
moment.locale('nl');

class OpportunityFormEdit extends Component {
    constructor(props) {
        super(props);

        const {
            id,
            measures,
            desiredDate,
            evaluationAgreedDate,
            quotationText,
            status,
            datePlannedToSendWfEmailStatus,
            amount,
            belowWozLimit,
            exceptionDebtRelief,
            opportunityCode,
        } = props.opportunity;

        this.state = {
            status: props.status.filter(item => item.active == 1),
            yesNoOptions: [
                {
                    id: '0',
                    name: 'Nee',
                },
                {
                    id: '1',
                    name: 'Ja',
                },
            ],
            opportunity: {
                id,
                measureIds: measures && measures.map(measure => measure.id).join(','),
                measureIdsSelected: measures ? measures : [],
                statusId: status ? status.id : '',
                statusUsesWf: status ? status.usesWf : false,
                datePlannedToSendWfEmailStatus: datePlannedToSendWfEmailStatus
                    ? moment(datePlannedToSendWfEmailStatus).format('L')
                    : '',
                quotationText: quotationText,
                evaluationAgreedDate: evaluationAgreedDate ? evaluationAgreedDate : '',
                desiredDate: desiredDate ? desiredDate : '',
                amount: amount ? amount : '',
                belowWozLimit: belowWozLimit,
                exceptionDebtRelief: exceptionDebtRelief,
                opportunityCode: opportunityCode ? opportunityCode : '',
                // evaluationIsRealised: props.opportunity ? props.opportunity.evaluationIsRealised : 1,
                // evaluationIsStatisfied: props.opportunity ? props.opportunity.evaluationIsStatisfied : 1,
                // evaluationWouldRecommendOrganisation: props.opportunity
                //     ? props.opportunity.evaluationWouldRecommendOrganisation
                //     : 1,
                // evaluationNote: props.opportunity ? props.opportunity.evaluationNote : '',
            },
            errors: {
                statusId: false,
                desiredDate: false,
            },
        };

        this.handleReactSelectChange = this.handleReactSelectChange.bind(this);
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            opportunity: {
                ...this.state.opportunity,
                [name]: value,
            },
        });
    };

    handleReactSelectChange(selectedOption, name) {
        this.setState({
            ...this.state,
            opportunity: {
                ...this.state.opportunity,
                [name]: selectedOption,
            },
        });
    }

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            opportunity: {
                ...this.state.opportunity,
                [name]: value,
            },
        });
    }

    handleMeasureIds = selectedOption => {
        const measureIds = selectedOption ? selectedOption.map(item => item.id).join(',') : '';
        this.setState({
            ...this.state,
            opportunity: {
                ...this.state.opportunity,
                measureIds: measureIds,
                measureIdsSelected: selectedOption,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { opportunity } = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty('' + opportunity.statusId)) {
            errors.statusId = true;
            hasErrors = true;
        } else {
            const chosenStatus = this.state.status.find(item => {
                return item.id == opportunity.statusId;
            });

            if (chosenStatus.name === 'Uitvoering') {
                if (validator.isEmpty(opportunity.desiredDate)) {
                    errors.desiredDate = true;
                    hasErrors = true;
                }
            }
        }

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
            OpportunityDetailsAPI.updateOpportunity(opportunity.id, opportunity).then(payload => {
                this.props.fetchOpportunity(opportunity.id);
                this.props.switchToView();
            });
    };

    render() {
        const {
            statusId,
            statusUsesWf,
            datePlannedToSendWfEmailStatus,
            quotationText,
            desiredDate,
            evaluationAgreedDate,
            measureIds,
            measureIdsSelected,
            amount,
            belowWozLimit,
            exceptionDebtRelief,
            opportunityCode,
        } = this.state.opportunity;
        const { intake, measureCategory } = this.props.opportunity;
        const measuresMatchToCategory = MeasuresOfCategory(this.props.measures, measureCategory.id);

        return (
            <form className="form-horizontal col-md-12" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputText label={'Contact'} name={''} value={intake && intake.contact.fullName} readOnly={true} />
                    <InputText label={'Adres'} name={''} value={intake && intake.fullAddress} readOnly={true} />
                </div>

                <div className="row">
                    <div className="form-group col-sm-6"></div>
                    <InputText
                        label={'Postcode'}
                        name={''}
                        value={intake && intake.address && intake.address.postalCode}
                        readOnly={true}
                    />
                </div>

                <div className="row">
                    <InputText
                        label={'Maatregel - categorie'}
                        name={'measureCategory'}
                        value={measureCategory ? measureCategory.name : ''}
                        readOnly={true}
                    />
                    <InputText
                        label={'Campagne'}
                        name={'campaign'}
                        value={intake && intake.campaign ? intake.campaign.name : ''}
                        readOnly={true}
                    />
                </div>

                <div className="row">
                    <InputMultiSelect
                        label={'Maatregel - specifiek'}
                        name="measureIds"
                        value={measureIdsSelected}
                        options={measuresMatchToCategory}
                        onChangeAction={this.handleMeasureIds}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={'Status'}
                        size={'col-sm-6'}
                        name={'statusId'}
                        options={this.state.status}
                        value={statusId}
                        onChangeAction={this.handleInputChange}
                        required={'required'}
                        error={this.state.errors.statusId}
                    />
                    {statusUsesWf ? (
                        <InputText
                            label={'Datum workflow email'}
                            name={'datePlannedToSendWfEmailStatus'}
                            value={datePlannedToSendWfEmailStatus}
                            onChange={() => {}}
                            readOnly={true}
                        />
                    ) : (
                        ''
                    )}
                </div>

                <div className="row">
                    <InputText
                        label="Aantal"
                        size={'col-sm-5'}
                        name={'amount'}
                        type={'number'}
                        min={'0'}
                        value={amount}
                        onChangeAction={this.handleInputChange}
                        error={this.state.errors.amount}
                        allowZero={true}
                        textToolTip={`aantal, m2 of Wattpiek`}
                    />
                    <ViewText
                        className={'col-sm-6 form-group'}
                        label="Kans code"
                        size={'col-sm-5'}
                        value={opportunityCode}
                        textToolTip={`Deze waarde kan alleen gevuld worden via de api/webhook zie handleiding API voor details`}
                    />
                </div>

                <div className="row">
                    <InputTextArea
                        label={'Toelichting op maatregel'}
                        name={'quotationText'}
                        value={quotationText}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputDate
                        label="Datum uitvoering"
                        name="desiredDate"
                        value={desiredDate}
                        onChangeAction={this.handleInputChangeDate}
                        error={this.state.errors.desiredDate}
                    />
                    <InputDate
                        label="Datum evaluatie"
                        name="evaluationAgreedDate"
                        value={evaluationAgreedDate}
                        onChangeAction={this.handleInputChangeDate}
                    />
                </div>

                {intake.campaign.subsidyPossible != false ? (
                    <>
                        <div className="row">
                            <ViewText
                                className={'form-group col-sm-6'}
                                label={'Campagne WOZ grens'}
                                value={MoneyPresenter(intake.campaign.wozLimit)}
                            />
                            <ViewText
                                className={'form-group col-sm-6'}
                                label={'WOZ waarde woningdossier'}
                                value={
                                    intake?.address?.housingFile
                                        ? MoneyPresenter(intake.address.housingFile.wozValue)
                                        : ''
                                }
                            />
                        </div>
                        <div className="row">
                            <InputSelect
                                label={'Onder WOZ grens'}
                                size={'col-sm-6'}
                                name={'belowWozLimit'}
                                options={this.state.yesNoOptions}
                                value={'' + belowWozLimit}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.belowWozLimit}
                            />
                            <InputSelect
                                label={'Uitzondering schuldhulpsanering'}
                                size={'col-sm-6'}
                                name={'exceptionDebtRelief'}
                                options={this.state.yesNoOptions}
                                value={'' + exceptionDebtRelief}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.exceptionDebtRelief}
                            />
                        </div>
                    </>
                ) : null}

                <PanelFooter>
                    <div className="pull-right btn-group" role="group">
                        <ButtonText
                            buttonClassName={'btn-default'}
                            buttonText={'Annuleren'}
                            onClickAction={this.props.switchToView}
                        />
                        <ButtonText
                            buttonText={'Opslaan'}
                            onClickAction={this.handleSubmit}
                            type={'submit'}
                            value={'Submit'}
                        />
                    </div>
                </PanelFooter>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchOpportunity: id => {
        dispatch(fetchOpportunity(id));
    },
});

const mapStateToProps = state => {
    return {
        opportunity: state.opportunityDetails,
        status: state.systemData.opportunityStatus,
        measures: state.systemData.measures,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityFormEdit);
