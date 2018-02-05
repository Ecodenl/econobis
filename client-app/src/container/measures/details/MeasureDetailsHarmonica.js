import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import Panel from "../../../components/panel/Panel";
import PanelBody from '../../../components/panel/PanelBody';
import CampaignList from "./harmonica/CampaignList";

class MeasureDetailsHarmonica extends Component {
    constructor(props){
        super(props);

        this.state = {
            toggleShowCampaigns: false,
        }
    };

    newCampaign = () => {
        hashHistory.push(`/campagne/nieuw/`);
    };

    toggleShowCampaigns = () => {
        this.setState({
            toggleShowCampaigns: !this.state.toggleShowCampaigns
        });
    };

    render(){
        const { permissions = {} } = this.props;
        return (
            <div className="col-md-12 margin-10-top">
                <Panel className={"harmonica-button"}>
                    <PanelBody>
                        <div className="col-sm-12" onClick={this.toggleShowCampaigns}>
                            <span className="">CAMPAGNES <span className="badge">{ this.props.measure.campaignCount }</span></span>
                            {permissions.manageMarketing &&
                            <a role="button" className="pull-right" onClick={this.newCampaign}><span
                                className="glyphicon glyphicon-plus glyphicon-white"/></a>
                            }
                            { this.state.toggleShowCampaigns && <CampaignList /> }
                        </div>
                    </PanelBody>
                </Panel>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        measure: state.measure,
        permissions: state.meDetails.permissions
    };
};

export default connect(mapStateToProps)(MeasureDetailsHarmonica);
