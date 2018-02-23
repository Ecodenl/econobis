import React, { Component} from 'react';

import ContactDetailsFormContactEnergySupplierList from './ContactDetailsFormContactEnergySupplierList';
import ContactDetailsFormContactEnergySupplierNew from './ContactDetailsFormContactEnergySupplierNew';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

class ContactDetailsFormContactEnergySupplier extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNew: false,
        };
    }

    toggleShowNew = () => {
        this.setState({
            showNew: !this.state.showNew,
        })
    };

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Energie leveranciers</span>
                    <a role="button" className="pull-right" onClick={this.toggleShowNew}><span className="glyphicon glyphicon-plus"/></a>
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <ContactDetailsFormContactEnergySupplierList />
                    </div>
                    <div className="col-md-12 margin-10-top">
                        { this.state.showNew && <ContactDetailsFormContactEnergySupplierNew toggleShowNew={this.toggleShowNew} /> }
                    </div>
                </PanelBody>
            </Panel>
        );
    }
};

export default ContactDetailsFormContactEnergySupplier;
