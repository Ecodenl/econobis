import React from 'react';

import HousingFileDetailsFormConclusionView from './HousingFileDetailsFormConclusionView';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

const HousingFile = props => {
    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Afsluiting gegevens</span>
            </PanelHeader>
            <PanelBody>
                <div className="col-md-12">
                    <HousingFileDetailsFormConclusionView />
                </div>
            </PanelBody>
        </Panel>
    );
};

export default HousingFile;