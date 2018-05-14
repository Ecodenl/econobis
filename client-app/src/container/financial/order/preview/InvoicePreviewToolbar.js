import React from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';

import ButtonIcon from '../../../../components/button/ButtonIcon';

const InvoicePreviewToolbar = props => {
    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack} />
                    <ButtonIcon iconName={"glyphicon-zoom-in"} onClickAction={props.zoomIn} />
                    <ButtonIcon iconName={"glyphicon-zoom-out"} onClickAction={props.zoomOut} />
                </div>
            </div>
            <div className="col-md-4"><h4 className="text-center">{'Order: ' + (props.orderDetails.number ? props.orderDetails.number : '')}</h4></div>
            <div className="col-md-4" />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        orderDetails: state.orderDetails,
    };
};

export default connect(mapStateToProps)(InvoicePreviewToolbar);