import React from 'react';

import ProductDetailsFormConclusionView from './ProductDetailsFormConclusionView';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

const ProductDetailsFormConclusion = props => {
    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Afsluiting gegevens</span>
            </PanelHeader>
            <PanelBody>
                <div className="col-md-12">
                    <ProductDetailsFormConclusionView />
                </div>
            </PanelBody>
        </Panel>
    );
};

export default ProductDetailsFormConclusion;