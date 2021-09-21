import React from 'react';
import { connect } from 'react-redux';

import DataTable from '../../../../components/dataTable/DataTable';
import DataTableHead from '../../../../components/dataTable/DataTableHead';
import DataTableHeadTitle from '../../../../components/dataTable/DataTableHeadTitle';
import DataTableBody from '../../../../components/dataTable/DataTableBody';
import DataTablePagination from '../../../../components/dataTable/DataTablePagination';
import { fetchCampaign } from '../../../../actions/campaign/CampaignDetailsActions';
import { setCampaignPagination } from '../../../../actions/campaign/CampaignsPaginationActions';
import CampaignDetailsOpportunityView from './CampaignDetailsOpportunityView';

const CampaignDetailsOpportunitiesList = ({ data, meta, page, setPage, isLoading }) => {
    function handlePageClick(data) {
        setPage(data.selected);
    }

    return (
        <div>
            <DataTable>
                <DataTableHead>
                    <tr className="thead-title-tertiary">
                        <DataTableHeadTitle title={'Nummer'} width={'20%'} />
                        <DataTableHeadTitle title={'Datum'} width={'15%'} />
                        <DataTableHeadTitle title={'Naam'} width={'20%'} />
                        <DataTableHeadTitle title={'Maatregel categorie'} width={'20%'} />
                        <DataTableHeadTitle title={'Status'} width={'15%'} />
                        <DataTableHeadTitle title={'Aantal offertes'} width={'10%'} />
                    </tr>
                </DataTableHead>
                <DataTableBody>
                    {isLoading ? (
                        <tr>
                            <td colSpan={7}>Bezig met laden.</td>
                        </tr>
                    ) : data.length > 0 ? (
                        data.map(opportunity => {
                            console.log(opportunity);
                            return <CampaignDetailsOpportunityView key={opportunity.id} {...opportunity} />;
                        })
                    ) : (
                        <tr>
                            <td colSpan={6}>Geen kansen bekend.</td>
                        </tr>
                    )}
                </DataTableBody>
            </DataTable>
            <div className="col-md-6 col-md-offset-3">
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

const mapStateToProps = state => {
    return {
        campaignId: state.campaignDetails.details.id,
        opportunities: state.campaignDetails.details.opportunities,
        campaignPagination: state.campaignDetails.pagination,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchCampaign: (id, pagination) => {
        dispatch(fetchCampaign(id, pagination));
    },
    setCampaignPagination: pagination => {
        dispatch(setCampaignPagination(pagination));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CampaignDetailsOpportunitiesList);
