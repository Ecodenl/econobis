import React, {Component} from 'react';
import { connect } from 'react-redux';
import { hashHistory, Link } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';
import ContactsListExtraFilters from './ContactsListExtraFilters';
import ContactsDeleteSelectedItems from './ContactsDeleteSelectedItems';
import ContactListAddContactsToGroup from './ContactListAddContactsToGroup';

class ContactsListToolbar extends Component {
    constructor(props){
        super(props);

        this.state = {
            showExtraFilters: false,
            showDeleteSelectedItems: false,
            showAddContactsToGroup: false,
        };
    }

    toggleShowExtraFilters = () => {
        this.setState({
            showExtraFilters: !this.state.showExtraFilters
        });
    };

    toggleShowDeleteSelectedItems = () => {
        this.setState({
            showDeleteSelectedItems: !this.state.showDeleteSelectedItems
        });
    };

    toggleAddContactsToGroup = () => {
        this.setState({
            showAddContactsToGroup: !this.state.showAddContactsToGroup
        });
    };

    newContact = () => {
        hashHistory.push(`/contact/nieuw`);
    };

    importContacts = () => {
        hashHistory.push(`/contact/import`);
    };

    render() {
        const { permissions = {} } = this.props.meDetails;
        const { meta = {} } = this.props.contacts;

        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group" role="group">
                        <ButtonIcon iconName={"glyphicon-refresh"} onClickAction={this.props.resetContactFilters} />
                        <div className="nav navbar-nav btn-group" role="group">
                            <button className="btn btn-success btn-sm" data-toggle="dropdown">
                                <span className="glyphicon glyphicon-plus" />
                            </button>
                            <ul className="dropdown-menu">
                                {   permissions.createPerson &&
                                            <li><Link to="contact/nieuw/persoon">Persoon</Link></li>
                                    }
                                        {permissions.createOrganisation &&
                                            <li><Link to="contact/nieuw/organisatie">Organisatie</Link></li>
                                    }
                            </ul>
                        </div>
                        {
                            permissions.updatePerson && permissions.updateOrganisation &&
                        <div className="nav navbar-nav btn-group" role="group">
                            <button className="btn btn-success btn-sm" data-toggle="dropdown">
                                <span className="glyphicon glyphicon-share-alt" />
                            </button>
                            <ul className="dropdown-menu">
                                <li><a onClick={this.toggleAddContactsToGroup}>Voeg toe aan groep</a></li>
                            </ul>
                        </div>
                        }
                        <ButtonIcon iconName={"glyphicon-trash"} onClickAction={this.toggleShowDeleteSelectedItems} />
                        <ButtonIcon iconName={"glyphicon-ok"} onClickAction={this.props.toggleShowCheckboxList} />
                        <ButtonIcon iconName={"glyphicon-filter"} onClickAction={this.toggleShowExtraFilters} />
                        <ButtonIcon iconName={"glyphicon-download-alt"} onClickAction={this.props.getCSV} />
                        {permissions.import &&
                        <ButtonIcon iconName={"glyphicon-import"} onClickAction={this.importContacts}/>
                        }
                    </div>
                </div>
                <div className="col-md-4"><h3 className="text-center table-title">Contacten</h3></div>
                <div className="col-md-4">
                    <div className="pull-right">Resultaten: { meta.total || 0 }</div>
                </div>
                {
                    this.state.showExtraFilters &&
                    <ContactsListExtraFilters
                        toggleShowExtraFilters={this.toggleShowExtraFilters}
                        handleExtraFiltersChange={this.props.handleExtraFiltersChange}
                        extraFilters={this.props.extraFilters}
                        amountOfFilters={this.props.amountOfFilters}
                    />
                }
                {
                    this.state.showDeleteSelectedItems && <ContactsDeleteSelectedItems toggleShowDeleteSelectedItems={this.toggleShowDeleteSelectedItems} />
                }
                {
                    this.state.showAddContactsToGroup && <ContactListAddContactsToGroup toggleAddGroup={this.toggleAddContactsToGroup} />
                }
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        meDetails: state.meDetails,
        contacts: state.contacts.list,
    };
};

export default connect(mapStateToProps, null)(ContactsListToolbar);