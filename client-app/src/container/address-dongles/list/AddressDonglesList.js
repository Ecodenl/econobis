import React, { Component } from 'react';
import { connect } from 'react-redux';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';

import AddressDonglesListItem from './AddressDonglesListItem';

class AddressDonglesList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van dongles.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (this.props.addressDongles.length === 0) {
            loadingText = 'Geen dongels gevonden!';
        } else {
            loading = false;
        }
        console.log(this.props);
        return (
            <div>
                <DataTable>
                    <DataTableHead>
                        <tr className="thead-title-quaternary">
                            <DataTableHeadTitle title={'Contact'} width={'15%'} />
                            <DataTableHeadTitle title={'Adres'} width={'15%'} />
                            <DataTableHeadTitle title={'Postcode'} width={'10%'} />
                            <DataTableHeadTitle title={'Woonplaats'} width={'10%'} />
                            <DataTableHeadTitle title={'Type uitlezing'} width={'10%'} />
                            <DataTableHeadTitle title={'Start datum'} width={'10%'} />
                            <DataTableHeadTitle title={'Eind datum'} width={'10%'} />
                            <DataTableHeadTitle title={'Type dongel'} width={'10%'} />
                            <DataTableHeadTitle title={'Energie ID koppeling'} width={'10%'} />
                        </tr>
                    </DataTableHead>

                    <DataTableBody>
                        {loading ? (
                            <tr>
                                <td colSpan={9}>{loadingText}</td>
                            </tr>
                        ) : (
                            this.props.addressDongles.map(addressDongle => (
                                <AddressDonglesListItem key={addressDongle.id} {...addressDongle} />
                            ))
                        )}
                    </DataTableBody>
                </DataTable>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        addressDongles: state.systemData.addressDongles,
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

export default connect(mapStateToProps, null)(AddressDonglesList);
