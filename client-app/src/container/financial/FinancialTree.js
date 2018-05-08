import React, {Component} from 'react';
import {Link} from 'react-router';
import SideNav, {Nav, NavIcon, NavText} from 'react-sidenav';
import SvgIcon from 'react-icons-kit';
import {connect} from "react-redux";

import { cog } from 'react-icons-kit/icomoon/cog';
import { file } from 'react-icons-kit/fa/file';
import { fileText } from 'react-icons-kit/fa/fileText';

class FinancialTree extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className={'financial-tree open sticky'}>
                <div className="financial-tree-sidebar-menu" style={{color: '$brand-primary'}}>
                    <SideNav highlightColor="$brand-primary" highlightBgColor='#e5e5e5' hoverBgColor='#F1EFF0' defaultSelected="orders">
                        <Nav id="orders">
                            <NavIcon><SvgIcon size={20} icon={file} style={{color: '$brand-primary'}}/></NavIcon>
                            <NavText><Link className="financial-tree-link" to={`financieel/${this.props.id}/orders`}>Alle orders({this.props.administrationDetails.totalOrders})</Link></NavText>
                            <Nav id="orders-concepts">
                                <NavText><Link className="financial-tree-link" to={`financieel/${this.props.id}/orders/concepten`}>Concept orders({this.props.administrationDetails.totalOrdersConcepts})</Link></NavText>
                            </Nav>
                            <Nav id="orders-invoices">
                                <NavText><Link className="financial-tree-link" to={`financieel/${this.props.id}/orders/facturen`}>Te factureren orders({this.props.administrationDetails.totalOrdersInvoices})</Link></NavText>
                            </Nav>
                            <Nav id="orders-collection">
                                <NavText><Link className="financial-tree-link" to={`financieel/${this.props.id}/orders/incassos`}>Incasso orders({this.props.administrationDetails.totalOrdersCollections})</Link></NavText>
                            </Nav>
                            <Nav id="orders-closed">
                                <NavText><Link className="financial-tree-link" to={`financieel/${this.props.id}/orders/beeindigd`}>Beëindigde orders({this.props.administrationDetails.totalOrdersClosed})</Link></NavText>
                            </Nav>
                        </Nav>
                        <Nav id="invoices">
                            <NavIcon><SvgIcon size={20} icon={fileText} style={{color: '$brand-primary'}}/></NavIcon>
                            <NavText><Link className="financial-tree-link" to={`financieel/${this.props.id}/facturen`}>Alle facturen(12)</Link></NavText>
                            <Nav id="invoices-send">
                                <NavText><Link className="financial-tree-link" to={`financieel/${this.props.id}/facturen/verzonden`}>Verzonden(3)</Link></NavText>
                            </Nav>
                            <Nav id="invoices-reminder">
                                <NavText><Link className="financial-tree-link" to={`financieel/${this.props.id}/facturen/herinnering`}>Herinneringen(4)</Link></NavText>
                            </Nav>
                            <Nav id="invoices-exhortation">
                                <NavText><Link className="financial-tree-link" to={`financieel/${this.props.id}/facturen/aanmaning`}>Aanmaningen(2)</Link></NavText>
                            </Nav>
                            <Nav id="invoices-payed">
                                <NavText><Link className="financial-tree-link" to={`financieel/${this.props.id}/facturen/betaald`}>Betaald(3)</Link></NavText>
                            </Nav>
                            <Nav id="invoices-irrecovable">
                                <NavText><Link className="financial-tree-link" to={`financieel/${this.props.id}/facturen/oninbaar`}>Oninbaar(0)</Link></NavText>
                            </Nav>
                        </Nav>
                        <Nav id="administration-settings">
                            <NavIcon><SvgIcon size={20} icon={cog}  style={{color: '$brand-primary'}}/></NavIcon>
                            <NavText><Link className="financial-tree-link" to={`administratie/${this.props.id}`}>Instellingen</Link></NavText>
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
        id: state.administrationDetails.id,
        administrationDetails: state.administrationDetails,
    }
};

export default connect(mapStateToProps)(FinancialTree);