import React from 'react';
import { connect } from 'react-redux';

import ButtonIcon from '../../../components/button/ButtonIcon';

const QuotationRequestStatusListToolbar = ({
    quotationRequestStatusCount,
    refreshQuotationRequestStatusData,
    permissions,
}) => {
    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'refresh'} onClickAction={refreshQuotationRequestStatusData} />
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Workflows op kansactie statussen</h3>
            </div>
            <div className="col-md-4">
                <div className="pull-right">Resultaten: {quotationRequestStatusCount}</div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(QuotationRequestStatusListToolbar);
