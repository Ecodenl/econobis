import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../../components/button/ButtonIcon';

class InvoiceToolbar  extends Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack}/>
                    </div>
                </div>
                <div className="col-md-4"><h4 className="text-center">Factuur: {this.props.invoiceDetails.order ? this.props.invoiceDetails.order.contact.fullName : ''} / {this.props.invoiceDetails.number}</h4></div>
                <div className="col-md-4"/>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        invoiceDetails: state.invoiceDetails,
    };
};

export default connect(mapStateToProps, null)(InvoiceToolbar);