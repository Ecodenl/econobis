import React from 'react';
import { connect } from 'react-redux';

import CampaignDetailsIntakeItem from './CampaignDetailsIntakeItem';
import DataTable from '../../../../components/dataTable/DataTable';
import DataTableHead from '../../../../components/dataTable/DataTableHead';
import DataTableHeadTitle from '../../../../components/dataTable/DataTableHeadTitle';
import DataTableBody from '../../../../components/dataTable/DataTableBody';
import DataTablePagination from '../../../../components/dataTable/DataTablePagination';
import { fetchCampaign } from '../../../../actions/campaign/CampaignDetailsActions';
import { setCampaignPagination } from '../../../../actions/campaign/CampaignsPaginationActions';

const CampaignDetailsIntakesList = props => {
    const { data = [], meta = {} } = props.intakes;

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
                        <DataTableHeadTitle title={'Id'} width={'10%'} />
                        <DataTableHeadTitle title={'Type'} width={'15%'} />
                        <DataTableHeadTitle title={'Naam'} width={'15%'} />
                        <DataTableHeadTitle title={'Adres'} width={'15%'} />
                        <DataTableHeadTitle title={'Postcode'} width={'15%'} />
                        <DataTableHeadTitle title={'Plaats'} width={'15%'} />
                        <DataTableHeadTitle title={'Gereageerd op'} width={'15%'} />
                    </tr>
                </DataTableHead>
                <DataTableBody>
                    {data.length > 0 ? (
                        data.map(intake => {
                            return <CampaignDetailsIntakeItem key={intake.id} intake={intake} />;
                        })
                    ) : (
                        <tr>
                            <td colSpan={7}>Geen intakes bekend.</td>
                        </tr>
                    )}
                </DataTableBody>
            </DataTable>
            <div className="col-md-6 col-md-offset-3">
                <DataTablePagination
                    onPageChangeAction={handlePageClick}
                    totalRecords={props.intakes.total}
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
        intakes: state.campaignDetails.details.intakes,
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

export default connect(mapStateToProps, mapDispatchToProps)(CampaignDetailsIntakesList);
