import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import ProductionProjectGeneralFormGeneral from './form/ProductionProjectGeneralFormGeneral';
import ParticipantsListApp from './participant/list/ParticipantsListApp';

class ProductionProjectGeneralForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return isEmpty(this.props.productionProject) ? (
            <div>Geen gegevens gevonden.</div>
        ) : (
            <div>
                <ProductionProjectGeneralFormGeneral />
                <ParticipantsListApp />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        productionProject: state.productionProjectDetails,
    };
};

export default connect(mapStateToProps)(ProductionProjectGeneralForm);
