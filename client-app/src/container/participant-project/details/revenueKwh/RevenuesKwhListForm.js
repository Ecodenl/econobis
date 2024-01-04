import React from 'react';

import RevenuesKwhListFormList from './RevenuesKwhListFormList';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

const RevenuesKwhListForm = () => {
    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Deelname in opbrengsten Kwh</span>
            </PanelHeader>
            <PanelBody>
                <div className="col-md-12">
                    <RevenuesKwhListFormList />
                </div>
            </PanelBody>
        </Panel>
    );
};

export default RevenuesKwhListForm;
