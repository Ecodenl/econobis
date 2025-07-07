import React, { Component } from 'react';
import { connect } from 'react-redux';

import MeasureCategoryDetailsFormGeneralEdit from './MeasureCategoryDetailsFormGeneralEdit';
import MeasureCategoryDetailsFormGeneralView from './MeasureCategoryDetailsFormGeneralView';

class MeasureCategoryDetailsFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            activeDiv: '',
        };
    }

    switchToEdit = () => {
        this.setState({
            showEdit: true,
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

        const explanationWfCreateOpportunity = (
            <span>
                Er zal automatisch een kans worden aangemaakt voor een specifieke maatregel en een specifieke status.
            </span>
        );
        const explanationWfCreateQuotationRequest = (
            <span>Er zal automatisch een offerte worden aangemaakt voor een specifieke organisatie.</span>
        );
        const explanationWfEmailQuotationRequest = (
            <span>
                Er zal automatisch een email verstuurd worden naar de verantwoordelijke als nieuwe kansactie wordt
                aangemaakt.
            </span>
        );

        return (
            <div
                className={this.state.activeDiv}
                onMouseEnter={() => this.onDivEnter()}
                onMouseLeave={() => this.onDivLeave()}
            >
                {this.state.showEdit && permissions.manageFinancial ? (
                    <MeasureCategoryDetailsFormGeneralEdit
                        measureCategory={this.props.measureCategory}
                        switchToView={this.switchToView}
                        updateState={this.props.updateState}
                        explanationWfCreateOpportunity={explanationWfCreateOpportunity}
                        explanationWfCreateQuotationRequest={explanationWfCreateQuotationRequest}
                        explanationWfEmailQuotationRequest={explanationWfEmailQuotationRequest}
                    />
                ) : (
                    <MeasureCategoryDetailsFormGeneralView
                        {...this.props.measureCategory}
                        switchToEdit={this.switchToEdit}
                        explanationWfCreateOpportunity={explanationWfCreateOpportunity}
                        explanationWfCreateQuotationRequest={explanationWfCreateQuotationRequest}
                        explanationWfEmailQuotationRequest={explanationWfEmailQuotationRequest}
                        // calendarBackgroundColor={calendarBackgroundColor}
                        // calendarTextColor={calendarTextColor}
                    />
                )}
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

export default connect(mapStateToProps)(MeasureCategoryDetailsFormGeneral);
