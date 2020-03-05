import React, { Component } from 'react';
import { connect } from 'react-redux';

import FinancialToolbar from './FinancialToolbar';
import FinancialForm from './FinancialForm';
import FinancialTree from './FinancialTree';
import Panel from '../../components/panel/Panel';
import PanelBody from '../../components/panel/PanelBody';
import { fetchAdministrationDetails } from '../../actions/administration/AdministrationDetailsActions';

class FinancialApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchAdministrationDetails(this.props.params.id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.params.id !== prevProps.params.id) {
            this.props.fetchAdministrationDetails(this.props.params.id);
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-3">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-financial-tree'}>
                                <FinancialTree currentRouteParams={this.props.params} />
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
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchAdministrationDetails: id => {
        dispatch(fetchAdministrationDetails(id));
    },
});

export default connect(null, mapDispatchToProps)(FinancialApp);
