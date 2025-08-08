import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

import IntakesAPI from './../../../api/intake/IntakesAPI';

// Functionele wrapper voor de class component
const ButtonIntakesWrapper = props => {
    const navigate = useNavigate();
    return <ButtonIntakes {...props} navigate={navigate} />;
};

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
            <div className={this.props.size} onClick={() => this.props.navigate(`/intakes`)}>
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

export default ButtonIntakesWrapper;
