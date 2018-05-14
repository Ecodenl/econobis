import React from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';

import ButtonIcon from '../../../../components/button/ButtonIcon';

const InvoiceViewToolbar = props => {
    const {document = {}} = props.invoiceDetails;

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack} />
                    <ButtonIcon iconName={"glyphicon-download-alt"} onClickAction={props.download} />
                    <ButtonIcon iconName={"glyphicon-zoom-in"} onClickAction={props.zoomIn} />
                    <ButtonIcon iconName={"glyphicon-zoom-out"} onClickAction={props.zoomOut} />
                </div>
            </div>
            <div className="col-md-4"><h4 className="text-center">{'Factuur: ' + (document.name ? document.name : '')}</h4></div>
            <div className="col-md-4" />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        invoiceDetails: state.invoiceDetails,
    };
};

export default connect(mapStateToProps, null)(InvoiceViewToolbar);