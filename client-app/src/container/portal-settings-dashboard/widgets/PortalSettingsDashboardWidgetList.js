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

        const columns = [
            {
                Header: 'Titel',
                textToolTip: '',
                accessor: 'title',
            },
            {
                Header: 'Tekst',
                textToolTip: '',
                accessor: 'text',
            },
            {
                Header: 'Afbeelding',
                textToolTip: '',
                accessor: 'image',
            },
            {
                Header: 'Knoptekst',
                textToolTip: '',
                accessor: 'buttonText',
            },
            {
                Header: 'Knoplink',
                textToolTip: `Knoplinks zonder HTTPS:// verwijzen naar pagina binnen xxxxxx.mijnenergiesamen.nl (de gebruikers portaal pagina) 
                     <br /> bijvoorbeeld inschrijven-projecten verwijst naar: <br />
                     https://xxxxxx.mijnenergiesamen.nl/#/inschrijven-projecten <br />
                     Knoplinks met HTTPS:// (Externe links) verwijzen naar een pagina buiten de gebruikersportaal <br />
                     bijvoorbeeld https://www.google.com/
                     zal na aanklikken de website in een nieuw tabblad(nieuw scherm) openen.`,
                accessor: 'buttonLink',
            },
            {
                Header: 'Actief',
                textToolTip: '',
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
                    data={data.sort((a, b) => (a.order > b.order ? 1 : -1))}
                    edit={edit}
                    handleInputChange={this.props.handleWidgetInputChange}
                    removeWidget={this.props.removeWidget}
                    imageHash={this.props.imageHash}
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
