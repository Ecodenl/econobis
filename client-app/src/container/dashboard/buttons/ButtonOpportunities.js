import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

import OpportunitiesAPI from '../../../api/opportunity/OpportunitiesAPI';

// Functionele wrapper voor de class component
const ButtonOpportunitiesWrapper = props => {
    const navigate = useNavigate();
    return <ButtonOpportunities {...props} navigate={navigate} />;
};

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
            <div className={this.props.size} onClick={() => this.props.navigate(`/kansen`)}>
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

export default ButtonOpportunitiesWrapper;
