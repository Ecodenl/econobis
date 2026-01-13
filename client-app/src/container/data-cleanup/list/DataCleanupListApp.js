import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import DataCleanupListToolbar from './DataCleanupListToolbar';
import DataCleanupListItems from './DataCleanupListItems';
import DataCleanupListEmails from './DataCleanupListEmails';
import DataCleanupListContacts from './DataCleanupListContacts';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

import { blockUI, unblockUI } from '../../../actions/general/BlockUIActions';
import DataCleanupAPI from '../../../api/data-cleanup/DataCleanupAPI';

// Functional wrapper for the class component
const DataCleanupListAppWrapper = props => {
    const params = useParams();
    return <DataCleanupListApp {...props} params={params} />;
};

class DataCleanupListApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoices: [],
            ordersOneoff: [],
            ordersPeriodic: [],
            intakes: [],
            opportunities: [],
            participationsWithStatus: [],
            participationsFinished: [],
            incomingEmails: [],
            outgoingEmails: [],
            isLoading: true,
        };

        this.setLoading = this.setLoading.bind(this);
    }

    setLoading(isLoading) {
        this.setState({
            ...this.state,
            isLoading: isLoading,
        });
    }

    componentDidMount() {
        this.fetchCleanupData();
    }

    fetchCleanupData = () => {
        this.setLoading(true);
        DataCleanupAPI.getCleanupItems().then(payload => {
            this.setState({
                invoices: payload['invoices'],
                ordersOneoff: payload['ordersOneoff'],
                ordersPeriodic: payload['ordersPeriodic'],
                intakes: payload['intakes'],
                opportunities: payload['opportunities'],
                participationsWithoutStatusDefinitive: payload['participationsWithoutStatusDefinitive'],
                participationsFinished: payload['participationsFinished'],
                incomingEmails: payload['incomingEmails'],
                outgoingEmails: payload['outgoingEmails'],
                contactsToDelete: payload['contactsToDelete'],
                contactsSoftDeleted: payload['contactsSoftDeleted'],
                isLoading: false,
            });
        });
    };

    handleDataCleanupUpdateAmounts = cleanupType => {
        // console.log('cleanupType: ' + cleanupType);
        DataCleanupAPI.updateAmounts(cleanupType)
            .then(() => {
                this.fetchCleanupData();
            })
            .catch(error => {
                // Optionally handle error
            });
    };

    render() {
        const dataCleanupType = this.props.params.type;

        const dataCleanupTypeText = () => {
            switch (dataCleanupType) {
                case 'items':
                    return 'items';
                case 'e-mail':
                    return 'e-mailcorrespondentie';
                case 'contacten':
                    return 'contacten';
                default:
                    return '';
            }
        };

        const renderContent = () => {
            switch (dataCleanupType) {
                case 'items':
                    return (
                        <DataCleanupListItems
                            data={{
                                invoices: this.state.invoices,
                                ordersOneoff: this.state.ordersOneoff,
                                ordersPeriodic: this.state.ordersPeriodic,
                                intakes: this.state.intakes,
                                opportunities: this.state.opportunities,
                                participationsWithoutStatusDefinitive: this.state.participationsWithoutStatusDefinitive,
                                participationsFinished: this.state.participationsFinished,
                                incomingEmails: this.state.incomingEmails,
                                outgoingEmails: this.state.outgoingEmails,
                            }}
                            handleDataCleanupUpdateAmounts={this.handleDataCleanupUpdateAmounts}
                            fetchCleanupData={this.fetchCleanupData}
                            isLoading={this.state.isLoading}
                        />
                    );
                // case 'e-mail':
                //     return (
                //         <DataCleanupListEmails
                //             data={{
                //                 incomingEmails: this.state.incomingEmails,
                //                 outgoingEmails: this.state.outgoingEmails,
                //             }}
                //             handleDataCleanupUpdateAmounts={this.handleDataCleanupUpdateAmounts}
                //             fetchCleanupData={this.fetchCleanupData}
                //             isLoading={this.state.isLoading}
                //         />
                //     );
                case 'contacten':
                    return (
                        <DataCleanupListContacts
                            data={{
                                contactsToDelete: this.state.contactsToDelete,
                                contactsSoftDeleted: this.state.contactsSoftDeleted,
                            }}
                            handleDataCleanupUpdateAmounts={this.handleDataCleanupUpdateAmounts}
                            fetchCleanupData={this.fetchCleanupData}
                            isLoading={this.state.isLoading}
                        />
                    );
                default:
                    return null;
            }
        };

        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <DataCleanupListToolbar
                            handleDataCleanupUpdateAmounts={this.handleDataCleanupUpdateAmounts}
                            title={dataCleanupTypeText}
                            setLoading={this.setLoading}
                        />
                    </div>
                    <div className="col-md-12 margin-10-top">{renderContent()}</div>
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => ({
    permissions: state.meDetails.permissions,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            blockUI,
            unblockUI,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(DataCleanupListAppWrapper);
