import React, { Component } from 'react';
import moment from 'moment';
import validator from 'validator';
import { hashHistory } from 'react-router';

import MeasureNewToolbar from './MeasureNewToolbar';
import MeasureNew from './MeasureNew';

import MeasureAPI from '../../../api/measure/MeasureAPI';

class MeasureNewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            measure: {
                name: '',
                description: '',
            },
            errors: {
                name: false,
            },
        }
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            measure: {
                ...this.state.measure,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const {measure} = this.state;

        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(measure.name)){
            errors.name = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
        MeasureAPI.storeMeasure(measure).then(payload => {
            hashHistory.push(`/maatregel/${payload.id}`);
        });
    };

    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-md-12 extra-space-above">
                            <MeasureNewToolbar/>
                        </div>
                        <div className="col-md-12 extra-space-above">
                            <MeasureNew
                                measure={this.state.measure}
                                errors={this.state.errors}
                                handleInputChange={this.handleInputChange}
                                handleSubmit={this.handleSubmit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default MeasureNewApp;