import React, { Component} from 'react';

import InvoiceProductsFormList from './InvoiceProductsFormList';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../components/panel/PanelHeader';
import {connect} from "react-redux";

class InvoiceProductsForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Factuurregels</span>
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <InvoiceProductsFormList />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    }
};

export default connect(mapStateToProps)(InvoiceProductsForm);
