import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../components/button/ButtonIcon';
import ContactsDeleteSelectedItems from './ContactsDeleteSelectedItems';
import ContactListAddContactsToGroup from './ContactListAddContactsToGroup';
import { FaInfoCircle, FaRegLightbulb } from 'react-icons/fa';
import { FaFire } from 'react-icons/fa';
import { plus } from 'react-icons-kit/fa/plus';
import { share } from 'react-icons-kit/fa/share';

import ContactsMergeSelectedItems from './ContactsMergeSelectedItems';
import Icon from 'react-icons-kit';
import ReactTooltip from 'react-tooltip';

// Functionele wrapper voor de class component
const ContactsListToolbarWrapper = props => {
    const navigate = useNavigate();
    return <ContactsListToolbar {...props} navigate={navigate} />;
};

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
        this.props.navigate(`/contact/nieuw`);
    };

    importContacts = () => {
        this.props.navigate(`/contact/import`);
    };

    render() {
        const { permissions = {} } = this.props.meDetails;
        const { meta = {} } = this.props.contacts;
        const { dataControleType = false, showCheckboxList = false, showCheckboxListMerge = false } = this.props;

        const dataControleTypeText = () => {
            if (dataControleType) {
                switch (dataControleType) {
                    case 'zelfde-email-naam':
                        return '(met zelfde email en naam)';
                    case 'zelfde-email-adres':
                        return '(met zelfde email en adres)';
                    case 'zelfde-email':
                        return '(met zelfde email)';
                    case 'zelfde-adres':
                        return '(met zelfde adres)';
                    case 'zelfde-kvknummer':
                        return '(met zelfde kvk nummer)';
                    case 'zelfde-btwnummer':
                        return '(met zelfde btw nummer)';
                    case 'zelfde-iban':
                        return '(met zelfde iban)';
                }
            }
            return '';
        };

        return (
            <>
                <div className="row">
                    <div className="col-md-4">
                        <div className="btn-group" role="group">
                            <ButtonIcon
                                iconName={'refresh'}
                                onClickAction={this.props.resetContactFilters}
                                title="Vernieuwen scherm"
                            />
                            {!dataControleType &&
                            !showCheckboxListMerge &&
                            (permissions.createPerson || permissions.createOrganisation || permissions.manageGroup) ? (
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
                                                <Link to="/contact/nieuw/persoon">Persoon</Link>
                                            </li>
                                        )}
                                        {permissions.createOrganisation && (
                                            <li>
                                                <Link to="/contact/nieuw/organisatie">Organisatie</Link>
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
                            {!dataControleType &&
                                !showCheckboxListMerge &&
                                (permissions.deletePerson ||
                                    permissions.deleteOrganisation ||
                                    permissions.manageGroup) && (
                                    <ButtonIcon
                                        iconName={'check'}
                                        onClickAction={this.props.toggleShowCheckboxList}
                                        title="Contactselectie maken"
                                    />
                                )}
                            {!dataControleType &&
                                showCheckboxList &&
                                permissions.updatePerson &&
                                permissions.updateOrganisation &&
                                permissions.manageGroup && (
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
                            {!dataControleType &&
                                showCheckboxList &&
                                (permissions.deletePerson || permissions.deleteOrganisation) && (
                                    <ButtonIcon
                                        iconName={'trash'}
                                        onClickAction={this.toggleShowDeleteSelectedItems}
                                        title="Verwijderen geselecteerde contacten"
                                    />
                                )}
                            {!dataControleType && !showCheckboxList && !showCheckboxListMerge && (
                                <ButtonIcon
                                    iconName={'filter'}
                                    onClickAction={this.props.toggleShowExtraFilters}
                                    title="Contactfilters"
                                />
                            )}
                            {!showCheckboxList && !showCheckboxListMerge && permissions.downloadContact && (
                                <ButtonIcon
                                    iconName={'download'}
                                    onClickAction={this.props.getCSV}
                                    title="Downloaden contacten naar CSV"
                                />
                            )}
                            {!dataControleType &&
                                !showCheckboxList &&
                                !showCheckboxListMerge &&
                                permissions.downloadContact && (
                                    <ButtonIcon
                                        iconName={'download'}
                                        onClickAction={this.props.getFreeFieldsCSV}
                                        title="Downloaden vrije velden van contacten naar CSV"
                                    />
                                )}
                            {!dataControleType &&
                                !showCheckboxList &&
                                !showCheckboxListMerge &&
                                permissions.downloadContact && (
                                    <ButtonIcon
                                        iconName={'download'}
                                        onClickAction={this.props.getEnergySuppliersCSV}
                                        title="Downloaden contacten energieleveranciers gegevens naar CSV"
                                    />
                                )}
                            {!dataControleType && !showCheckboxList && !showCheckboxListMerge && permissions.import && (
                                <ButtonIcon
                                    iconName={'upload'}
                                    onClickAction={this.importContacts}
                                    title="Importeren contacten"
                                />
                            )}
                            {!dataControleType &&
                                !showCheckboxList &&
                                !showCheckboxListMerge &&
                                permissions.downloadContactConsumption &&
                                meta.useExportAddressConsumption && (
                                    <>
                                        <a
                                            role="button"
                                            className={'btn btn-success btn-sm'}
                                            onClick={this.props.getExcelAddressEnergyConsumptionElectricity}
                                            title="Downloaden elektriciteit verbruik"
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
                            {!showCheckboxList &&
                                (permissions.deletePerson ||
                                    permissions.deleteOrganisation ||
                                    permissions.manageGroup) && (
                                    <ButtonIcon
                                        iconName={'check'}
                                        onClickAction={this.props.toggleShowCheckboxListMerge}
                                        title="Contacten samenvoegen selectie"
                                    />
                                )}
                            {showCheckboxListMerge &&
                                (permissions.deletePerson ||
                                    permissions.deleteOrganisation ||
                                    permissions.manageGroup) && (
                                    <ButtonIcon
                                        iconName={'compress'}
                                        onClickAction={this.toggleShowMergeSelectedItems}
                                        title="Contacten samenvoegen"
                                    />
                                )}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h3 className="text-center table-title">
                            Contacten {dataControleTypeText()}
                            {dataControleType && (
                                <>
                                    &nbsp;
                                    <FaInfoCircle
                                        color={'blue'}
                                        size={'15px'}
                                        data-tip={
                                            'Hier staan de contacten die op basis van het geselecteerde criterium als dubbel zijn gevonden.  Je kan deze ontdubbelen door op het de blauwe knop met het vinkje te klikken. (Contacten samenvoegen selectie) Als je twee contacten hebt geselecteerd kan je die samenvoegen door op de blauwe knop met twee pijltjes te klikken (Contacten samenvoegen) Hiermee worden de gegevens van het contact wat groen gemarkeerd is aangevuld. Het rood gemarkeerde contact wordt verwijderd.'
                                        }
                                        data-for={`tooltip-note`}
                                    />
                                    <ReactTooltip
                                        id={`tooltip-note`}
                                        effect="float"
                                        place="right"
                                        multiline={true}
                                        aria-haspopup="true"
                                    />
                                </>
                            )}
                        </h3>
                    </div>
                    <div className="col-md-4">
                        <div className="pull-right">Resultaten: {meta.total || 0}</div>
                    </div>
                    {this.state.showDeleteSelectedItems && (
                        <ContactsDeleteSelectedItems
                            toggleShowDeleteSelectedItems={this.toggleShowDeleteSelectedItems}
                        />
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
                {!dataControleType &&
                !showCheckboxList &&
                !showCheckboxListMerge &&
                this.props.cooperationExternalUrlContacts &&
                this.props.cooperationExternalUrlContacts.show_external_url_for_contacts ? (
                    <div className="row">
                        <div className="col-md-12" style={{ marginTop: '10px' }}>
                            <>
                                &nbsp;
                                <div className="btn-group" role="group">
                                    <a
                                        role="button"
                                        className={'btn btn-success btn-sm'}
                                        href={
                                            this.props.cooperationExternalUrlContacts.external_url_contacts
                                                ? this.props.cooperationExternalUrlContacts.external_url_contacts
                                                : ''
                                        }
                                        title={
                                            this.props.cooperationExternalUrlContacts.external_url_contacts_button_text
                                                ? this.props.cooperationExternalUrlContacts
                                                      .external_url_contacts_button_text
                                                : 'EXterne link'
                                        }
                                        target={
                                            this.props.cooperationExternalUrlContacts.external_url_contacts_on_new_page
                                                ? '_blank'
                                                : '_self'
                                        }
                                    >
                                        {this.props.cooperationExternalUrlContacts.external_url_contacts_button_text
                                            ? this.props.cooperationExternalUrlContacts
                                                  .external_url_contacts_button_text
                                            : 'EXterne link'}
                                    </a>
                                </div>
                            </>
                        </div>
                    </div>
                ) : null}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        meDetails: state.meDetails,
        contacts: state.contacts.list,
        cooperationExternalUrlContacts: state.systemData.cooperationExternalUrlContacts,
    };
};

export default connect(mapStateToProps, null)(ContactsListToolbarWrapper);
