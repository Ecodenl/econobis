import React, { Component } from 'react';

import TaskDetailsFormGeneralEdit from './TaskDetailsFormGeneralEdit';
import TaskDetailsFormGeneralView from './TaskDetailsFormGeneralView';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import { connect } from 'react-redux';

class TaskDetailsFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            activeDiv: '',
            showExtraConnections: false,
        };

        this.switchToEdit = this.switchToEdit.bind(this);
        this.switchToView = this.switchToView.bind(this);
        this.toggleExtraConnections = this.toggleExtraConnections.bind(this);
    }

    switchToEdit() {
        this.setState({
            showEdit: true,
        });
    }

    switchToView() {
        this.setState({
            showEdit: false,
            activeDiv: '',
        });
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

    toggleExtraConnections() {
        this.setState({ showExtraConnections: !this.state.showExtraConnections });
    }

    render() {
        return (
            <Panel
                className={this.state.activeDiv}
                onMouseEnter={() => this.onDivEnter()}
                onMouseLeave={() => this.onDivLeave()}
            >
                <PanelBody>
                    <div className="col-md-12">
                        {this.state.showEdit && this.props.permissions.manageTask ? (
                            <TaskDetailsFormGeneralEdit
                                switchToView={this.switchToView}
                                toggleExtraConnections={this.toggleExtraConnections}
                                showExtraConnections={this.state.showExtraConnections}
                            />
                        ) : (
                            <TaskDetailsFormGeneralView
                                switchToEdit={this.switchToEdit}
                                toggleExtraConnections={this.toggleExtraConnections}
                                showExtraConnections={this.state.showExtraConnections}
                            />
                        )}
                    </div>
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

export default connect(mapStateToProps)(TaskDetailsFormGeneral);
