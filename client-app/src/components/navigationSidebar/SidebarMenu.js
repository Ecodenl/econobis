import React from 'react';
import { Link, hashHistory } from 'react-router';
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import SvgIcon from 'react-icons-kit';

import { ic_aspect_ratio } from 'react-icons-kit/md/ic_aspect_ratio';
import { starEmpty } from 'react-icons-kit/icomoon/starEmpty';
import { ic_business } from 'react-icons-kit/md/ic_business';
import { ic_contacts } from 'react-icons-kit/md/ic_contacts';
import { ic_email } from 'react-icons-kit/md/ic_email';
import { cog } from 'react-icons-kit/icomoon/cog';
import { drawer } from 'react-icons-kit/icomoon/drawer';
import { pencil2 } from 'react-icons-kit/icomoon/pencil2';
import { speech_bubbles } from 'react-icons-kit/ikons/speech_bubbles';

const SidebarMenu = props => {
    return (
        <div className="sidebar-menu" style={{ background: '$brand-primary', color: '#FFF', width: '240px' }}>
            <SideNav highlightColor="#FFF" highlightBgColor="#27AE60" defaultSelected="dashboard">
                <Link className="sidebar-link" to="/">
                    <Nav id="dashboard">
                        <NavIcon><SvgIcon size={20} icon={ic_aspect_ratio} /></NavIcon>
                        <NavText>Dashboard</NavText>
                    </Nav>
                </Link>
                <Nav id="contacten">
                    <NavIcon><SvgIcon size={20} icon={ic_contacts} /></NavIcon>
                    <NavText><Link className="sidebar-link" to="contacten">Contacten</Link></NavText>
                    <Nav id="alle-organisaties">
                        <NavText><Link className="sidebar-link" to="contacten/type/organisation">Alle organisaties</Link></NavText>
                    </Nav>
                    <Nav id="alle-personen">
                        <NavText><Link className="sidebar-link" to="contacten/type/person">Alle personen</Link></NavText>
                    </Nav>
                    <Nav id="open">
                        <NavText><Link className="sidebar-link" to="contacten/status/open">Open</Link></NavText>
                    </Nav>
                    <Nav id="interested">
                        <NavText><Link className="sidebar-link" to="contacten/status/interested">Geïnteresseerd</Link></NavText>
                    </Nav>
                    <Nav id="closed">
                        <NavText><Link className="sidebar-link" to="contacten/status/closed">Afgehandeld</Link></NavText>
                    </Nav>
                </Nav>
                <Nav id="aanmeldingen">
                    <NavIcon><SvgIcon size={20} icon={pencil2} /></NavIcon>
                    <NavText><Link className="sidebar-link" to="aanmeldingen">Aanmeldingen</Link></NavText>
                </Nav>
                <Nav id="projecten">
                    <NavIcon><SvgIcon size={20} icon={drawer} /></NavIcon>
                    <NavText> Projecten </NavText>
                    <Nav id="lopende-projecten">
                        <NavText> Lopende projecten </NavText>
                    </Nav>
                    <Nav id="productie-projecten">
                        <NavText> Productie projecten </NavText>
                    </Nav>
                    <Nav id="projecten-gereed">
                        <NavText> Projecten gereed </NavText>
                    </Nav>
                    <Nav id="productie-overzichten">
                        <NavText> Productie overzichten </NavText>
                    </Nav>
                </Nav>
                <Nav id="werkgroepen">
                    <NavIcon><SvgIcon size={20} icon={ic_business} /></NavIcon>
                    <NavText> Werkgroepen </NavText>
                </Nav>
                <Nav id="contact-groepen">
                    <NavIcon><SvgIcon size={20} icon={ic_aspect_ratio} /></NavIcon>
                    <NavText><Link className="sidebar-link" to="contact-groepen">Groepen beheer</Link></NavText>
                </Nav>
                <Nav id="email">
                    <NavIcon><SvgIcon size={20} icon={ic_email} /></NavIcon>
                    <NavText> Email </NavText>
                </Nav>
                <Nav id="marketing">
                    <NavIcon><SvgIcon size={20} icon={speech_bubbles} /></NavIcon>
                    <NavText><Link className="sidebar-link" to="campagnes">Marketing</Link></NavText>
                </Nav>
                <Nav id="taken">
                    <NavIcon><SvgIcon size={20} icon={ic_business} /></NavIcon>
                    <NavText><Link className="sidebar-link" to="taken">Taken</Link></NavText>
                </Nav>
                <Nav id="kansen">
                    <NavIcon><SvgIcon size={20} icon={starEmpty} /></NavIcon>
                    <NavText><Link className="sidebar-link" to="kansen">Kansen</Link></NavText>
                </Nav>
                <Nav id="documenten">
                    <NavIcon><SvgIcon size={20} icon={ic_aspect_ratio} /></NavIcon>
                    <NavText> Documenten </NavText>
                </Nav>
                <Nav id="variabelen">
                    <NavIcon><SvgIcon size={20} icon={ic_business} /></NavIcon>
                    <NavText><Link className="sidebar-link" to="maatregelen">Variabelen</Link></NavText>
                </Nav>
                <Nav id="instellingen">
                    <NavIcon><SvgIcon size={20} icon={cog} /></NavIcon>
                    <NavText> Instellingen </NavText>
                    <Nav id="users">
                        <NavText><Link className="sidebar-link" to="gebruikers">Gebruikers</Link></NavText>
                    </Nav>
                </Nav>
            </SideNav>
        </div>
    );
};

export default SidebarMenu;
