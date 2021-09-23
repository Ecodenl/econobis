import React from 'react';
import DataTablePagination from '../../../../components/dataTable/DataTablePagination';
import CampaignDetailsOpportunityView from './CampaignDetailsOpportunityView';

const CampaignDetailsOpportunitiesList = ({ data, meta, page, setPage, isLoading }) => {
    function handlePageClick(data) {
        setPage(data.selected);
    }

    return (
        <div>
            <div className="row border header">
                <div className="col-sm-2">Nummer</div>
                <div className="col-sm-1">Datum</div>
                <div className="col-sm-3">Naam</div>
                <div className="col-sm-3">Maatregel categorie</div>
                <div className="col-sm-1">Status</div>
                <div className="col-sm-2">Aantal offertes</div>
            </div>
            <div>
                {isLoading ? (
                    <div>Bezig met laden.</div>
                ) : data.length > 0 ? (
                    data.map(opportunity => {
                        return <CampaignDetailsOpportunityView key={opportunity.id} {...opportunity} />;
                    })
                ) : (
                    <div>Geen kansen bekend.</div>
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

export default CampaignDetailsOpportunitiesList;
