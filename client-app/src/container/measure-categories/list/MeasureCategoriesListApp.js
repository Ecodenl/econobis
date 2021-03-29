import React, { Component } from 'react';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import MeasureCategoryAPI from '../../../api/measure-category/MeasureCategoryAPI';
import MeasureCategoriesListToolbar from './MeasureCategoriesListToolbar';
import MeasureCategoriesList from './MeasureCategoriesList';

class MeasureCategoriesListApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            measureCategories: [],
            isLoading: false,
            hasError: false,
        };
    }

    componentDidMount() {
        this.callFetchMeasureCategoriesData();
    }

    callFetchMeasureCategoriesData = () => {
        this.setState({ isLoading: true, hasError: false });
        MeasureCategoryAPI.fetchMeasureCategories()
            .then(payload => {
                this.setState({ isLoading: false, measureCategories: payload.data.data });
            })
            .catch(error => {
                this.setState({ isLoading: false, hasError: true });
            });
    };

    render() {
        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <MeasureCategoriesListToolbar
                            measureCategoriesCount={
                                this.state.measureCategories ? this.state.measureCategories.length : 0
                            }
                            refreshMeasureCategoriesData={this.callFetchMeasureCategoriesData}
                        />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <MeasureCategoriesList
                            measureCategories={this.state.measureCategories}
                            isLoading={this.state.isLoading}
                            hasError={this.state.hasError}
                        />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

export default MeasureCategoriesListApp;
