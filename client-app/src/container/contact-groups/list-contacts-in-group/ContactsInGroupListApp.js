import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchContactsInGroup, clearContactsInGroup } from '../../../actions/contact-group/ContactsInGroupActions';
import {
    fetchContactGroupDetails,
    clearContactGroupDetails,
} from '../../../actions/contact-group/ContactGroupDetailsActions';

import ContactsInGroupList from './ContactsInGroupList';
import ContactsInGroupListToolbar from './ContactsInGroupListToolbar';

class ContactsInGroupListApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchContactsInGroup(this.props.params.contactGroup);
        this.props.fetchContactGroupDetails(this.props.params.contactGroup);
    }

    componentWillUnmount() {
        this.props.clearContactsInGroup();
        this.props.clearContactGroupDetails();
    }

    refreshContactsInGroupData = () => {
        this.props.clearContactsInGroup();
        this.props.fetchContactsInGroup(this.props.params.contactGroup);
    };

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
                                contactsInGroup={this.props.contactsInGroup}
                                groupId={this.props.params.contactGroup}
                                refreshContactsInGroupData={this.refreshContactsInGroupData}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    // todo WM: opschonen
    // console.log('state - contactsInGroup');
    // console.log(state.contactsInGroup);
    return {
        contactsInGroup: state.contactsInGroup,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        { fetchContactsInGroup, clearContactsInGroup, fetchContactGroupDetails, clearContactGroupDetails },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsInGroupListApp);
