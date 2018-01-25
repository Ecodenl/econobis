import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchContactGroups, clearContactGroups } from '../../../actions/contact/ContactGroupsActions';
import ContactGroupsList from './ContactGroupsList';
import ContactGroupsListToolbar from './ContactGroupsListToolbar';
import Panel from "../../../components/panel/Panel";
import PanelBody from "../../../components/panel/PanelBody";

class ContactGroupsListApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchContactGroups();
    };

    componentWillUnmount() {
        this.props.clearContactGroups();
    };

    refreshContactGroupsData = () => {
        this.props.clearContactGroups();
        this.props.fetchContactGroups();
    };

    render() {
        return (
            <Panel className="col-md-9">
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <ContactGroupsListToolbar
                            refreshContactGroupsData={() => this.refreshContactGroupsData()}
                        />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <ContactGroupsList
                            contactGroups={this.props.contactGroups}
                        />
                    </div>
                </PanelBody>
            </Panel>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        contactGroups: state.contactGroups,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchContactGroups: () => {
        dispatch(fetchContactGroups());
    },
    clearContactGroups: () => {
        dispatch(clearContactGroups());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactGroupsListApp);