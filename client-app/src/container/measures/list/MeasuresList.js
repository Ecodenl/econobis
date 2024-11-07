import React, { Component } from 'react';
import { connect } from 'react-redux';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';

import MeasuresListItem from './MeasuresListItem';

class MeasuresList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van maatregelen.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (this.props.measures.length === 0) {
            loadingText = 'Geen maatregelen gevonden!';
        } else {
            loading = false;
        }

        return (
            <div>
                <DataTable>
                    <DataTableHead>
                        <tr className="thead-title-quaternary">
                            <DataTableHeadTitle title={'Nummer'} width={'15%'} />
                            <DataTableHeadTitle title={'Maatregel categorie'} width={'29%'} />
                            <DataTableHeadTitle title={'Maatregel'} width={'20%'} />
                            <DataTableHeadTitle title={'Aangepaste naam'} width={'20%'} />
                            <DataTableHeadTitle title={'Zichtbaar'} width={'10%'} />
                            <DataTableHeadTitle title={''} width={'6%'} />
                        </tr>
                    </DataTableHead>
                    <DataTableBody>
                        {loading ? (
                            <tr>
                                <td colSpan={4}>{loadingText}</td>
                            </tr>
                        ) : (
                            this.props.measures.map(measure => <MeasuresListItem key={measure.id} {...measure} />)
                        )}
                    </DataTableBody>
                </DataTable>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        measures: state.measures,
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

export default connect(mapStateToProps, null)(MeasuresList);
