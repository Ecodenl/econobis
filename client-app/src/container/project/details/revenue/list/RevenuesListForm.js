import React, { Component } from 'react';

import RevenuesListFormList from './RevenuesListFormList';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../components/panel/PanelHeader';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

class RevenuesListForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Opbrengsten</span>
                    {this.props.permissions.manageFinancial && (
                        <a
                            role="button"
                            className="pull-right"
                            onClick={() => hashHistory.push(`/project/opbrengst/nieuw/${this.props.projectId}`)}
                        >
                            <span className="glyphicon glyphicon-plus" />
                        </a>
                    )}
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <RevenuesListFormList />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(RevenuesListForm);
