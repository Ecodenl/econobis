import React from 'react';
import { connect } from 'react-redux';

import RevenuePartsKwhDistributionFormView from './RevenuePartsKwhDistributionFormView';
import DataTablePagination from '../../../../../../../../components/dataTable/DataTablePagination';

const RevenuePartsKwhDistributionFormList = props => {
    return (
        <div>
            <div className="row border header">
                {props.revenuePartsKwh.status == 'confirmed' && props.showCheckboxList ? (
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
                <div className="col-sm-1"></div>
            </div>
            {props.revenuePartsKwh.distributionPartsKwh &&
            props.revenuePartsKwh.distributionPartsKwh.data.length > 0 ? (
                props.revenuePartsKwh.distributionPartsKwh.data.map(participation => {
                    return (
                        <RevenuePartsKwhDistributionFormView
                            key={participation.id}
                            participation={participation}
                            showCheckboxList={props.showCheckboxList}
                            toggleDistributionCheck={props.toggleDistributionCheck}
                            distributionPartsKwhIds={props.distributionPartsKwhIds}
                            createType={props.createType}
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
                    props.revenuePartsKwh.distributionPartsKwh &&
                    props.revenuePartsKwh.distributionPartsKwh.meta &&
                    props.revenuePartsKwh.distributionPartsKwh.meta.total
                }
            />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        revenuePartsKwh: state.revenuePartsKwh,
        revenuesKwh: state.revenuesKwh,
    };
};

export default connect(mapStateToProps)(RevenuePartsKwhDistributionFormList);
