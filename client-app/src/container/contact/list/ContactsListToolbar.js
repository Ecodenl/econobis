import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory, Link } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';
import ContactsDeleteSelectedItems from './ContactsDeleteSelectedItems';
import ContactListAddContactsToGroup from './ContactListAddContactsToGroup';
import { FaRegLightbulb } from 'react-icons/fa';
import { FaFire } from 'react-icons/fa';
import { plus } from 'react-icons-kit/fa/plus';
import { share } from 'react-icons-kit/fa/share';

import ContactsMergeSelectedItems from './ContactsMergeSelectedItems';
import Icon from 'react-icons-kit';

class ContactsListToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDeleteSelectedItems: false,
            showMergeSelectedItems: false,
            showAddContactsToGroup: false,
        };
    }

    toggleShowDeleteSelectedItems = () => {
        this.setState({
            showDeleteSelectedItems: !this.state.showDeleteSelectedItems,
        });
    };

    toggleShowMergeSelectedItems = () => {
        this.setState({
            showMergeSelectedItems: !this.state.showMergeSelectedItems,
        });
    };

    toggleAddContactsToGroup = () => {
        this.setState({
            showAddContactsToGroup: !this.state.showAddContactsToGroup,
        });
    };

    newContact = () => {
        hashHistory.push(`/contact/nieuw`);
    };

    importContacts = () => {
        hashHistory.push(`/contact/import`);
    };

    render() {
        const { permissions = {} } = this.props.meDetails;
        const { meta = {} } = this.props.contacts;

        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group" role="group">
                        <ButtonIcon
                            iconName={'refresh'}
                            onClickAction={this.props.resetContactFilters}
                            title="Vernieuwen scherm"
                        />
                        {permissions.createPerson || permissions.createOrganisation || permissions.manageGroup ? (
                            <div className="nav navbar-nav btn-group" role="group">
                                <button
                                    className="btn btn-success btn-sm"
                                    data-toggle="dropdown"
                                    title="Toevoegen contact of groep"
                                >
                                    <Icon size={14} icon={plus} />
                                </button>
                                <ul className="dropdown-menu">
                                    {permissions.createPerson && (
                                        <li>
                                            <Link to="contact/nieuw/persoon">Persoon</Link>
                                        </li>
                                    )}
                                    {permissions.createOrganisation && (
                                        <li>
                                            <Link to="contact/nieuw/organisatie">Organisatie</Link>
                                        </li>
                                    )}
                                    {permissions.manageGroup && (
                                        <li>
                                            <Link role="button" onClick={this.props.toggleSaveAsGroup}>
                                                Groep
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        ) : null}
                        {permissions.updatePerson && permissions.updateOrganisation && permissions.manageGroup && (
                            <div className="nav navbar-nav btn-group" role="group">
                                <button
                                    className="btn btn-success btn-sm"
                                    data-toggle="dropdown"
                                    title="Contactselectie toevoegen aan groep"
                                >
                                    <Icon size={14} icon={share} />
                                </button>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a role="button" onClick={this.toggleAddContactsToGroup}>
                                            Voeg toe aan groep
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        )}
                        {(permissions.deletePerson || permissions.deleteOrganisation) && (
                            <ButtonIcon
                                iconName={'trash'}
                                onClickAction={this.toggleShowDeleteSelectedItems}
                                title="Verwijderen geselecteerde contacten"
                            />
                        )}
                        {(permissions.deletePerson || permissions.deleteOrganisation || permissions.manageGroup) && (
                            <ButtonIcon
                                iconName={'check'}
                                onClickAction={this.props.toggleShowCheckboxList}
                                title="Contactselectie maken"
                            />
                        )}
                        <ButtonIcon
                            iconName={'filter'}
                            onClickAction={this.props.toggleShowExtraFilters}
                            title="Contactfilters"
                        />
                        {permissions.downloadContact && (
                            <ButtonIcon
                                iconName={'download'}
                                onClickAction={this.props.getCSV}
                                title="Downloaden contacten naar CSV"
                            />
                        )}
                        {permissions.downloadContact && (
                            <ButtonIcon
                                iconName={'download'}
                                onClickAction={this.props.getEnergySuppliersCSV}
                                title="Downloaden contacten energieleveranciers gegevens naar CSV"
                            />
                        )}
                        {permissions.import && (
                            <ButtonIcon
                                iconName={'upload'}
                                onClickAction={this.importContacts}
                                title="Importeren contacten"
                            />
                        )}
                        {permissions.downloadContactConsumption && meta.useExportAddressConsumption && (
                            <>
                                <a
                                    role="button"
                                    className={'btn btn-success btn-sm'}
                                    onClick={this.props.getExcelAddressEnergyConsumptionElectricity}
                                    title="Downloaden electriciteit verbruik"
                                >
                                    <FaRegLightbulb width={'13px'} height={'12px'} />
                                </a>
                                <a
                                    role="button"
                                    className={'btn btn-success btn-sm'}
                                    onClick={this.props.getExcelAddressEnergyConsumptionGas}
                                    title="Downloaden gas verbruik"
                                >
                                    <FaFire width={'13px'} height={'12px'} />
                                </a>
                            </>
                        )}
                        <ButtonIcon
                            iconName={'compress'}
                            onClickAction={this.toggleShowMergeSelectedItems}
                            title="Contacten samenvoegen"
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <h3 className="text-center table-title">Contacten</h3>
                </div>
                <div className="col-md-4">
                    <div className="pull-right">Resultaten: {meta.total || 0}</div>
                </div>
                {this.state.showDeleteSelectedItems && (
                    <ContactsDeleteSelectedItems toggleShowDeleteSelectedItems={this.toggleShowDeleteSelectedItems} />
                )}
                {this.state.showAddContactsToGroup && (
                    <ContactListAddContactsToGroup toggleAddGroup={this.toggleAddContactsToGroup} />
                )}
                {this.state.showMergeSelectedItems && (
                    <ContactsMergeSelectedItems
                        toggleShowMergeSelectedItems={this.toggleShowMergeSelectedItems}
                        contacts={this.props.contacts}
                        fetchContactsData={this.props.fetchContactsData}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        meDetails: state.meDetails,
        contacts: state.contacts.list,
    };
};

export default connect(mapStateToProps, null)(ContactsListToolbar);
