import React from 'react';
import {connect} from 'react-redux';

import Panel from "../../../../components/panel/Panel";
import PanelBody from "../../../../components/panel/PanelBody";
import OrdersList from "./OrdersList";

const OrderHarmonica = ({toggleShowList, showOrdersList, newOrder, orderCount, permissions}) => {
    return (
        <Panel className={"harmonica-button"}>
            <PanelBody>
                <div className="col-sm-10" onClick={toggleShowList} role="button">
                    <span className="">ORDERS <span className="badge">{ orderCount }</span></span>
                </div>
                <div className="col-sm-2">
                    {permissions.manageFinancial &&
                    <a role="button" className="pull-right" onClick={newOrder}><span
                        className="glyphicon glyphicon-plus glyphicon-white"/></a>
                    }
                </div>
                <div className="col-sm-12">
                    { showOrdersList && <OrdersList /> }
                </div>
            </PanelBody>
        </Panel>
    );
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    };
};

export default connect(mapStateToProps, null)(OrderHarmonica);