import React, { Component } from 'react';

import IntakeDetailsOpportunitiesList from './IntakeDetailsOpportunitiesList';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import { connect } from 'react-redux';

class IntakeDetailsOpportunities extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Gerelateerde kansen</span>
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <IntakeDetailsOpportunitiesList />
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

export default connect(mapStateToProps)(IntakeDetailsOpportunities);
