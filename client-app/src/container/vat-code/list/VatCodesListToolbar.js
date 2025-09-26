import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import ButtonIcon from '../../../components/button/ButtonIcon';

const VatCodesListToolbar = ({ vatCodesCount, refreshVatCodesData, permissions }) => {
    // const navigate = useNavigate();

    // const newVatCode = () => {
    //     navigate(`/btw-code/nieuw`);
    // };

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'refresh'} onClickAction={refreshVatCodesData} />
                    {/*{permissions.manageFinancial && (*/}
                    {/*<ButtonIcon iconName={'plus'} onClickAction={newVatCode} />*/}
                    {/*)}*/}
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

export default connect(mapStateToProps, null)(VatCodesListToolbar);
