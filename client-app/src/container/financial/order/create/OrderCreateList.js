import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import SideNav, { Nav, NavText } from 'react-sidenav';
import { Link } from 'react-router-dom';

class OrderCreateList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className={'orders-list open sticky'}>
                <div className="send-orders-sidebar-menu" style={{ color: '$brand-primary' }}>
                    <SideNav
                        highlightColor="$brand-primary"
                        highlightBgColor="#e5e5e5"
                        hoverBgColor="#F1EFF0"
                        defaultSelected="order"
                    >
                        {this.props.orders.length > 0 ? (
                            this.props.orders.map((order, i) => {
                                return (
                                    <Nav
                                        onNavClick={() => this.props.changeOrder(order.id)}
                                        key={i}
                                        id={`administration-${order.id}`}
                                    >
                                        <NavText>
                                            <Link
                                                className={`${
                                                    order.totalInclVatInclReduction < 0
                                                        ? 'send-orders-list-link-error'
                                                        : 'send-orders-list-link'
                                                }`}
                                            >
                                                {order.number} - {order.contactName}
                                            </Link>
                                        </NavText>
                                    </Nav>
                                );
                            })
                        ) : (
                            <Nav id="order">
                                <NavText>
                                    <Link className="send-orders-list-link">Geen orders beschikbaar.</Link>
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

export default connect(mapStateToProps)(OrderCreateList);
