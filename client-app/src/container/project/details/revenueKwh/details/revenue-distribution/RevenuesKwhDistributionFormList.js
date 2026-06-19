import React from 'react';
import { connect } from 'react-redux';

import RevenuesKwhDistributionFormView from './RevenuesKwhDistributionFormView';
import DataTablePagination from '../../../../../../components/dataTable/DataTablePagination';

const RevenuesKwhDistributionFormList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-1">
                    {props.showCheckboxList ? (
                        <input type="checkbox" onChange={props.toggleCheckedAll} checked={props.checkedAll} />
                    ) : (
                        'Type'
                    )}
                </div>
                <div className="col-sm-2">Naam</div>
                <div className="col-sm-1">Deelnames</div>
                <div className="col-sm-2">Energieleveranciers</div>
                <div className="col-sm-1">Geleverd totaal</div>
                <div className="col-sm-2">Teruggave energiebelasting</div>
                <div className="col-sm-2">Status</div>
            </div>
            {props.revenuesKwh.distributionKwh && props.revenuesKwh.distributionKwh.data.length > 0 ? (
                props.revenuesKwh.distributionKwh.data.map(distributionKwh => {
                    return (
                        <RevenuesKwhDistributionFormView
                            key={distributionKwh.id}
                            distributionKwh={distributionKwh}
                            showCheckboxList={props.showCheckboxList}
                            toggleDistributionCheck={props.toggleDistributionCheck}
                            projectRevenueCategoryCodeRef={props.revenuesKwh.category.codeRef}
                            projectTypeCodeRef={props.projectTypeCodeRef}
                            distributionKwhIds={props.distributionKwhIds}
                            createType={props.createType}
                        />
                    );
                })
            ) : (
                <div>Geen deelnemers bekend.</div>
            )}
            {/* todo origineel 100: voor testen op 10*/}
            <DataTablePagination
                initialPage={0}
                onPageChangeAction={props.changePage}
                recordsPerPage={100}
                totalRecords={
                    props.revenuesKwh.distributionKwh &&
                    props.revenuesKwh.distributionKwh.meta &&
                    props.revenuesKwh.distributionKwh.meta.total
                }
            />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        projectTypeCodeRef: state.revenuesKwh.project?.projectType?.codeRef,
        revenuesKwh: state.revenuesKwh,
    };
};

export default connect(mapStateToProps)(RevenuesKwhDistributionFormList);
