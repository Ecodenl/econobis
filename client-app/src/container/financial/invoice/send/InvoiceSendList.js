import React, { Component } from 'react';
import { connect } from 'react-redux';

import SideNav, { NavItem, NavText } from '@trendmicro/react-sidenav';
import { Link } from 'react-router-dom';

class InvoiceSendList extends Component {
    render() {
        const { invoices = [], isLoading, changeInvoice } = this.props;

        return (
            <nav className={'invoices-list open sticky'}>
                <div className="send-invoices-sidebar-menu" style={{ color: '$brand-primary' }}>
                    <SideNav
                        className="eco-sidenav"
                        defaultSelected={invoices.length > 0 ? `administration-${invoices[0].id}` : 'invoice'}
                        onSelect={selected => {
                            // selected is je eventKey (bv. 'administration-123')
                            if (selected?.startsWith('administration-')) {
                                const id = selected.split('administration-')[1];
                                if (id) changeInvoice(Number(id));
                            }
                        }}
                    >
                        <SideNav.Nav>
                            {invoices.length > 0 ? (
                                invoices.map((invoice, i) => (
                                    <NavItem key={i} eventKey={`administration-${invoice.id}`}>
                                        <NavText>
                                            <Link
                                                className={
                                                    invoice.emailToAddress === 'Geen e-mail bekend'
                                                        ? 'send-invoices-list-link-error'
                                                        : 'send-invoices-list-link'
                                                }
                                            >
                                                {invoice.number} - {invoice.contactName}
                                            </Link>
                                        </NavText>
                                    </NavItem>
                                ))
                            ) : (
                                <NavItem eventKey="invoice">
                                    <NavText>
                                        {isLoading ? (
                                            <Link className="send-invoices-list-link">Gegevens aan het laden.</Link>
                                        ) : (
                                            <Link className="send-invoices-list-link">
                                                Geen nota&apos;s beschikbaar.
                                            </Link>
                                        )}
                                    </NavText>
                                </NavItem>
                            )}
                        </SideNav.Nav>
                    </SideNav>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => ({
    administrationDetails: state.administrationDetails,
});

export default connect(mapStateToProps)(InvoiceSendList);
