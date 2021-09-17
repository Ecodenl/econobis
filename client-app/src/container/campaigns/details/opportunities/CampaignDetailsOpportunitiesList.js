import React from 'react';
import { connect } from 'react-redux';

import CampaignDetailsOpportunityItem from './CampaignDetailsOpportunityItem';
import DataTable from '../../../../components/dataTable/DataTable';
import DataTableHead from '../../../../components/dataTable/DataTableHead';
import DataTableHeadTitle from '../../../../components/dataTable/DataTableHeadTitle';
import DataTableBody from '../../../../components/dataTable/DataTableBody';
import CampaignDetailsIntakeItem from '../intakes/CampaignDetailsIntakeItem';
import DataTablePagination from '../../../../components/dataTable/DataTablePagination';
import { fetchCampaign } from '../../../../actions/campaign/CampaignDetailsActions';
import { setCampaignPagination } from '../../../../actions/campaign/CampaignsPaginationActions';

const CampaignDetailsOpportunitiesList = props => {
    const { data = [], meta = {} } = props.opportunities;

    function fetchCampaignData(page) {
        setTimeout(() => {
            const pagination = { page: page };

            props.fetchCampaign(props.campaignId, pagination);
        }, 100);
    }

    function handlePageClick(data) {
        let page = data.selected + 1;

        props.setCampaignPagination({ page: page });

        fetchCampaignData(page);
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
                    {data.length > 0 ? (
                        data.map(opportunity => {
                            return <CampaignDetailsOpportunityItem key={opportunity.id} opportunity={opportunity} />;
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
                    totalRecords={props.opportunities.total}
                    initialPage={
                        props.campaignPagination.page > 0
                            ? props.campaignPagination.page - 1
                            : props.campaignPagination.page
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(CampaignDetailsOpportunitiesList);
