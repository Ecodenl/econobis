import React, { Component } from 'react';

import SideNav, { NavItem, NavText } from '@trendmicro/react-sidenav';
import { Link } from 'react-router-dom';

class ParticipantReportCreateList extends Component {
    render() {
        const { participants = [], isLoading, changeParticipant } = this.props;

        return (
            <nav className="payment-invoices-list open sticky">
                <div className="send-payment-invoices-sidebar-menu" style={{ color: '$brand-primary' }}>
                    <SideNav
                        className="eco-sidenav"
                        defaultSelected={participants.length > 0 ? `participant-${participants[0].id}` : 'order'}
                        onSelect={selected => {
                            if (selected?.startsWith('participant-')) {
                                const id = selected.split('participant-')[1];
                                if (id) changeParticipant(Number(id));
                            }
                        }}
                    >
                        <SideNav.Nav>
                            {participants.length > 0 ? (
                                participants.map((participant, i) => (
                                    <NavItem key={i} eventKey={`participant-${participant.id}`}>
                                        <NavText>
                                            <span className="send-payment-invoices-list-link">
                                                {participant.id} - {participant.name}
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

export default ParticipantReportCreateList;
