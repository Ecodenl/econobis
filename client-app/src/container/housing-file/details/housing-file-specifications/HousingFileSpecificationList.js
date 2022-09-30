import React from 'react';
import { connect } from 'react-redux';

import HousingFileSpecificationItem from './HousingFileSpecificationItem';

const HousingFileSpecificationList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-2">Specificatie</div>
                <div className="col-sm-1">Status</div>
                <div className="col-sm-1">Datum realisatie</div>
                <div className="col-sm-2">Waarde (antwoord)</div>
                <div className="col-sm-1">Verdieping</div>
                <div className="col-sm-1">Zijde</div>
                <div className="col-sm-1">Type/merk</div>
                <div className="col-sm-2">Categorie</div>
                <div className="col-sm-1" />
            </div>
            {props.housingFileSpecifications.length > 0 ? (
                props.housingFileSpecifications.map((housingFileSpecification, i) => {
                    return <HousingFileSpecificationItem key={i} housingFileSpecification={housingFileSpecification} />;
                })
            ) : (
                <div>Geen interesses bekend.</div>
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
