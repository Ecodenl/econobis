import React, { Component } from 'react';

import CostCenterDetailsToolbar from './CostCenterDetailsToolbar';
import CostCenterDetailsForm from './CostCenterDetailsForm';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import CostCenterDetailsAPI from '../../../api/cost-center/CostCenterDetailsAPI';
import { setError } from '../../../actions/general/ErrorActions';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const CostCenterDetailsAppWrapper = props => {
    const navigate = useNavigate();
    const params = useParams();
    return <CostCenterDetailsApp {...props} navigate={navigate} params={params} />;
};

class CostCenterDetailsApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            costCenter: {},
            isLoading: false,
            hasError: false,
        };
    }

    componentDidMount() {
        this.callFetchCostCenterDetails();
    }

    callFetchCostCenterDetails = () => {
        this.setState({ isLoading: true, hasError: false });
        CostCenterDetailsAPI.fetchCostCenterDetails(this.props.params.id)
            .then(payload => {
                this.setState({
                    isLoading: false,
                    costCenter: payload.data.data,
                });
            })
            .catch(error => {
                this.setState({ isLoading: false, hasError: true });
            });
    };

    deleteCostCenter = id => {
        // Api aanroepen met delete
        CostCenterDetailsAPI.deleteCostCenter(id)
            .then(payload => {
                this.props.navigate(`/kostenplaatsen`);
            })
            .catch(error => {
                // this.setState({ isLoading: false, hasError: true });
                this.props.setError(error.response.status, error.response.data.message);
            });
    };

    updateState = costCenter => {
        this.setState({ costCenter });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-small'}>
                                <CostCenterDetailsToolbar
                                    description={this.state.costCenter.description || ''}
                                    id={this.state.costCenter.id}
                                    deleteCostCenter={this.deleteCostCenter}
                                />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <CostCenterDetailsForm
                            costCenter={this.state.costCenter}
                            isLoading={this.state.isLoading}
                            hasError={this.state.hasError}
                            updateState={this.updateState}
                        />
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(null, mapDispatchToProps)(CostCenterDetailsAppWrapper);
