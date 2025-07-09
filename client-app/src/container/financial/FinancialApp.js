import React, { Component } from 'react';
import { connect } from 'react-redux';

import FinancialToolbar from './FinancialToolbar';
import FinancialForm from './FinancialForm';
import FinancialTree from './FinancialTree';
import Panel from '../../components/panel/Panel';
import PanelBody from '../../components/panel/PanelBody';
import { fetchAdministrationDetails } from '../../actions/administration/AdministrationDetailsActions';
import AdministrationDetailsAPI from '../../api/administration/AdministrationDetailsAPI';
import ErrorUnauthorized from '../global/ErrorUnauthorized';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const FinancialAppWrapper = props => {
    const params = useParams();
    return <FinancialApp {...props} params={params} />;
};

class FinancialApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalsInfoAdministration: [],
        };
    }

    componentDidMount() {
        if (this.props.meDetails.permissions.manageFinancial) {
            this.props.fetchAdministrationDetails(this.props.params.id);
            this.fetchTotalsInfoAdministration(this.props.params.id);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.meDetails.permissions.manageFinancial && this.props.params.id !== prevProps.params.id) {
            this.props.fetchAdministrationDetails(this.props.params.id);
            this.fetchTotalsInfoAdministration(this.props.params.id);
        }
    }

    fetchTotalsInfoAdministration = administrationId => {
        if (this.props.meDetails.permissions.manageFinancial) {
            AdministrationDetailsAPI.fetchTotalsInfoAdministration(administrationId).then(payload => {
                this.setState({ totalsInfoAdministration: payload });
            });
        }
    };

    render() {
        const { permissions = {} } = this.props.meDetails;

        if (!permissions.manageFinancial) {
            return <ErrorUnauthorized />;
        }

        return (
            <div className="row">
                <div className="col-md-3">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-financial-tree'}>
                                <FinancialTree
                                    currentRouteParams={this.props.params}
                                    fetchTotalsInfoAdministration={this.fetchTotalsInfoAdministration}
                                    totalsInfoAdministration={this.state.totalsInfoAdministration}
                                />
                            </PanelBody>
                        </Panel>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-small'}>
                                <FinancialToolbar />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <FinancialForm
                            type={this.props.params.type}
                            filter={this.props.params.filter}
                            administrationId={this.props.params.administrationId}
                            fetchTotalsInfoAdministration={this.fetchTotalsInfoAdministration}
                            totalsInfoAdministration={this.state.totalsInfoAdministration}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        meDetails: state.meDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchAdministrationDetails: id => {
        dispatch(fetchAdministrationDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(FinancialAppWrapper);
