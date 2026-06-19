import React from 'react';
import { connect } from 'react-redux';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import FinancialOverviewContactList from './FinancialOverviewContactList';

const FinancialOverviewContactHarmonica = ({
    toggleShowList,
    showFinancialOverviewContactList,
    financialOverviewContactCount,
    permissions,
}) => {
    return (
        permissions.viewFinancialOverview && (
            <Panel className={'harmonica-button'}>
                <PanelBody>
                    <div className="col-sm-10" onClick={toggleShowList} role="button">
                        <span>
                            WAARDESTATEN <span className="badge">{financialOverviewContactCount}</span>
                        </span>
                    </div>
                    <div className="col-sm-12">
                        {showFinancialOverviewContactList && <FinancialOverviewContactList />}
                    </div>
                </PanelBody>
            </Panel>
        )
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(FinancialOverviewContactHarmonica);
