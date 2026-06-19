import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useParams } from 'react-router-dom';

import {
    fetchContactGroupDetails,
    clearContactGroupDetails,
} from '../../../actions/contact-group/ContactGroupDetailsActions';

import ContactsInGroupList from './ContactsInGroupList';
import ContactsInGroupListToolbar from './ContactsInGroupListToolbar';

function ContactsInGroupListApp({ fetchContactGroupDetails, clearContactGroupDetails }) {
    const params = useParams();

    useEffect(() => {
        fetchContactGroupDetails(params.contactGroup);
        return () => {
            clearContactGroupDetails();
        };
    }, [fetchContactGroupDetails, clearContactGroupDetails, params.contactGroup]);

    return (
        <div>
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="col-md-12 margin-10-top">
                        <ContactsInGroupListToolbar groupId={params.contactGroup} />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <ContactsInGroupList groupId={params.contactGroup} />
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ fetchContactGroupDetails, clearContactGroupDetails }, dispatch);
};

export default connect(null, mapDispatchToProps)(ContactsInGroupListApp);
