import React, {Component} from 'react';
import { Link, hashHistory } from 'react-router';
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import SvgIcon from 'react-icons-kit';
import {connect} from "react-redux";

import { ic_aspect_ratio } from 'react-icons-kit/md/ic_aspect_ratio';
import { ic_dashboard } from 'react-icons-kit/md/ic_dashboard';
import { starEmpty } from 'react-icons-kit/icomoon/starEmpty';
import { ic_business } from 'react-icons-kit/md/ic_business';
import { ic_contacts } from 'react-icons-kit/md/ic_contacts';
import { ic_email } from 'react-icons-kit/md/ic_email';
import { cog } from 'react-icons-kit/icomoon/cog';
import { pencil2 } from 'react-icons-kit/icomoon/pencil2';
import { speech_bubbles } from 'react-icons-kit/ikons/speech_bubbles';
import { documents } from 'react-icons-kit/ikons/documents';
import { calendar } from 'react-icons-kit/icomoon/calendar';

class SidebarMenu extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="sidebar-menu" style={{background: '$brand-primary', color: '#FFF', width: '240px'}}>
                <SideNav highlightColor="#FFF" highlightBgColor="#27AE60" defaultSelected="dashboard">
                    <Link className="sidebar-link" to="/">
                        <Nav id="dashboard">
                            <NavIcon><SvgIcon size={20} icon={ic_dashboard}/></NavIcon>
                            <NavText>Dashboard</NavText>
                        </Nav>
                    </Link>
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
                    <Nav id="aanmeldingen">
                        <NavIcon><SvgIcon size={20} icon={pencil2}/></NavIcon>
                        <NavText><Link className="sidebar-link" to="aanmeldingen">Aanmeldingen</Link></NavText>
                    </Nav>
                    <Nav id="contact-groepen">
                        <NavIcon><SvgIcon size={20} icon={ic_aspect_ratio}/></NavIcon>
                        <NavText><Link className="sidebar-link" to="contact-groepen">Groepen beheer</Link></NavText>
                    </Nav>
                    <Nav id="email">
                        <NavIcon><SvgIcon size={20} icon={ic_email}/></NavIcon>
                        <NavText><Link className="sidebar-link" to="emails/inbox">E-mail</Link></NavText>
                        <Nav id="inbox">
                            <NavText><Link className="sidebar-link" to="emails/inbox">Inbox</Link></NavText>
                        </Nav>
                        <Nav id="sent">
                            <NavText><Link className="sidebar-link" to="emails/sent">Verzonden</Link></NavText>
                        </Nav>
                        <Nav id="concepts">
                            <NavText><Link className="sidebar-link" to="emails/concept">Concepten</Link></NavText>
                        </Nav>
                    </Nav>
                    <Nav id="marketing">
                        <NavIcon><SvgIcon size={20} icon={speech_bubbles}/></NavIcon>
                        <NavText><Link className="sidebar-link" to="campagnes">Marketing</Link></NavText>
                    </Nav>
                    <Nav id="taken">
                        <NavIcon><SvgIcon size={20} icon={ic_business}/></NavIcon>
                        <NavText><Link className="sidebar-link" to="taken">Taken</Link></NavText>
                    </Nav>
                    <Nav id="agenda">
                        <NavIcon><SvgIcon size={20} icon={calendar} /></NavIcon>
                        <NavText><Link className="sidebar-link" to="agenda">Agenda</Link></NavText>
                    </Nav>
                    <Nav id="kansen">
                        <NavIcon><SvgIcon size={20} icon={starEmpty}/></NavIcon>
                        <NavText><Link className="sidebar-link" to="kansen">Kansen</Link></NavText>
                    </Nav>
                    {this.props.permissions.viewDocument &&
                    <Nav id="documenten">
                        <NavIcon><SvgIcon size={20} icon={documents}/></NavIcon>
                        <NavText><Link className="sidebar-link" to="documenten">Documenten</Link></NavText>
                    </Nav>
                    }
                    <Nav id="variabelen">
                        <NavIcon><SvgIcon size={20} icon={ic_business}/></NavIcon>
                        <NavText><Link className="sidebar-link" to="maatregelen">Variabelen</Link></NavText>
                    </Nav>
                    <Nav id="instellingen">
                        <NavIcon><SvgIcon size={20} icon={cog}/></NavIcon>
                        <NavText> Instellingen </NavText>
                        {this.props.permissions.viewDocumentTemplate &&
                        <Nav id="mailboxes">
                            <NavText><Link className="sidebar-link" to="document-templates">Document
                                templates</Link></NavText>
                        </Nav>
                        }
                        <Nav id="email-templates">
                            <NavText><Link className="sidebar-link" to="email-templates">Email
                                templates</Link></NavText>
                        </Nav>
                        <Nav id="users">
                            <NavText><Link className="sidebar-link" to="gebruikers">Gebruikers</Link></NavText>
                        </Nav>
                        <Nav id="mailboxes">
                            <NavText><Link className="sidebar-link" to="mailboxen">Mailboxen</Link></NavText>
                        </Nav>
                        {this.props.permissions.viewAuditTrail &&
                        <Nav id="audit-trail">
                            <NavText><Link className="sidebar-link" to="audit-trail">Audit trail</Link></NavText>
                        </Nav>
                        }
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