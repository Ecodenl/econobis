import React from 'react';
import {connect} from 'react-redux';

import RevenueDistributionFormDynamicView from "./RevenueDistributionFormDynamicView";
import RevenueDistributionFormStaticView from "./RevenueDistributionFormStaticView";

const RevenueDistributionFormList = props => {
    return (
        <div>
            <div className="row border header">

                <div className="col-sm-1">Id</div>
                <div className="col-sm-1">Type</div>
                <div className="col-sm-1">Naam</div>
                <div className="col-sm-1">Adres</div>
                <div className="col-sm-1">Postcode</div>
                <div className="col-sm-1">Plaats</div>
                <div className="col-sm-1">Lid status</div>
                <div className="col-sm-1">Participaties</div>
                <div className="col-sm-1">Uit te keren bedrag</div>
                <div className="col-sm-1">Uitkeren op</div>
                <div className="col-sm-1">Datum uitkering</div>
                <div className="col-sm-1">Energieleverancier</div>
            </div>
            {props.productionProjectRevenue.confirmed ?
                props.productionProjectRevenue.distribution.length > 0 ?
                    props.productionProjectRevenue.distribution.map(participation => {
                        return <RevenueDistributionFormStaticView
                            key={participation.id}
                            participation={participation}
                            showCheckboxList={props.showCheckboxList}
                            toggleParticipantCheck={props.toggleParticipantCheck}
                        />;
                    })
                    :
                    <div>Geen participanten bekend.</div>

                :

                props.participations.length > 0 ?
                    props.participations.map(participation => {
                        return <RevenueDistributionFormDynamicView
                            key={participation.id}
                            participation={participation}
                            productionProjectRevenue={props.productionProjectRevenue}
                            productionProject={props.productionProject}
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
        productionProject: state.productionProjectRevenue.productionProject,
        productionProjectRevenue: state.productionProjectRevenue,
    };
};

export default connect(mapStateToProps)(RevenueDistributionFormList);
