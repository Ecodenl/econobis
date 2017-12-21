import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchContactGroups, clearContactGroups } from '../../../actions/contact/ContactGroupsActions';
import ContactGroupsList from './ContactGroupsList';
import ContactGroupsListToolbar from './ContactGroupsListToolbar';

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
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-md-9 extra-space-above">
                            <ContactGroupsListToolbar
                                refreshContactGroupsData={() => this.refreshContactGroupsData()}
                            />
                        </div>

                        <div className="col-md-9 extra-space-above">
                            <ContactGroupsList
                                contactGroups={this.props.contactGroups}
                            />
                        </div>
                    </div>
                </div>
            </div>
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