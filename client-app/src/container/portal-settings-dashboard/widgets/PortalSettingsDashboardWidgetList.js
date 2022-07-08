import React, { Component } from 'react';

import { connect } from 'react-redux';
import PortalDashboardWidgetOrderTable from './PortalDashboardWidgetOrderTable';
import PanelHeader from '../../../components/panel/PanelHeader';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import { arrows_vertical } from 'react-icons-kit/ikons/arrows_vertical';
import Icon from 'react-icons-kit';
import ButtonText from '../../../components/button/ButtonText';

class PortalSettingsDashboardWidgetList extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            originalWidgets: this.props.widgets,
            showEditSort: false,
            addWidgetModal: false,
        };
    }

    setShowEditSort = () => {
        this.setState({
            showEditSort: true,
        });
    };

    toggleAddWidgetModal = () => {
        this.setState({
            addWidgetModal: !this.state.addWidgetModal,
        });
    };

    updateSortWidgets = event => {
        event.preventDefault();
        console.log('updateSortWidgets');
    };

    render() {
        const data = this.props.widgets;
        const showEditSort = this.state.showEditSort;

        const columns = [
            {
                Header: 'Order',
                textToolTip: '',
                fieldName: 'order',
                accessor: 'order',
            },
            {
                Header: 'Titel',
                textToolTip: '',
                fieldName: 'title',
                accessor: 'title',
            },
            {
                Header: 'Afbeelding',
                textToolTip: '',
                fieldName: 'widgetImageFileName',
                accessor: 'widgetImageFileName',
            },
            {
                Header: 'Actief',
                textToolTip: '',
                fieldName: 'active',
                accessor: 'active',
            },
            {
                Header: '',
                textToolTip: '',
                fieldName: 'codeRef',
                accessor: 'codeRef',
            },
        ];

        return (
            <>
                <Panel>
                    <PanelHeader>
                        <span className="h5 text-bold">Widgets</span>
                        {!showEditSort && (
                            <>
                                <a role="button" className="pull-right" onClick={this.toggleAddWidgetModal}>
                                    <span className="glyphicon glyphicon-plus" title="Toevoegen widget" />
                                </a>
                                <a role="button" className="pull-right" onClick={this.setShowEditSort}>
                                    <Icon icon={arrows_vertical} title="Sorteren widges" />
                                </a>
                            </>
                        )}
                    </PanelHeader>
                    <PanelBody>
                        <div className="col-md-12 margin-10-top">
                            <PortalDashboardWidgetOrderTable
                                columns={columns}
                                data={data.sort((a, b) => (a.order > b.order ? 1 : -1))}
                                showEditSort={showEditSort}
                                handleInputChange={this.props.handleWidgetInputChange}
                                removeWidget={this.props.removeWidget}
                                imageHash={this.props.imageHash}
                            />
                        </div>
                    </PanelBody>

                    {showEditSort && (
                        <PanelBody>
                            <div className="pull-right btn-group" role="group">
                                <ButtonText
                                    buttonClassName={'btn-default'}
                                    buttonText={'Sluiten'}
                                    onClickAction={this.props.closeShowEditSort}
                                />
                                <ButtonText buttonText={'Opslaan'} onClickAction={this.updateSortWidgets} />
                            </div>
                        </PanelBody>
                    )}
                </Panel>
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
