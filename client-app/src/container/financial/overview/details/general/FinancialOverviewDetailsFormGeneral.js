import React, { Component } from 'react';
import { connect } from 'react-redux';

// import FinancialOverviewDetailsFormGeneralEdit from './FinancialOverviewDetailsFormGeneralEdit';
import FinancialOverviewDetailsFormGeneralView from './FinancialOverviewDetailsFormGeneralView';

class FinancialOverviewDetailsFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            activeDiv: '',
        };
    }

    switchToEdit = () => {
        this.setState({
            // showEdit: true,
        });
    };

    switchToView = () => {
        this.setState({
            showEdit: false,
            activeDiv: '',
        });
    };

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
                <FinancialOverviewDetailsFormGeneralView
                    {...this.props.financialOverview}
                    switchToEdit={this.switchToEdit}
                    callFetchFinancialOverviewDetails={this.props.callFetchFinancialOverviewDetails}
                    administrations={this.props.administrations}
                />
                {/*)}*/}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        meDetails: state.meDetails,
        permissions: state.meDetails.permissions,
        administrations: state.meDetails.administrations,
    };
};

export default connect(mapStateToProps)(FinancialOverviewDetailsFormGeneral);
