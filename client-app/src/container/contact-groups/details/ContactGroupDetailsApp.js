import React, { Component } from 'react';
import { connect } from 'react-redux';

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

class ContactGroupDetailsApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchContactGroupDetails(this.props.params.id);
    }

    componentWillUnmount() {
        this.props.clearContactGroupDetails();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.params.id !== nextProps.params.id) {
            this.props.fetchContactGroupDetails(nextProps.params.id);
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <ContactGroupDetailsToolbar />
                    </div>

                    <div className="col-md-12">
                        <ContactGroupDetailsForm mode={this.props.params.mode} />
                    </div>

                    {this.props.contactGroupDetails.type && this.props.contactGroupDetails.type.id === 'dynamic' && (
                        <div className="col-md-12">
                            <ContactGroupFilters />
                        </div>
                    )}

                    {this.props.contactGroupDetails.type && this.props.contactGroupDetails.type.id === 'dynamic' && (
                        <div className="col-md-12">
                            <ContactGroupExtraFilters />
                        </div>
                    )}
                    {this.props.contactGroupDetails.type && this.props.contactGroupDetails.type.id === 'composed' && (
                        <div className="col-md-12">
                            <ContactGroupComposedGroups />
                        </div>
                    )}
                </div>
                <Panel className="col-md-3">
                    <PanelBody>
                        <ContactGroupsDetailsHarmonica id={this.props.params.id} />
                    </PanelBody>
                </Panel>
            </div>
        );
    }
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactGroupDetailsApp);
