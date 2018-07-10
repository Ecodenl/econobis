import React, {Component} from 'react';
import { isEmpty } from 'lodash';

import SideNav, {Nav, NavText} from 'react-sidenav';
import {Link} from "react-router";

class ParticipantReportCreateList extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <nav className={'payment-invoices-list open sticky'}>
                <div className="send-payment-invoices-sidebar-menu" style={{color: '$brand-primary'}}>
                    <SideNav highlightColor="$brand-primary" highlightBgColor='#e5e5e5' hoverBgColor='#F1EFF0' defaultSelected="order">

                            {
                                this.props.participants.length > 0 ?
                                    this.props.participants.map((participant, i)=> {
                                        return <Nav onNavClick={() => this.props.changeParticipant(participant.id)} key={i} id={`administration-${participant.id}`}>
                                                <NavText><Link className='send-payment-invoices-list-link'
                                                >{participant.id} - {participant.contact.fullName}</Link></NavText>
                                        </Nav>
                                    })
                                    :
                                    <Nav id="order">
                                    <NavText><Link className="send-payment-invoices-list-link">Geen opbrengstverdeling beschikbaar.</Link></NavText>
                                    </Nav>
                            }
                    </SideNav>
                </div>
            </nav>
        )
    }
};

export default ParticipantReportCreateList;
