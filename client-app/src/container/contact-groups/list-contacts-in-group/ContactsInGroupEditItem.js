import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../components/modal/Modal';
import { fetchContactsInGroup, updateContactInGroup } from '../../../actions/contact-group/ContactsInGroupActions';
import InputDate from '../../../components/form/InputDate';
import InputText from '../../../components/form/InputText';
import moment from 'moment';

class ContactsEditItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lapostaMemberSince: props.lapostaMemberSince,
        };
    }

    handleChangeDate = lapostaMemberSince => {
        const formattedDate = lapostaMemberSince ? moment(lapostaMemberSince).format('Y-MM-DD') : '';

        this.setState({
            ...this.state,
            lapostaMemberSince: formattedDate,
        });
    };

    render() {
        const confirmAction = () => {
            this.props.updateContactInGroup(this.props.groupId, this.props.id, {
                lapostaMemberSince: this.state.lapostaMemberSince,
            });
            setTimeout(() => {
                this.props.refreshContactsInGroupData();
            }, 500);
            this.props.closeEditItemModal();
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
                        label={'Wijzig datum toegevoegd op'}
                        divSize={'col-xs-12'}
                        name={'lapostaMemberSince'}
                        value={this.props.lapostaMemberSince}
                        onChangeAction={this.handleChangeDate}
                    />
                </div>
                <br />
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateContactInGroup: (contactGroupId, id, lapostaMemberSince) => {
        dispatch(updateContactInGroup(contactGroupId, id, lapostaMemberSince));
    },
});

export default connect(null, mapDispatchToProps)(ContactsEditItem);
