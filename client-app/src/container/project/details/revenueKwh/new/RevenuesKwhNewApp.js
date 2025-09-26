import React, { Component } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import moment from 'moment';
import RevenuesKwhAPI from '../../../../../api/project/RevenuesKwhAPI';
import RevenuesKwhNewToolbar from './RevenuesKwhNewToolbar';
import RevenuesKwhNewForm from './RevenuesKwhNewForm';
import ProjectDetailsAPI from '../../../../../api/project/ProjectDetailsAPI';

// Functionele wrapper voor de class component
const RevenuesKwhNewAppWrapper = props => {
    const navigate = useNavigate();
    const params = useParams();
    return <RevenuesKwhNewApp {...props} navigate={navigate} params={params} />;
};

class RevenuesKwhNewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            revenuesKwh: {
                projectId: props.params.projectId,
                categoryId: props.params.categoryId,
                distributionTypeId: '',
                confirmed: false,
                status: 'new',
                dateBegin: '',
                dateEnd: '',
                dateConfirmed: '',
                datePayout: '',
                payoutKwh: '',
                deliveredTotalConcept: 0,
                deliveredTotalConfirmed: 0,
                deliveredTotalProcessed: 0,
                valuesKwh: {
                    valuesDateBegin: '',
                    kwhStart: 0,
                    kwhStartHigh: '',
                    kwhStartLow: '',
                },
            },
            errors: {
                dateBegin: false,
                dateEnd: false,
                payoutKwh: false,
                valuesDateBegin: false,
                // valuesDateEnd: false,
                // kwhEndCalendarYearHigh: false,
                // kwhEndCalendarYearLow: false,
                // kwhEndHigh: false,
                // kwhEndLow: false,
            },
            errorMessage: {
                dateBegin: '',
                dateEnd: '',
                payoutKwh: '',
                valuesDateBegin: '',
                // valuesDateEnd: '',
                // kwhEndCalendarYearHigh: '',
                // kwhEndCalendarYearLow: '',
                // kwhEndHigh: '',
                // kwhEndLow: '',
            },
            project: {},
            isLoading: false,
        };
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
        this.handleInputChangeDateValuesKwh = this.handleInputChangeDateValuesKwh.bind(this);
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
            let revenuesKwh = this.state.revenuesKwh;
            let valuesKwh = this.state.revenuesKwh.valuesKwh;
            revenuesKwh.distributionTypeId = 'inPossessionOf';

            revenuesKwh.dateBegin = payload.dateInterestBearingKwh;
            revenuesKwh.dateEnd = payload.dateInterestBearingKwh
                ? moment(payload.dateInterestBearingKwh)
                      .endOf('year')
                      .format('Y-MM-DD')
                : '';
            valuesKwh.valuesDateBegin = revenuesKwh.dateBegin;
            valuesKwh.kwhStartHigh = payload.kwhStartHighNextRevenue;
            valuesKwh.kwhStartLow = payload.kwhStartLowNextRevenue;

            this.setState({
                ...this.state,
                project: payload,
                revenuesKwh,
            });
        });
    };

    handleInputChange = event => {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            revenuesKwh: {
                ...this.state.revenuesKwh,
                [name]: value,
            },
        });
    };

    handleInputChangeValuesKwh = event => {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            revenuesKwh: {
                ...this.state.revenuesKwh,
                valuesKwh: {
                    ...this.state.revenuesKwh.valuesKwh,
                    [name]: value,
                },
            },
        });

        // setTimeout(() => {
        //     const kwhStart =
        //         (this.state.revenuesKwh.valuesKwh.kwhStartLow
        //             ? parseFloat(this.state.revenuesKwh.valuesKwh.kwhStartLow)
        //             : 0) +
        //         (this.state.revenuesKwh.valuesKwh.kwhStartHigh
        //             ? parseFloat(this.state.revenuesKwh.valuesKwh.kwhStartHigh)
        //             : 0);
        //     const kwhEnd =
        //         (this.state.revenuesKwh.valuesKwh.kwhEndLow
        //             ? parseFloat(this.state.revenuesKwh.valuesKwh.kwhEndLow)
        //             : 0) +
        //         (this.state.revenuesKwh.valuesKwh.kwhEndHigh
        //             ? parseFloat(this.state.revenuesKwh.valuesKwh.kwhEndHigh)
        //             : 0);
        //     const kwhTotal = kwhEnd - kwhStart;
        //
        //     this.setState({
        //         ...this.state,
        //         revenuesKwh: {
        //             ...this.state.revenuesKwh,
        //             valuesKwh: {
        //                 ...this.state.revenuesKwh.valuesKwh,
        //                 kwhStart,
        //                 kwhEnd,
        //                 kwhTotal,
        //             },
        //         },
        //     });
        // }, 200);
    };

    handleInputChangeDate(value, name) {
        if (name == 'dateBegin') {
            this.setState({
                ...this.state,
                revenuesKwh: {
                    ...this.state.revenuesKwh,
                    dateBegin: value,
                    valuesKwh: {
                        ...this.state.revenuesKwh.valuesKwh,
                        valuesDateBegin: value,
                    },
                },
            });
        } else {
            this.setState({
                ...this.state,
                revenuesKwh: {
                    ...this.state.revenuesKwh,
                    [name]: value,
                },
            });
        }
    }
    handleInputChangeDateValuesKwh(value, name) {
        this.setState({
            ...this.state,
            revenuesKwh: {
                ...this.state.revenuesKwh,
                valuesKwh: {
                    ...this.state.revenuesKwh.valuesKwh,
                    [name]: value,
                },
            },
        });
    }

    // isPeriodExceedingYear = (dateBegin, dateEnd) => {
    //     dateBegin = moment(dateBegin);
    //     dateEnd = moment(dateEnd);
    //
    //     return dateEnd.year() > dateBegin.year();
    // };

    handleSubmit = event => {
        event.preventDefault();

        const { revenuesKwh } = this.state;
        const { valuesKwh } = this.state.revenuesKwh;

        let errors = {};
        let errorMessage = {};
        let hasErrors = false;

        if (!revenuesKwh.dateBegin) {
            errors.dateBegin = true;
            errorMessage.dateBegin = 'Verplicht';
            hasErrors = true;
        }
        if (!revenuesKwh.dateEnd) {
            errors.dateEnd = true;
            errorMessage.dateEnd = 'Verplicht';
            hasErrors = true;
        }
        if (!hasErrors && revenuesKwh.dateEnd < revenuesKwh.dateBegin) {
            errors.dateEnd = true;
            errorMessage.dateEnd = 'Eind periode mag niet voor Begin periode liggen.';
            hasErrors = true;
        }

        // if (!valuesKwh.valuesDateEnd) {
        //     errors.valuesDateEnd = true;
        //     errorMessage.valuesDateEnd = 'Verplicht';
        //     hasErrors = true;
        // }
        // if (!hasErrors && valuesKwh.valuesDateEnd < valuesKwh.valuesDateBegin) {
        //     errors.valuesDateEnd = true;
        //     errorMessage.valuesDateEnd = 'Datum eindstanden mag niet voor datum beginstanden liggen.';
        //     hasErrors = true;
        // }
        // if (
        //     !valuesKwh.kwhEndCalendarYearHigh &&
        //     this.isPeriodExceedingYear(valuesKwh.valuesDateBegin, valuesKwh.valuesDateEnd)
        // ) {
        //     errors.kwhEndCalendarYearHigh = true;
        //     errorMessage.kwhEndCalendarYearHigh = 'Verplicht';
        //     hasErrors = true;
        // }
        // if (!valuesKwh.kwhEndHigh && this.isPeriodExceedingYear(valuesKwh.valuesDateBegin, valuesKwh.valuesDateEnd)) {
        //     errors.kwhEndHigh = true;
        //     errorMessage.kwhEndHigh = 'Verplicht';
        //     hasErrors = true;
        // }
        // if (
        //     (valuesKwh.kwhEndHigh ? parseFloat(valuesKwh.kwhEndHigh) : 0) <
        //     (valuesKwh.kwhStartHigh ? parseFloat(valuesKwh.kwhStartHigh) : 0)
        // ) {
        //     errors.kwhEndHigh = true;
        //     errorMessage.kwhEndHigh = 'Eindstand kWh hoog mag niet lager zijn dan Beginstand kWh hoog.';
        //     hasErrors = true;
        // }
        // if (
        //     (valuesKwh.kwhEndLow ? parseFloat(valuesKwh.kwhEndLow) : 0) <
        //     (valuesKwh.kwhStartLow ? parseFloat(valuesKwh.kwhStartLow) : 0)
        // ) {
        //     errors.kwhEndLow = true;
        //     errorMessage.kwhEndLow = 'Eindstand kWh laag mag niet lager zijn dan Beginstand kWh laag.';
        //     hasErrors = true;
        // }
        // if (this.isPeriodExceedingYear(valuesKwh.valuesDateBegin, valuesKwh.valuesDateEnd)) {
        //     if (
        //         (valuesKwh.kwhEndCalendarYearHigh && valuesKwh.kwhEndCalendarYearHigh > 0) ||
        //         (valuesKwh.kwhEndCalendarYearLow && valuesKwh.kwhEndCalendarYearLow > 0)
        //     ) {
        //         if (
        //             (valuesKwh.kwhEndCalendarYearHigh ? parseFloat(valuesKwh.kwhEndCalendarYearHigh) : 0) <
        //             (valuesKwh.kwhStartHigh ? parseFloat(valuesKwh.kwhStartHigh) : 0)
        //         ) {
        //             errors.kwhEndCalendarYearHigh = true;
        //             errorMessage.kwhEndCalendarYearHigh =
        //                 'Eindstand kWh 31-12 hoog mag niet lager zijn dan Beginstand kWh hoog.';
        //             hasErrors = true;
        //         }
        //         if (
        //             (valuesKwh.kwhEndCalendarYearHigh ? parseFloat(valuesKwh.kwhEndCalendarYearHigh) : 0) >
        //             (valuesKwh.kwhEndHigh ? parseFloat(valuesKwh.kwhEndHigh) : 0)
        //         ) {
        //             errors.kwhEndHigh = true;
        //             errorMessage.kwhEndHigh = 'Eindstand kWh 31-12 hoog mag niet hoger zijn dan Beginstand kWh hoog.';
        //             hasErrors = true;
        //         }
        //         if (
        //             (valuesKwh.kwhEndCalendarYearLow ? parseFloat(valuesKwh.kwhEndCalendarYearLow) : 0) <
        //             (valuesKwh.kwhStartLow ? parseFloat(valuesKwh.kwhStartLow) : 0)
        //         ) {
        //             errors.kwhEndCalendarYearLow = true;
        //             errorMessage.kwhEndCalendarYearLow =
        //                 'Eindstand kWh 31-12 laag mag niet lager zijn dan Beginstand kWh laag.';
        //             hasErrors = true;
        //         }
        //         if (
        //             (valuesKwh.kwhEndCalendarYearLow ? parseFloat(valuesKwh.kwhEndCalendarYearLow) : 0) >
        //             (valuesKwh.kwhEndLow ? parseFloat(valuesKwh.kwhEndLow) : 0)
        //         ) {
        //             errors.kwhEndLow = true;
        //             errorMessage.kwhEndLow = 'Eindstand kWh 31-12 laag mag niet hoger zijn dan Eindstand kWh laag.';
        //             hasErrors = true;
        //         }
        //     }
        // } else {
        //     valuesKwh.kwhEndCalendarYearHigh = null;
        //     valuesKwh.kwhEndCalendarYearLow = null;
        // }

        if (!revenuesKwh.payoutKwh) {
            errors.payoutKwh = true;
            errorMessage.payoutKwh = 'Verplicht';
            hasErrors = true;
        }
        if (revenuesKwh.payoutKwh + '' < 0) {
            errors.payAmount = true;
            errorMessage.payAmount = 'Bedrag mag niet negatief zijn.';
            hasErrors = true;
        }

        revenuesKwh.payoutKwh = revenuesKwh.payoutKwh ? parseFloat(revenuesKwh.payoutKwh).toFixed(5) : '';

        this.setState({ ...this.state, errors: errors, errorMessage: errorMessage });

        if (!hasErrors) {
            this.setState({ isLoading: true });

            RevenuesKwhAPI.storeRevenuesKwh(revenuesKwh)
                .then(payload => {
                    this.setState({ isLoading: false });
                    // Delete path new-project-revenue in history, so when go back the page goes to the project details
                    this.props.navigate(`/project/details/${this.props.params.projectId}`, { replace: true });
                    // Push to new revenue
                    this.props.navigate(`/project/opbrengst-kwh/${payload.data.data.id}`);
                })
                .catch(error => {
                    console.log(error);
                    alert(
                        'Er is iets misgegaan bij opslaan. Probeer nogmaals een nieuwe opbrengstverdeling te maken vanuit het project.'
                    );
                    this.props.navigate(-1);
                });
        }
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <RevenuesKwhNewToolbar />
                    </div>

                    <div className="col-md-12">
                        <Panel>
                            <PanelBody>
                                <div className="col-md-12">
                                    <RevenuesKwhNewForm
                                        revenuesKwh={this.state.revenuesKwh}
                                        errors={this.state.errors}
                                        errorMessage={this.state.errorMessage}
                                        handleInputChange={this.handleInputChange}
                                        handleInputChangeValuesKwh={this.handleInputChangeValuesKwh}
                                        handleInputChangeDate={this.handleInputChangeDate}
                                        handleInputChangeDateValuesKwh={this.handleInputChangeDateValuesKwh}
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

export default RevenuesKwhNewAppWrapper;
