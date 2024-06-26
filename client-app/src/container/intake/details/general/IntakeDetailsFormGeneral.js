import React, { Component } from 'react';

import IntakeDetailsFormGeneralEdit from './IntakeDetailsFormGeneralEdit';
import IntakeDetailsFormGeneralView from './IntakeDetailsFormGeneralView';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import { connect } from 'react-redux';

class IntakeDetailsFormGeneral extends Component {
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
                <PanelBody>
                    <div className="col-md-12">
                        {this.state.showEdit && this.props.permissions.manageIntake ? (
                            <IntakeDetailsFormGeneralEdit switchToView={this.switchToView} />
                        ) : (
                            <IntakeDetailsFormGeneralView switchToEdit={this.switchToEdit} />
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

export default connect(mapStateToProps, null)(IntakeDetailsFormGeneral);
