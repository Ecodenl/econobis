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
            },
            project: {},
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

            if (payload.projectType.codeRef !== 'loan') {
                revenue.distributionTypeId = 'inPossessionOf';
            }

            if (category.codeRef === 'revenueEuro') {
                revenue.dateBegin = payload.dateInterestBearing;
                revenue.dateEnd = payload.dateInterestBearing
                    ? moment(payload.dateInterestBearing)
                          .endOf('year')
                          .format('Y-MM-DD')
                    : '';
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

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(revenue.categoryId + '')) {
            errors.categoryId = true;
            hasErrors = true;
        }

        if (validator.isEmpty(revenue.dateBegin + '')) {
            errors.dateBegin = true;
            hasErrors = true;
        }

        if (validator.isEmpty(revenue.dateEnd + '')) {
            errors.dateEnd = true;
            hasErrors = true;
        }

        if (validator.isEmpty(revenue.dateReference + '')) {
            errors.dateReference = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
            ProjectRevenueAPI.storeProjectRevenue(revenue).then(payload => {
                hashHistory.push(`/project/opbrengst/${payload.id}`);
            });
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
                                        handleInputChange={this.handleInputChange}
                                        handleInputChangeDate={this.handleInputChangeDate}
                                        handleInputChangeDateConfirmed={this.handleInputChangeDateConfirmed}
                                        handleSubmit={this.handleSubmit}
                                        project={this.state.project}
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
    };
};

export default connect(mapStateToProps)(RevenueNewApp);
