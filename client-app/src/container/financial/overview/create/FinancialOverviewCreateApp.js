import React, { Component } from 'react';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import FinancialOverviewCreateList from './FinancialOverviewCreateList';
import FinancialOverviewContactsAPI from '../../../../api/financial/overview/FinancialOverviewContactAPI';
import FinancialOverviewCreateViewPdf from './FinancialOverviewCreateViewPdf';
import FinancialOverviewCreateViewEmail from './FinancialOverviewCreateViewEmail';
import FinancialOverviewCreateToolbar from './FinancialOverviewCreateToolbar';
import { connect } from 'react-redux';

class FinancialOverviewCreateApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            financialOverviewContacts: [],
            financialOverviewContactId: '',
        };
    }

    componentDidMount() {
        this.callGetFinancialOverviewContactsForSending();
    }

    callGetFinancialOverviewContactsForSending = () => {
        FinancialOverviewContactsAPI.getFinancialOverviewContactsForSending(
            this.props.params.id,
            this.props.selectedIds,
            this.props.params.type
        ).then(payload => {
            this.setState({
                financialOverviewContacts: payload.data.data,
            });
        });
    };

    changeFinancialOverviewContact = financialOverviewContactId => {
        this.setState({
            ...this.state,
            financialOverviewContactId: financialOverviewContactId,
        });
    };

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12 margin-10-top">
                        <div className="col-md-12 margin-10-top">
                            <Panel>
                                <PanelBody className={'panel-small'}>
                                    <FinancialOverviewCreateToolbar
                                        type={this.props.params.type}
                                        selectedIds={this.props.selectedIds}
                                        financialOverviewId={this.props.params.id}
                                    />
                                </PanelBody>
                            </Panel>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <div className="col-md-12 margin-10-top">
                            <Panel>
                                <PanelBody className={'panel-financial-overview-contacts-list'}>
                                    <FinancialOverviewCreateList
                                        financialOverviewContacts={this.state.financialOverviewContacts}
                                        changeFinancialOverviewContact={this.changeFinancialOverviewContact}
                                    />
                                </PanelBody>
                            </Panel>
                        </div>
                    </div>
                    {this.props.params.type == 'email' ? (
                        <>
                            <div className="col-md-5">
                                <div className="col-md-12 margin-10-top">
                                    <Panel>
                                        <PanelBody>
                                            <FinancialOverviewCreateViewPdf
                                                financialOverviewContactId={this.state.financialOverviewContactId}
                                            />
                                        </PanelBody>
                                    </Panel>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="col-md-12 margin-10-top">
                                    <Panel>
                                        <PanelBody>
                                            <FinancialOverviewCreateViewEmail
                                                financialOverviewContactId={this.state.financialOverviewContactId}
                                            />
                                        </PanelBody>
                                    </Panel>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="col-md-6">
                                <div className="col-md-12 margin-10-top">
                                    <Panel>
                                        <PanelBody>
                                            <FinancialOverviewCreateViewPdf
                                                financialOverviewContactId={this.state.financialOverviewContactId}
                                            />
                                        </PanelBody>
                                    </Panel>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedIds: state.financialOverviewPreview.selectedIds,
    };
};

export default connect(mapStateToProps, null)(FinancialOverviewCreateApp);
