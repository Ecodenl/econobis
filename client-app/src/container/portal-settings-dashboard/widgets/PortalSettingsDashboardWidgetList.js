import React, { Component } from 'react';

import { connect } from 'react-redux';
import PortalSettingsDashboardWidgetListToolbar from './PortalSettingsDashboardWidgetListToolbar';
import AddPortalSettingsDashboardWidgetModal from './AddPortalSettingsDashboardWidgetModal';
import PortalDashboardWidgetOrderTable from '../../../components/orderTable/portalDashboardWidgets/PortalDashboardWidgetOrderTable';

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

        const columns = [
            {
                Header: 'Volgorde',
                accessor: 'order',
            },
            {
                Header: 'Titel',
                accessor: 'title',
            },
            {
                Header: 'Tekst',
                accessor: 'text',
            },
            {
                Header: 'Afbeelding',
                accessor: 'image',
            },
            {
                Header: 'Knoptekst',
                accessor: 'buttonText',
            },
            {
                Header: 'Knoplink',
                accessor: 'buttonLink',
            },
            {
                Header: 'Actief',
                accessor: 'active',
            },
        ];

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
                <PortalDashboardWidgetOrderTable
                    columns={columns}
                    data={data}
                    edit={edit}
                    handleInputChange={this.props.handleWidgetInputChange}
                    removeWidget={this.props.removeWidget}
                />
                {this.state.addWidgetModal && (
                    <AddPortalSettingsDashboardWidgetModal
                        title={'Widget toevoegen'}
                        toggleModal={this.toggleAddWidgetModal}
                        addWidget={this.props.addWidget}
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
