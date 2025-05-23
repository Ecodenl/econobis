import React, { Component } from 'react';
import { connect } from 'react-redux';

import RevenuePartsKwhDetailsToolbar from './RevenuePartsKwhDetailsToolbar';

import {
    fetchRevenuesKwh,
    fetchRevenuePartsKwh,
    clearRevenuesKwh,
    clearRevenuePartsKwh,
} from '../../../../../../../actions/project/ProjectDetailsActions';
import Panel from '../../../../../../../components/panel/Panel';
import PanelHeader from '../../../../../../../components/panel/PanelHeader';
import RevenuePartsKwhFormGeneral from './form/RevenuePartsKwhFormGeneral';
import RevenuePartsKwhConclusion from './conclusion/RevenuePartsKwhConclusion';
import RevenuePartsKwhDistributionForm from './revenue-distribution/RevenuePartsKwhDistributionForm';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const RevenuePartsKwhDetailsAppWrapper = props => {
    const params = useParams();
    return <RevenuePartsKwhDetailsApp {...props} params={params} />;
};

class RevenuePartsKwhDetailsApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchRevenuesKwh(this.props.params.revenueId);
        this.props.fetchRevenuePartsKwh(this.props.params.id);
    }

    componentWillUnmount() {
        this.props.clearRevenuesKwh();
        this.props.clearRevenuePartsKwh();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <RevenuePartsKwhDetailsToolbar />
                    </div>

                    {this.props.revenuePartsKwh && this.props.revenuePartsKwh.id ? (
                        <div className="col-md-12">
                            {(this.props.revenuePartsKwh.status == 'confirmed' ||
                                this.props.revenuePartsKwh.status == 'processed') && (
                                <Panel>
                                    <PanelHeader>
                                        <span className="h5" style={{ color: '#e64a4a' }}>
                                            Deze deelopbrengst Kwh is definitief. Hierdoor kan deze niet meer gewijzigd
                                            worden en staat de opbrengstverdeling vast.
                                        </span>
                                    </PanelHeader>
                                </Panel>
                            )}
                            <RevenuePartsKwhFormGeneral />
                            <RevenuePartsKwhDistributionForm revenuesKwh={this.props.revenuesKwh} />
                            <RevenuePartsKwhConclusion />
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
        revenuePartsKwh: state.revenuePartsKwh,
        revenuesKwh: state.revenuesKwh,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchRevenuesKwh: id => {
        dispatch(fetchRevenuesKwh(id));
    },
    fetchRevenuePartsKwh: id => {
        dispatch(fetchRevenuePartsKwh(id));
    },
    clearRevenuesKwh: () => {
        dispatch(clearRevenuesKwh());
    },
    clearRevenuePartsKwh: () => {
        dispatch(clearRevenuePartsKwh());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(RevenuePartsKwhDetailsAppWrapper);
