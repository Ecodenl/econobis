import React, { Component } from 'react';

import ContactDetailsConclusionView from './ContactDetailsConclusionView';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import ContactDetailsConclusionEdit from './ContactDetailsConclusionEdit';
import { connect } from 'react-redux';

class ContactDetailsFormConclusion extends Component {
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
        const { type = {} } = this.props;
        return (
            <Panel
                className={this.state.activeDiv}
                onMouseEnter={() => this.onDivEnter()}
                onMouseLeave={() => this.onDivLeave()}
            >
                <PanelBody>
                    {(this.state.showEdit && type.id === 'person' && this.props.permissions.updatePerson) ||
                    (this.state.showEdit && type.id === 'organisation' && this.props.permissions.updateOrganisation) ? (
                        <ContactDetailsConclusionEdit switchToView={this.switchToView} />
                    ) : (
                        <ContactDetailsConclusionView switchToEdit={this.switchToEdit} />
                    )}
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        type: state.contactDetails.type,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormConclusion);
