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
                {/*{this.state.showEdit && permissions.manageFinancial ? (*/}
                {/*    <FinancialOverviewDetailsFormGeneralEdit*/}
                {/*        financialOverview={this.props.financialOverview}*/}
                {/*        administrations={this.props.administrations}*/}
                {/*        // financialOverviews={this.props.financialOverviews}*/}
                {/*        switchToView={this.switchToView}*/}
                {/*        updateState={this.props.updateState}*/}
                {/*    />*/}
                {/*) : (*/}
                <FinancialOverviewDetailsFormGeneralView
                    {...this.props.financialOverview}
                    switchToEdit={this.switchToEdit}
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
        administrations: state.systemData.administrations,
    };
};

export default connect(mapStateToProps)(FinancialOverviewDetailsFormGeneral);
