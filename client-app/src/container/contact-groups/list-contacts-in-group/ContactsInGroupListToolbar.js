import React, {Component} from 'react';
import { hashHistory, Link } from 'react-router';
import {connect} from 'react-redux';

import ContactListAddPersonToGroup from './ContactListAddPersonToGroup';
import ContactGroupAPI  from '../../../api/contact-group/ContactGroupAPI';
import ButtonIcon from '../../../components/button/ButtonIcon';
import ContactListEmail from "./ContactListEmail";

class ContactsInGroupListToolbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            showModalAddToGroup: false,
            showModalEmail: false,
            groupName: '',
        };
    }

    closeModalAddToGroup  = () => {
        this.setState({
            showModalAddToGroup: false,
        });
    };

    componentDidMount() {
        ContactGroupAPI.fetchContactGroup(this.props.groupId).then((payload) => {
            this.setState({ groupName: payload.name })
        });
    };

    addPersonToGroup  = (contactId) => {
        const contact = {
            groupId: this.props.groupId,
            contactId,
        };

        ContactGroupAPI.addContactToGroup(contact).then((payload) => {
            this.setState({
                showModalAddToGroup: false,
            });
            this.props.refreshContactsInGroupData();
        });
    };

    toggleModalAddToGroup = () => {
        this.setState({
            showModalAddToGroup: !this.state.showModalAddToGroup,
        });
    };

    toggleModalEmail = () => {
        this.setState({
            showModalEmail: !this.state.showModalEmail,
        });
    };

    newContact = () => {
        hashHistory.push(`/contact/nieuw`);
    };


    render() {
        const { permissions } = this.props;
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group" role="group">
                        <ButtonIcon iconName={"glyphicon-refresh"} onClickAction={this.props.refreshContactsInGroupData} />
                        {
                            this.props.permissions.updatePerson && this.props.permissions.updateOrganisation &&
                            <div className="nav navbar-nav btn-group">
                            <button onClick={this.toggleModalAddToGroup} className="btn btn-success btn-sm">
                                <span className="glyphicon glyphicon-plus"/>
                            </button>
                        </div>
                        }
                        <ButtonIcon iconName={"glyphicon-envelope"} onClickAction={this.toggleModalEmail} />
                    </div>
                </div>
                <div className="col-md-4"><h3 className="text-center table-title">Contacten in groep: {this.state.groupName}</h3></div>
                <div className="col-md-4" />

                {this.state.showModalAddToGroup &&
                <ContactListAddPersonToGroup
                    closeModalAddToGroup={this.closeModalAddToGroup}
                    addPersonToGroup={this.addPersonToGroup}
                    groupName = {this.state.groupName}
                />
                }

                {this.state.showModalEmail &&
                <ContactListEmail
                    closeModalEmail={this.toggleModalEmail}
                    groupId = {this.props.groupId}
                />
                }

            </div>
        );
    };
};
const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions,
    }
};

export default connect(mapStateToProps)(ContactsInGroupListToolbar);
