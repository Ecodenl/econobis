import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProductionProjectGeneralToolbar from './ProductionProjectGeneralToolbar';
import ProductionProjectGeneralForm from './ProductionProjectGeneralForm';
import ProductionProjectDetailsHarmonica from './../details/ProductionProjectDetailsHarmonica';
import Panel from "../../../components/panel/Panel";
import PanelBody from '../../../components/panel/PanelBody';

import { fetchProductionProject, clearProductionProject } from '../../../actions/production-project/ProductionProjectDetailsActions';

class ProductionProjectGeneralApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchProductionProject(this.props.params.id);
    }

    componentWillUnmount() {
        this.props.clearProductionProject();
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <ProductionProjectGeneralToolbar/>
                    </div>

                    <div className="col-md-12">
                        <ProductionProjectGeneralForm/>
                    </div>
                </div>
                <Panel className="col-md-3">
                    <PanelBody>
                        <ProductionProjectDetailsHarmonica/>
                    </PanelBody>
                </Panel>
            </div>
        )
    }
};

const mapDispatchToProps = dispatch => ({
    fetchProductionProject: (id) => {
        dispatch(fetchProductionProject(id));
    },
    clearProductionProject: () => {
        dispatch(clearProductionProject());
    },
});

export default connect(null, mapDispatchToProps)(ProductionProjectGeneralApp);