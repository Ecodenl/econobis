import React, { Component } from 'react';

import AdministrationDetailsSepasList from './AdministrationDetailsSepasList';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import { connect } from 'react-redux';

class AdministrationDetailsSepas extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Sepa bestanden</span>
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <AdministrationDetailsSepasList />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(AdministrationDetailsSepas);
