import React, {Component} from 'react';
import {connect} from 'react-redux';
import { isEmpty } from 'lodash';

import FinancialToolbar from './FinancialToolbar';
import FinancialForm from './FinancialForm';
import FinancialTree from './FinancialTree';
import Panel from '../../components/panel/Panel';
import PanelBody from '../../components/panel/PanelBody';
import {fetchAdministrationDetails} from "../../actions/administration/AdministrationDetailsActions";

class FinancialApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            administrationId: null,
            type: null,
            filter: null,
        };
    };

    componentDidMount() {
        if(!isEmpty(this.props.params)) {
            this.updateStateByChangeParams(this.props.params);
        };
    };

    componentWillReceiveProps(nextProps) {
        if ((this.props.params.id !== nextProps.params.id) || (this.props.params.type !== nextProps.params.type)  || (this.props.params.filter !== nextProps.params.filter)) {
            this.updateStateByChangeParams(nextProps.params);
        }
    };

    updateStateByChangeParams(params) {
        if (!isEmpty(params)) {

            this.props.fetchAdministrationDetails(params.id);

            this.setState({
                ...this.state,
                administrationId: params.id,
                type: params.type,
                filter: params.filter,
            });
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-2">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-financial-tree'}>
                                <FinancialTree/>
                            </PanelBody>
                        </Panel>
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={"panel-small"}>
                                <FinancialToolbar/>
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <FinancialForm
                        type={this.state.type}
                        filter={this.state.filter}
                        />
                    </div>
                </div>
                <div className="col-md-3"/>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        administrationDetails: state.administrationDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchAdministrationDetails: (id) => {
        dispatch(fetchAdministrationDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(FinancialApp);
