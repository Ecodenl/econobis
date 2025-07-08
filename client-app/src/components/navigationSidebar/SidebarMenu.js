import React from 'react';
import { Link } from 'react-router-dom';
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import SvgIcon from 'react-icons-kit';
import { connect } from 'react-redux';

import { ic_aspect_ratio } from 'react-icons-kit/md/ic_aspect_ratio';
import { ic_dashboard } from 'react-icons-kit/md/ic_dashboard';
import { ic_business } from 'react-icons-kit/md/ic_business';
import { ic_contacts } from 'react-icons-kit/md/ic_contacts';
import { ic_contacts_outline } from 'react-icons-kit/md/ic_contacts_outline';
import { ic_email } from 'react-icons-kit/md/ic_email';
import { ic_fiber_new } from 'react-icons-kit/md/ic_fiber_new';
import { cog } from 'react-icons-kit/icomoon/cog';
import { documents } from 'react-icons-kit/ikons/documents';
import { calendar } from 'react-icons-kit/icomoon/calendar';
import { home } from 'react-icons-kit/icomoon/home';
import { drawer } from 'react-icons-kit/icomoon/drawer';
import { ic_business_center } from 'react-icons-kit/md/ic_business_center';
import { road } from 'react-icons-kit/icomoon/road';
import { forward } from 'react-icons-kit/icomoon/forward';
import { stopwatch } from 'react-icons-kit/icomoon/stopwatch';

const SidebarMenu = ({ permissions, administrations, mailboxesInvalid, useDongleRegistration }) => (
    <div className="sidebar-menu" style={{ background: '$brand-primary', color: '#FFF', width: '240px' }}>
        <SideNav highlightColor="#FFF" highlightBgColor="#27AE60" defaultSelected="dashboard">
            <Nav id="dashboard">
                <NavIcon>
                    <SvgIcon size={20} icon={ic_dashboard} />
                </NavIcon>
                <NavText>
                    <Link className="sidebar-link-header" to="/">
                        Dashboard
                    </Link>
                </NavText>
                {permissions.menuEnergySaving && (
                    <Nav id="dashboard-energy-saving">
                        <NavText>
                            <Link className="sidebar-link" to="dashboard/energie-besparing">
                                Energiebesparing
                            </Link>
                        </NavText>
                    </Nav>
                )}
                {permissions.manageParticipation && (
                    <Nav id="dashboard-participations">
                        <NavText>
                            <Link className="sidebar-link" to="dashboard/deelnames">
                                Deelnames
                            </Link>
                        </NavText>
                    </Nav>
                )}
                {permissions.manageFinancial && (
                    <Nav id="dashboard-financial">
                        <NavText>
                            <Link className="sidebar-link" to="dashboard/financieel">
                                Financieel
                            </Link>
                        </NavText>
                    </Nav>
                )}
            </Nav>

            {permissions.menuContacts && (
                <Nav id="contacten">
                    <NavIcon>
                        <SvgIcon size={20} icon={ic_contacts} />
                    </NavIcon>
                    <NavText>
                        <Link className="sidebar-link-header" to="contacten">
                            Contacten
                        </Link>
                    </NavText>
                    {permissions.menuOrganisations && (
                        <Nav id="alle-organisaties">
                            <NavText>
                                <Link className="sidebar-link" to="contacten/type/organisation">
                                    Alle organisaties
                                </Link>
                            </NavText>
                        </Nav>
                    )}
                    {permissions.menuPersons && (
                        <Nav id="alle-personen">
                            <NavText>
                                <Link className="sidebar-link" to="contacten/type/person">
                                    Alle personen
                                </Link>
                            </NavText>
                        </Nav>
                    )}
                </Nav>
            )}

            {permissions.menuContacts && (
                <Nav id="data-controle">
                    <NavIcon>
                        <SvgIcon size={20} icon={ic_contacts_outline} />
                    </NavIcon>
                    <NavText>Data controle</NavText>
                    <Nav id="data-controle-same-email-name">
                        <NavText>
                            <Link className="sidebar-link" to="contacten/data-controle/zelfde-email-naam">
                                Zelfde E-mail en naam
                            </Link>
                        </NavText>
                    </Nav>
                    <Nav id="data-controle-same-email-address">
                        <NavText>
                            <Link className="sidebar-link" to="contacten/data-controle/zelfde-email-adres">
                                Zelfde E-mail en adres
                            </Link>
                        </NavText>
                    </Nav>
                    <Nav id="data-controle-same-email">
                        <NavText>
                            <Link className="sidebar-link" to="contacten/data-controle/zelfde-email">
                                Zelfde E-mail
                            </Link>
                        </NavText>
                    </Nav>
                    <Nav id="data-controle-same-address">
                        <NavText>
                            <Link className="sidebar-link" to="contacten/data-controle/zelfde-adres">
                                Zelfde adres
                            </Link>
                        </NavText>
                    </Nav>
                    <Nav id="data-controle-same-kvk">
                        <NavText>
                            <Link className="sidebar-link" to="contacten/data-controle/zelfde-kvknummer">
                                Zelfde KvK nummer
                            </Link>
                        </NavText>
                    </Nav>
                    <Nav id="data-controle-same-btw">
                        <NavText>
                            <Link className="sidebar-link" to="contacten/data-controle/zelfde-btwnummer">
                                Zelfde BTW nummer
                            </Link>
                        </NavText>
                    </Nav>
                    <Nav id="data-controle-same-iban">
                        <NavText>
                            <Link className="sidebar-link" to="contacten/data-controle/zelfde-iban">
                                Zelfde IBAN
                            </Link>
                        </NavText>
                    </Nav>
                </Nav>
            )}

            {permissions.menuProjects && (
                <Nav id="projecten">
                    <NavIcon>
                        <SvgIcon size={20} icon={drawer} />
                    </NavIcon>
                    <NavText>
                        <Link className="sidebar-link-header">Projecten</Link>
                    </NavText>
                    <Nav id="projecten">
                        <NavText>
                            <Link className="sidebar-link" to="projecten">
                                Projecten
                            </Link>
                        </NavText>
                    </Nav>

                    {permissions.menuParticipation && (
                        <Nav id="deelnemers">
                            <NavText>
                                <Link className="sidebar-link" to="deelnemers">
                                    Deelnemers
                                </Link>
                            </NavText>
                        </Nav>
                    )}
                    {permissions.manageFinancial && (
                        <Nav id="waardestaten">
                            <NavText>
                                <Link className="sidebar-link" to="waardestaten">
                                    Waardestaten
                                </Link>
                            </NavText>
                        </Nav>
                    )}
                </Nav>
            )}

            {permissions.menuEnergySaving && (
                <Nav id="energy-saving">
                    <NavIcon>
                        <SvgIcon size={20} icon={home} />
                    </NavIcon>
                    <NavText> Energiebesparing </NavText>
                    {permissions.menuIntakes && (
                        <Nav id="intakes">
                            <NavText>
                                <Link className="sidebar-link" to="intakes">
                                    Intakes
                                </Link>
                            </NavText>
                        </Nav>
                    )}
                    {permissions.menuOpportunities && (
                        <Nav id="opportunities">
                            <NavText>
                                <Link className="sidebar-link" to="kansen">
                                    Kansen
                                </Link>
                            </NavText>
                        </Nav>
                    )}
                    {permissions.menuQuotationRequests && (
                        <Nav id="quotation-requests">
                            <NavText>
                                <Link className="sidebar-link" to="offerteverzoeken">
                                    Kansacties
                                </Link>
                            </NavText>
                        </Nav>
                    )}
                    {permissions.menuHousingFiles && (
                        <Nav id="home-files">
                            <NavText>
                                <Link className="sidebar-link" to="woningdossiers">
                                    Woningdossiers
                                </Link>
                            </NavText>
                        </Nav>
                    )}
                    {permissions.menuHousingFiles && (
                        <Nav id="home-files">
                            <NavText>
                                <Link className="sidebar-link" to="woningdossier-specificaties">
                                    Woningdossier specificaties
                                </Link>
                            </NavText>
                        </Nav>
                    )}
                    {permissions.menuMarketing && (
                        <Nav id="marketing-sub">
                            <NavText>
                                <Link className="sidebar-link" to="campagnes">
                                    Campagnes
                                </Link>
                            </NavText>
                        </Nav>
                    )}
                    {permissions.menuMeasures && (
                        <Nav id="measures">
                            <NavText>
                                <Link className="sidebar-link" to="maatregelen">
                                    Maatregelen
                                </Link>
                            </NavText>
                        </Nav>
                    )}
                    {permissions.menuDongles && useDongleRegistration == true && (
                        <Nav id="dongles">
                            <NavText>
                                <Link className="sidebar-link" to="dongels">
                                    Dongels
                                </Link>
                            </NavText>
                        </Nav>
                    )}
                </Nav>
            )}

            {permissions.menuContactGroups && (
                <Nav id="contact-groups">
                    <NavIcon>
                        <SvgIcon size={20} icon={ic_aspect_ratio} />
                    </NavIcon>
                    <NavText>
                        <Link className="sidebar-link-header" to="contact-groepen">
                            Groepen beheer
                        </Link>
                    </NavText>
                </Nav>
            )}

            {permissions.menuEmail && (
                <Nav id="mailclient">
                    <NavIcon>
                        <SvgIcon size={20} icon={ic_email} />
                    </NavIcon>
                    <NavText>
                        <Link className="sidebar-link-header" to="mailclient/inbox">
                            E-mail
                        </Link>
                    </NavText>
                    <Nav id="inbox">
                        <NavText>
                            <Link className="sidebar-link" to="mailclient/inbox">
                                Ontvangen
                            </Link>
                        </NavText>
                    </Nav>
                    <Nav id="sent">
                        <NavText>
                            <Link className="sidebar-link" to="mailclient/sent">
                                Verzonden
                            </Link>
                        </NavText>
                    </Nav>
                    <Nav id="concepts">
                        <NavText>
                            <Link className="sidebar-link" to="mailclient/concept">
                                Concepten
                            </Link>
                        </NavText>
                    </Nav>
                    <Nav id="removed">
                        <NavText>
                            <Link className="sidebar-link" to="mailclient/removed">
                                Verwijderd
                            </Link>
                        </NavText>
                    </Nav>
                </Nav>
            )}

            {permissions.menuEmail && (
                <Nav id="email">
                    <NavIcon>
                        <SvgIcon size={20} icon={ic_email} />
                    </NavIcon>
                    <NavText>
                        <Link className="sidebar-link-header" to="emails/inbox">
                            E-mail (oud)
                        </Link>
                    </NavText>
                    <Nav id="inbox">
                        <NavText>
                            <Link className="sidebar-link" to="emails/inbox">
                                Ontvangen
                            </Link>
                        </NavText>
                    </Nav>
                    <Nav id="sent">
                        <NavText>
                            <Link className="sidebar-link" to="emails/sent">
                                Verzonden
                            </Link>
                        </NavText>
                    </Nav>
                    <Nav id="concepts">
                        <NavText>
                            <Link className="sidebar-link" to="emails/concept">
                                Concepten
                            </Link>
                        </NavText>
                    </Nav>
                    <Nav id="removed">
                        <NavText>
                            <Link className="sidebar-link" to="emails/removed">
                                Verwijderd
                            </Link>
                        </NavText>
                    </Nav>
                </Nav>
            )}

            {permissions.menuTasks && (
                <Nav id="taken">
                    <NavIcon>
                        <SvgIcon size={20} icon={ic_business} />
                    </NavIcon>
                    <NavText>
                        <Link className="sidebar-link-header" to="taken">
                            Taken
                        </Link>
                    </NavText>
                    <Nav id="notities">
                        <NavText>
                            <Link className="sidebar-link" to="notities">
                                Notities
                            </Link>
                        </NavText>
                    </Nav>
                </Nav>
            )}

            {(permissions.menuAgenda || permissions.manageCoachPlanning) && (
                <Nav id="agenda">
                    <NavIcon>
                        <SvgIcon size={20} icon={calendar} />
                    </NavIcon>
                    <NavText>Planning</NavText>
                    <Nav key={'nav-agenda'} id={`agenda`}>
                        <NavText>
                            <Link className="sidebar-link-header" to="agenda">
                                Agenda
                            </Link>
                        </NavText>
                    </Nav>
                    {permissions.manageCoachPlanning && (
                        <Nav key={'nav-afspraak-kalender'} id={`afspraak-kalender`}>
                            <NavText>
                                <Link className="sidebar-link-header" to="afspraak-kalenders">
                                    Afspraakkalenders
                                </Link>
                            </NavText>
                        </Nav>
                    )}
                    {permissions.manageCoachPlanning && (
                        <Nav key={'nav-beschikbaarheid'} id={`beschikbaarheid`}>
                            <NavText>
                                <Link className="sidebar-link-header" to="beschikbaarheid">
                                    Beschikbaarheden
                                </Link>
                            </NavText>
                        </Nav>
                    )}
                </Nav>
            )}

            {permissions.menuProcesses && (
                <Nav id="processen">
                    <NavIcon>
                        <SvgIcon size={20} icon={stopwatch} />
                    </NavIcon>
                    <NavText>Logs</NavText>
                    <Nav key={'nav-processen'} id={`processen`}>
                        <NavText>
                            <Link className="sidebar-link-header" to="processen">
                                Processen
                            </Link>
                        </NavText>
                    </Nav>
                    <Nav key={'nav-twinfield'} id={`twinfield`}>
                        <NavText>
                            <Link className="sidebar-link-header" to="twinfield">
                                Twinfield
                            </Link>
                        </NavText>
                    </Nav>
                    <Nav key={'nav-housing-file-log'} id={`housing-file-log`}>
                        <NavText>
                            <Link className="sidebar-link-header" to="housing-file/log">
                                Hoomdossier
                            </Link>
                        </NavText>
                    </Nav>
                    <Nav key={'nav-mailgun-log'} id={`mailgun-log`}>
                        <NavText>
                            <Link className="sidebar-link-header" to="mailgun/log">
                                Mailgun
                            </Link>
                        </NavText>
                    </Nav>
                </Nav>
            )}

            {permissions.menuDocuments && permissions.viewDocument && (
                <Nav id="documenten">
                    <NavIcon>
                        <SvgIcon size={20} icon={documents} />
                    </NavIcon>
                    <NavText>
                        <Link className="sidebar-link-header" to="documenten">
                            Documenten
                        </Link>
                    </NavText>
                </Nav>
            )}

            {permissions.menuFinancial && permissions.manageFinancial && administrations.length > 0 && (
                <Nav id="financial">
                    <NavIcon>
                        <SvgIcon size={20} icon={ic_business_center} />
                    </NavIcon>
                    <NavText> Financieel </NavText>
                    {administrations.map((administration, i) => {
                        return (
                            <Nav key={i} id={`administration/${administration.id}`}>
                                <NavText>
                                    <Link className="sidebar-link" to={`/financieel/${administration.id}`}>
                                        {administration.name}
                                    </Link>
                                </NavText>
                            </Nav>
                        );
                    })}
                </Nav>
            )}

            {permissions.menuWorkflow && permissions.manageFinancial && (
                <Nav id="workflow">
                    <NavIcon>
                        <SvgIcon size={20} icon={forward} />
                    </NavIcon>
                    <NavText> Workflow </NavText>
                    <Nav id="taak-types">
                        <NavText>
                            <Link className="sidebar-link" to="taak-types">
                                Taak types
                            </Link>
                        </NavText>
                    </Nav>
                    <Nav id="offerte-verzoek-statussen">
                        <NavText>
                            <Link className="sidebar-link" to="offerte-verzoek-statussen">
                                Kansactie statussen
                            </Link>
                        </NavText>
                    </Nav>
                    <Nav id="kans-statussen">
                        <NavText>
                            <Link className="sidebar-link" to="kans-statussen">
                                Kans statussen
                            </Link>
                        </NavText>
                    </Nav>
                    <Nav id="maatregel-categorieen">
                        <NavText>
                            <Link className="sidebar-link" to="maatregel-categorieen">
                                Intake maatregelen
                            </Link>
                        </NavText>
                    </Nav>
                </Nav>
            )}

            {permissions.menuGeneralSettings && (
                <Nav id="instellingen">
                    <NavIcon>
                        <SvgIcon size={20} icon={cog} />
                    </NavIcon>
                    <NavText className={mailboxesInvalid ? 'sidebar__alert' : ''}> Instellingen </NavText>
                    {permissions.manageFinancial && (
                        <Nav id="administration">
                            <NavText>
                                <Link className="sidebar-link" to="administraties">
                                    Administraties
                                </Link>
                            </NavText>
                        </Nav>
                    )}
                    {permissions.manageCooperationSettings && (
                        <Nav id="cooperation">
                            <NavText>
                                <Link className="sidebar-link" to="cooperatie">
                                    Coöperatie
                                </Link>
                            </NavText>
                        </Nav>
                    )}
                    {permissions.manageWebform && (
                        <Nav id="webforms">
                            <NavText>
                                <Link className="sidebar-link" to="webformulieren">
                                    Webformulieren
                                </Link>
                            </NavText>
                        </Nav>
                    )}
                    {permissions.manageFinancial && (
                        <Nav id="products">
                            <NavText>
                                <Link className="sidebar-link" to="producten">
                                    Producten
                                </Link>
                            </NavText>
                        </Nav>
                    )}
                    {permissions.manageFinancial && (
                        <Nav id="btw-codes">
                            <NavText>
                                <Link className="sidebar-link" to="btw-codes">
                                    BTW codes
                                </Link>
                            </NavText>
                        </Nav>
                    )}
                    {permissions.manageFinancial && (
                        <Nav id="grootboekrekeningen">
                            <NavText>
                                <Link className="sidebar-link" to="grootboekrekeningen">
                                    Grootboekrekeningen
                                </Link>
                            </NavText>
                        </Nav>
                    )}
                    {permissions.manageFinancial && (
                        <Nav id="kostenplaatsen">
                            <NavText>
                                <Link className="sidebar-link" to="kostenplaatsen">
                                    Kostenplaatsen
                                </Link>
                            </NavText>
                        </Nav>
                    )}
                    {permissions.viewDocumentTemplate && (
                        <Nav id="documents">
                            <NavText>
                                <Link className="sidebar-link" to="document-templates">
                                    Document templates
                                </Link>
                            </NavText>
                        </Nav>
                    )}
                    {permissions.viewEmailTemplate && (
                        <Nav id="email-templates">
                            <NavText>
                                <Link className="sidebar-link" to="email-templates">
                                    E-mail templates
                                </Link>
                            </NavText>
                        </Nav>
                    )}
                    {permissions.viewUser && (
                        <Nav id="users">
                            <NavText>
                                <Link className="sidebar-link" to="gebruikers">
                                    Gebruikers
                                </Link>
                            </NavText>
                        </Nav>
                    )}
                    {permissions.viewTeam && (
                        <Nav id="team">
                            <NavText>
                                <Link className="sidebar-link" to="teams">
                                    Teams
                                </Link>
                            </NavText>
                        </Nav>
                    )}
                    {permissions.viewMailbox && (
                        <Nav id="mailboxes">
                            <NavText>
                                <Link
                                    className={`sidebar-link  ${mailboxesInvalid ? 'sidebar__alert' : ''}`}
                                    to="mailboxen"
                                >
                                    Mailboxen
                                </Link>
                            </NavText>
                        </Nav>
                    )}
                    {permissions.manageMailgunDomain && (
                        <Nav id="mailboxgun-domains">
                            <NavText>
                                <Link className="sidebar-link" to="mailgun-domeinen">
                                    Mailgun domeinen
                                </Link>
                            </NavText>
                        </Nav>
                    )}
                    {permissions.viewAuditTrail && (
                        <Nav id="audit-trail">
                            <NavText>
                                <Link className="sidebar-link" to="audit-trail">
                                    Audit trail
                                </Link>
                            </NavText>
                        </Nav>
                    )}
                    {permissions.manageFreeFields && (
                        <Nav id="free-fields">
                            <NavText>
                                <Link className="sidebar-link" to="vrije-velden">
                                    Vrije velden Algemeen
                                </Link>
                            </NavText>
                        </Nav>
                    )}
                    {permissions.manageFreeFields &&
                        permissions.menuPortalSettings &&
                        permissions.managePortalSettings && (
                            <Nav id="free-fields-portal-page">
                                <NavText>
                                    <Link className="sidebar-link" to="vrije-velden-portaal-pagina">
                                        Vrije velden Portaal pagina
                                    </Link>
                                </NavText>
                            </Nav>
                        )}
                </Nav>
            )}

            {permissions.menuPortalSettings && permissions.managePortalSettings && (
                <Nav id="portalSettings">
                    <NavIcon>
                        <SvgIcon size={20} icon={road} />
                    </NavIcon>
                    <NavText>
                        <Link className="sidebar-link-header">Portal instellingen</Link>
                    </NavText>
                    <Nav id="portalSettingsGeneral">
                        <NavText>
                            <Link className="sidebar-link" to="portal-settings">
                                Algemene instellingen
                            </Link>
                        </NavText>
                    </Nav>
                    <Nav id="portalSettingsLayouts">
                        <NavText>
                            <Link className="sidebar-link" to="portal-instellingen-layout">
                                Layout instellingen
                            </Link>
                        </NavText>
                    </Nav>
                    <Nav id="portalSettingsDashboard">
                        <NavText>
                            <Link className="sidebar-link" to="portal-instellingen-dashboard">
                                Dashboard instellingen
                            </Link>
                        </NavText>
                    </Nav>
                </Nav>
            )}
        </SideNav>
    </div>
);

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        administrations: state.meDetails.administrations,
        mailboxesInvalid: state.systemData.mailboxesInvalid,
        useDongleRegistration: state.systemData?.cooperation?.use_dongle_registration ?? false,
    };
};

export default connect(mapStateToProps)(SidebarMenu);
