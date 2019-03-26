import React from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import ButtonIcon from '../../../components/button/ButtonIcon';

const VatCodesListToolbar = ({ vatCodesCount, refreshVatCodesData, permissions }) => {
    const newVatCode = () => {
        hashHistory.push(`/btw-code/nieuw`);
    };

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'glyphicon-refresh'} onClickAction={refreshVatCodesData} />
                    {permissions.manageFinancial && (
                        <ButtonIcon iconName={'glyphicon-plus'} onClickAction={newVatCode} />
                    )}
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">BTW codes</h3>
            </div>
            <div className="col-md-4">
                <div className="pull-right">Resultaten: {vatCodesCount}</div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(
    mapStateToProps,
    null
)(VatCodesListToolbar);
