import React, { Component } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import SourcesListItem from './SourcesListItem';

import * as PropTypes from 'prop-types';

class SourcesList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { sources, hasError, isLoading } = this.props;
        let loadingText = '';
        let loading = true;

        if (hasError) {
            loadingText = 'Fout bij het ophalen van aanmeldingsbronnen.';
        } else if (isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (sources.length === 0) {
            loadingText = 'Geen aanmeldingsbronnen gevonden!';
        } else {
            loading = false;
        }

        return (
            <div>
                <DataTable>
                    <DataTableHead>
                        <tr className="thead-title">
                            <DataTableHeadTitle title={'Naam'} width={'40%'} />
                            <DataTableHeadTitle title={'Aangepaste naam'} width={'40%'} />
                            <DataTableHeadTitle title={'Zichtbaar'} width={'10%'} />
                            <DataTableHeadTitle title={''} width={'10%'} />
                        </tr>
                    </DataTableHead>
                    <DataTableBody>
                        {loading ? (
                            <tr>
                                <td colSpan={5}>{loadingText}</td>
                            </tr>
                        ) : (
                            sources.map(source => {
                                return (
                                    <SourcesListItem
                                        key={source.id}
                                        {...source}
                                    />
                                );
                            })
                        )}
                    </DataTableBody>
                </DataTable>
            </div>
        );
    }
}

SourcesList.propTypes = {
    sources: PropTypes.any,
    hasError: PropTypes.any,
    isLoading: PropTypes.any,
};

export default SourcesList;
