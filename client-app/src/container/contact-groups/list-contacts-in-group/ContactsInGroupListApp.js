import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clearContactsInGroup } from '../../../actions/contact-group/ContactsInGroupActions';
import {
    fetchContactGroupDetails,
    clearContactGroupDetails,
} from '../../../actions/contact-group/ContactGroupDetailsActions';

import ContactsInGroupList from './ContactsInGroupList';
import ContactsInGroupListToolbar from './ContactsInGroupListToolbar';
import ContactsInGroupAPI from '../../../api/contact-group/ContactsInGroupAPI';
import filterHelper from '../../../helpers/FilterHelper';

class ContactsInGroupListApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contactsInGroup: [],
        };
    }

    componentDidMount() {
        this.fetchContactsInGroup(this.props.params.contactGroup);
        this.props.fetchContactGroupDetails(this.props.params.contactGroup);
    }

    componentWillUnmount() {
        this.props.clearContactsInGroup();
        this.props.clearContactGroupDetails();
    }

    refreshContactsInGroupData = (page = null) => {
        this.props.clearContactsInGroup();
        this.fetchContactsInGroup(this.props.params.contactGroup, page);
    };

    fetchContactsInGroup = (groupId, page = null) => {
        const pagination = { limit: 50, offset: page };
        const filters = filterHelper(this.props.contactsInGroupFilters);
        console.log(this.props.contactsInGroupFilters);
        ContactsInGroupAPI.fetchContactsInGroupPaginated(groupId, pagination, filters).then(payload => {
            this.setState({ contactsInGroup: payload.gridContactGroupContacts });
            this.setState({ total: payload.total });
        });
    };

    onSubmitFilter() {
        console.log('test');
        this.fetchContactsInGroup(this.props.params.contactGroup, 0);
        console.log(this.state.contactsInGroup);
    }

    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-md-12 margin-10-top">
                            <ContactsInGroupListToolbar
                                refreshContactsInGroupData={this.refreshContactsInGroupData}
                                groupId={this.props.params.contactGroup}
                            />
                        </div>

                        <div className="col-md-12 margin-10-top">
                            <ContactsInGroupList
                                contactsInGroup={this.state.contactsInGroup}
                                total={this.state.total}
                                groupId={this.props.params.contactGroup}
                                refreshContactsInGroupData={this.refreshContactsInGroupData}
                                onSubmitFilter={() => this.onSubmitFilter()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        contactsInGroup: state.contactsInGroup,
        total: state.total,
        contactsInGroupFilters: state.contactsInGroup.filters,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ clearContactsInGroup, fetchContactGroupDetails, clearContactGroupDetails }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsInGroupListApp);
