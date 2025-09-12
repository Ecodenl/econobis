import React, { Component } from 'react';

import SideNav, { NavItem, NavText } from '@trendmicro/react-sidenav';
import { Link } from 'react-router-dom';

class CreateRevenuePartsKwhReportList extends Component {
    render() {
        const { distributions = [], isLoading, changeDistribution } = this.props;

        return (
            <nav className="payment-invoices-list open sticky">
                <div className="send-payment-invoices-sidebar-menu" style={{ color: '$brand-primary' }}>
                    <SideNav
                        className="eco-sidenav"
                        defaultSelected={distributions.length > 0 ? `distribution-${distributions[0].id}` : 'order'}
                        onSelect={selected => {
                            if (selected?.startsWith('distribution-')) {
                                const id = selected.split('distribution-')[1];
                                if (id) changeDistribution(Number(id));
                            }
                        }}
                    >
                        <SideNav.Nav>
                            {distributions.length > 0 ? (
                                distributions.map((distribution, i) => (
                                    <NavItem key={i} eventKey={`distribution-${distribution.id}`}>
                                        <NavText>
                                            <span className="send-payment-invoices-list-link">
                                                {distribution.id} - {distribution.contactName}
                                            </span>
                                        </NavText>
                                    </NavItem>
                                ))
                            ) : (
                                <NavItem eventKey="order">
                                    <NavText>
                                        {isLoading ? (
                                            <span className="send-payment-invoices-list-link">
                                                Gegevens aan het laden.
                                            </span>
                                        ) : (
                                            <span className="send-payment-invoices-list-link">
                                                Geen opbrengstverdeling beschikbaar.
                                            </span>
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

export default CreateRevenuePartsKwhReportList;
