import React, { Component } from 'react';
import { connect } from 'react-redux';

import OpportunityStatusDetailsFormGeneralEdit from './OpportunityStatusDetailsFormGeneralEdit';
import OpportunityStatusDetailsFormGeneralView from './OpportunityStatusDetailsFormGeneralView';

class OpportunityStatusDetailsFormGeneral extends Component {
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

        const explanationWf = (
            <span>
                Als gebruik workflow bij deze status is aangezet, dan zal er automatisch eenmalig een email verstuurd
                gaan worden naar contact als kans op deze status is gezet.
                <br />
                De verzenddatum wordt dan bepaald, rekening houdend met het opgegeven aantal dagen.
            </span>
        );

        return (
            <div
                className={this.state.activeDiv}
                onMouseEnter={() => this.onDivEnter()}
                onMouseLeave={() => this.onDivLeave()}
            >
                {this.state.showEdit && permissions.manageFinancial ? (
                    <OpportunityStatusDetailsFormGeneralEdit
                        opportunityStatus={this.props.opportunityStatus}
                        switchToView={this.switchToView}
                        updateState={this.props.updateState}
                        explanationWf={explanationWf}
                    />
                ) : (
                    <OpportunityStatusDetailsFormGeneralView
                        {...this.props.opportunityStatus}
                        switchToEdit={this.switchToEdit}
                        explanationWf={explanationWf}
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

export default connect(mapStateToProps)(OpportunityStatusDetailsFormGeneral);
