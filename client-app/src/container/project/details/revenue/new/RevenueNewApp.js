import React, { Component } from 'react';
import validator from 'validator';
import { hashHistory } from 'react-router';

import RevenueNewToolbar from './RevenueNewToolbar';
import RevenueNewForm from './RevenueNewForm';

import ProjectRevenueAPI from '../../../../../api/project/ProjectRevenueAPI';
import ProjectDetailsAPI from '../../../../../api/project/ProjectDetailsAPI';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import moment from 'moment';
import { connect } from 'react-redux';

class RevenueNewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            revenue: {
                projectId: props.params.projectId,
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
                kwhStartHigh: '',
                kwhEndHigh: '',
                kwhStartLow: '',
                kwhEndLow: '',
                revenue: '',
                datePayed: '',
                payPercentage: '',
                keyAmountFirstPercentage: '',
                payPercentageValidFromKeyAmount: '',
                payoutKwh: '',
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
            project: {},
            isLoading: false,
        };
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
        this.handleInputChangeDateConfirmed = this.handleInputChangeDateConfirmed.bind(this);
    }

    componentDidMount() {
        this.fetchProject(this.props.params.projectId);
    }

    componentDidUpdate(prevProps) {
        if (this.props.params.projectId !== prevProps.params.projectId) {
            this.fetchProject(this.props.params.projectId);
        }
    }

    fetchProject = id => {
        ProjectDetailsAPI.fetchProject(id).then(payload => {
            const category = this.props.projectRevenueCategories.find(
                projectRevenueCategorie => projectRevenueCategorie.id == this.state.revenue.categoryId
            );

            let revenue = this.state.revenue;

            if (category.codeRef === 'redemptionEuro') {
                const payoutTypeId = this.props.participantProjectPayoutTypes.find(
                    participantProjectPayoutType => participantProjectPayoutType.codeRef === 'account'
                ).id;
                revenue.payoutTypeId = payoutTypeId;
                revenue.distributionTypeId = 'inPossessionOf';
            } else if (payload.projectType.codeRef !== 'loan') {
                revenue.distributionTypeId = 'inPossessionOf';
            } else if (payload.projectType.codeRef === 'obligation') {
                const payoutTypeId = this.props.participantProjectPayoutTypes.find(
                    participantProjectPayoutType => participantProjectPayoutType.codeRef === 'account'
                ).id;
                revenue.payoutTypeId = payoutTypeId;
            }

            if (category.codeRef === 'revenueEuro') {
                revenue.dateBegin = payload.dateInterestBearing;
                revenue.dateEnd = payload.dateInterestBearing
                    ? moment(payload.dateInterestBearing)
                          .endOf('year')
                          .format('Y-MM-DD')
                    : '';
            }
            if (category.codeRef === 'redemptionEuro') {
                revenue.dateBegin = payload.dateInterestBearingRedemption;
                revenue.dateEnd = payload.dateInterestBearingRedemption
                    ? moment(payload.dateInterestBearingRedemption)
                          .endOf('year')
                          .format('Y-MM-DD')
                    : '';
            }
            if (category.codeRef === 'revenueKwh') {
                revenue.dateBegin = payload.dateInterestBearingKwh;
                revenue.dateEnd = payload.dateInterestBearingKwh
                    ? moment(payload.dateInterestBearingKwh)
                          .endOf('year')
                          .format('Y-MM-DD')
                    : '';
                revenue.kwhStartHigh = payload.kwhStartHighNextRevenue;
                revenue.kwhStartLow = payload.kwhStartLowNextRevenue;
            }

            this.setState({
                ...this.state,
                project: payload,
                revenue,
            });
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

    handleSubmit = event => {
        event.preventDefault();

        const { revenue } = this.state;
        const category = this.props.projectRevenueCategories.find(
            projectRevenueCategorie => projectRevenueCategorie.id == revenue.categoryId
        );

        let errors = {};
        let errorMessage = {};
        let hasErrors = false;

        if (validator.isEmpty(revenue.categoryId + '')) {
            errors.categoryId = true;
            hasErrors = true;
        }

        if (!revenue.dateBegin) {
            errors.dateBegin = true;
            errorMessage.dateBegin = 'Verplicht';
            hasErrors = true;
        }

        if (!revenue.dateEnd) {
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
            !hasErrors &&
            category.codeRef !== 'revenueKwh' &&
            moment(revenue.dateBegin).year() !== moment(revenue.dateEnd).year()
        ) {
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

        if (category.codeRef === 'revenueKwh') {
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
            category.codeRef === 'revenueEuro' &&
            (this.state.project.projectType.codeRef === 'capital' ||
                this.state.project.projectType.codeRef === 'postalcode_link_capital')
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
            this.setState({ isLoading: true });

            ProjectRevenueAPI.storeProjectRevenue(revenue)
                .then(payload => {
                    this.setState({ isLoading: false });
                    // Delete path new-project-revenue in history, so when go back the page goes to the project details
                    hashHistory.replace(`/project/details/${this.props.params.projectId}`);
                    // Push to new revenue
                    hashHistory.push(`/project/opbrengst/${payload.data.data.id}`);
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
                        <RevenueNewToolbar />
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
                                        project={this.state.project}
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
