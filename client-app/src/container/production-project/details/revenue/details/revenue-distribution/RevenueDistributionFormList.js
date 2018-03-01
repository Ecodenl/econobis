import React from 'react';
import {connect} from 'react-redux';

import RevenueDistributionFormView from "./RevenueDistributionFormView";

const RevenueDistributionFormList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-1">Id</div>
                <div className="col-sm-1">Type</div>
                <div className="col-sm-1">Naam</div>
                <div className="col-sm-2">Adres</div>
                <div className="col-sm-1">Postcode</div>
                <div className="col-sm-1">Plaats</div>
                <div className="col-sm-1">Lid status</div>
                <div className="col-sm-1">Aantal participaties</div>
                <div className="col-sm-1">Uit te keren bedrag</div>
                <div className="col-sm-1">Uitkeren op</div>
                <div className="col-sm-1">Datum uitkering</div>
            </div>
            {
                props.participations.length > 0 ?
                    props.participations.map(participation => {
                        return <RevenueDistributionFormView
                            key={participation.id}
                            participation={participation}
                        />;
                    })
                    :
                    <div>Geen participanten bekend.</div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        participations: state.productionProjectRevenue.productionProject.participants,
    };
};

export default connect(mapStateToProps)(RevenueDistributionFormList);
