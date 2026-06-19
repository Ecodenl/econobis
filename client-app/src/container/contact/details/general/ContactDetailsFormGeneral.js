import React, { Component } from 'react';
import { connect } from 'react-redux';

import ContactDetailsFormOrganisationEdit from './ContactDetailsFormOrganisationEdit';
import ContactDetailsFormOrganisationView from './ContactDetailsFormOrganisationView';
import ContactDetailsFormPersonalEdit from './ContactDetailsFormPersonalEdit';
import ContactDetailsFormPersonalView from './ContactDetailsFormPersonalView';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import ContactDetailsGroups from './ContactDetailsGroups';

class ContactDetailsFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            activeDiv: '',
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.contactDetails.id !== nextProps.contactDetails.id) {
            this.setState({
                showEdit: false,
            });
        }
    }

    switchToEdit = () => {
        const { typeId } = this.props.contactDetails;

        if (typeId === 'organisation' && !this.props.permissions.updateOrganisation) return;
        if (typeId === 'person' && !this.props.permissions.updatePerson) return;

        this.setState({
            showEdit: true,
        });
    };

    switchToView = () => {
        setTimeout(() => {
            this.setState({
                showEdit: false,
                activeDiv: '',
            });
        }, 100);
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
                    <div className={'row'} onClick={this.switchToEdit}>
                        <div className={'col-xs-6'}>
                            {this.state.showEdit ? (
                                this.props.contactDetails.typeId === 'organisation' ? (
                                    <ContactDetailsFormOrganisationEdit switchToView={this.switchToView} />
                                ) : (
                                    <ContactDetailsFormPersonalEdit switchToView={this.switchToView} />
                                )
                            ) : this.props.contactDetails.typeId === 'organisation' ? (
                                <ContactDetailsFormOrganisationView />
                            ) : (
                                <ContactDetailsFormPersonalView />
                            )}
                        </div>
                        <div className={'col-xs-6'}>
                            <ContactDetailsGroups />
                        </div>
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        contactDetails: state.contactDetails,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormGeneral);
