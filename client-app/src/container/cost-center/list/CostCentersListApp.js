import React, { Component } from 'react';

import CostCentersList from './CostCentersList';
import CostCentersListToolbar from './CostCentersListToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import CostCenterAPI from '../../../api/cost-center/CostCenterAPI';
import CostCenterDetailsAPI from "../../../api/cost-center/CostCenterDetailsAPI";
import {setError} from "../../../actions/general/ErrorActions";
import {connect} from "react-redux";

class CostCentersListApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            costCenters: [],
            isLoading: false,
            hasError: false,
        };
    }

    componentDidMount() {
        this.callFetchCostCentersData();
    }

    callFetchCostCentersData = () => {
        this.setState({ isLoading: true, hasError: false });
        CostCenterAPI.fetchCostCenters()
            .then(payload => {
                this.setState({ isLoading: false, costCenters: payload.data.data });
            })
            .catch(error => {
                this.setState({ isLoading: false, hasError: true });
            });
    };

    deleteCostCenter = (id) => {
        // Api aanroepen met delete
        CostCenterDetailsAPI.deleteCostCenter(id)
            .then(payload => {
                this.setState({costCenters: this.state.costCenters.filter(costCenter => costCenter.id !== id)})
            })
            .catch(error => {
                // this.setState({ isLoading: false, hasError: true });
                this.props.setError(error.response.status, error.response.data.message);
            });
    }

    render() {
        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <CostCentersListToolbar
                            costCentersCount={this.state.costCenters ? this.state.costCenters.length : 0}
                            refreshCostCentersData={this.callFetchCostCentersData}
                        />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <CostCentersList
                            costCenters={this.state.costCenters}
                            isLoading={this.state.isLoading}
                            hasError={this.state.hasError}
                            deleteCostCenter={this.deleteCostCenter}
                        />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(null, mapDispatchToProps)(CostCentersListApp);
