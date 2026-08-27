import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import ButtonIcon from '../../../components/button/ButtonIcon';
import * as PropTypes from 'prop-types';

// Functionele wrapper voor de class component
const LedgersListToolbarWrapper = props => {
    const navigate = useNavigate();
    return <LedgersListToolbar {...props} navigate={navigate} />;
};

class LedgersListToolbar extends Component {
    render() {
        let { ledgersCount, refreshLedgersData, permissions } = this.props;
        const newLedger = () => {
            this.props.navigate(`/grootboekrekening/nieuw`);
        };

        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group" role="group">
                        <ButtonIcon iconName={'refresh'} onClickAction={refreshLedgersData} />
                        {permissions.manageFinancial && <ButtonIcon iconName={'plus'} onClickAction={newLedger} />}
                    </div>
                </div>
                <div className="col-md-4">
                    <h3 className="text-center table-title">Grootboekrekeningen</h3>
                </div>
                <div className="col-md-4">
                    <div className="pull-right">Resultaten: {ledgersCount}</div>
                </div>
            </div>
        );
    }
}

LedgersListToolbar.propTypes = {
    ledgersCount: PropTypes.any,
    refreshLedgersData: PropTypes.any,
    permissions: PropTypes.any,
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(LedgersListToolbarWrapper);
