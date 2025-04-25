import React, { Component } from 'react';
import { connect } from 'react-redux';

import RevenueDetailsToolbar from './RevenueDetailsToolbar';

import { fetchRevenue, clearRevenue } from '../../../../../actions/project/ProjectDetailsActions';
import RevenueDistributionForm from './revenue-distribution/RevenueDistributionForm';
import RevenueConclusion from './conclusion/RevenueConclusion';
import Panel from '../../../../../components/panel/Panel';
import PanelHeader from '../../../../../components/panel/PanelHeader';
import RevenueFormGeneral from './form/RevenueFormGeneral';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const RevenueDetailsAppWrapper = props => {
    const params = useParams();
    return <RevenueDetailsApp {...props} params={params} />;
};

class RevenueDetailsApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchRevenue(this.props.params.id);
    }

    componentWillUnmount() {
        this.props.clearRevenue();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <RevenueDetailsToolbar />
                    </div>

                    {this.props.projectRevenue.id ? (
                        <div className="col-md-12">
                            {this.props.projectRevenue.confirmed == 1 && (
                                <Panel>
                                    <PanelHeader>
                                        <span className="h5" style={{ color: '#e64a4a' }}>
                                            Deze opbrengst is definitief. Hierdoor kan deze niet meer gewijzigd worden
                                            en staat de opbrengstverdeling vast.
                                        </span>
                                    </PanelHeader>
                                </Panel>
                            )}
                            <RevenueFormGeneral />
                            <RevenueDistributionForm />
                            <RevenueConclusion />
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
        projectRevenue: state.projectRevenue,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchRevenue: id => {
        dispatch(fetchRevenue(id));
    },
    clearRevenue: () => {
        dispatch(clearRevenue());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(RevenueDetailsAppWrapper);
