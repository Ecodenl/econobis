import React, { Component } from 'react';
import { connect } from 'react-redux';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

import OpportunityEvaluationFormEdit from './OpportunityEvaluationFormEdit';
import OpportunityEvaluationFormView from './OpportunityEvaluationFormView';
import PanelHeader from '../../../../components/panel/PanelHeader';

class OpportunityEvaluationFormGeneral extends Component {
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
        return (
            <Panel
                className={this.state.activeDiv}
                onMouseEnter={() => this.onDivEnter()}
                onMouseLeave={() => this.onDivLeave()}
            >
                <PanelHeader>
                    <span className="h5 text-bold">Evaluatie</span>
                </PanelHeader>
                <PanelBody>
                    {this.state.showEdit && this.props.permissions.manageOpportunity ? (
                        <OpportunityEvaluationFormEdit switchToView={this.switchToView} />
                    ) : (
                        <OpportunityEvaluationFormView switchToEdit={this.switchToEdit} />
                    )}
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(OpportunityEvaluationFormGeneral);
