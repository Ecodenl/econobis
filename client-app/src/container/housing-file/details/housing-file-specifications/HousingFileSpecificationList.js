import React from 'react';
import { connect } from 'react-redux';

import HousingFileSpecificationItem from './HousingFileSpecificationItem';

const HousingFileSpecificationList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-3">Specificatie</div>
                <div className="col-sm-3">Categorie</div>
                <div className="col-sm-3">Status</div>
                <div className="col-sm-2">Datum realisatie</div>
                <div className="col-sm-1" />
            </div>
            {props.housingFileSpecifications.length > 0 ? (
                props.housingFileSpecifications.map((housingFileSpecification, i) => {
                    return <HousingFileSpecificationItem key={i} housingFileSpecification={housingFileSpecification} />;
                })
            ) : (
                <div>Geen specificaties bekend.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        housingFileSpecifications: state.housingFileDetails.housingFileSpecifications,
    };
};

export default connect(mapStateToProps)(HousingFileSpecificationList);