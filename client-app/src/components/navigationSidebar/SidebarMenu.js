import React from 'react';
import { Link } from 'react-router-dom';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
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
        {/*<SideNav highlightColor="#FFF" highlightBgColor="#27AE60" defaultSelected="dashboard">*/}
        {/*    <NavItem id="dashboard">*/}
        <SideNav
            className="eco-sidenav"
            defaultSelected="dashboard"
            onSelect={selected => console.log('selected:', selected)}
        >
            <SideNav.Nav>
                <NavItem eventKey="dashboard">
                    <NavIcon>
                        <SvgIcon size={20} icon={ic_dashboard} />
                    </NavIcon>
                    <NavText>
                        <Link className="sidebar-link-header" to="/">
                            Dashboard
                        </Link>
                    </NavText>
                    {permissions.menuEnergySaving && (
                        <NavItem id="dashboard-energy-saving">
                            <NavText>
                                <Link className="sidebar-link" to="dashboard/energie-besparing">
                                    Energiebesparing
                                </Link>
                            </NavText>
                        </NavItem>
                    )}
                    {permissions.manageParticipation && (
                        <NavItem id="dashboard-participations">
                            <NavText>
                                <Link className="sidebar-link" to="dashboard/deelnames">
                                    Deelnames
                                </Link>
                            </NavText>
                        </NavItem>
                    )}
                    {permissions.manageFinancial && (
                        <NavItem id="dashboard-financial">
                            <NavText>
                                <Link className="sidebar-link" to="dashboard/financieel">
                                    Financieel
                                </Link>
                            </NavText>
                        </NavItem>
                    )}
                </NavItem>

                {permissions.menuContacts && (
                    <NavItem id="contacten">
                        <NavIcon>
                            <SvgIcon size={20} icon={ic_contacts} />
                        </NavIcon>
                        <NavText>
                            <Link className="sidebar-link-header" to="contacten">
                                Contacten
                            </Link>
                        </NavText>
                        {permissions.menuOrganisations && (
                            <NavItem id="alle-organisaties">
                                <NavText>
                                    <Link className="sidebar-link" to="contacten/type/organisation">
                                        Alle organisaties
                                    </Link>
                                </NavText>
                            </NavItem>
                        )}
                        {permissions.menuPersons && (
                            <NavItem id="alle-personen">
                                <NavText>
                                    <Link className="sidebar-link" to="contacten/type/person">
                                        Alle personen
                                    </Link>
                                </NavText>
                            </NavItem>
                        )}
                    </NavItem>
                )}

                {permissions.menuContacts && (
                    <NavItem id="data-controle">
                        <NavIcon>
                            <SvgIcon size={20} icon={ic_contacts_outline} />
                        </NavIcon>
                        <NavText>Data controle</NavText>
                        <NavItem id="data-controle-same-email-name">
                            <NavText>
                                <Link className="sidebar-link" to="contacten/data-controle/zelfde-email-naam">
                                    Zelfde E-mail en naam
                                </Link>
                            </NavText>
                        </NavItem>
                        <NavItem id="data-controle-same-email-address">
                            <NavText>
                                <Link className="sidebar-link" to="contacten/data-controle/zelfde-email-adres">
                                    Zelfde E-mail en adres
                                </Link>
                            </NavText>
                        </NavItem>
                        <NavItem id="data-controle-same-email">
                            <NavText>
                                <Link className="sidebar-link" to="contacten/data-controle/zelfde-email">
                                    Zelfde E-mail
                                </Link>
                            </NavText>
                        </NavItem>
                        <NavItem id="data-controle-same-address">
                            <NavText>
                                <Link className="sidebar-link" to="contacten/data-controle/zelfde-adres">
                                    Zelfde adres
                                </Link>
                            </NavText>
                        </NavItem>
                        <NavItem id="data-controle-same-kvk">
                            <NavText>
                                <Link className="sidebar-link" to="contacten/data-controle/zelfde-kvknummer">
                                    Zelfde KvK nummer
                                </Link>
                            </NavText>
                        </NavItem>
                        <NavItem id="data-controle-same-btw">
                            <NavText>
                                <Link className="sidebar-link" to="contacten/data-controle/zelfde-btwnummer">
                                    Zelfde BTW nummer
                                </Link>
                            </NavText>
                        </NavItem>
                        <NavItem id="data-controle-same-iban">
                            <NavText>
                                <Link className="sidebar-link" to="contacten/data-controle/zelfde-iban">
                                    Zelfde IBAN
                                </Link>
                            </NavText>
                        </NavItem>
                    </NavItem>
                )}

                {permissions.menuProjects && (
                    <NavItem id="projecten">
                        <NavIcon>
                            <SvgIcon size={20} icon={drawer} />
                        </NavIcon>
                        <NavText>
                            <Link className="sidebar-link-header">Projecten</Link>
                        </NavText>
                        <NavItem id="projecten">
                            <NavText>
                                <Link className="sidebar-link" to="projecten">
                                    Projecten
                                </Link>
                            </NavText>
                        </NavItem>

                        {permissions.menuParticipations && (
                            <NavItem id="deelnemers">
                                <NavText>
                                    <Link className="sidebar-link" to="deelnemers">
                                        Deelnemers
                                    </Link>
                                </NavText>
                            </NavItem>
                        )}
                        {permissions.menuFinancialOverviews && (
                            <NavItem id="waardestaten">
                                <NavText>
                                    <Link className="sidebar-link" to="waardestaten">
                                        Waardestaten
                                    </Link>
                                </NavText>
                            </NavItem>
                        )}
                    </NavItem>
                )}

                {permissions.menuEnergySaving && (
                    <NavItem id="energy-saving">
                        <NavIcon>
                            <SvgIcon size={20} icon={home} />
                        </NavIcon>
                        <NavText> Energiebesparing </NavText>
                        {permissions.menuIntakes && (
                            <NavItem id="intakes">
                                <NavText>
                                    <Link className="sidebar-link" to="intakes">
                                        Intakes
                                    </Link>
                                </NavText>
                            </NavItem>
                        )}
                        {permissions.menuOpportunities && (
                            <NavItem id="opportunities">
                                <NavText>
                                    <Link className="sidebar-link" to="kansen">
                                        Kansen
                                    </Link>
                                </NavText>
                            </NavItem>
                        )}
                        {permissions.menuQuotationRequests && (
                            <NavItem id="quotation-requests">
                                <NavText>
                                    <Link className="sidebar-link" to="offerteverzoeken">
                                        Kansacties
                                    </Link>
                                </NavText>
                            </NavItem>
                        )}
                        {permissions.menuHousingFiles && (
                            <NavItem id="home-files">
                                <NavText>
                                    <Link className="sidebar-link" to="woningdossiers">
                                        Woningdossiers
                                    </Link>
                                </NavText>
                            </NavItem>
                        )}
                        {permissions.menuHousingFiles && (
                            <NavItem id="home-files">
                                <NavText>
                                    <Link className="sidebar-link" to="woningdossier-specificaties">
                                        Woningdossier specificaties
                                    </Link>
                                </NavText>
                            </NavItem>
                        )}
                        {permissions.menuMarketing && (
                            <NavItem id="marketing-sub">
                                <NavText>
                                    <Link className="sidebar-link" to="campagnes">
                                        Campagnes
                                    </Link>
                                </NavText>
                            </NavItem>
                        )}
                        {permissions.menuIntakeSources && (
                            <NavItem id="aanmeldingsbronnen">
                                <NavText>
                                    <Link className="sidebar-link" to="aanmeldingsbronnen">
                                        Aanmeldingsbronnen
                                    </Link>
                                </NavText>
                            </NavItem>
                        )}
                        {permissions.menuMeasures && (
                            <NavItem id="measures">
                                <NavText>
                                    <Link className="sidebar-link" to="maatregelen">
                                        Maatregelen
                                    </Link>
                                </NavText>
                            </NavItem>
                        )}
                        {permissions.menuDongles && useDongleRegistration == true && (
                            <NavItem id="dongles">
                                <NavText>
                                    <Link className="sidebar-link" to="dongels">
                                        Dongels
                                    </Link>
                                </NavText>
                            </NavItem>
                        )}
                    </NavItem>
                )}

                {permissions.menuContactGroups && (
                    <NavItem id="contact-groups">
                        <NavIcon>
                            <SvgIcon size={20} icon={ic_aspect_ratio} />
                        </NavIcon>
                        <NavText>
                            <Link className="sidebar-link-header" to="contact-groepen">
                                Groepen beheer
                            </Link>
                        </NavText>
                    </NavItem>
                )}

                {permissions.menuEmail && (
                    <NavItem id="mailclient">
                        <NavIcon>
                            <SvgIcon size={20} icon={ic_email} />
                        </NavIcon>
                        <NavText>
                            <Link className="sidebar-link-header" to="mailclient/inbox">
                                E-mail
                            </Link>
                        </NavText>
                        <NavItem id="inbox">
                            <NavText>
                                <Link className="sidebar-link" to="mailclient/inbox">
                                    Ontvangen
                                </Link>
                            </NavText>
                        </NavItem>
                        <NavItem id="sent">
                            <NavText>
                                <Link className="sidebar-link" to="mailclient/sent">
                                    Verzonden
                                </Link>
                            </NavText>
                        </NavItem>
                        <NavItem id="concepts">
                            <NavText>
                                <Link className="sidebar-link" to="mailclient/concept">
                                    Concepten
                                </Link>
                            </NavText>
                        </NavItem>
                        <NavItem id="removed">
                            <NavText>
                                <Link className="sidebar-link" to="mailclient/removed">
                                    Verwijderd
                                </Link>
                            </NavText>
                        </NavItem>
                    </NavItem>
                )}

                {permissions.menuEmail && (
                    <NavItem id="email">
                        <NavIcon>
                            <SvgIcon size={20} icon={ic_email} />
                        </NavIcon>
                        <NavText>
                            <Link className="sidebar-link-header" to="emails/inbox">
                                E-mail (oud)
                            </Link>
                        </NavText>
                        <NavItem id="inbox">
                            <NavText>
                                <Link className="sidebar-link" to="emails/inbox">
                                    Ontvangen
                                </Link>
                            </NavText>
                        </NavItem>
                        <NavItem id="sent">
                            <NavText>
                                <Link className="sidebar-link" to="emails/sent">
                                    Verzonden
                                </Link>
                            </NavText>
                        </NavItem>
                        <NavItem id="concepts">
                            <NavText>
                                <Link className="sidebar-link" to="emails/concept">
                                    Concepten
                                </Link>
                            </NavText>
                        </NavItem>
                        <NavItem id="removed">
                            <NavText>
                                <Link className="sidebar-link" to="emails/removed">
                                    Verwijderd
                                </Link>
                            </NavText>
                        </NavItem>
                    </NavItem>
                )}

                {permissions.menuTasks && (
                    <NavItem id="taken">
                        <NavIcon>
                            <SvgIcon size={20} icon={ic_business} />
                        </NavIcon>
                        <NavText>
                            <Link className="sidebar-link-header" to="taken">
                                Taken
                            </Link>
                        </NavText>
                        <NavItem id="notities">
                            <NavText>
                                <Link className="sidebar-link" to="notities">
                                    Notities
                                </Link>
                            </NavText>
                        </NavItem>
                    </NavItem>
                )}

                {(permissions.menuAgenda || permissions.manageCoachPlanning) && (
                    <NavItem id="agenda">
                        <NavIcon>
                            <SvgIcon size={20} icon={calendar} />
                        </NavIcon>
                        <NavText>Planning</NavText>
                        <NavItem key={'nav-agenda'} id={`agenda`}>
                            <NavText>
                                <Link className="sidebar-link-header" to="agenda">
                                    Agenda
                                </Link>
                            </NavText>
                        </NavItem>
                        {permissions.manageCoachPlanning && (
                            <NavItem key={'nav-afspraak-kalender'} id={`afspraak-kalender`}>
                                <NavText>
                                    <Link className="sidebar-link-header" to="afspraak-kalenders">
                                        Afspraakkalenders
                                    </Link>
                                </NavText>
                            </NavItem>
                        )}
                        {permissions.manageCoachPlanning && (
                            <NavItem key={'nav-beschikbaarheid'} id={`beschikbaarheid`}>
                                <NavText>
                                    <Link className="sidebar-link-header" to="beschikbaarheid">
                                        Beschikbaarheden
                                    </Link>
                                </NavText>
                            </NavItem>
                        )}
                    </NavItem>
                )}

                {permissions.menuProcesses && (
                    <NavItem id="processen">
                        <NavIcon>
                            <SvgIcon size={20} icon={stopwatch} />
                        </NavIcon>
                        <NavText>Logs</NavText>
                        <NavItem key={'nav-processen'} id={`processen`}>
                            <NavText>
                                <Link className="sidebar-link-header" to="processen">
                                    Processen
                                </Link>
                            </NavText>
                        </NavItem>
                        <NavItem key={'nav-twinfield'} id={`twinfield`}>
                            <NavText>
                                <Link className="sidebar-link-header" to="twinfield">
                                    Twinfield
                                </Link>
                            </NavText>
                        </NavItem>
                        <NavItem key={'nav-housing-file-log'} id={`housing-file-log`}>
                            <NavText>
                                <Link className="sidebar-link-header" to="housing-file/log">
                                    Hoomdossier
                                </Link>
                            </NavText>
                        </NavItem>
                        <NavItem key={'nav-mailgun-log'} id={`mailgun-log`}>
                            <NavText>
                                <Link className="sidebar-link-header" to="mailgun/log">
                                    Mailgun
                                </Link>
                            </NavText>
                        </NavItem>
                    </NavItem>
                )}

                {permissions.menuDocuments && permissions.viewDocument && (
                    <NavItem id="documenten">
                        <NavIcon>
                            <SvgIcon size={20} icon={documents} />
                        </NavIcon>
                        <NavText>
                            <Link className="sidebar-link-header" to="documenten">
                                Documenten
                            </Link>
                        </NavText>
                    </NavItem>
                )}

                {permissions.menuFinancial && permissions.manageFinancial && administrations.length > 0 && (
                    <NavItem id="financial">
                        <NavIcon>
                            <SvgIcon size={20} icon={ic_business_center} />
                        </NavIcon>
                        <NavText> Financieel </NavText>
                        {administrations.map((administration, i) => {
                            return (
                                <NavItem key={i} id={`administration/${administration.id}`}>
                                    <NavText>
                                        <Link className="sidebar-link" to={`/financieel/${administration.id}`}>
                                            {administration.name}
                                        </Link>
                                    </NavText>
                                </NavItem>
                            );
                        })}
                    </NavItem>
                )}

                {permissions.menuWorkflow && permissions.manageFinancial && (
                    <NavItem id="workflow">
                        <NavIcon>
                            <SvgIcon size={20} icon={forward} />
                        </NavIcon>
                        <NavText> Workflow </NavText>
                        <NavItem id="taak-types">
                            <NavText>
                                <Link className="sidebar-link" to="taak-types">
                                    Taak types
                                </Link>
                            </NavText>
                        </NavItem>
                        <NavItem id="offerte-verzoek-statussen">
                            <NavText>
                                <Link className="sidebar-link" to="offerte-verzoek-statussen">
                                    Kansactie statussen
                                </Link>
                            </NavText>
                        </NavItem>
                        <NavItem id="kans-statussen">
                            <NavText>
                                <Link className="sidebar-link" to="kans-statussen">
                                    Kans statussen
                                </Link>
                            </NavText>
                        </NavItem>
                        <NavItem id="maatregel-categorieen">
                            <NavText>
                                <Link className="sidebar-link" to="maatregel-categorieen">
                                    Intake maatregelen
                                </Link>
                            </NavText>
                        </NavItem>
                    </NavItem>
                )}

                {permissions.menuGeneralSettings && (
                    <NavItem id="instellingen">
                        <NavIcon>
                            <SvgIcon size={20} icon={cog} />
                        </NavIcon>
                        <NavText className={mailboxesInvalid ? 'sidebar__alert' : ''}> Instellingen </NavText>
                        {permissions.manageFinancial && (
                            <NavItem id="administration">
                                <NavText>
                                    <Link className="sidebar-link" to="administraties">
                                        Administraties
                                    </Link>
                                </NavText>
                            </NavItem>
                        )}
                        {permissions.manageCooperationSettings && (
                            <NavItem id="cooperation">
                                <NavText>
                                    <Link className="sidebar-link" to="cooperatie">
                                        Coöperatie
                                    </Link>
                                </NavText>
                            </NavItem>
                        )}
                        {permissions.manageWebform && (
                            <NavItem id="webforms">
                                <NavText>
                                    <Link className="sidebar-link" to="webformulieren">
                                        Webformulieren
                                    </Link>
                                </NavText>
                            </NavItem>
                        )}
                        {permissions.manageFinancial && (
                            <NavItem id="products">
                                <NavText>
                                    <Link className="sidebar-link" to="producten">
                                        Producten
                                    </Link>
                                </NavText>
                            </NavItem>
                        )}
                        {permissions.manageFinancial && (
                            <NavItem id="btw-codes">
                                <NavText>
                                    <Link className="sidebar-link" to="btw-codes">
                                        BTW codes
                                    </Link>
                                </NavText>
                            </NavItem>
                        )}
                        {permissions.manageFinancial && (
                            <NavItem id="grootboekrekeningen">
                                <NavText>
                                    <Link className="sidebar-link" to="grootboekrekeningen">
                                        Grootboekrekeningen
                                    </Link>
                                </NavText>
                            </NavItem>
                        )}
                        {permissions.manageFinancial && (
                            <NavItem id="kostenplaatsen">
                                <NavText>
                                    <Link className="sidebar-link" to="kostenplaatsen">
                                        Kostenplaatsen
                                    </Link>
                                </NavText>
                            </NavItem>
                        )}
                        {permissions.viewDocumentTemplate && (
                            <NavItem id="documents">
                                <NavText>
                                    <Link className="sidebar-link" to="document-templates">
                                        Document templates
                                    </Link>
                                </NavText>
                            </NavItem>
                        )}
                        {permissions.viewEmailTemplate && (
                            <NavItem id="email-templates">
                                <NavText>
                                    <Link className="sidebar-link" to="email-templates">
                                        E-mail templates
                                    </Link>
                                </NavText>
                            </NavItem>
                        )}
                        {permissions.viewUser && (
                            <NavItem id="users">
                                <NavText>
                                    <Link className="sidebar-link" to="gebruikers">
                                        Gebruikers
                                    </Link>
                                </NavText>
                            </NavItem>
                        )}
                        {permissions.viewTeam && (
                            <NavItem id="team">
                                <NavText>
                                    <Link className="sidebar-link" to="teams">
                                        Teams
                                    </Link>
                                </NavText>
                            </NavItem>
                        )}
                        {permissions.viewMailbox && (
                            <NavItem id="mailboxes">
                                <NavText>
                                    <Link
                                        className={`sidebar-link  ${mailboxesInvalid ? 'sidebar__alert' : ''}`}
                                        to="mailboxen"
                                    >
                                        Mailboxen
                                    </Link>
                                </NavText>
                            </NavItem>
                        )}
                        {permissions.manageMailgunDomain && (
                            <NavItem id="mailboxgun-domains">
                                <NavText>
                                    <Link className="sidebar-link" to="mailgun-domeinen">
                                        Mailgun domeinen
                                    </Link>
                                </NavText>
                            </NavItem>
                        )}
                        {permissions.viewAuditTrail && (
                            <NavItem id="audit-trail">
                                <NavText>
                                    <Link className="sidebar-link" to="audit-trail">
                                        Audit trail
                                    </Link>
                                </NavText>
                            </NavItem>
                        )}
                        {permissions.manageFreeFields && (
                            <NavItem id="free-fields">
                                <NavText>
                                    <Link className="sidebar-link" to="vrije-velden">
                                        Vrije velden Algemeen
                                    </Link>
                                </NavText>
                            </NavItem>
                        )}
                        {permissions.manageFreeFields &&
                            permissions.menuPortalSettings &&
                            permissions.managePortalSettings && (
                                <NavItem id="free-fields-portal-page">
                                    <NavText>
                                        <Link className="sidebar-link" to="vrije-velden-portaal-pagina">
                                            Vrije velden Portaal pagina
                                        </Link>
                                    </NavText>
                                </NavItem>
                            )}
                    </NavItem>
                )}

                {permissions.menuPortalSettings && permissions.managePortalSettings && (
                    <NavItem id="portalSettings">
                        <NavIcon>
                            <SvgIcon size={20} icon={road} />
                        </NavIcon>
                        <NavText>
                            <Link className="sidebar-link-header">Portal instellingen</Link>
                        </NavText>
                        <NavItem id="portalSettingsGeneral">
                            <NavText>
                                <Link className="sidebar-link" to="portal-settings">
                                    Algemene instellingen
                                </Link>
                            </NavText>
                        </NavItem>
                        <NavItem id="portalSettingsLayouts">
                            <NavText>
                                <Link className="sidebar-link" to="portal-instellingen-layout">
                                    Layout instellingen
                                </Link>
                            </NavText>
                        </NavItem>
                        <NavItem id="portalSettingsDashboard">
                            <NavText>
                                <Link className="sidebar-link" to="portal-instellingen-dashboard">
                                    Dashboard instellingen
                                </Link>
                            </NavText>
                        </NavItem>
                    </NavItem>
                )}
            </SideNav.Nav>
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
