import React, { Component } from 'react';
import { connect } from 'react-redux';

import FinancialOverviewProjectDetailsFormGeneralView from './FinancialOverviewProjectDetailsFormGeneralView';

class FinancialOverviewProjectDetailsFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeDiv: '',
        };
    }

    onDivEnter() {
        this.setState({
            activeDiv: 'panel-grey',
        });
    }

    onDivLeave() {
        if (!this.state.showEdit) {
            this.setState({
                activeDiv: '',
            });
        }
    }

    render() {
        const { permissions = {} } = this.props.meDetails;

        return (
            <div
                className={this.state.activeDiv}
                onMouseEnter={() => this.onDivEnter()}
                onMouseLeave={() => this.onDivLeave()}
            >
                <FinancialOverviewProjectDetailsFormGeneralView {...this.props.financialOverviewProject} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        meDetails: state.meDetails,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(FinancialOverviewProjectDetailsFormGeneral);
