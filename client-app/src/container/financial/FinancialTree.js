import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import SvgIcon from 'react-icons-kit';
import { connect } from 'react-redux';

import { cog } from 'react-icons-kit/icomoon/cog';
import { file } from 'react-icons-kit/fa/file';
import { fileText } from 'react-icons-kit/fa/fileText';
import { fileO } from 'react-icons-kit/fa/fileO';

import FinancialSidebarHelper from '../../helpers/FinancialSidebarHelper';

// Functionele wrapper voor de class component
const FinancialTreeWrapper = props => {
    const navigate = useNavigate();
    return <FinancialTree {...props} navigate={navigate} />;
};

class FinancialTree extends Component {
    constructor(props) {
        super(props);

        const activeMenu = FinancialSidebarHelper(props.currentRouteParams);

        this.state = {
            activeMenuItem: activeMenu.activeMenuItem,
            activeParent: activeMenu.activeParent,
            currentAdminisrationId: props.currentRouteParams.id,
        };

        this.onItemClick = this.onItemClick.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (
            this.props.currentRouteParams.type !== nextProps.currentRouteParams.type ||
            this.props.currentRouteParams.filter !== nextProps.currentRouteParams.filter
        ) {
            const activeMenu = FinancialSidebarHelper(nextProps.currentRouteParams);

            this.setState({
                activeParent: activeMenu.activeParent,
                activeMenuItem: activeMenu.activeMenuItem,
                currentAdminisrationId: nextProps.currentRouteParams.id,
            });
        }
    }

    onItemClick(id, parent) {
        this.props.fetchTotalsInfoAdministration(this.props.currentRouteParams.id);

        if (parent) {
            this.setState({
                activeParent: parent,
                activeMenuItem: id,
                currentAdminisrationId: this.props.currentRouteParams.id,
            });
        } else {
            this.setState({
                activeParent: null,
                activeMenuItem: id,
                currentAdminisrationId: this.props.currentRouteParams.id,
            });
        }
    }

    render() {
        return (
            <nav className="financial-tree open sticky">
                <div className="financial-tree-sidebar-menu" style={{ color: '$brand-primary' }}>
                    <SideNav
                        className="eco-sidenav"
                        defaultSelected={this.state.activeMenuItem || 'orders'}
                        onSelect={selected => {
                            // selected is bv. 'orders' of 'orders/concepts'
                            const [parent] = String(selected).split('/');
                            this.setState({
                                activeMenuItem: selected,
                                activeParent: parent,
                            });
                            // jouw oude handler
                            this.onItemClick(selected, parent);
                        }}
                    >
                        <SideNav.Nav>
                            <NavItem eventKey="orders">
                                <NavIcon>
                                    <SvgIcon size={20} icon={file} style={{ color: '$brand-primary' }} />
                                </NavIcon>
                                <NavText>
                                    <Link
                                        className="financial-tree-link-header"
                                        to={`/financieel/${this.state.currentAdminisrationId}/orders`}
                                    >
                                        Alle orders ({this.props.totalsInfoAdministration.totalOrders})
                                    </Link>
                                </NavText>
                                <NavItem eventKey="concepts">
                                    <NavText>
                                        <Link
                                            className="financial-tree-link"
                                            to={`/financieel/${this.state.currentAdminisrationId}/orders/concepten`}
                                        >
                                            Concept orders ({this.props.totalsInfoAdministration.totalOrdersConcepts})
                                        </Link>
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="active">
                                    <NavText>
                                        <Link
                                            className="financial-tree-link"
                                            to={`/financieel/${this.state.currentAdminisrationId}/orders/aankomend`}
                                        >
                                            Actief - toekomstig orders (
                                            {this.props.totalsInfoAdministration.totalOrdersUpcoming})
                                        </Link>
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="to-create">
                                    <NavText>
                                        <Link
                                            className="financial-tree-link"
                                            to={`/financieel/${this.state.currentAdminisrationId}/orders/te-factureren`}
                                        >
                                            {' '}
                                            Actief - te factureren orders (
                                            {this.props.totalsInfoAdministration.totalOrdersToCreateInvoices})
                                        </Link>
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="to-send">
                                    <NavText>
                                        <Link
                                            className="financial-tree-link"
                                            to={`/financieel/${this.state.currentAdminisrationId}/orders/te-verzenden`}
                                        >
                                            {' '}
                                            Actief - te verzenden orders (
                                            {this.props.totalsInfoAdministration.totalOrdersToSendInvoices})
                                        </Link>
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="closed">
                                    <NavText>
                                        <Link
                                            className="financial-tree-link"
                                            to={`/financieel/${this.state.currentAdminisrationId}/orders/beeindigd`}
                                        >
                                            Beëindigde orders ({this.props.totalsInfoAdministration.totalOrdersClosed})
                                        </Link>
                                    </NavText>
                                </NavItem>
                            </NavItem>
                            <NavItem eventKey="invoices">
                                <NavIcon>
                                    <SvgIcon size={20} icon={fileText} style={{ color: '$brand-primary' }} />
                                </NavIcon>
                                <NavText>
                                    <Link
                                        className="financial-tree-link-header"
                                        to={`/financieel/${this.state.currentAdminisrationId}/notas`}
                                    >
                                        Alle nota's ({this.props.totalsInfoAdministration.totalInvoices})
                                    </Link>
                                </NavText>
                                <NavItem eventKey="to-send-collection">
                                    <NavText>
                                        <Link
                                            className="financial-tree-link"
                                            to={`/financieel/${this.state.currentAdminisrationId}/notas/te-verzenden-incasso`}
                                        >
                                            Te verzenden - incasso nota's(
                                            {this.props.totalsInfoAdministration.totalInvoicesToSendCollection})
                                        </Link>
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="to-send-transfer">
                                    <NavText>
                                        <Link
                                            className="financial-tree-link"
                                            to={`/financieel/${this.state.currentAdminisrationId}/notas/te-verzenden-overboeken`}
                                        >
                                            Te verzenden - overboek nota's(
                                            {this.props.totalsInfoAdministration.totalInvoicesToSendTransfer})
                                        </Link>
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="error-sending-collection">
                                    <NavText>
                                        <Link
                                            className="financial-tree-link"
                                            to={`/financieel/${this.state.currentAdminisrationId}/notas/fout-verzenden-incasso`}
                                        >
                                            Opnieuw te verzenden - incasso nota's(
                                            {this.props.totalsInfoAdministration.totalInvoicesErrorSendingCollection})
                                        </Link>
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="error-sending-transfer">
                                    <NavText>
                                        <Link
                                            className="financial-tree-link"
                                            to={`/financieel/${this.state.currentAdminisrationId}/notas/fout-verzenden-overboeken`}
                                        >
                                            Opnieuw te verzenden - overboek nota's(
                                            {this.props.totalsInfoAdministration.totalInvoicesErrorSendingTransfer})
                                        </Link>
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="sent">
                                    <NavText>
                                        <Link
                                            className="financial-tree-link"
                                            to={`/financieel/${this.state.currentAdminisrationId}/notas/verzonden`}
                                        >
                                            Verzonden ({this.props.totalsInfoAdministration.totalInvoicesSent})
                                        </Link>
                                    </NavText>
                                </NavItem>
                                {(this.props.administrationDetails.totalInvoicesExported > 0 ||
                                    this.props.administrationDetails.twinfieldIsValid) && (
                                    <NavItem eventKey="exported">
                                        <NavText>
                                            <Link
                                                className="financial-tree-link"
                                                to={`/financieel/${this.state.currentAdminisrationId}/notas/geexporteerd`}
                                            >
                                                Verzonden geboekt(
                                                {this.props.totalsInfoAdministration.totalInvoicesExported})
                                            </Link>
                                        </NavText>
                                    </NavItem>
                                )}
                                <NavItem eventKey="reminder">
                                    <NavText>
                                        <Link
                                            className="financial-tree-link"
                                            to={`/financieel/${this.state.currentAdminisrationId}/notas/herinnering`}
                                        >
                                            Herinnering ({this.props.totalsInfoAdministration.totalInvoicesReminder})
                                        </Link>
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="exhortation">
                                    <NavText>
                                        <Link
                                            className="financial-tree-link"
                                            to={`/financieel/${this.state.currentAdminisrationId}/notas/aanmaning`}
                                        >
                                            Aanmaning ({this.props.totalsInfoAdministration.totalInvoicesExhortation})
                                        </Link>
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="paid">
                                    <NavText>
                                        <Link
                                            className="financial-tree-link"
                                            to={`/financieel/${this.state.currentAdminisrationId}/notas/betaald`}
                                        >
                                            Betaald ({this.props.totalsInfoAdministration.totalInvoicesPaid})
                                        </Link>
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="irrecoverable">
                                    <NavText>
                                        <Link
                                            className="financial-tree-link"
                                            to={`/financieel/${this.state.currentAdminisrationId}/notas/oninbaar`}
                                        >
                                            Oninbaar ({this.props.totalsInfoAdministration.totalInvoicesIrrecoverable})
                                        </Link>
                                    </NavText>
                                </NavItem>
                            </NavItem>
                            <NavItem eventKey="payment-invoices">
                                <NavIcon>
                                    <SvgIcon size={20} icon={fileO} style={{ color: '$brand-primary' }} />
                                </NavIcon>
                                <NavText>
                                    <Link
                                        className="financial-tree-link-header"
                                        to={`/financieel/${this.state.currentAdminisrationId}/uitkering-notas`}
                                    >
                                        Uitkering nota's ({this.props.totalsInfoAdministration.totalPaymentInvoices})
                                    </Link>
                                </NavText>
                                <NavItem eventKey="sent">
                                    <NavText>
                                        <Link
                                            className="financial-tree-link"
                                            to={`/financieel/${this.state.currentAdminisrationId}/uitkering-notas/verzonden`}
                                        >
                                            Verzonden ({this.props.totalsInfoAdministration.totalPaymentInvoicesSent})
                                        </Link>
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="not-paid">
                                    <NavText>
                                        <Link
                                            className="financial-tree-link"
                                            to={`/financieel/${this.state.currentAdminisrationId}/uitkering-notas/niet-betaald`}
                                        >
                                            Niet betaald (
                                            {this.props.totalsInfoAdministration.totalPaymentInvoicesNotPaid})
                                        </Link>
                                    </NavText>
                                </NavItem>
                            </NavItem>
                            <NavItem eventKey="administration-settings">
                                <NavIcon>
                                    <SvgIcon size={20} icon={cog} style={{ color: '$brand-primary' }} />
                                </NavIcon>
                                <NavText>
                                    <Link
                                        className="financial-tree-link-header"
                                        to={`/administratie/${this.state.currentAdminisrationId}`}
                                    >
                                        Instellingen
                                    </Link>
                                </NavText>
                            </NavItem>
                        </SideNav.Nav>
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

export default connect(mapStateToProps)(FinancialTreeWrapper);
