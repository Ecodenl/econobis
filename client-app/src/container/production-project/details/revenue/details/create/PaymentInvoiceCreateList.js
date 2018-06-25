import React, {Component} from 'react';
import { isEmpty } from 'lodash';

import SideNav, {Nav, NavText} from 'react-sidenav';
import {Link} from "react-router";

class PaymentInvoiceCreateList extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <nav className={'orders-list open sticky'}>
                <div className="send-orders-sidebar-menu" style={{color: '$brand-primary'}}>
                    <SideNav highlightColor="$brand-primary" highlightBgColor='#e5e5e5' hoverBgColor='#F1EFF0' defaultSelected="order">

                            {
                                this.props.distributions.length > 0 ?
                                    this.props.distributions.map((distribution, i)=> {
                                        return <Nav onNavClick={() => this.props.changeDistribution(distribution.id)} key={i} id={`administration-${distribution.id}`}>
                                                <NavText><Link className='send-orders-list-link'
                                                >{distribution.id} - {distribution.contact.fullName}</Link></NavText>
                                        </Nav>
                                    })
                                    :
                                    <Nav id="order">
                                    <NavText><Link className="send-orders-list-link">Geen opbrengstverdeling beschikbaar.</Link></NavText>
                                    </Nav>
                            }
                    </SideNav>
                </div>
            </nav>
        )
    }
};

export default PaymentInvoiceCreateList;
