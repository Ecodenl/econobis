import React from 'react';
import { connect } from 'react-redux';

import RevenueDistributionFormView from './RevenueDistributionFormView';
import DataTablePagination from '../../../../../../components/dataTable/DataTablePagination';

const RevenueDistributionFormList = props => {
    return (
        <div>
            <div className="row border header">
                {props.projectRevenue.confirmed && props.showCheckboxList ? (
                    <div className="col-sm-1">
                        <input type="checkbox" onChange={props.toggleCheckedAll} checked={props.checkedAll} />
                    </div>
                ) : null}
                <div className="col-sm-1">Type</div>
                <div className="col-sm-2">Naam</div>
                {props.projectTypeCodeRef == 'loan' ? (
                    <div className="col-sm-2">Huidige lening</div>
                ) : (
                    <div className="col-sm-1">Deelnames</div>
                )}
                {props.projectRevenue.category.codeRef === 'revenueKwh' ? (
                    <React.Fragment>
                        <div className="col-sm-2">Energieleverancier</div>
                        <div className="col-sm-1">Geleverd totaal</div>
                        <div className="col-sm-2">Teruggave energiebelasting</div>
                    </React.Fragment>
                ) : (
                    ''
                )}
                {props.projectRevenue.category.codeRef === 'revenueEuro' ? (
                    <React.Fragment>
                        <div className="col-sm-2">Uit te keren bedrag</div>
                        <div className="col-sm-1">Uitkeren op</div>
                        <div className="col-sm-2">Datum uitkering</div>
                    </React.Fragment>
                ) : (
                    ''
                )}
                {props.projectRevenue.category.codeRef === 'redemptionEuro' ? (
                    <React.Fragment>
                        <div className="col-sm-2">Af te lossen bedrag</div>
                        <div className="col-sm-1">Aflossen op</div>
                        <div className="col-sm-2">Datum aflossing</div>
                    </React.Fragment>
                ) : (
                    ''
                )}
                <div className="col-sm-2">Status</div>
            </div>
            {props.projectRevenue.distribution && props.projectRevenue.distribution.data.length > 0 ? (
                props.projectRevenue.distribution.data.map(participation => {
                    return (
                        <RevenueDistributionFormView
                            key={participation.id}
                            participation={participation}
                            showCheckboxList={props.showCheckboxList}
                            toggleDistributionCheck={props.toggleDistributionCheck}
                            projectRevenueCategoryCodeRef={props.projectRevenue.category.codeRef}
                            projectTypeCodeRef={props.projectTypeCodeRef}
                            distributionIds={props.distributionIds}
                            createType={props.createType}
                            distributionIdsTotalToProcess={props.distributionIdsTotalToProcess}
                        />
                    );
                })
            ) : (
                <div>Geen deelnemers bekend.</div>
            )}
            {/* todo origineel 100: voor testen op 4*/}
            <DataTablePagination
                initialPage={0}
                onPageChangeAction={props.changePage}
                recordsPerPage={100}
                totalRecords={
                    props.projectRevenue.distribution &&
                    props.projectRevenue.distribution.meta &&
                    props.projectRevenue.distribution.meta.total
                }
            />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        projectTypeCodeRef: state.projectRevenue.project?.projectType?.codeRef,
        projectRevenue: state.projectRevenue,
    };
};

export default connect(mapStateToProps)(RevenueDistributionFormList);
