import React, { Component } from 'react';

import MeasureCategoryDetailsToolbar from './MeasureCategoryDetailsToolbar';
import MeasureCategoryDetailsForm from './MeasureCategoryDetailsForm';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import MeasureCategoryDetailsAPI from '../../../api/measure-category/MeasureCategoryDetailsAPI';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const MeasureCategoryDetailsAppWrapper = props => {
    const params = useParams();
    return <MeasureCategoryDetailsApp {...props} params={params} />;
};

class MeasureCategoryDetailsApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            measureCategory: {},
            isLoading: false,
            hasError: false,
        };
    }

    componentDidMount() {
        this.callFetchMeasureCategoryDetails();
    }

    callFetchMeasureCategoryDetails = () => {
        this.setState({ isLoading: true, hasError: false });
        MeasureCategoryDetailsAPI.fetchMeasureCategoryDetails(this.props.params.id)
            .then(payload => {
                this.setState({
                    isLoading: false,
                    measureCategory: {
                        ...payload.data.data,
                    },
                });
            })
            .catch(error => {
                this.setState({ isLoading: false, hasError: true });
            });
    };

    updateState = measureCategory => {
        this.setState({ measureCategory });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-small'}>
                                <MeasureCategoryDetailsToolbar name={this.state.measureCategory.name || ''} />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <MeasureCategoryDetailsForm
                            measureCategory={this.state.measureCategory}
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

export default MeasureCategoryDetailsAppWrapper;
