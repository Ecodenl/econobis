import React, { Component } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import PortalSettingsDashboardWidgetListItem from './PortalSettingsDashboardWidgetListItem';
import { connect } from 'react-redux';
import PortalSettingsDashboardWidgetListHead from './PortalSettingsDashboardWidgetListHead';
import PortalSettingsDashboardWidgetListToolbar from './PortalSettingsDashboardWidgetListToolbar';
import AddPortalSettingsDashboardWidgetModal from './AddPortalSettingsDashboardWidgetModal';

class PortalSettingsDashboardWidgetList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addWidgetModal: false,
        };
    }

    toggleAddWidgetModal = () => {
        this.setState({
            addWidgetModal: !this.state.addWidgetModal,
        });
    };

    render() {
        const data = this.props.widgets;
        const edit = this.props.edit;

        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van dashboard widgets.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (data.length === 0) {
            loadingText = 'Geen widgets gevonden!';
        } else {
            loading = false;
        }

        return (
            <>
                {edit ? (
                    <>
                        <PortalSettingsDashboardWidgetListToolbar
                            widgets={data}
                            toggleAddWidgetModal={this.toggleAddWidgetModal}
                        />
                        <div style={{ height: '5px' }} />
                    </>
                ) : (
                    <h5>Widgets</h5>
                )}
                <DataTable>
                    <DataTableHead>
                        <PortalSettingsDashboardWidgetListHead />
                    </DataTableHead>
                    <DataTableBody>
                        {loading ? (
                            <tr>
                                <td colSpan={6}>{loadingText}</td>
                            </tr>
                        ) : (
                            data.map(widget => {
                                return (
                                    <PortalSettingsDashboardWidgetListItem key={widget.id} edit={edit} {...widget} />
                                );
                            })
                        )}
                    </DataTableBody>
                </DataTable>
                {this.state.addWidgetModal && (
                    <AddPortalSettingsDashboardWidgetModal
                        title={'Widget toevoegen'}
                        toggleModal={this.toggleAddWidgetModal}
                    />
                )}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

export default connect(mapStateToProps)(PortalSettingsDashboardWidgetList);
