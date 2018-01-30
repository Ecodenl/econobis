import React, {Component} from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';

import DeleteContactFromGroup from './ContactDetailsFormGroupDelete';
import ContactGroupAPI from '../../../../api/contact-group/ContactGroupAPI';
import { fetchContactDetails } from '../../../../actions/contact/ContactDetailsActions';

class ContactGroupsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: '',
            loading: true,
            showModalDeleteFromGroup: false,
            group: ''
        };
    }

    toggleDeleteFromGroup = (group) => {
        this.setState({
            showModalDeleteFromGroup: !this.state.showModalDeleteFromGroup,
            group: group
        });
    };

    closeDeleteItemModal  = () => {
        this.setState({
            showModalDeleteFromGroup: false,
            groupId: ''
        });
    };

    openGroup = (id) => {
        hashHistory.push(`/contact-groep/${id}`);
    };

    componentDidMount() {
        ContactGroupAPI.fetchGroupsByContact(this.props.contactDetailsId).then((payload) => {
            this.setState({groups: payload, loading: false});
        });
    }

    deleteContactFromGroup = (groupId, contactId) => {
        ContactGroupAPI.deleteContactFromGroup(groupId, contactId).then((payload) => {
            ContactGroupAPI.fetchGroupsByContact(contactId).then((payload) => {
                this.setState({groups: payload, loading: false});
                this.props.fetchContactDetails(contactId);
            });
        });
    }

    render() {
        const {groups, loading} = this.state;
        return (
            <div>
                {loading &&
                <div>Laden</div>
                }

                {groups == '' && !loading &&
                <div>Geen groepen gevonden</div>
                }

                {groups != '' && !loading &&
                <table className="table harmonica-table">
                    <tbody>
                    {groups.map((group, i) => {
                        return (
                            <tr key={i}>
                                <td className='col-xs-10 clickable'
                                    onClick={() => this.openGroup(group.id)}>{group.name}</td>
                                <td className='col-xs-2'><a role="button"
                                                            onClick={() => this.toggleDeleteFromGroup(group)}
                                                            className="pull-right"><span
                                    className="glyphicon glyphicon-trash glyphicon-white"/></a></td>
                            </tr>
                        )
                    })
                    }
                    </tbody>
                </table>
                }
                {this.state.showModalDeleteFromGroup &&
                <DeleteContactFromGroup
                    closeDeleteItemModal={this.closeDeleteItemModal}
                    deleteContactFromGroup={this.deleteContactFromGroup}
                    group={this.state.group}
                />
                }
            </div>


            )
    }
};

const mapStateToProps = (state) => {
    return {
        contactDetailsId: state.contactDetails.id,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchContactDetails: (id) => {
        dispatch(fetchContactDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactGroupsList);