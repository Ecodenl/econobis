import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

moment.locale('nl');
import validator from 'validator';

import InputText from '../../../../../../components/form/InputText';
import InputDate from '../../../../../../components/form/InputDate';
import ButtonText from '../../../../../../components/button/ButtonText';
import PanelFooter from '../../../../../../components/panel/PanelFooter';

import ProjectRevenueAPI from '../../../../../../api/project/ProjectRevenueAPI';

import { fetchRevenue, getDistribution } from '../../../../../../actions/project/ProjectDetailsActions';
import Modal from '../../../../../../components/modal/Modal';
import styled from '@emotion/styled';
import ViewText from '../../../../../../components/form/ViewText';
import { hashHistory } from 'react-router';

const StyledEm = styled.em`
    font-weight: normal;
`;

class RevenueFormEdit extends Component {
    constructor(props) {
        super(props);

        const {
            id,
            confirmed,
            dateBegin,
            dateEnd,
            dateReference,
            dateConfirmed,
            kwhStart,
            kwhEnd,
            kwhStartHigh,
            kwhEndCalendarYearHigh,
            kwhEndHigh,
            kwhStartLow,
            kwhEndCalendarYearLow,
            kwhEndLow,
            revenue,
            datePayed,
            payoutKwh,
        } = props.revenue;

        this.state = {
            showModal: false,
            revenue: {
                id,
                // distributionTypeId: distributionTypeId,
                confirmed: !!confirmed,
                dateBegin: dateBegin ? moment(dateBegin).format('Y-MM-DD') : '',
                dateEnd: dateEnd ? moment(dateEnd).format('Y-MM-DD') : '',
                dateReference: dateReference ? moment(dateReference).format('Y-MM-DD') : '',
                dateConfirmed: dateConfirmed ? moment(dateConfirmed).format('Y-MM-DD') : '',
                // payoutTypeId: payoutTypeId ? payoutTypeId : '',
                kwhStart: kwhStart ? kwhStart : 0,
                kwhEnd: kwhEnd ? kwhEnd : 0,
                kwhTotal: (kwhEnd ? kwhEnd : 0) - (kwhStart ? kwhStart : 0),
                kwhStartHigh: kwhStartHigh ? kwhStartHigh : '',
                kwhEndCalendarYearHigh: kwhEndCalendarYearHigh ? kwhEndCalendarYearHigh : '',
                kwhEndHigh: kwhEndHigh ? kwhEndHigh : '',
                kwhStartLow: kwhStartLow ? kwhStartLow : '',
                kwhEndCalendarYearLow: kwhEndCalendarYearLow ? kwhEndCalendarYearLow : '',
                kwhEndLow: kwhEndLow ? kwhEndLow : '',
                revenue: revenue ? revenue : '',
                datePayed: datePayed ? moment(datePayed).format('Y-MM-DD') : '',
                // payPercentage: payPercentage ? payPercentage : '',
                // payAmount: payAmount ? payAmount : '',
                // keyAmountFirstPercentage: keyAmountFirstPercentage ? keyAmountFirstPercentage : 0,
                // payPercentageValidFromKeyAmount: payPercentageValidFromKeyAmount ? payPercentageValidFromKeyAmount : '',
                payoutKwh: payoutKwh ? parseFloat(payoutKwh).toFixed(5) : '',
            },
            errors: {
                dateBegin: false,
                dateEnd: false,
                dateReference: false,
                kwhEndCalendarYearHigh: false,
                kwhEndCalendarYearLow: false,
                kwhEndHigh: false,
                kwhEndLow: false,
            },
            errorMessage: {
                dateBegin: '',
                dateEnd: '',
                kwhEndCalendarYearHigh: '',
                kwhEndCalendarYearLow: '',
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

        this.setState({
            ...this.state,
            revenue: {
                ...this.state.revenue,
                [name]: value,
            },
        });

        setTimeout(() => {
            const kwhStart =
                (this.state.revenue.kwhStartLow ? parseFloat(this.state.revenue.kwhStartLow) : 0) +
                (this.state.revenue.kwhStartHigh ? parseFloat(this.state.revenue.kwhStartHigh) : 0);
            const kwhEnd =
                (this.state.revenue.kwhEndLow ? parseFloat(this.state.revenue.kwhEndLow) : 0) +
                (this.state.revenue.kwhEndHigh ? parseFloat(this.state.revenue.kwhEndHigh) : 0);
            const kwhTotal = kwhEnd - kwhStart;

            this.setState({
                ...this.state,
                revenue: {
                    ...this.state.revenue,
                    kwhStart,
                    kwhEnd,
                    kwhTotal,
                },
            });
        }, 200);
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

        // if (validator.isEmpty(revenue.categoryId + '')) {
        //     errors.categoryId = true;
        //     hasErrors = true;
        // }
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
        if (
            (revenue.kwhEndHigh ? parseFloat(revenue.kwhEndHigh) : 0) <
            (revenue.kwhStartHigh ? parseFloat(revenue.kwhStartHigh) : 0)
        ) {
            errors.kwhEndHigh = true;
            errorMessage.kwhEndHigh = 'Eindstand kWh hoog mag niet lager zijn dan Beginstand kWh hoog.';
            hasErrors = true;
        }
        if (
            (revenue.kwhEndLow ? parseFloat(revenue.kwhEndLow) : 0) <
            (revenue.kwhStartLow ? parseFloat(revenue.kwhStartLow) : 0)
        ) {
            errors.kwhEndLow = true;
            errorMessage.kwhEndLow = 'Eindstand kWh laag mag niet lager zijn dan Beginstand kWh laag.';
            hasErrors = true;
        }
        if (
            (revenue.kwhEndCalendarYearHigh && revenue.kwhEndCalendarYearHigh > 0) ||
            (revenue.kwhEndCalendarYearLow && revenue.kwhEndCalendarYearLow > 0)
        ) {
            if (
                (revenue.kwhEndCalendarYearHigh ? parseFloat(revenue.kwhEndCalendarYearHigh) : 0) <
                (revenue.kwhStartHigh ? parseFloat(revenue.kwhStartHigh) : 0)
            ) {
                errors.kwhEndCalendarYearHigh = true;
                errorMessage.kwhEndCalendarYearHigh =
                    'Eindstand kWh 31-12 hoog mag niet lager zijn dan Beginstand kWh hoog.';
                hasErrors = true;
            }
            if (
                (revenue.kwhEndCalendarYearHigh ? parseFloat(revenue.kwhEndCalendarYearHigh) : 0) >
                (revenue.kwhEndHigh ? parseFloat(revenue.kwhEndHigh) : 0)
            ) {
                errors.kwhEndHigh = true;
                errorMessage.kwhEndHigh = 'Eindstand kWh 31-12 hoog mag niet hoger zijn dan Beginstand kWh hoog.';
                hasErrors = true;
            }
            if (
                (revenue.kwhEndCalendarYearLow ? parseFloat(revenue.kwhEndCalendarYearLow) : 0) <
                (revenue.kwhStartLow ? parseFloat(revenue.kwhStartLow) : 0)
            ) {
                errors.kwhEndCalendarYearLow = true;
                errorMessage.kwhEndCalendarYearLow =
                    'Eindstand kWh 31-12 laag mag niet lager zijn dan Beginstand kWh laag.';
                hasErrors = true;
            }
            if (
                (revenue.kwhEndCalendarYearLow ? parseFloat(revenue.kwhEndCalendarYearLow) : 0) >
                (revenue.kwhEndLow ? parseFloat(revenue.kwhEndLow) : 0)
            ) {
                errors.kwhEndLow = true;
                errorMessage.kwhEndLow = 'Eindstand kWh 31-12 laag mag niet hoger zijn dan Eindstand kWh laag.';
                hasErrors = true;
            }
        }

        revenue.payoutKwh = revenue.payoutKwh ? parseFloat(revenue.payoutKwh).toFixed(5) : '';

        this.setState({ ...this.state, errors: errors, errorMessage: errorMessage });

        if (!hasErrors) {
            this.setState({ isSaving: true });
            ProjectRevenueAPI.updateProjectRevenue(revenue.id, revenue)
                .then(payload => {
                    this.props.fetchRevenue(revenue.id);

                    setTimeout(() => {
                        this.props.getDistribution(revenue.id, 0);
                    }, 250);
                    this.setState({ isSaving: true });
                    this.props.switchToView();
                })
                .catch(error => {
                    console.log(error);
                    alert(
                        'Er is iets misgegaan bij opslaan. Probeer nogmaals een nieuwe opbrengstverdeling te maken vanuit het project.'
                    );
                    hashHistory.goBack();
                });
        }
    };

    render() {
        const {
            confirmed,
            dateBegin,
            dateEnd,
            dateConfirmed,
            kwhStart,
            kwhEnd,
            kwhTotal,
            kwhStartHigh,
            kwhEndCalendarYearHigh,
            kwhEndHigh,
            kwhStartLow,
            kwhEndCalendarYearLow,
            kwhEndLow,
            payoutKwh,
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

                <div className="row">
                    <InputDate label={'Begin periode'} name={'dateBegin'} value={dateBegin} readOnly={true} />
                    <InputDate label={'Eind periode'} name={'dateEnd'} value={dateEnd} readOnly={true} />
                </div>

                <div className="row">
                    <InputDate
                        label={'Datum definitief'}
                        name={'dateConfirmed'}
                        value={dateConfirmed}
                        onChangeAction={this.handleInputChangeDateConfirmed}
                    />
                </div>

                <React.Fragment>
                    <div className="row">
                        <div className={'panel-part panel-heading'}>
                            <span className={'h5 text-bold'}>Opbrengst kWh</span>
                        </div>
                    </div>

                    {moment(dateBegin).year() !== moment(dateEnd).year() ? (
                        <>
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
                            </div>
                            <div className="row">
                                <InputText
                                    type={'number'}
                                    label={'Eindstand kWh op 31-12 hoog'}
                                    name={'kwhEndCalendarYearHigh'}
                                    value={kwhEndCalendarYearHigh}
                                    onChangeAction={this.handleInputChange}
                                    error={this.state.errors.kwhEndCalendarYearHigh}
                                    errorMessage={this.state.errorMessage.kwhEndCalendarYearHigh}
                                />
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
                                <InputText
                                    type={'number'}
                                    label={'Eindstand kWh op 31-12 laag'}
                                    name={'kwhEndCalendarYearLow'}
                                    value={kwhEndCalendarYearLow}
                                    onChangeAction={this.handleInputChange}
                                    error={this.state.errors.kwhEndCalendarYearLow}
                                    errorMessage={this.state.errorMessage.kwhEndCalendarYearLow}
                                />
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
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
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
                            // value={payoutKwh}
                            value={
                                payoutKwh &&
                                payoutKwh.toLocaleString('nl', {
                                    minimumFractionDigits: 3,
                                    maximumFractionDigits: 5,
                                })
                            }
                            onChangeAction={this.handleInputChange}
                        />
                        <InputText
                            type={'number'}
                            label={'Totaal productie kWh'}
                            name={'kwhTotal'}
                            value={kwhTotal}
                            readOnly={true}
                        />
                    </div>
                </React.Fragment>

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
                            Als je deze datum invult, zal de opbrengst definitief worden gemaakt. Je kunt deze hierna
                            niet meer aanpassen.
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

export default connect(mapStateToProps, mapDispatchToProps)(RevenueFormEdit);
