import React, { Component} from 'react';

import RevenuesListFormList from './RevenuesListFormList';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../components/panel/PanelHeader';
import {hashHistory} from "react-router";

class RevenuesListForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Opbrengsten</span>
                    <a role="button" className="pull-right" onClick={() => hashHistory.push(`/productie-project/opbrengst/nieuw/${this.props.productionProjectId}`)}><span className="glyphicon glyphicon-plus"/></a>
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <RevenuesListFormList />
                    </div>
                </PanelBody>
            </Panel>

        );
    }
};

export default RevenuesListForm;