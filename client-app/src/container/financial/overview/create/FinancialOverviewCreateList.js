import React, { Component } from 'react';

import SideNav, { NavItem, NavText } from '@trendmicro/react-sidenav';
import { Link } from 'react-router-dom';

class FinancialOverviewCreateList extends Component {
    render() {
        const { financialOverviewContacts = [], isLoading, changeFinancialOverviewContact } = this.props;

        return (
            <nav className="financialOverviewContacts-list open sticky">
                <div className="send-financial-overview-contacts-sidebar-menu" style={{ color: '$brand-primary' }}>
                    <SideNav
                        className="eco-sidenav"
                        defaultSelected={
                            financialOverviewContacts.length > 0
                                ? `foc-${financialOverviewContacts[0].id}`
                                : 'financialOverviewContact'
                        }
                        onSelect={selected => {
                            if (selected?.startsWith('foc-')) {
                                const id = selected.split('foc-')[1];
                                if (id) changeFinancialOverviewContact(Number(id));
                            }
                        }}
                    >
                        <SideNav.Nav>
                            {financialOverviewContacts.length > 0 ? (
                                financialOverviewContacts.map((financialOverviewContact, i) => (
                                    <NavItem key={i} eventKey={`foc-${financialOverviewContact.id}`}>
                                        <NavText>
                                            <span
                                                className={
                                                    financialOverviewContact.emailed_to === 'Geen e-mail bekend'
                                                        ? 'send-financial-overview-contacts-list-link-error'
                                                        : 'send-financial-overview-contacts-list-link'
                                                }
                                            >
                                                {financialOverviewContact.contactNumber} -{' '}
                                                {financialOverviewContact.contactName}
                                            </span>
                                        </NavText>
                                    </NavItem>
                                ))
                            ) : (
                                <NavItem eventKey="financialOverviewContact">
                                    <NavText>
                                        {isLoading ? (
                                            <span className="send-financial-overview-contacts-list-link">
                                                Gegevens aan het laden.
                                            </span>
                                        ) : (
                                            <span className="send-financial-overview-contacts-list-link">
                                                Geen waardestaten beschikbaar.
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

export default FinancialOverviewCreateList;
