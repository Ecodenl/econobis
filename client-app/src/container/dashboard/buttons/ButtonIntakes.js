import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import IntakesAPI from './../../../api/intake/IntakesAPI';

class ButtonIntakes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            amountActiveIntakes: '-',
        };
    }

    UNSAFE_componentWillMount() {
        IntakesAPI.getAmountActive().then(payload => {
            this.setState({
                amountActiveIntakes: payload,
            });
        });
    }

    render() {
        return (
            <div className={this.props.size} onClick={() => hashHistory.push(`/intakes`)}>
                <div className="panel panel-default" id="dashboardbutton-2">
                    <div className="panel-body">
                        <h4 className="text-center text-bold">INTAKES</h4>
                        <h4 className="text-center text-bold">{this.state.amountActiveIntakes}</h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default ButtonIntakes;
