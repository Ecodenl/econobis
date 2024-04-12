import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../components/modal/Modal';
import { updateContactInGroup } from '../../../actions/contact-group/ContactsInGroupActions';
import InputDate from '../../../components/form/InputDate';
import InputText from '../../../components/form/InputText';
import moment from 'moment';

class ContactsEditItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            memberToGroupSince: props.memberToGroupSince,
        };
    }

    handleChangeDate = memberToGroupSince => {
        const formattedDate = memberToGroupSince ? moment(memberToGroupSince).format('Y-MM-DD') : '';

        this.setState({
            ...this.state,
            memberToGroupSince: formattedDate,
        });
    };

    render() {
        const confirmAction = () => {
            this.props.updateContactInGroup(this.props.groupId, this.props.id, {
                memberToGroupSince: this.state.memberToGroupSince,
            });
            setTimeout(() => {
                this.props.closeEditItemModal();
                this.props.refreshContactsInGroupData();
            }, 1000);
        };

        return (
            <Modal
                buttonConfirmText="Opslaan"
                buttonClassName={'btn-danger'}
                closeModal={this.props.closeEditItemModal}
                confirmAction={() => confirmAction()}
                title="Wijzigen"
            >
                <div className="row">
                    <InputText
                        label={'Contact email'}
                        divSize={'col-xs-12'}
                        name={'emailAddress'}
                        value={this.props.emailAddress}
                        readOnly={true}
                    />
                </div>
                <div className="row">
                    <InputDate
                        label={'Wijzig datum toegevoegd aan groep op'}
                        divSize={'col-xs-12'}
                        name={'memberToGroupSince'}
                        value={this.props.memberToGroupSince}
                        onChangeAction={this.handleChangeDate}
                    />
                </div>
                <br />
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateContactInGroup: (contactGroupId, id, memberToGroupSince) => {
        dispatch(updateContactInGroup(contactGroupId, id, memberToGroupSince));
    },
});

export default connect(null, mapDispatchToProps)(ContactsEditItem);
