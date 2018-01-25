import React, { Component } from 'react';

import OpportunityDetailsQuotationsList from './OpportunityDetailsQuotationsList';
import OpportunityDetailsQuotationNew from './OpportunityDetailsQuotationNew';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import {connect} from "react-redux";

    class OpportunityDetailsQuotations extends Component {
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
                    <Panel>
                        <PanelHeader>
                            <span className="h5 text-bold">Offertes</span>
                            {this.props.permissions.manageOpportunity &&
                            <a role="button" className="pull-right" onClick={this.toggleShowNew}><span
                                className="glyphicon glyphicon-plus"/></a>
                            }
                        </PanelHeader>
                        <PanelBody>
                            <div className="col-md-12">
                                <OpportunityDetailsQuotationsList/>
                            </div>
                            <div className="col-md-12 margin-10-top">
                                {this.state.showNew &&
                                <OpportunityDetailsQuotationNew toggleShowNew={this.toggleShowNew}/>}
                            </div>
                        </PanelBody>
                    </Panel>
                </Panel>
            );
        }
    }

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    }
};

export default connect(mapStateToProps)(OpportunityDetailsQuotations);