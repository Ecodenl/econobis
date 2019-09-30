import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

moment.locale('nl');
import validator from 'validator';

import InputText from '../../../../../../components/form/InputText';
import InputSelect from '../../../../../../components/form/InputSelect';
import InputDate from '../../../../../../components/form/InputDate';
import ButtonText from '../../../../../../components/button/ButtonText';
import PanelFooter from '../../../../../../components/panel/PanelFooter';

import ProjectRevenueAPI from '../../../../../../api/project/ProjectRevenueAPI';

import { fetchRevenue, getDistribution } from '../../../../../../actions/project/ProjectDetailsActions';
import Modal from '../../../../../../components/modal/Modal';
import styled from '@emotion/styled';
import ViewText from '../../../../../../components/form/ViewText';

const StyledEm = styled.em`
    font-weight: normal;
`;

class RevenueFormEdit extends Component {
    constructor(props) {
        super(props);

        const {
            id,
            distributionTypeId,
            confirmed,
            dateBegin,
            dateEnd,
            dateReference,
            dateConfirmed,
            payoutTypeId,
            kwhStart,
            kwhEnd,
            kwhStartHigh,
            kwhEndHigh,
            kwhStartLow,
            kwhEndLow,
            revenue,
            datePayed,
            payPercentage,
            keyAmountFirstPercentage,
            payPercentageValidFromKeyAmount,
            payoutKwh,
        } = props.revenue;

        this.state = {
            showModal: false,
            revenue: {
                id,
                distributionTypeId: distributionTypeId,
                confirmed: !!confirmed,
                dateBegin: dateBegin ? moment(dateBegin.date).format('Y-MM-DD') : '',
                dateEnd: dateEnd ? moment(dateEnd.date).format('Y-MM-DD') : '',
                dateReference: dateReference ? moment(dateReference.date).format('Y-MM-DD') : '',
                dateConfirmed: dateConfirmed ? moment(dateConfirmed.date).format('Y-MM-DD') : '',
                payoutTypeId: payoutTypeId ? payoutTypeId : '',
                kwhStart: kwhStart ? kwhStart : 0,
                kwhEnd: kwhEnd ? kwhEnd : 0,
                kwhStartHigh: kwhStartHigh ? kwhStartHigh : '',
                kwhEndHigh: kwhEndHigh ? kwhEndHigh : '',
                kwhStartLow: kwhStartLow ? kwhStartLow : '',
                kwhEndLow: kwhEndLow ? kwhEndLow : '',
                revenue: revenue ? revenue : '',
                datePayed: datePayed ? moment(datePayed.date).format('Y-MM-DD') : '',
                payPercentage: payPercentage ? payPercentage : '',
                keyAmountFirstPercentage: keyAmountFirstPercentage ? keyAmountFirstPercentage : 0,
                payPercentageValidFromKeyAmount: payPercentageValidFromKeyAmount ? payPercentageValidFromKeyAmount : '',
                payoutKwh: payoutKwh ? parseFloat(payoutKwh).toFixed(3) : '',
            },
            errors: {
                categoryId: false,
                dateBegin: false,
                dateEnd: false,
                dateReference: false,
                payoutTypeId: false,
                kwhEndHigh: false,
                kwhEndLow: false,
            },
            errorMessage: {
                payoutTypeId: '',
                dateBegin: '',
                dateEnd: '',
                kwhEndHigh: '',
                kwhEndLow: '',
            },
            isSaving: false,
        };
    }

    toggleShowModal = () => {
        this.setState({
            showModal: !this.state.showModal,
        });
    };

    cancelSetDate = () => {
        this.setState({
            ...this.state,
            revenue: {
                ...this.state.revenue,
                dateConfirmed: '',
                confirmed: false,
            },
        });

        this.setState({
            showModal: !this.state.showModal,
        });
    };

    handleInputChange = event => {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState(
            {
                ...this.state,
                revenue: {
                    ...this.state.revenue,
                    [name]: value,
                },
            },
            () => this.linkedValueAdjustment(name)
        );

        setTimeout(() => {
            const kwhStart =
                (this.state.revenue.kwhStartLow ? parseFloat(this.state.revenue.kwhStartLow) : 0) +
                (this.state.revenue.kwhStartHigh ? parseFloat(this.state.revenue.kwhStartHigh) : 0);
            const kwhEnd =
                (this.state.revenue.kwhEndLow ? parseFloat(this.state.revenue.kwhEndLow) : 0) +
                (this.state.revenue.kwhEndHigh ? parseFloat(this.state.revenue.kwhEndHigh) : 0);

            this.setState({
                ...this.state,
                revenue: {
                    ...this.state.revenue,
                    kwhStart,
                    kwhEnd,
                },
            });
        }, 200);
    };

    linkedValueAdjustment = name => {
        if (name === 'keyAmountFirstPercentage') {
            if (!this.state.revenue.keyAmountFirstPercentage || this.state.revenue.keyAmountFirstPercentage == 0)
                this.setState({
                    ...this.state,
                    revenue: {
                        ...this.state.revenue,
                        payPercentageValidFromKeyAmount: '',
                    },
                });
        }
    };

    handleInputChangeDate = (value, name) => {
        this.setState({
            ...this.state,
            revenue: {
                ...this.state.revenue,
                [name]: value,
            },
        });
    };

    handleInputChangeDateConfirmed = (value, name) => {
        if (value) {
            this.setState({
                ...this.state,
                revenue: {
                    ...this.state.revenue,
                    [name]: value,
                    confirmed: true,
                },
            });
            this.toggleShowModal();
        } else {
            this.setState({
                ...this.state,
                revenue: {
                    ...this.state.revenue,
                    [name]: value,
                    confirmed: false,
                },
            });
        }
    };

    handleSubmit = event => {
        event.preventDefault();

        const { revenue } = this.state;

        let errors = {};
        let errorMessage = {};
        let hasErrors = false;

        if (validator.isEmpty(revenue.categoryId + '')) {
            errors.categoryId = true;
            hasErrors = true;
        }
        if (validator.isEmpty(revenue.dateBegin + '')) {
            errors.dateBegin = true;
            errorMessage.dateBegin = 'Verplicht';
            hasErrors = true;
        }
        if (validator.isEmpty(revenue.dateEnd + '')) {
            errors.dateEnd = true;
            errorMessage.dateEnd = 'Verplicht';
            hasErrors = true;
        }
        if (!hasErrors && revenue.dateEnd < revenue.dateBegin) {
            errors.dateEnd = true;
            errorMessage.dateEnd = 'Eind periode mag niet voor Begin periode liggen.';
            hasErrors = true;
        }
        if (!hasErrors && moment(revenue.dateBegin).year() !== moment(revenue.dateEnd).year()) {
            errors.dateBegin = true;
            errorMessage.dateBegin = 'Jaaroverschrijdende perioden niet toegestaan.';
            errors.dateEnd = true;
            errorMessage.dateEnd = 'Jaaroverschrijdende perioden niet toegestaan.';
            hasErrors = true;
        }

        if (revenue.distributionTypeId === 'inPossessionOf') {
            if (validator.isEmpty(revenue.dateReference + '')) {
                errors.dateReference = true;
                hasErrors = true;
            }
        }

        if (this.props.revenue.category.codeRef === 'revenueKwh') {
            if (revenue.kwhEndHigh < revenue.kwhStartHigh) {
                errors.kwhEndHigh = true;
                errorMessage.kwhEndHigh = 'Eindstand kWh hoog mag niet lager zijn dan Beginstand kWh hoog.';
                hasErrors = true;
            }
            if (revenue.kwhEndLow < revenue.kwhStartLow) {
                errors.kwhEndLow = true;
                errorMessage.kwhEndLow = 'Eindstand kWh laag mag niet lager zijn dan Beginstand kWh laag.';
                hasErrors = true;
            }
        }

        if (
            this.props.revenue.category.codeRef === 'revenueEuro' &&
            (this.props.revenue.project.projectType.codeRef === 'capital' ||
                this.props.revenue.project.projectType.codeRef === 'postalcode_link_capital')
        ) {
            if (validator.isEmpty(revenue.payoutTypeId + '')) {
                errors.payoutTypeId = true;
                hasErrors = true;
            }
            const accountPayoutTypeId = this.props.participantProjectPayoutTypes.find(
                participantProjectPayoutType => participantProjectPayoutType.codeRef === 'account'
            ).id;

            if (revenue.revenue < 0 && revenue.payoutTypeId == accountPayoutTypeId) {
                errors.payoutTypeId = true;
                errorMessage.payoutTypeId =
                    'Als je een negatief resultaat wilt verdelen dan kan dat niet uitgekeerd worden op een rekening. Kies voor bijschrijven.';
                hasErrors = true;
            }
        }

        this.setState({ ...this.state, errors: errors, errorMessage: errorMessage });

        if (!hasErrors) {
            this.setState({ isSaving: true });
            ProjectRevenueAPI.updateProjectRevenue(revenue.id, revenue).then(payload => {
                this.props.fetchRevenue(revenue.id);

                setTimeout(() => {
                    this.props.getDistribution(revenue.id, 0);
                }, 250);
                this.setState({ isSaving: true });
                this.props.switchToView();
            });
        }
    };

    render() {
        const {
            distributionTypeId,
            confirmed,
            dateBegin,
            dateEnd,
            dateReference,
            dateConfirmed,
            kwhStart,
            kwhEnd,
            kwhStartHigh,
            kwhEndHigh,
            kwhStartLow,
            kwhEndLow,
            revenue,
            datePayed,
            payPercentage,
            keyAmountFirstPercentage,
            payPercentageValidFromKeyAmount,
            typeId,
            payoutKwh,
            payoutTypeId,
        } = this.state.revenue;

        const project = this.props.revenue.project;
        const { category } = this.props.revenue;
        let projectTypeCodeRef = '';
        if (project && project.projectType && project.projectType.codeRef) {
            projectTypeCodeRef = project.projectType.codeRef;
        }

        return (
            <form className="form-horizontal col-md-12" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className={'panel-heading'}>
                        <span className={'h5 text-bold'}>Algemene informatie</span>
                    </div>
                </div>
                <div className="row">
                    <ViewText label={'Soort'} value={category ? category.name : ''} className={'form-group col-sm-6'} />
                    <ViewText label={'Definitief'} value={confirmed ? 'Ja' : 'Nee'} className={'form-group col-sm-6'} />
                </div>

                {category.codeRef === 'revenueEuro' ? (
                    <div className="row">
                        {projectTypeCodeRef === 'obligation' ? (
                            <InputSelect
                                label={'Type opbrengst verdeling'}
                                name={'distributionTypeId'}
                                options={this.props.projectRevenueDistributionTypes}
                                value={distributionTypeId}
                                onChangeAction={this.handleInputChange}
                            />
                        ) : null}
                        {distributionTypeId === 'inPossessionOf' ? (
                            <InputDate
                                label={'Peildatum'}
                                name={'dateReference'}
                                value={dateReference}
                                onChangeAction={this.handleInputChangeDate}
                                required={'required'}
                                error={this.state.errors.dateReference}
                            />
                        ) : null}
                    </div>
                ) : null}

                {category.codeRef === 'redemptionEuro' ? (
                    <div className="row">
                        {distributionTypeId === 'inPossessionOf' ? (
                            <InputDate
                                label={'Peildatum'}
                                name={'dateReference'}
                                value={dateReference}
                                onChangeAction={this.handleInputChangeDate}
                                required={'required'}
                                error={this.state.errors.dateReference}
                            />
                        ) : null}
                    </div>
                ) : null}

                <div className="row">
                    <InputDate
                        label={'Begin periode'}
                        name={'dateBegin'}
                        value={dateBegin}
                        onChangeAction={this.handleInputChangeDate}
                        required={'required'}
                        error={this.state.errors.dateBegin}
                        errorMessage={this.state.errorMessage.dateBegin}
                        disabledBefore={
                            category.codeRef === 'revenueEuro' &&
                            (projectTypeCodeRef === 'loan' || projectTypeCodeRef === 'obligation')
                                ? project.dateInterestBearing
                                : category.codeRef === 'redemptionEuro'
                                ? project.dateInterestBearingRedemption
                                : category.codeRef === 'revenueKwh'
                                ? project.dateInterestBearingKwh
                                : ''
                        }
                    />
                    <InputDate
                        label={'Eind periode'}
                        name={'dateEnd'}
                        value={dateEnd}
                        onChangeAction={this.handleInputChangeDate}
                        required={'required'}
                        error={this.state.errors.dateEnd}
                        errorMessage={this.state.errorMessage.dateEnd}
                        disabledBefore={dateBegin}
                        disabledAfter={moment(dateBegin)
                            .endOf('year')
                            .format('Y-MM-DD')}
                    />
                </div>

                <div className="row">
                    <InputDate
                        label={'Datum definitief'}
                        name={'dateConfirmed'}
                        value={dateConfirmed}
                        onChangeAction={this.handleInputChangeDateConfirmed}
                    />
                    {category.codeRef === 'revenueEuro' &&
                    (projectTypeCodeRef === 'capital' || projectTypeCodeRef === 'postalcode_link_capital') ? (
                        <InputSelect
                            label={'Uitkeren op'}
                            name={'payoutTypeId'}
                            id={'payoutTypeId'}
                            options={this.props.participantProjectPayoutTypes}
                            value={payoutTypeId}
                            onChangeAction={this.handleInputChange}
                            required={'required'}
                            error={this.state.errors.payoutTypeId}
                            errorMessage={this.state.errorMessage.payoutTypeId}
                        />
                    ) : null}
                </div>

                {category.codeRef === 'revenueKwh' ? (
                    <React.Fragment>
                        <div className="row">
                            <div className={'panel-part panel-heading'}>
                                <span className={'h5 text-bold'}>Opbrengst kWh</span>
                            </div>
                        </div>

                        <div className="row">
                            {this.props.revenue.project.kwhStartHighNextRevenue > 0 ? (
                                <InputText
                                    type={'number'}
                                    label={'Beginstand kWh hoog'}
                                    name={'kwhStartHigh'}
                                    value={kwhStartHigh}
                                    readOnly={true}
                                />
                            ) : (
                                <InputText
                                    type={'number'}
                                    label={'Beginstand kWh hoog'}
                                    name={'kwhStartHigh'}
                                    value={kwhStartHigh}
                                    onChangeAction={this.handleInputChange}
                                />
                            )}
                            <InputText
                                type={'number'}
                                label={'Eindstand kWh hoog'}
                                name={'kwhEndHigh'}
                                value={kwhEndHigh}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.kwhEndHigh}
                                errorMessage={this.state.errorMessage.kwhEndHigh}
                            />
                        </div>

                        <div className="row">
                            {this.props.revenue.project.kwhStartLowNextRevenue > 0 ? (
                                <InputText
                                    type={'number'}
                                    label={'Beginstand kWh laag'}
                                    name={'kwhStartLow'}
                                    value={kwhStartLow}
                                    readOnly={true}
                                />
                            ) : (
                                <InputText
                                    type={'number'}
                                    label={'Beginstand kWh laag'}
                                    name={'kwhStartLow'}
                                    value={kwhStartLow}
                                    onChangeAction={this.handleInputChange}
                                />
                            )}
                            <InputText
                                type={'number'}
                                label={'Eindstand kWh laag'}
                                name={'kwhEndLow'}
                                value={kwhEndLow}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.kwhEndLow}
                                errorMessage={this.state.errorMessage.kwhEndLow}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                type={'number'}
                                label={'Beginstand kWh'}
                                name={'kwhStart'}
                                value={kwhStart}
                                readOnly={true}
                            />
                            <InputText
                                type={'number'}
                                label={'Eindstand kWh'}
                                name={'kwhEnd'}
                                value={kwhEnd}
                                readOnly={true}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                type={'number'}
                                label={'Opbrengst kWh €'}
                                name={'payoutKwh'}
                                value={payoutKwh}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>
                    </React.Fragment>
                ) : null}

                {category.codeRef === 'revenueEuro' ? (
                    <React.Fragment>
                        <div className="row">
                            <div className={'panel-part panel-heading'}>
                                <span className={'h5 text-bold'}>Opbrengst euro</span>
                            </div>
                        </div>
                        {projectTypeCodeRef === 'loan' || projectTypeCodeRef === 'obligation' ? (
                            <React.Fragment>
                                <div className="row">
                                    <InputText
                                        type={'number'}
                                        label={'Uitkering %'}
                                        name={'payPercentage'}
                                        value={payPercentage}
                                        onChangeAction={this.handleInputChange}
                                    />
                                    <InputText
                                        label={
                                            <React.Fragment>
                                                Bedrag <StyledEm>(uitkering % geldig tot en met)</StyledEm>
                                            </React.Fragment>
                                        }
                                        name={'keyAmountFirstPercentage'}
                                        value={keyAmountFirstPercentage}
                                        onChangeAction={this.handleInputChange}
                                    />
                                </div>
                                {this.state.revenue.keyAmountFirstPercentage ? (
                                    <div className="row">
                                        <InputText
                                            type={'number'}
                                            label={<React.Fragment>Uitkering % vanaf bedrag</React.Fragment>}
                                            name={'payPercentageValidFromKeyAmount'}
                                            value={payPercentageValidFromKeyAmount}
                                            onChangeAction={this.handleInputChange}
                                        />
                                    </div>
                                ) : null}
                            </React.Fragment>
                        ) : null}
                        {projectTypeCodeRef === 'capital' || projectTypeCodeRef === 'postalcode_link_capital' ? (
                            <React.Fragment>
                                <div className="row">
                                    <InputText
                                        type={'number'}
                                        label={'Resultaat'}
                                        name={'revenue'}
                                        value={revenue}
                                        onChangeAction={this.handleInputChange}
                                    />
                                </div>
                            </React.Fragment>
                        ) : null}
                    </React.Fragment>
                ) : null}

                {category.codeRef === 'redemptionEuro' ? (
                    <React.Fragment>
                        <div className="row">
                            <div className={'panel-part panel-heading'}>
                                <span className={'h5 text-bold'}>Aflossing euro</span>
                            </div>
                        </div>
                        {projectTypeCodeRef === 'loan' || projectTypeCodeRef === 'obligation' ? (
                            <React.Fragment>
                                <div className="row">
                                    <InputText
                                        type={'number'}
                                        label={'Aflossing %'}
                                        name={'payPercentage'}
                                        value={payPercentage}
                                        onChangeAction={this.handleInputChange}
                                    />
                                </div>
                            </React.Fragment>
                        ) : null}
                    </React.Fragment>
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
                            loading={this.state.isSaving}
                        />
                    </div>
                </PanelFooter>

                {this.state.showModal && (
                    <Modal
                        buttonConfirmText="Bevestigen"
                        closeModal={this.cancelSetDate}
                        confirmAction={this.toggleShowModal}
                        title="Bevestigen"
                    >
                        <p>
                            {this.props.revenue.category.codeRef === 'redemptionEuro'
                                ? 'Als je deze datum invult, zal de aflossing definitief worden gemaakt. Je kunt deze hierna niet meer aanpassen.'
                                : 'Als je deze datum invult, zal de opbrengst definitief worden gemaakt. Je kunt deze hierna niet meer aanpassen.'}
                        </p>
                    </Modal>
                )}
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchRevenue: id => {
        dispatch(fetchRevenue(id));
    },
    getParticipants: (id, page) => {
        dispatch(getParticipants({ id, page }));
    },
    getDistribution: (id, page) => {
        dispatch(getDistribution({ id, page }));
    },
});

const mapStateToProps = state => {
    return {
        revenue: state.projectRevenue,
        projectRevenueDistributionTypes: state.systemData.projectRevenueDistributionTypes,
        participantProjectPayoutTypes: state.systemData.participantProjectPayoutTypes,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RevenueFormEdit);
