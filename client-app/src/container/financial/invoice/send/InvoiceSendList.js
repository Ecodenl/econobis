import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import SideNav, { Nav, NavText } from 'react-sidenav';
import { Link } from 'react-router-dom';

class InvoiceSendList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className={'invoices-list open sticky'}>
                <div className="send-invoices-sidebar-menu" style={{ color: '$brand-primary' }}>
                    <SideNav
                        highlightColor="$brand-primary"
                        highlightBgColor="#e5e5e5"
                        hoverBgColor="#F1EFF0"
                        defaultSelected="invoice"
                    >
                        {this.props.invoices.length > 0 ? (
                            this.props.invoices.map((invoice, i) => {
                                return (
                                    <Nav
                                        onNavClick={() => this.props.changeInvoice(invoice.id)}
                                        key={i}
                                        id={`administration-${invoice.id}`}
                                    >
                                        <NavText>
                                            <Link
                                                className={`${
                                                    invoice.emailToAddress === 'Geen e-mail bekend'
                                                        ? 'send-invoices-list-link-error'
                                                        : 'send-invoices-list-link'
                                                }`}
                                            >
                                                {invoice.number} - {invoice.contactName}
                                            </Link>
                                        </NavText>
                                    </Nav>
                                );
                            })
                        ) : (
                            <Nav id="invoice">
                                <NavText>
                                    {this.props.isLoading ? (
                                        <Link className="send-invoices-list-link">Gegevens aan het laden.</Link>
                                    ) : (
                                        <Link className="send-invoices-list-link">Geen nota's beschikbaar.</Link>
                                    )}
                                </NavText>
                            </Nav>
                        )}
                    </SideNav>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => {
    return {
        administrationDetails: state.administrationDetails,
    };
};

export default connect(mapStateToProps)(InvoiceSendList);
