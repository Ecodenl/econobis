import React, { Component } from 'react';
import moment from 'moment';
import validator from 'validator';
import { isEmpty } from 'lodash';
import { hashHistory } from 'react-router';

import ProductionProjectNewToolbar from './ProductionProjectNewToolbar';
import ProductionProjectNew from './ProductionProjectNew';

import ProductionProjectDetailsAPI from '../../../api/production-project/ProductionProjectDetailsAPI';
import Panel from "../../../components/panel/Panel";
import PanelBody from "../../../components/panel/PanelBody";

class ProductionProjectNewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productionProject: {
                name: '',
                code: '',
                description: '',
                ownedById: '',
                productionProjectStatusId: '',
                dateStart: '',
                dateProduction: '',
                dateStartRegistrations: '',
                dateEndRegistrations: '',
                productionProjectTypeId: '',
                postalCode: '',
                address: '',
                city: '',
                ean: '',
                eanManager: '',
                warrantyOrigin: '',
                eanSupply: '',
                participationWorth: '',
                powerKwhAvailable: '',
                maxParticipations: '',
                taxReferral: '',
                maxParticipationsYouth: '',
                totalParticipations: '',
                minParticipations: '',
                isMembershipRequired: false,
                isParticipationTransferable: false,
            },
            errors: {
                name: false,
                code: false,
                ownedById: false,
            },
        }
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            productionProject: {
                ...this.state.productionProject,
                [name]: value
            },
        });
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            productionProject: {
                ...this.state.productionProject,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const {productionProject} = this.state;

        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(productionProject.name)){
            errors.name = true;
            hasErrors = true;
        };

        if(validator.isEmpty('' + productionProject.code)){
            errors.code = true;
            hasErrors = true;
        };

        if(validator.isEmpty('' + productionProject.ownedById)){
            errors.ownedById = true;
            hasErrors = true;
        };
        
        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
        ProductionProjectDetailsAPI.storeProductionProject(productionProject).then(payload => {
            hashHistory.push(`/productie-project/${payload.id}`);
        });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <ProductionProjectNewToolbar />
                    </div>

                    <div className="col-md-12">
                        <Panel>
                            <PanelBody>
                                <div className="col-md-12">
                                    <ProductionProjectNew
                                        productionProject={this.state.productionProject}
                                        errors={this.state.errors}
                                        handleInputChange={this.handleInputChange}
                                        handleInputChangeDate={this.handleInputChangeDate}
                                        handleSubmit={this.handleSubmit}
                                    />
                                </div>
                            </PanelBody>
                        </Panel>
                    </div>
                </div>
                <div className="col-md-3"/>
            </div>
        )
    }
};

export default ProductionProjectNewApp;