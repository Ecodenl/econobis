import React, {Component} from 'react';
import { Link } from 'react-router';
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import SvgIcon from 'react-icons-kit';
import {connect} from "react-redux";

import { ic_aspect_ratio } from 'react-icons-kit/md/ic_aspect_ratio';
import { ic_dashboard } from 'react-icons-kit/md/ic_dashboard';
import { ic_business } from 'react-icons-kit/md/ic_business';
import { ic_contacts } from 'react-icons-kit/md/ic_contacts';
import { ic_email } from 'react-icons-kit/md/ic_email';
import { cog } from 'react-icons-kit/icomoon/cog';
import { speech_bubbles } from 'react-icons-kit/ikons/speech_bubbles';
import { documents } from 'react-icons-kit/ikons/documents';
import { calendar } from 'react-icons-kit/icomoon/calendar';
import { home } from 'react-icons-kit/icomoon/home';
import { drawer } from 'react-icons-kit/icomoon/drawer';

class SidebarMenu extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="sidebar-menu" style={{background: '$brand-primary', color: '#FFF', width: '240px'}}>
                <SideNav highlightColor="#FFF" highlightBgColor="#27AE60" defaultSelected="dashboard">
                    <Nav id="dashboard">
                        <NavIcon><SvgIcon size={20} icon={ic_dashboard}/></NavIcon>
                        <NavText><Link className="sidebar-link" to="/">Dashboard</Link></NavText>
                    </Nav>
                    <Nav id="contacten">
                        <NavIcon><SvgIcon size={20} icon={ic_contacts}/></NavIcon>
                        <NavText><Link className="sidebar-link" to="contacten">Contacten</Link></NavText>
                        <Nav id="alle-organisaties">
                            <NavText><Link className="sidebar-link" to="contacten/type/organisation">Alle
                                organisaties</Link></NavText>
                        </Nav>
                        <Nav id="alle-personen">
                            <NavText><Link className="sidebar-link" to="contacten/type/person">Alle
                                personen</Link></NavText>
                        </Nav>
                        <Nav id="open">
                            <NavText><Link className="sidebar-link" to="contacten/status/open">Open</Link></NavText>
                        </Nav>
                        <Nav id="interested">
                            <NavText><Link className="sidebar-link"
                                           to="contacten/status/interested">Geïnteresseerd</Link></NavText>
                        </Nav>
                        <Nav id="closed">
                            <NavText><Link className="sidebar-link"
                                           to="contacten/status/closed">Afgehandeld</Link></NavText>
                        </Nav>
                    </Nav>
                    <Nav id="projecten">
                        <NavIcon><SvgIcon size={20} icon={drawer}/></NavIcon>
                        <NavText><Link className="sidebar-link">Projecten</Link></NavText>
                        <Nav id="productie-projecten">
                            <NavText><Link className="sidebar-link" to="productie-projecten">Productieprojecten</Link></NavText>
                        </Nav>
                    </Nav>
                    <Nav id="energy-saving">
                        <NavIcon><SvgIcon size={20} icon={home}/></NavIcon>
                        <NavText> Energiebesparing </NavText>
                        <Nav id="home-files">
                            <NavText><Link className="sidebar-link" to="woningdossiers">Woningdossiers</Link></NavText>
                        </Nav>
                        <Nav id="intakes">
                            <NavText><Link className="sidebar-link" to="intakes">Intakes</Link></NavText>
                        </Nav>
                        <Nav id="opportunities">
                            <NavText><Link className="sidebar-link" to="kansen">Kansen</Link></NavText>
                        </Nav>
                        <Nav id="quotation-requests">
                            <NavText><Link className="sidebar-link" to="offerteverzoeken">Offerteverzoeken</Link></NavText>
                        </Nav>
                        <Nav id="measures">
                            <NavText><Link className="sidebar-link" to="maatregelen">Maatregelen</Link></NavText>
                        </Nav>
                    </Nav>

                    <Nav id="contact-groups">
                        <NavIcon><SvgIcon size={20} icon={ic_aspect_ratio}/></NavIcon>
                        <NavText><Link className="sidebar-link" to="contact-groepen">Groepen beheer</Link></NavText>
                    </Nav>
                    <Nav id="email">
                        <NavIcon><SvgIcon size={20} icon={ic_email}/></NavIcon>
                        <NavText><Link className="sidebar-link" to="emails/inbox">E-mail</Link></NavText>
                        <Nav id="inbox">
                            <NavText><Link className="sidebar-link" to="emails/inbox">Ontvangen</Link></NavText>
                        </Nav>
                        <Nav id="sent">
                            <NavText><Link className="sidebar-link" to="emails/sent">Verzonden</Link></NavText>
                        </Nav>
                        <Nav id="concepts">
                            <NavText><Link className="sidebar-link" to="emails/concept">Concepten</Link></NavText>
                        </Nav>
                        <Nav id="removed">
                            <NavText><Link className="sidebar-link" to="emails/removed">Verwijderd</Link></NavText>
                        </Nav>
                    </Nav>
                    <Nav id="marketing">
                        <NavIcon><SvgIcon size={20} icon={speech_bubbles}/></NavIcon>
                        <NavText><Link className="sidebar-link" to="campagnes">Marketing</Link></NavText>
                    </Nav>
                    <Nav id="taken">
                        <NavIcon><SvgIcon size={20} icon={ic_business}/></NavIcon>
                        <NavText><Link className="sidebar-link" to="taken">Taken</Link></NavText>
                        <Nav id="notities">
                            <NavText><Link className="sidebar-link" to="notities">Notities</Link></NavText>
                        </Nav>
                    </Nav>
                    <Nav id="agenda">
                        <NavIcon><SvgIcon size={20} icon={calendar} /></NavIcon>
                        <NavText><Link className="sidebar-link" to="agenda">Agenda</Link></NavText>
                    </Nav>
                    {this.props.permissions.viewDocument &&
                    <Nav id="documenten">
                        <NavIcon><SvgIcon size={20} icon={documents}/></NavIcon>
                        <NavText><Link className="sidebar-link" to="documenten">Documenten</Link></NavText>
                    </Nav>
                    }
                    <Nav id="instellingen">
                        <NavIcon><SvgIcon size={20} icon={cog}/></NavIcon>
                        <NavText> Instellingen </NavText>
                        {this.props.permissions.viewDocumentTemplate &&
                        <Nav id="documents">
                            <NavText><Link className="sidebar-link" to="document-templates">Document
                                templates</Link></NavText>
                        </Nav>
                        }
                        <Nav id="email-templates">
                            <NavText><Link className="sidebar-link" to="email-templates">E-mail
                                templates</Link></NavText>
                        </Nav>
                        <Nav id="users">
                            <NavText><Link className="sidebar-link" to="gebruikers">Gebruikers</Link></NavText>
                        </Nav>
                        <Nav id="team">
                            <NavText><Link className="sidebar-link" to="teams">Teams</Link></NavText>
                        </Nav>
                        {this.props.permissions.viewMailbox &&
                        <Nav id="mailboxes">
                            <NavText><Link className="sidebar-link" to="mailboxen">Mailboxen</Link></NavText>
                        </Nav>
                        }
                        {this.props.permissions.viewAuditTrail &&
                        <Nav id="audit-trail">
                            <NavText><Link className="sidebar-link" to="audit-trail">Audit trail</Link></NavText>
                        </Nav>
                        }
                        <Nav id="postal-code-link">
                            <NavText><Link className="sidebar-link" to="postcoderoos">Postcoderoos</Link></NavText>
                        </Nav>
                    </Nav>
                </SideNav>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions,
    }
};

export default connect(mapStateToProps)(SidebarMenu);