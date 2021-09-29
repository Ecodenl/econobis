import React from 'react';
import DataTablePagination from '../../../../components/dataTable/DataTablePagination';
import CampaignDetailsIntakeView from './CampaignDetailsIntakeView';

const CampaignDetailsIntakesList = ({ data, meta, page, setPage, isLoading }) => {
    function handlePageClick(data) {
        setPage(data.selected);
    }

    return (
        <div>
            <div className="row border header">
                <div className="col-sm-1">Id</div>
                <div className="col-sm-1">Type</div>
                <div className="col-sm-2">Naam</div>
                <div className="col-sm-3">Adres</div>
                <div className="col-sm-1">Postcode</div>
                <div className="col-sm-2">Plaats</div>
                <div className="col-sm-2">Gereageerd op</div>
            </div>
            <div>
                {isLoading ? (
                    <div>Bezig met laden.</div>
                ) : data.length > 0 ? (
                    data.map(intake => {
                        return <CampaignDetailsIntakeView key={intake.id} {...intake} />;
                    })
                ) : (
                    <div>Geen intakes bekend.</div>
                )}
            </div>
            <div className="col-md-6 col-md-offset-3 margin-20-top">
                <DataTablePagination
                    onPageChangeAction={handlePageClick}
                    totalRecords={meta.total}
                    initialPage={page}
                    recordsPerPage={10}
                />
            </div>
        </div>
    );
};

export default CampaignDetailsIntakesList;
