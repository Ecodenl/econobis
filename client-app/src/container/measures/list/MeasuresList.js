import React from 'react';
import { connect } from 'react-redux';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';

import MeasuresListItem from './MeasuresListItem';

const MeasuresList = (props) => (
    <div>
        <DataTable>
            <DataTableHead>
                <tr className="thead-title-quaternary">
                    <DataTableHeadTitle title={'Nummer'} width={'44%'}/>
                    <DataTableHeadTitle title={'Maatregel'} width={'44%'}/>
                    <DataTableHeadTitle title={''} width={'6%'}/>
                </tr>
            </DataTableHead>
            <DataTableBody>
                {
                    props.measures.length === 0 ? (
                        <tr>
                            <td colSpan={3}>Geen maatregelen gevonden!</td>
                        </tr>
                    ) : (
                        props.measures.map(measure => (
                            <MeasuresListItem
                                key={measure.id}
                                {...measure}
                            />
                        ))
                    )
                }
            </DataTableBody>
        </DataTable>
    </div>
);

const mapStateToProps = (state) => {
    return {
        measures: state.measures,
    };
};

export default connect(mapStateToProps, null)(MeasuresList);

