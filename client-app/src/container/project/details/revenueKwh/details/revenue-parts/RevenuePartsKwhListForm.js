import React from 'react';

import RevenuePartsKwhListFormList from './RevenuePartsKwhListFormList';
import Panel from '../../../../../../components/panel/Panel';
import PanelBody from '../../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../../components/panel/PanelHeader';
import { connect } from 'react-redux';

const RevenuePartsKwhListForm = ({ permissions, revenueKwh }) => {
    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Opbrengsten Kwh standen</span>
            </PanelHeader>
            <PanelBody>
                <div className="col-md-12">
                    <RevenuePartsKwhListFormList />
                </div>
            </PanelBody>
        </Panel>
    );
};

const mapStateToProps = state => {
    return {
        revenuePartsKwh: state.revenuePartsKwh,
    };
};

export default connect(mapStateToProps)(RevenuePartsKwhListForm);
