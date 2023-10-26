import React, {useContext, useState} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ContactListAddPersonToGroup from './ContactListAddPersonToGroup';
import ContactGroupAPI from '../../../api/contact-group/ContactGroupAPI';
import ButtonIcon from '../../../components/button/ButtonIcon';
import fileDownload from 'js-file-download';
import moment from 'moment/moment';
import { blockUI, unblockUI } from '../../../actions/general/BlockUIActions';

import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus';
import EmailGenericAPI from "../../../api/email/EmailGenericAPI";
import {hashHistory} from "react-router";
import {EmailModalContext} from "../../../context/EmailModalContext";

const ContactsInGroupListToolbar = ({
                                        permissions,
                                        contactGroupDetails,
                                        blockUI,
                                        unblockUI,
                                        refreshContactsInGroupData,
                                    }) => {
    const [showModalAddToGroup, setShowModalAddToGroup] = useState(false);
    const { openEmailSendModal } = useContext(EmailModalContext);

    const closeModalAddToGroup = () => {
        setShowModalAddToGroup(false);
    };

    const addPersonToGroup = (contactId) => {
        const contact = {
            groupId: contactGroupDetails.id,
            contactId,
        };

        ContactGroupAPI.addContactToGroup(contact).then(() => {
            setShowModalAddToGroup(false);
            refreshContactsInGroupData();
        });
    };

    const toggleModalAddToGroup = () => {
        setShowModalAddToGroup(!showModalAddToGroup);
    };

    const sendEmail = () => {
        EmailGenericAPI.storeGroupMail(contactGroupDetails.id).then((payload) => {
            openEmailSendModal(payload.data.id);
        });
    };

    const getCSV = () => {
        blockUI();
        ContactGroupAPI.getCsv(contactGroupDetails.id)
            .then((payload) => {
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
            .catch((error) => {
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
                    <ButtonIcon
                        iconName={'refresh'}
                        onClickAction={refreshContactsInGroupData}
                    />
                    {(permissions.updateContactGroupMembers ||
                            (permissions.updatePerson && permissions.updateOrganisation)) &&
                        contactGroupDetails.type &&
                        contactGroupDetails.type.id === 'static' && (
                            <div className="nav navbar-nav btn-group">
                                <button
                                    onClick={toggleModalAddToGroup}
                                    className="btn btn-success btn-sm"
                                >
                                    <Icon size={14} icon={plus} />
                                </button>
                            </div>
                        )}
                    <ButtonIcon iconName={'download'} onClickAction={getCSV} />
                    <ButtonIcon iconName={'envelopeO'} onClickAction={sendEmail} />
                </div>
            </div>
            <div className="col-md-4">
                <h3
                    className="text-center table-title"
                    onClick={openGroupDetails}
                    role="button"
                >
                    Contacten in groep: {contactGroupDetails.name}
                </h3>
            </div>
            <div className="col-md-4" />

            {showModalAddToGroup && (
                <ContactListAddPersonToGroup
                    closeModalAddToGroup={closeModalAddToGroup}
                    addPersonToGroup={addPersonToGroup}
                    groupName={contactGroupDetails.name}
                    sendEmailNewContactLink={contactGroupDetails.sendEmailNewContactLink}
                    inspectionPersonTypeId={contactGroupDetails.inspectionPersonTypeId}
                />
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions,
        contactGroupDetails: state.contactGroupDetails,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ blockUI, unblockUI }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactsInGroupListToolbar);
