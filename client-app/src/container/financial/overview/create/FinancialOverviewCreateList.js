import React, { Component } from 'react';

import SideNav, { Nav, NavText } from 'react-sidenav';
import { Link } from 'react-router-dom';

class FinancialOverviewCreateList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className={'financialOverviewContacts-list open sticky'}>
                <div className="send-financial-overview-contacts-sidebar-menu" style={{ color: '$brand-primary' }}>
                    <SideNav
                        highlightColor="$brand-primary"
                        highlightBgColor="#e5e5e5"
                        hoverBgColor="#F1EFF0"
                        defaultSelected="financialOverviewContact"
                    >
                        {this.props.financialOverviewContacts.length > 0 ? (
                            this.props.financialOverviewContacts.map((financialOverviewContact, i) => {
                                return (
                                    <Nav
                                        onNavClick={() =>
                                            this.props.changeFinancialOverviewContact(financialOverviewContact.id)
                                        }
                                        key={i}
                                        id={`foc-${financialOverviewContact.id}`}
                                    >
                                        <NavText>
                                            <Link
                                                className={`${
                                                    financialOverviewContact.emailed_to === 'Geen e-mail bekend'
                                                        ? 'send-financial-overview-contacts-list-link-error'
                                                        : 'send-financial-overview-contacts-list-link'
                                                }`}
                                            >
                                                {financialOverviewContact.contactNumber} -{' '}
                                                {financialOverviewContact.contactName}
                                            </Link>
                                        </NavText>
                                    </Nav>
                                );
                            })
                        ) : (
                            <Nav id="financialOverviewContact">
                                <NavText>
                                    {this.props.isLoading ? (
                                        <Link className="send-financial-overview-contacts-list-link">
                                            Gegevens aan het laden.
                                        </Link>
                                    ) : (
                                        <Link className="send-financial-overview-contacts-list-link">
                                            Geen waardestaten beschikbaar.
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

export default FinancialOverviewCreateList;
