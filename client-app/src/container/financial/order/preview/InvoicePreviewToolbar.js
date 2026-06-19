import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../../components/button/ButtonIcon';

const InvoicePreviewToolbar = props => {
    const navigate = useNavigate();

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'arrowLeft'} onClickAction={() => navigate(-1)} />
                    <ButtonIcon iconName={'searchPlus'} onClickAction={props.zoomIn} />
                    <ButtonIcon iconName={'searchMinus'} onClickAction={props.zoomOut} />
                </div>
            </div>
            <div className="col-md-4">
                <h4 className="text-center">
                    {'Order: ' + (props.orderDetails.number ? props.orderDetails.number : '')}
                </h4>
            </div>
            <div className="col-md-4" />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        orderDetails: state.orderDetails,
    };
};

export default connect(mapStateToProps)(InvoicePreviewToolbar);
