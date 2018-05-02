import React, {Component} from 'react';
import {Link} from 'react-router';
import SideNav, {Nav, NavIcon, NavText} from 'react-sidenav';
import SvgIcon from 'react-icons-kit';
import {connect} from "react-redux";

import {ic_dashboard} from 'react-icons-kit/md/ic_dashboard';
import {ic_business} from "react-icons-kit/md/ic_business";

class SidebarMenu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className={'financial-tree open sticky'}>
                <div className="financial-tree-sidebar-menu" style={{color: '$brand-primary'}}>
                    <SideNav highlightColor="$brand-primary" highlightBgColor='#F1EFF0'>
                        <Nav id="orders">
                            <NavIcon><SvgIcon size={20} icon={ic_dashboard} style={{color: '$brand-primary'}}/></NavIcon>
                            <NavText><Link className="financial-tree-link">Alle orders(17)</Link></NavText>
                            <Nav id="orders-open">
                                <NavText><Link className="financial-tree-link" to="contacten/type/organisation">Concept orders(5)</Link></NavText>
                            </Nav>
                            <Nav id="orders-closed">
                                <NavText><Link className="financial-tree-link" to="contacten/type/organisation">Te factureren orders(5)</Link></NavText>
                            </Nav>
                            <Nav id="orders-closed1">
                                <NavText><Link className="financial-tree-link" to="contacten/type/organisation">Incasso orders(4)</Link></NavText>
                            </Nav>
                            <Nav id="orders-closed2">
                                <NavText><Link className="financial-tree-link" to="contacten/type/organisation">Beëindigde orders(3)</Link></NavText>
                            </Nav>
                        </Nav>
                        <Nav id="invoices">
                            <NavIcon><SvgIcon size={20} icon={ic_dashboard} style={{color: '$brand-primary'}}/></NavIcon>
                            <NavText><Link className="financial-tree-link">Alle facturen(12)</Link></NavText>
                            <Nav id="orders-closed3">
                                <NavText><Link className="financial-tree-link" to="contacten/type/organisation">Verzonden(3)</Link></NavText>
                            </Nav>
                            <Nav id="orders-closed4">
                                <NavText><Link className="financial-tree-link" to="contacten/type/organisation">Herinneringen(4)</Link></NavText>
                            </Nav>
                            <Nav id="orders-closed5">
                                <NavText><Link className="financial-tree-link" to="contacten/type/organisation">Aanmaningen(2)</Link></NavText>
                            </Nav>
                            <Nav id="orders-closed6">
                                <NavText><Link className="financial-tree-link" to="contacten/type/organisation">Betaald(3)</Link></NavText>
                            </Nav>
                            <Nav id="orders-closed7">
                                <NavText><Link className="financial-tree-link" to="contacten/type/organisation">Oninbaar(0)</Link></NavText>
                            </Nav>
                        </Nav>
                        <Nav id="settings">
                            <NavIcon><SvgIcon size={20} icon={ic_dashboard}  style={{color: '$brand-primary'}}/></NavIcon>
                            <NavText><Link className="financial-tree-link" to="administratie/1">Instellingen</Link></NavText>
                        </Nav>
                    </SideNav>
                </div>
            </nav>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions,
    }
};

export default connect(mapStateToProps)(SidebarMenu);