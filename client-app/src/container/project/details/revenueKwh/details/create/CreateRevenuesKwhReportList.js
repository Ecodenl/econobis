import React, { Component } from 'react';
import { isEmpty } from 'lodash';

import SideNav, { Nav, NavText } from 'react-sidenav';
import { Link } from 'react-router-dom';

class CreateRevenuesKwhReportList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className={'payment-invoices-list open sticky'}>
                <div className="send-payment-invoices-sidebar-menu" style={{ color: '$brand-primary' }}>
                    <SideNav
                        highlightColor="$brand-primary"
                        highlightBgColor="#e5e5e5"
                        hoverBgColor="#F1EFF0"
                        defaultSelected="order"
                    >
                        {this.props.distributions.length > 0 ? (
                            this.props.distributions.map((distribution, i) => {
                                return (
                                    <Nav
                                        onNavClick={() => this.props.changeDistribution(distribution.id)}
                                        key={i}
                                        id={`administration-${distribution.id}`}
                                    >
                                        <NavText>
                                            <Link className="send-payment-invoices-list-link">
                                                {distribution.id} - {distribution.contactName}
                                            </Link>
                                        </NavText>
                                    </Nav>
                                );
                            })
                        ) : (
                            <Nav id="order">
                                <NavText>
                                    {this.props.isLoading ? (
                                        <Link className="send-payment-invoices-list-link">Gegevens aan het laden.</Link>
                                    ) : (
                                        <Link className="send-payment-invoices-list-link">
                                            Geen opbrengstverdeling beschikbaar.
                                        </Link>
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

export default CreateRevenuesKwhReportList;
