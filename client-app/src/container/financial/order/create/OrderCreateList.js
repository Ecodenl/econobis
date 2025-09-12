import React, { Component } from 'react';
import { connect } from 'react-redux';

import SideNav, { NavItem, NavText } from '@trendmicro/react-sidenav';
import { Link } from 'react-router-dom';

class OrderCreateList extends Component {
    render() {
        const { orders = [], changeOrder } = this.props;

        return (
            <nav className="orders-list open sticky">
                <div className="send-orders-sidebar-menu" style={{ color: '$brand-primary' }}>
                    <SideNav
                        className="eco-sidenav"
                        defaultSelected={orders.length > 0 ? `administration-${orders[0].id}` : 'order'}
                        onSelect={selected => {
                            if (selected?.startsWith('administration-')) {
                                const id = selected.split('administration-')[1];
                                if (id) changeOrder(Number(id));
                            }
                        }}
                    >
                        <SideNav.Nav>
                            {orders.length > 0 ? (
                                orders.map((order, i) => (
                                    <NavItem key={i} eventKey={`administration-${order.id}`}>
                                        <NavText>
                                            <span
                                                className={
                                                    order.totalInclVatInclReduction < 0
                                                        ? 'send-orders-list-link-error'
                                                        : 'send-orders-list-link'
                                                }
                                            >
                                                {order.number} - {order.contactName}
                                            </span>
                                        </NavText>
                                    </NavItem>
                                ))
                            ) : (
                                <NavItem eventKey="order">
                                    <NavText>
                                        <span className="send-orders-list-link">Geen orders beschikbaar.</span>
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

export default connect(mapStateToProps)(OrderCreateList);
