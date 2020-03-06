import React, { Component } from 'react';
import { Link } from 'react-router';
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import SvgIcon from 'react-icons-kit';
import { connect } from 'react-redux';

import { cog } from 'react-icons-kit/icomoon/cog';
import { file } from 'react-icons-kit/fa/file';
import { fileText } from 'react-icons-kit/fa/fileText';
import { fileO } from 'react-icons-kit/fa/fileO';

import FinancialSidebarHelper from '../../helpers/FinancialSidebarHelper';

class FinancialTree extends Component {
    constructor(props) {
        super(props);

        const activeMenu = FinancialSidebarHelper(props.currentRouteParams);

        this.state = {
            activeMenuItem: activeMenu.activeMenuItem,
            activeParent: activeMenu.activeParent,
        };

        this.onItemClick = this.onItemClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (
            this.props.currentRouteParams.type !== nextProps.currentRouteParams.type ||
            this.props.currentRouteParams.filter !== nextProps.currentRouteParams.filter
        ) {
            const activeMenu = FinancialSidebarHelper(nextProps.currentRouteParams);

            this.setState({ activeParent: activeMenu.activeParent, activeMenuItem: activeMenu.activeMenuItem });
        }
    }

    onItemClick(id, parent) {
        if (parent) {
            this.setState({ activeParent: parent, activeMenuItem: id });
        } else {
            this.setState({ activeParent: null, activeMenuItem: id });
        }
    }

    render() {
        return (
            <nav className={'financial-tree open sticky'}>
                <div className="financial-tree-sidebar-menu" style={{ color: '$brand-primary' }}>
                    <SideNav
                        highlightColor="$brand-primary"
                        highlightBgColor="#e5e5e5"
                        hoverBgColor="#F1EFF0"
                        selected={this.state.activeMenuItem}
                        onItemSelection={(id, parent) => {
                            this.onItemClick(id, parent);
                        }}
                    >
                        <Nav id="orders" expanded={this.state.activeParent === 'orders'}>
                            <NavIcon>
                                <SvgIcon size={20} icon={file} style={{ color: '$brand-primary' }} />
                            </NavIcon>
                            <NavText>
                                <Link className="financial-tree-link-header" to={`financieel/${this.props.id}/orders`}>
                                    Alle orders({this.props.administrationDetails.totalOrders})
                                </Link>
                            </NavText>
                            <Nav id="concepts">
                                <NavText>
                                    <Link
                                        className="financial-tree-link"
                                        to={`financieel/${this.props.id}/orders/concepten`}
                                    >
                                        Concept orders({this.props.administrationDetails.totalOrdersConcepts})
                                    </Link>
                                </NavText>
                            </Nav>
                            <Nav id="active">
                                <NavText>
                                    <Link
                                        className="financial-tree-link"
                                        to={`financieel/${this.props.id}/orders/aankomend`}
                                    >
                                        Actief - toekomstig orders(
                                        {this.props.administrationDetails.totalOrdersUpcoming})
                                    </Link>
                                </NavText>
                            </Nav>
                            <Nav id="to-create">
                                <NavText>
                                    <Link
                                        className="financial-tree-link"
                                        to={`financieel/${this.props.id}/orders/te-factureren`}
                                    >
                                        {' '}
                                        Actief - te factureren orders(
                                        {this.props.administrationDetails.totalOrdersToCreateInvoices})
                                    </Link>
                                </NavText>
                            </Nav>
                            <Nav id="to-send">
                                <NavText>
                                    <Link
                                        className="financial-tree-link"
                                        to={`financieel/${this.props.id}/orders/te-verzenden`}
                                    >
                                        {' '}
                                        Actief - te verzenden orders(
                                        {this.props.administrationDetails.totalOrdersToSendInvoices})
                                    </Link>
                                </NavText>
                            </Nav>
                            <Nav id="closed">
                                <NavText>
                                    <Link
                                        className="financial-tree-link"
                                        to={`financieel/${this.props.id}/orders/beeindigd`}
                                    >
                                        Beëindigde orders({this.props.administrationDetails.totalOrdersClosed})
                                    </Link>
                                </NavText>
                            </Nav>
                        </Nav>
                        <Nav id="invoices" expanded={this.state.activeParent === 'invoices'}>
                            <NavIcon>
                                <SvgIcon size={20} icon={fileText} style={{ color: '$brand-primary' }} />
                            </NavIcon>
                            <NavText>
                                <Link className="financial-tree-link-header" to={`financieel/${this.props.id}/notas`}>
                                    Alle nota's({this.props.administrationDetails.totalInvoices})
                                </Link>
                            </NavText>
                            <Nav id="to-send-collection">
                                <NavText>
                                    <Link
                                        className="financial-tree-link"
                                        to={`financieel/${this.props.id}/notas/te-verzenden-incasso`}
                                    >
                                        Te verzenden - incasso nota's(
                                        {this.props.administrationDetails.totalInvoicesToSendCollection})
                                    </Link>
                                </NavText>
                            </Nav>
                            <Nav id="to-send-transfer">
                                <NavText>
                                    <Link
                                        className="financial-tree-link"
                                        to={`financieel/${this.props.id}/notas/te-verzenden-overboeken`}
                                    >
                                        Te verzenden - overboek nota's(
                                        {this.props.administrationDetails.totalInvoicesToSendTransfer})
                                    </Link>
                                </NavText>
                            </Nav>
                            <Nav id="error-sending-collection">
                                <NavText>
                                    <Link
                                        className="financial-tree-link"
                                        to={`financieel/${this.props.id}/notas/fout-verzenden-incasso`}
                                    >
                                        Fout verzenden - incasso nota's(
                                        {this.props.administrationDetails.totalInvoicesErrorSendingCollection})
                                    </Link>
                                </NavText>
                            </Nav>
                            <Nav id="error-sending-transfer">
                                <NavText>
                                    <Link
                                        className="financial-tree-link"
                                        to={`financieel/${this.props.id}/notas/fout-verzenden-overboeken`}
                                    >
                                        Fout verzenden - overboek nota's(
                                        {this.props.administrationDetails.totalInvoicesErrorSendingTransfer})
                                    </Link>
                                </NavText>
                            </Nav>
                            <Nav id="sent">
                                <NavText>
                                    <Link
                                        className="financial-tree-link"
                                        to={`financieel/${this.props.id}/notas/verzonden`}
                                    >
                                        Verzonden({this.props.administrationDetails.totalInvoicesSent})
                                    </Link>
                                </NavText>
                            </Nav>
                            {(this.props.administrationDetails.totalInvoicesExported > 0 ||
                                this.props.administrationDetails.twinfieldIsValid) && (
                                <Nav id="exported">
                                    <NavText>
                                        <Link
                                            className="financial-tree-link"
                                            to={`financieel/${this.props.id}/notas/geexporteerd`}
                                        >
                                            Verzonden geboekt({this.props.administrationDetails.totalInvoicesExported})
                                        </Link>
                                    </NavText>
                                </Nav>
                            )}
                            <Nav id="reminder">
                                <NavText>
                                    <Link
                                        className="financial-tree-link"
                                        to={`financieel/${this.props.id}/notas/herinnering`}
                                    >
                                        Herinnering({this.props.administrationDetails.totalInvoicesReminder})
                                    </Link>
                                </NavText>
                            </Nav>
                            <Nav id="exhortation">
                                <NavText>
                                    <Link
                                        className="financial-tree-link"
                                        to={`financieel/${this.props.id}/notas/aanmaning`}
                                    >
                                        Aanmaning({this.props.administrationDetails.totalInvoicesExhortation})
                                    </Link>
                                </NavText>
                            </Nav>
                            <Nav id="paid">
                                <NavText>
                                    <Link
                                        className="financial-tree-link"
                                        to={`financieel/${this.props.id}/notas/betaald`}
                                    >
                                        Betaald({this.props.administrationDetails.totalInvoicesPaid})
                                    </Link>
                                </NavText>
                            </Nav>
                            <Nav id="irrecoverable">
                                <NavText>
                                    <Link
                                        className="financial-tree-link"
                                        to={`financieel/${this.props.id}/notas/oninbaar`}
                                    >
                                        Oninbaar({this.props.administrationDetails.totalInvoicesIrrecoverable})
                                    </Link>
                                </NavText>
                            </Nav>
                        </Nav>
                        <Nav id="payment-invoices" expanded={this.state.activeParent === 'payment-invoices'}>
                            <NavIcon>
                                <SvgIcon size={20} icon={fileO} style={{ color: '$brand-primary' }} />
                            </NavIcon>
                            <NavText>
                                <Link
                                    className="financial-tree-link-header"
                                    to={`financieel/${this.props.id}/uitkering-notas`}
                                >
                                    Uitkering nota's({this.props.administrationDetails.totalPaymentInvoices})
                                </Link>
                            </NavText>
                            <Nav id="sent">
                                <NavText>
                                    <Link
                                        className="financial-tree-link"
                                        to={`financieel/${this.props.id}/uitkering-notas/verzonden`}
                                    >
                                        Verzonden({this.props.administrationDetails.totalPaymentInvoicesSent})
                                    </Link>
                                </NavText>
                            </Nav>
                            <Nav id="not-paid">
                                <NavText>
                                    <Link
                                        className="financial-tree-link"
                                        to={`financieel/${this.props.id}/uitkering-notas/niet-betaald`}
                                    >
                                        Niet betaald({this.props.administrationDetails.totalPaymentInvoicesNotPaid})
                                    </Link>
                                </NavText>
                            </Nav>
                        </Nav>
                        <Nav id="administration-settings">
                            <NavIcon>
                                <SvgIcon size={20} icon={cog} style={{ color: '$brand-primary' }} />
                            </NavIcon>
                            <NavText>
                                <Link className="financial-tree-link-header" to={`administratie/${this.props.id}`}>
                                    Instellingen
                                </Link>
                            </NavText>
                        </Nav>
                    </SideNav>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        id: state.administrationDetails.id,
        administrationDetails: state.administrationDetails,
    };
};

export default connect(mapStateToProps)(FinancialTree);
