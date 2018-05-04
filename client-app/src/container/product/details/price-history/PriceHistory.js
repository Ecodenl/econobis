import React, { Component } from 'react';

import PriceHistoryList from './PriceHistoryList';
import PriceHistoryNew from './PriceHistoryNew';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import {connect} from "react-redux";

class PriceHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNew: false,
        };
    }

    toggleShowNew = () => {
        this.setState({
            showNew: !this.state.showNew,
        })
    };

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Prijshistorie</span>
                    {this.props.permissions.manageFinancial &&
                    <a role="button" className="pull-right" onClick={this.toggleShowNew}><span
                        className="glyphicon glyphicon-plus"/>
                    </a>
                    }
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <PriceHistoryList/>
                    </div>
                    <div className="col-md-12 margin-10-top">
                        {this.state.showNew &&
                        <PriceHistoryNew toggleShowNew={this.toggleShowNew}/>}
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    }
};

export default connect(mapStateToProps)(PriceHistory);