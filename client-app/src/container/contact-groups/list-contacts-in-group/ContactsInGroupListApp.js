import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// todo WM: opschonen ContactsInGroup
// import { fetchContactsInGroup, clearContactsInGroup } from '../../../actions/contact-group/ContactsInGroupActions';
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
        // todo WM: opschonen ContactsInGroup
        // this.props.fetchContactsInGroup(this.props.params.contactGroup);
        this.props.fetchContactGroupDetails(this.props.params.contactGroup);
    }

    componentWillUnmount() {
        // todo WM: opschonen ContactsInGroup
        // this.props.clearContactsInGroup();
        this.props.clearContactGroupDetails();
    }

    // todo WM: opschonen ContactsInGroup
    // refreshContactsInGroupData = () => {
    //     this.props.clearContactsInGroup();
    //     this.props.fetchContactsInGroup(this.props.params.contactGroup);
    // };

    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-md-12 margin-10-top">
                            <ContactsInGroupListToolbar
                                // todo WM: opschonen ContactsInGroup
                                // refreshContactsInGroupData={this.refreshContactsInGroupData}
                                groupId={this.props.params.contactGroup}
                            />
                        </div>

                        <div className="col-md-12 margin-10-top">
                            <ContactsInGroupList
                                groupId={this.props.params.contactGroup}
                                // todo WM: opschonen ContactsInGroup
                                // refreshContactsInGroupData={this.refreshContactsInGroupData}
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
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        // todo WM: opschonen ContactsInGroup
        // { fetchContactsInGroup, clearContactsInGroup, fetchContactGroupDetails, clearContactGroupDetails },
        { fetchContactGroupDetails, clearContactGroupDetails },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsInGroupListApp);
