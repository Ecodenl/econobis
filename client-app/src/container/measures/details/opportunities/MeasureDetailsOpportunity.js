import React, { Component } from 'react';

import MeasureDetailsOpportunityList from './MeasureDetailsOpportunityList';
import MeasureDetailsOpportunityNew from './MeasureDetailsOpportunityNew';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import {connect} from "react-redux";

    class MeasureDetailsOpportunity extends Component {
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
                            <span className="h5 text-bold">Gerelateerde kansen</span>
                            {this.props.permissions.manageMeasure &&
                            <a role="button" className="pull-right" onClick={this.toggleShowNew}><span
                                className="glyphicon glyphicon-plus"/></a>
                            }
                        </PanelHeader>
                        <PanelBody>
                            <div className="col-md-12">
                                <MeasureDetailsOpportunityList/>
                            </div>
                            <div className="col-md-12 extra-space-above">
                                {this.state.showNew &&
                                <MeasureDetailsOpportunityNew toggleShowNew={this.toggleShowNew}/>}
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

export default connect(mapStateToProps)(MeasureDetailsOpportunity);