import React from 'react';

import ProductNewForm from './ProductNewForm';
import ProductNewToolbar from './ProductNewToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

const ProductNewApp = () => {
    return (
        <div className="row">
            <div className="col-md-9">
                        <div className="col-md-12 margin-10-top">
                            <Panel>
                                <PanelBody className="panel-small">
                                    <ProductNewToolbar />
                                </PanelBody>
                            </Panel>
                        </div>

                        <div className="col-md-12 margin-10-top">
                            <ProductNewForm />
                        </div>
            </div>
            <div className="col-md-3" />
        </div>
    )
};

export default ProductNewApp;