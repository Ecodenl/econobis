import React from 'react';
import {connect} from 'react-redux';

import RevenueDistributionFormDynamicView from "./RevenueDistributionFormDynamicView";
import RevenueDistributionFormStaticView from "./RevenueDistributionFormStaticView";
import DataTablePagination from "../../../../../../components/dataTable/DataTablePagination";

const RevenueDistributionFormList = props => {
    return (
        <div>
            <div className="row border header">
                {(props.productionProjectRevenue.confirmed && props.showCheckboxList && props.checkedAll) ?
                    <div className="col-sm-1"><input type="checkbox" onChange={props.toggleCheckedAll} checked/></div>
                    : ''
                }
                {(props.productionProjectRevenue.confirmed && props.showCheckboxList && !props.checkedAll) ?
                <div className="col-sm-1"><input type="checkbox" onChange={props.toggleCheckedAll}/></div>
                    : ''
                }
                {!props.showCheckboxList &&
                      <div className="col-sm-1">Id</div>
                }

                <div className="col-sm-1">Type</div>
                <div className="col-sm-2">Naam</div>
                <div className="col-sm-1">Participaties</div>
                <div className="col-sm-1">Uit te keren bedrag</div>
                <div className="col-sm-1">Uitkeren op</div>
                <div className="col-sm-1">Datum uitkering</div>
                <div className="col-sm-2">Energieleverancier</div>
                <div className="col-sm-1">Geleverd totaal</div>
                <div className="col-sm-1">Teruggave energiebelasting</div>
            </div>
            {props.productionProjectRevenue.confirmed ?
                (props.productionProjectRevenue.distribution && props.productionProjectRevenue.distribution.data.length > 0) ?
                    props.productionProjectRevenue.distribution.data.map(participation => {
                        return <RevenueDistributionFormStaticView
                            key={participation.id}
                            participation={participation}
                            showCheckboxList={props.showCheckboxList}
                            checkedAll={props.checkedAll}
                            toggleParticipantCheck={props.toggleParticipantCheck}
                            toggleParticipantCheckNoEmail={props.toggleParticipantCheckNoEmail}
                        />;
                    })
                    :
                    <div>Geen participanten bekend.</div>

                :

                (props.participations && props.participations.data.length > 0) ?
                    props.participations.data.map(participation => {
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
            <DataTablePagination
                initialPage={0}
                onPageChangeAction={props.changePage}
                recordsPerPage={100}
                totalRecords={props.productionProjectRevenue.confirmed
                    ?
                    (props.productionProjectRevenue.distribution && props.productionProjectRevenue.distribution.meta.total)
                    :
                    (props.productionProjectRevenue.participants && props.productionProjectRevenue.participants.meta.total)
                }
            />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        participations: state.productionProjectRevenue.participants,
        productionProject: state.productionProjectRevenue.productionProject,
        productionProjectRevenue: state.productionProjectRevenue,
    };
};

export default connect(mapStateToProps)(RevenueDistributionFormList);
