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
                <div className="col-sm-1">Deelnames</div>
                <div className="col-sm-2">Energieleverancier</div>
                <div className="col-sm-1">Geleverd totaal</div>
                <div className="col-sm-2">Teruggave energiebelasting</div>
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
                        />
                    );
                })
            ) : (
                <div>Geen deelnemers bekend.</div>
            )}
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
        projectTypeCodeRef: state.projectRevenue.project.projectType.codeRef,
        projectRevenue: state.projectRevenue,
    };
};

export default connect(mapStateToProps)(RevenueDistributionFormList);
