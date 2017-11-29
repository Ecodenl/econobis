import React, {Component} from 'react';
import { hashHistory, Link } from 'react-router';
import AddContactToGroup from './ContactListAddPersonToGroup';

import ButtonIcon from '../../../components/button/ButtonIcon';

class ContactsInGroupListToolbar extends Component {
    constructor(props){
        super(props);

        this.state = {
            showModalAddToGroup: false,
        };
    }

    closeModalAddToGroup  = () => {
        this.setState({
            showModalAddToGroup: false,
        });
    };

    addPersonToGroup  = (contactId, groupId) => {
      console.log('Person added to group id' + groupId  + 'with cotnact id' + contactId);
    };

    toggleModalAddToGroup = () => {
        this.setState({
            showModalAddToGroup: !this.state.showModalAddToGroup,
        });
    };

    newContact = () => {
        hashHistory.push(`/contact/nieuw`);
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group" role="group">
                        <ButtonIcon iconName={"glyphicon-refresh"} onClickAction={this.props.refreshContactsInGroupData} />
                        <div className="nav navbar-nav btn-group">
                            <button onClick={this.toggleModalAddToGroup} className="btn btn-success btn-sm">
                                <span className="glyphicon glyphicon-plus" />
                            </button>
                        </div>
                        <ButtonIcon iconName={"glyphicon-save"} />
                    </div>
                </div>
                <div className="col-md-4"><h3 className="text-center table-title">Contacten in groep</h3></div>
                <div className="col-md-4" />

                {this.state.showModalAddToGroup &&
                <AddContactToGroup
                    closeModalAddToGroup={this.closeModalAddToGroup}
                    addPersonToGroup={this.addPersonToGroup}
                />
                }

            </div>
        );
    };
};

export default ContactsInGroupListToolbar;