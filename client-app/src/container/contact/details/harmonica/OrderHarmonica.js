import React from 'react';
import { connect } from 'react-redux';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import OrdersList from './OrdersList';

import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus';

const OrderHarmonica = ({ toggleShowList, showOrdersList, newOrder, orderCount, permissions }) => {
    return (
        permissions.viewOrder && (
            <Panel className={'harmonica-button'}>
                <PanelBody>
                    <div className="col-sm-10" onClick={toggleShowList} role="button">
                        <span className="">
                            ORDERS <span className="badge">{orderCount}</span>
                        </span>
                    </div>
                    <div className="col-sm-2">
                        {permissions.manageFinancial && (
                            <a role="button" className="pull-right" onClick={newOrder}>
                                <Icon className="harmonica-button" size={14} icon={plus} />
                            </a>
                        )}
                    </div>
                    <div className="col-sm-12">{showOrdersList && <OrdersList />}</div>
                </PanelBody>
            </Panel>
        )
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(OrderHarmonica);
