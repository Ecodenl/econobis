import React, { Component } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import GeneralSearchModalListItem from './GeneralSearchModalListItem';

class GeneralSearchModalList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gridVisible: true,
        };
    }

    toggleGridVisible() {
        this.setState({
            gridVisible: !this.state.gridVisible,
        });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="text-center table-title">
                            {this.props.modelName}({this.props.records.length})
                        </h3>
                    </div>
                </div>
                {!this.state.gridVisible ? (
                    <div>
                        <DataTable>
                            <DataTableHead>
                                <tr className="thead-title">
                                    <th colSpan={3} onClick={() => this.toggleGridVisible()}>
                                        Open
                                    </th>
                                </tr>
                            </DataTableHead>
                        </DataTable>
                    </div>
                ) : (
                    <div>
                        <DataTable>
                            <DataTableHead>
                                <tr className="thead-title" onClick={() => this.toggleGridVisible()}>
                                    <DataTableHeadTitle title={'Relatie'} width={'30%'} />
                                    <DataTableHeadTitle title={'Gevonden in'} width={'30%'} />
                                    <DataTableHeadTitle title={'Gevonden waarde'} width={'40%'} />
                                </tr>
                            </DataTableHead>
                            <DataTableBody>
                                {this.props.records.length === 0 ? (
                                    <tr>
                                        <td colSpan={3}>Niets gevonden!</td>
                                    </tr>
                                ) : (
                                    this.props.records.map(record => {
                                        return (
                                            <GeneralSearchModalListItem
                                                key={record.id}
                                                closeModal={this.props.closeModal}
                                                {...record}
                                            />
                                        );
                                    })
                                )}
                            </DataTableBody>
                        </DataTable>
                    </div>
                )}
            </div>
        );
    }
}

export default GeneralSearchModalList;
