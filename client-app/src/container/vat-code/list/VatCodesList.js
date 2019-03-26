import React, { Component } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import VatcodesListItem from './VatcodesListItem';

class VatCodesLists extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van btw codes.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (this.props.vatCodes.length === 0) {
            loadingText = 'Geen btw codes gevonden!';
        } else {
            loading = false;
        }

        return (
            <div>
                <DataTable>
                    <DataTableHead>
                        <tr className="thead-title">
                            <DataTableHeadTitle title={'Startdatum'} width={'20%'} />
                            <DataTableHeadTitle title={'Omschrijving'} width={'65%'} />
                            <DataTableHeadTitle title={'Percentage'} width={'10%'} />
                            <DataTableHeadTitle title={''} width={'5%'} />
                        </tr>
                    </DataTableHead>
                    <DataTableBody>
                        {loading ? (
                            <tr>
                                <td colSpan={3}>{loadingText}</td>
                            </tr>
                        ) : (
                            this.props.vatCodes.map(vatCode => {
                                return <VatcodesListItem key={vatCode.id} {...vatCode} />;
                            })
                        )}
                    </DataTableBody>
                </DataTable>
            </div>
        );
    }
}

export default VatCodesLists;
