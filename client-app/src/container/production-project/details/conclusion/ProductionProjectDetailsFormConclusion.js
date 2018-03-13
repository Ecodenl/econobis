import React from 'react';

import ProductionProjectDetailsFormConclusionView from './ProductionProjectDetailsFormConclusionView';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

const ProductionProjectDetailsFormConclusion = props => {
    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Afsluiting gegevens</span>
            </PanelHeader>
            <PanelBody>
                <div className="col-md-12">
                    <ProductionProjectDetailsFormConclusionView />
                </div>
            </PanelBody>
        </Panel>
    );
};

export default ProductionProjectDetailsFormConclusion;