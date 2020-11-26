import React, { Component } from 'react';
import { connect } from 'react-redux';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

import EmailFormEdit from './EmailFormEdit';
import EmailFormView from './EmailFormView';

class EmailFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            showContacten: false,
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

    toggleShowContacten = () => {
        this.setState({
            showContacten: !this.state.showContacten,
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
                    {this.state.showEdit /*&& this.props.permissions.manageOpportunity*/ ? (
                        <EmailFormEdit
                            switchToView={this.switchToView}
                            showContacten={this.state.showContacten}
                            toggleShowContacten={this.toggleShowContacten}
                        />
                    ) : (
                        <EmailFormView
                            switchToEdit={this.switchToEdit}
                            showContacten={this.state.showContacten}
                            toggleShowContacten={this.toggleShowContacten}
                        />
                    )}
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        email: state.email,
        // permissions: state.meDetails.permissions
    };
};

export default connect(mapStateToProps)(EmailFormGeneral);
