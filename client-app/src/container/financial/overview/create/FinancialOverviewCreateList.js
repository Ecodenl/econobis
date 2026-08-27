import React from 'react';
import SideNav, { Nav, NavText } from 'react-sidenav';
import { Link } from 'react-router-dom';

const FinancialOverviewCreateList = ({
    financialOverviewContacts = [],
    isLoading = false,
    changeFinancialOverviewContact,
}) => {
    const hasContacts = Array.isArray(financialOverviewContacts) && financialOverviewContacts.length > 0;

    return (
        <nav className="financialOverviewContacts-list open sticky">
            <div className="send-financial-overview-contacts-sidebar-menu" style={{ color: '$brand-primary' }}>
                <SideNav
                    highlightColor="$brand-primary"
                    highlightBgColor="#e5e5e5"
                    hoverBgColor="#F1EFF0"
                    defaultSelected="financialOverviewContact"
                >
                    {hasContacts ? (
                        financialOverviewContacts.map(contact => {
                            // probeer verschillende vormen uit backend
                            const id = contact.id;
                            const number =
                                contact.contactNumber ??
                                contact.contact_number ??
                                contact.contactId ??
                                contact.contact_id ??
                                ''; // fallback

                            const name =
                                contact.contactName ??
                                contact.contactFullNameFnf ??
                                contact.contact?.fullNameFnf ??
                                'Onbekende contactpersoon';

                            const noEmail =
                                contact.emailed_to === 'Geen e-mail bekend' || contact.emailToAllowed === false;

                            return (
                                <Nav
                                    onNavClick={() =>
                                        changeFinancialOverviewContact && changeFinancialOverviewContact(id)
                                    }
                                    key={id}
                                    id={`foc-${id}`}
                                >
                                    <NavText>
                                        <Link
                                            className={
                                                noEmail
                                                    ? 'send-financial-overview-contacts-list-link-error'
                                                    : 'send-financial-overview-contacts-list-link'
                                            }
                                        >
                                            {number ? `${number} - ${name}` : name}
                                        </Link>
                                    </NavText>
                                </Nav>
                            );
                        })
                    ) : (
                        <Nav id="financialOverviewContact">
                            <NavText>
                                {isLoading ? (
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
};

export default FinancialOverviewCreateList;
