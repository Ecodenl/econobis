import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import RevenueFormGeneral from './form/RevenueFormGeneral';
import RevenueDistributionForm from './revenue-distribution/RevenueDistributionForm';
import RevenueConclusion from './conclusion/RevenueConclusion';
import Panel from '../../../../../components/panel/Panel';
import PanelHeader from '../../../../../components/panel/PanelHeader';

class RevenueDetailsForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return isEmpty(this.props.projectRevenue) ? (
            <div>Geen gegevens gevonden.</div>
        ) : (
            <div>
                {this.props.projectRevenue.confirmed == 1 && (
                    <Panel>
                        <PanelHeader>
                            <span className="h5" style={{ color: '#e64a4a' }}>
                                Deze opbrengst is definitief. Hierdoor kan deze niet meer gewijzigd worden en staat de
                                opbrengstverdeling vast.
                            </span>
                        </PanelHeader>
                    </Panel>
                )}
                <RevenueFormGeneral />
                <RevenueDistributionForm />
                <RevenueConclusion />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        projectRevenue: state.projectRevenue,
    };
};

export default connect(mapStateToProps)(RevenueDetailsForm);
