import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../../components/button/ButtonIcon';

const InvoiceViewToolbar = props => {
    const navigate = useNavigate();

    const { document = {} } = props.invoiceDetails;

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'arrowLeft'} onClickAction={navigate(-1)} />
                    <ButtonIcon iconName={'download'} onClickAction={props.download} />
                    <ButtonIcon iconName={'searchPlus'} onClickAction={props.zoomIn} />
                    <ButtonIcon iconName={'searchMinus'} onClickAction={props.zoomOut} />
                </div>
            </div>
            <div className="col-md-4">
                <h4 className="text-center">{'Nota: ' + (document ? document.name : 'Preview')}</h4>
            </div>
            <div className="col-md-4" />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        invoiceDetails: state.invoiceDetails,
    };
};

export default connect(mapStateToProps, null)(InvoiceViewToolbar);
