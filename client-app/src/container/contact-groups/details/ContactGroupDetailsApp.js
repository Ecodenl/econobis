import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
    fetchContactGroupDetails,
    clearContactGroupDetails,
} from '../../../actions/contact-group/ContactGroupDetailsActions';
import ContactGroupDetailsToolbar from './ContactGroupDetailsToolbar';
import ContactGroupDetailsForm from './ContactGroupDetailsForm';
import ContactGroupExtraFilters from './extra-filters/ContactGroupExtraFilters';
import ContactGroupFilters from './filters/ContactGroupFilters';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ContactGroupsDetailsHarmonica from './ContactGroupsDetailsHarmonica';
import ContactGroupComposedGroups from './composed-groups/ContactGroupComposedGroups';

function ContactGroupDetailsApp(props) {
    const params = useParams();

    useEffect(() => {
        callFetchContactGroupDetails(params.id);
    }, [params.id]);

    function callFetchContactGroupDetails(id) {
        props.clearContactGroupDetails();
        props.fetchContactGroupDetails(id);
    }

    return (
        <div className="row">
            <div className="col-md-9">
                <div className="col-md-12">
                    <ContactGroupDetailsToolbar
                        callFetchContactGroupDetails={() => callFetchContactGroupDetails(params.id)}
                    />
                </div>

                <div className="col-md-12">
                    <ContactGroupDetailsForm mode={params.mode} />
                </div>

                {props.contactGroupDetails.type && props.contactGroupDetails.type.id === 'dynamic' && (
                    <div className="col-md-12">
                        <ContactGroupFilters />
                    </div>
                )}

                {props.contactGroupDetails.type && props.contactGroupDetails.type.id === 'dynamic' && (
                    <div className="col-md-12">
                        <ContactGroupExtraFilters />
                    </div>
                )}
                {props.contactGroupDetails.type && props.contactGroupDetails.type.id === 'composed' && (
                    <div className="col-md-12">
                        <ContactGroupComposedGroups />
                    </div>
                )}
            </div>
            <Panel className="col-md-3 harmonica">
                <PanelBody>
                    <ContactGroupsDetailsHarmonica id={params.id} />
                </PanelBody>
            </Panel>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        userDetails: state.userDetails,
        contactGroupDetails: state.contactGroupDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchContactGroupDetails: id => {
        dispatch(fetchContactGroupDetails(id));
    },
    clearContactGroupDetails: () => {
        dispatch(clearContactGroupDetails());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactGroupDetailsApp);
