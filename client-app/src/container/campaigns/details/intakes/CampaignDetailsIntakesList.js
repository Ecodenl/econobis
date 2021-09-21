import React from 'react';
import DataTable from '../../../../components/dataTable/DataTable';
import DataTableHead from '../../../../components/dataTable/DataTableHead';
import DataTableHeadTitle from '../../../../components/dataTable/DataTableHeadTitle';
import DataTableBody from '../../../../components/dataTable/DataTableBody';
import DataTablePagination from '../../../../components/dataTable/DataTablePagination';
import CampaignDetailsIntakeView from './CampaignDetailsIntakeView';

const CampaignDetailsIntakesList = ({ data, meta, page, setPage, isLoading }) => {
    function handlePageClick(data) {
        setPage(data.selected);
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
                    {isLoading ? (
                        <tr>
                            <td colSpan={7}>Bezig met laden.</td>
                        </tr>
                    ) : data.length > 0 ? (
                        data.map(intake => {
                            return <CampaignDetailsIntakeView key={intake.id} {...intake} />;
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
                    totalRecords={meta.total}
                    initialPage={page}
                    recordsPerPage={10}
                />
            </div>
        </div>
    );
};

export default CampaignDetailsIntakesList;
