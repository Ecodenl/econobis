import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ContactGroupAPI from '../../../api/contact-group/ContactGroupAPI';
import ButtonIcon from '../../../components/button/ButtonIcon';
import fileDownload from 'js-file-download';
import moment from 'moment/moment';
import { blockUI, unblockUI } from '../../../actions/general/BlockUIActions';

import EmailGenericAPI from '../../../api/email/EmailGenericAPI';
import { hashHistory } from 'react-router';
import { EmailModalContext } from '../../../context/EmailModalContext';
import MailboxAPI from '../../../api/mailbox/MailboxAPI';
import ErrorModal from '../../../components/modal/ErrorModal';

const ContactsInGroupListToolbar = ({ contactGroupDetails, blockUI, unblockUI, refreshContactsInGroupData }) => {
    const [showModalError, setShowModalError] = useState(false);
    const { openEmailSendModal } = useContext(EmailModalContext);

    const closeModalError = () => {
        setShowModalError(false);
    };

    const toggleModalError = () => {
        setShowModalError(!showModalError);
    };

    const sendEmail = () => {
        MailboxAPI.fetchMailboxesLoggedInUserPeek().then(payload => {
            if (payload.data.data.length > 0) {
                EmailGenericAPI.storeGroupMail(contactGroupDetails.id).then(payload => {
                    // console.log('mail test 2');
                    // console.log(payload);
                    openEmailSendModal(payload.data.id);
                });
            } else {
                toggleModalError();
            }
        });
    };

    const getCSV = () => {
        blockUI();
        ContactGroupAPI.getCsv(contactGroupDetails.id)
            .then(payload => {
                fileDownload(
                    payload.data,
                    'Groep-' +
                        contactGroupDetails.name.substring(0, 20) +
                        '-' +
                        moment().format('YYYY-MM-DD HH:mm:ss') +
                        '.csv'
                );
                unblockUI();
            })
            .catch(error => {
                unblockUI();
            });
    };

    const openGroupDetails = () => {
        hashHistory.push(`/contact-groep/${contactGroupDetails.id}`);
    };

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'refresh'} onClickAction={refreshContactsInGroupData} />
                    <ButtonIcon iconName={'download'} onClickAction={getCSV} />
                    <ButtonIcon iconName={'envelopeO'} onClickAction={sendEmail} />
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title" onClick={openGroupDetails} role="button">
                    Contacten in groep: {contactGroupDetails.name}
                </h3>
            </div>
            <div className="col-md-4" />

            {showModalError && (
                <ErrorModal
                    closeModal={closeModalError}
                    title={'Waarschuwing'}
                    errorMessage={
                        'Je bent nog niet toegevoegd aan een mailbox en kan geen groepsmail versturen. Toevoegen aan mailboxen kan via instellingen > mailboxen mits je de juiste rechten hebt!'
                    }
                />
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        contactGroupDetails: state.contactGroupDetails,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ blockUI, unblockUI }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsInGroupListToolbar);
