import React, { Component } from 'react';
import validator from 'validator';
import { hashHistory } from 'react-router';

import RevenueNewToolbar from './RevenueNewToolbar';
import RevenueNewForm from './RevenueNewForm';
import ProjectRevenueAPI from '../../../../../api/project/ProjectRevenueAPI';
import ParticipantProjectDetailsAPI from '../../../../../api/participant-project/ParticipantProjectDetailsAPI';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import moment from 'moment';
import { connect } from 'react-redux';
import axios from 'axios';

class RevenueNewApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            revenue: {
                projectId: props.params.projectId,
                participationId: props.params.participationId,
                categoryId: props.params.categoryId,
                distributionTypeId: '',
                confirmed: false,
                dateBegin: '',
                dateEnd: '',
                dateReference: moment(),
                dateConfirmed: '',
                payoutTypeId: '',
                kwhStart: 0,
                kwhEnd: 0,
                kwhTotal: 0,
                kwhStartHigh: '',
                kwhEndCalendarYearHigh: '',
                kwhEndHigh: '',
                kwhStartLow: '',
                kwhEndCalendarYearLow: '',
                kwhEndLow: '',
                revenue: '',
                datePayed: '',
                payPercentage: '',
                payAmount: '',
                keyAmountFirstPercentage: '',
                payPercentageValidFromKeyAmount: '',
                payoutKwh: '',
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
            project: {},
            participation: {},
            isLoading: false,
        };
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
        this.handleInputChangeDateConfirmed = this.handleInputChangeDateConfirmed.bind(this);
    }

    componentDidMount() {
        axios.all([ParticipantProjectDetailsAPI.fetchParticipantProject(this.props.params.participationId)]).then(
            axios.spread(participation => {
                const revenue = this.state.revenue;
                if (participation) {
                    if (
                        participation.address &&
                        participation.address.previousAddressEnergySupplierId != 0 &&
                        participation.address.primaryAddressEnergySupplier &&
                        participation.address.primaryAddressEnergySupplier.memberSince
                    ) {
                        const dateSplit = moment(participation.address.primaryAddressEnergySupplier.memberSince)
                            .subtract(1, 'day')
                            .format('Y-MM-DD');
                        let dateBegin =
                            participation.dateBeginNextRevenueKwh !== null
                                ? participation.dateBeginNextRevenueKwh
                                : moment(dateSplit)
                                      .startOf('year')
                                      .format('Y-MM-DD');
                        if (dateBegin > dateSplit) {
                            alert('Overstapdatum leverancier kon niet bepaald worden bij contact/adres.');
                            hashHistory.replace(`/project/deelnemer/${this.props.params.participationId}`);
                        }

                        revenue.distributionTypeId = 'inPossessionOf';
                        revenue.addressEnergySupplierId = participation.address.previousAddressEnergySupplierId;
                        revenue.dateBegin = dateBegin;
                        revenue.dateEnd = dateSplit;
                        revenue.kwhStartHigh = participation.nextRevenueKwhStartHigh;
                        revenue.kwhStartLow = participation.nextRevenueKwhStartLow;

                        this.setState({
                            ...this.state,
                            participation: participation,
                            revenue,
                        });
                    } else {
                        alert('Overgang leverancier kon niet bepaald worden bij contact/adres.');
                        hashHistory.replace(`/project/deelnemer/${this.props.params.participationId}`);
                    }
                }
            })
        );
    }

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

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            revenue: {
                ...this.state.revenue,
                [name]: value,
            },
        });
    }

    handleInputChangeDateConfirmed(value, name) {
        if (value) {
            this.setState({
                ...this.state,
                revenue: {
                    ...this.state.revenue,
                    [name]: value,
                    confirmed: true,
                },
            });
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
    }

    isPeriodExceedingYear = (dateBegin, dateEnd) => {
        dateBegin = moment(dateBegin);
        dateEnd = moment(dateEnd);

        return dateEnd.year() > dateBegin.year();
    };

    handleSubmit = event => {
        event.preventDefault();

        const { revenue } = this.state;

        let errors = {};
        let errorMessage = {};
        let hasErrors = false;

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
        if (!revenue.kwhEndCalendarYearHigh && this.isPeriodExceedingYear(revenue.dateBegin, revenue.dateEnd)) {
            errors.kwhEndCalendarYearHigh = true;
            errorMessage.kwhEndCalendarYearHigh = 'Verplicht';
            hasErrors = true;
        }
        if (!revenue.kwhEndHigh && this.isPeriodExceedingYear(revenue.dateBegin, revenue.dateEnd)) {
            errors.kwhEndHigh = true;
            errorMessage.kwhEndHigh = 'Verplicht';
            hasErrors = true;
        }
        if (!revenue.payoutKwh) {
            errors.payoutKwh = true;
            errorMessage.payoutKwh = 'Verplicht';
            hasErrors = true;
        }
        if (!revenue.dateBegin && revenue.dateEnd) {
            errors.dateBegin = true;
            errorMessage.dateBegin = 'Begin periode moet ook ingevuld worden als Eind periode ingevuld is.';
            hasErrors = true;
        }
        if (revenue.dateBegin && !revenue.dateEnd) {
            errors.dateEnd = true;
            errorMessage.dateEnd = 'Eind periode moet ook ingevuld worden als Begin periode ingevuld is.';
            hasErrors = true;
        }

        if (!hasErrors && revenue.dateEnd < revenue.dateBegin) {
            errors.dateEnd = true;
            errorMessage.dateEnd = 'Eind periode mag niet voor Begin periode liggen.';
            hasErrors = true;
        }
        if (parseFloat(revenue.kwhEndHigh) < parseFloat(revenue.kwhStartHigh)) {
            errors.kwhEndHigh = true;
            errorMessage.kwhEndHigh = 'Eindstand kWh hoog mag niet lager zijn dan Beginstand kWh hoog.';
            hasErrors = true;
        }
        if (parseFloat(revenue.kwhEndLow) < parseFloat(revenue.kwhStartLow)) {
            errors.kwhEndLow = true;
            errorMessage.kwhEndLow = 'Eindstand kWh laag mag niet lager zijn dan Beginstand kWh laag.';
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
        if (moment(revenue.dateBegin).year() !== moment(revenue.dateEnd).year()) {
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
        } else {
            revenue.kwhEndCalendarYearHigh = null;
            revenue.kwhEndCalendarYearLow = null;
        }

        revenue.payoutKwh = revenue.payoutKwh ? parseFloat(revenue.payoutKwh).toFixed(5) : '';

        this.setState({ ...this.state, errors: errors, errorMessage: errorMessage });

        if (!hasErrors) {
            this.setState({ isLoading: true });

            ProjectRevenueAPI.storeProjectRevenue(revenue)
                .then(payload => {
                    this.setState({ isLoading: false });
                    // Delete path new-project-revenue in history, so when go back the page goes to the project details
                    hashHistory.replace(`/project/deelnemer/${this.props.params.participationId}`);
                    // Push to new revenue
                    hashHistory.push(`/project/deelnemer/opbrengst/${payload.data.data.id}`);
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
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <RevenueNewToolbar
                            participationName={this.state.participation ? this.state.participation.name : ''}
                        />
                    </div>

                    <div className="col-md-12">
                        <Panel>
                            <PanelBody>
                                <div className="col-md-12">
                                    <RevenueNewForm
                                        revenue={this.state.revenue}
                                        errors={this.state.errors}
                                        errorMessage={this.state.errorMessage}
                                        handleInputChange={this.handleInputChange}
                                        handleInputChangeDate={this.handleInputChangeDate}
                                        handleInputChangeDateConfirmed={this.handleInputChangeDateConfirmed}
                                        handleSubmit={this.handleSubmit}
                                        participation={this.state.participation}
                                        isLoading={this.state.isLoading}
                                    />
                                </div>
                            </PanelBody>
                        </Panel>
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        projectRevenueCategories: state.systemData.projectRevenueCategories,
        participantProjectPayoutTypes: state.systemData.participantProjectPayoutTypes,
    };
};

export default connect(mapStateToProps)(RevenueNewApp);