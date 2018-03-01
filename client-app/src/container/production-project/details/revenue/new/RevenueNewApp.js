import React, { Component } from 'react';
import validator from 'validator';
import { isEmpty } from 'lodash';
import { hashHistory } from 'react-router';

import RevenueNewToolbar from './RevenueNewToolbar';
import RevenueNew from './RevenueNew';

import ProductionProjectRevenueAPI from '../../../../../api/production-project/ProductionProjectRevenueAPI';
import Panel from "../../../../../components/panel/Panel";
import PanelBody from "../../../../../components/panel/PanelBody";
import moment from "moment";

class RevenueNewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            revenue: {
                productionProjectId: props.params.productionProjectId,
                categoryId: '',
                confirmed: false,
                dateBegin: '',
                dateEnd: '',
                dateEntry: moment(),
                dateConfirmed: '',
                kwhStart: '',
                kwhEnd: '',
                kwhStartHigh: '',
                kwhEndHigh: '',
                kwhStartLow: '',
                kwhEndLow: '',
                revenue: '',
                datePayed: '',
                payPercentage: '',
                typeId: '',
            },
            errors: {
                categoryId: false,
                dateBegin: false,
                dateEnd: false,
                dateEntry: false,
            },
        };
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
        this.handleInputChangeDateConfirmed = this.handleInputChangeDateConfirmed.bind(this);
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            revenue: {
                ...this.state.revenue,
                [name]: value
            },
        });
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            revenue: {
                ...this.state.revenue,
                [name]: value
            },
        });
    };

    handleInputChangeDateConfirmed(value, name) {
        if(value) {
            this.setState({
                ...this.state,
                revenue: {
                    ...this.state.revenue,
                    [name]: value,
                    confirmed: true
                },
            });
        }
        else{
            this.setState({
                ...this.state,
                revenue: {
                    ...this.state.revenue,
                    [name]: value,
                    confirmed: false
                },
            });
        }
    };

    handleSubmit = event => {
        event.preventDefault();

        const {revenue} = this.state;

        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(revenue.categoryId + '')){
            errors.categoryId = true;
            hasErrors = true;
        };

        if(validator.isEmpty(revenue.dateBegin + '')){
            errors.dateBegin = true;
            hasErrors = true;
        };

        if(validator.isEmpty(revenue.dateEnd + '')){
            errors.dateEnd = true;
            hasErrors = true;
        };

        if(validator.isEmpty(revenue.dateEntry + '')){
            errors.dateEntry = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
        ProductionProjectRevenueAPI.storeProductionProjectRevenue(revenue).then(payload => {
            hashHistory.push(`/productie-project/opbrengst/${payload.id}`);
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
                                    <RevenueNew
                                        revenue={this.state.revenue}
                                        errors={this.state.errors}
                                        handleInputChange={this.handleInputChange}
                                        handleInputChangeDate={this.handleInputChangeDate}
                                        handleInputChangeDateConfirmed={this.handleInputChangeDateConfirmed}
                                        handleSubmit={this.handleSubmit}
                                    />
                                </div>
                            </PanelBody>
                        </Panel>
                    </div>
                </div>
                <div className="col-md-3"/>
            </div>
        )
    }
};

export default RevenueNewApp;