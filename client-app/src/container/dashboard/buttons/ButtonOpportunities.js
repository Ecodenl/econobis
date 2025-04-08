import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import OpportunitiesAPI from '../../../api/opportunity/OpportunitiesAPI';

class ButtonOpportunities extends Component {
    constructor(props) {
        super(props);

        this.state = {
            amountActiveOpportunities: '-',
        };
    }

    UNSAFE_componentWillMount() {
        OpportunitiesAPI.getAmountActive().then(payload => {
            this.setState({
                amountActiveOpportunities: payload,
            });
        });
    }

    render() {
        return (
            <div className={this.props.size} onClick={() => hashHistory.push(`/kansen`)}>
                <div className="panel panel-default" id="dashboardbutton-3">
                    <div className="panel-body">
                        <h4 className="text-center text-bold">KANSEN</h4>
                        <h4 className="text-center text-bold">{this.state.amountActiveOpportunities}</h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default ButtonOpportunities;
