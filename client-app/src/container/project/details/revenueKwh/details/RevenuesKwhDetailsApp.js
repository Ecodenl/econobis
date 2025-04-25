import React, { Component } from 'react';
import { connect } from 'react-redux';

import RevenuesKwhdetailsToolbar from './RevenuesKwhdetailsToolbar';

import { fetchRevenuesKwh, clearRevenuesKwh } from '../../../../../actions/project/ProjectDetailsActions';
import Panel from '../../../../../components/panel/Panel';
import PanelHeader from '../../../../../components/panel/PanelHeader';
import RevenuesKwhFormGeneral from './form/RevenuesKwhFormGeneral';
import RevenuesKwhConclusion from './conclusion/RevenuesKwhConclusion';
import RevenuesKwhDistributionForm from './revenue-distribution/RevenuesKwhDistributionForm';
import RevenuePartsKwhListForm from './revenue-parts/RevenuePartsKwhListForm';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const RevenuesKwhDetailsAppWrapper = props => {
    const params = useParams();
    return <RevenuesKwhDetailsApp {...props} params={params} />;
};

class RevenuesKwhDetailsApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchRevenuesKwh(this.props.params.id);
    }

    componentWillUnmount() {
        this.props.clearRevenuesKwh();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <RevenuesKwhdetailsToolbar />
                    </div>

                    {this.props.revenuesKwh && this.props.revenuesKwh.id ? (
                        <div className="col-md-12">
                            {this.props.revenuesKwh.confirmed == 1 && (
                                <Panel>
                                    <PanelHeader>
                                        <span className="h5" style={{ color: '#e64a4a' }}>
                                            Deze opbrengst Kwh is definitief. Hierdoor kan deze niet meer gewijzigd
                                            worden en staat de opbrengstverdeling vast.
                                        </span>
                                    </PanelHeader>
                                </Panel>
                            )}
                            <RevenuesKwhFormGeneral />
                            <RevenuePartsKwhListForm />
                            <RevenuesKwhDistributionForm />
                            <RevenuesKwhConclusion />
                        </div>
                    ) : (
                        <div>Geen gegevens gevonden.</div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        revenuesKwh: state.revenuesKwh,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchRevenuesKwh: id => {
        dispatch(fetchRevenuesKwh(id));
    },
    clearRevenuesKwh: () => {
        dispatch(clearRevenuesKwh());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(RevenuesKwhDetailsAppWrapper);
