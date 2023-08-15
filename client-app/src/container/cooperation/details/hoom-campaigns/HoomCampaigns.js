import React, { Component } from 'react';

import HoomCampaignsList from './HoomCampaignsList';
import HoomCampaignsNew from './HoomCampaignsNew';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus';

class HoomCampaigns extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hoomCampaigns: props.hoomCampaigns,
            showNew: false,
        };
    }

    toggleShowNew = () => {
        this.setState({
            showNew: !this.state.showNew,
        });
    };

    addResult = hoomCampaign => {
        this.setState({
            hoomCampaigns: [
                ...this.state.hoomCampaigns,
                {
                    ...hoomCampaign,
                },
            ],
        });
    };
    removeResult = hoomCampaignId => {
        this.setState({
            hoomCampaigns: this.state.hoomCampaigns.filter(hoomCampaign => hoomCampaign.id !== hoomCampaignId),
        });
    };

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Hoom campagnes</span>
                    {this.props.showEditCooperation && (
                        <a role="button" className="pull-right" onClick={this.toggleShowNew}>
                            <Icon size={14} icon={plus} />
                        </a>
                    )}
                </PanelHeader>
                <PanelBody>
                    {this.state.showNew && (
                        <div className="col-md-12 margin-10-top">
                            <HoomCampaignsNew
                                cooperationId={this.props.cooperationId}
                                toggleShowNew={this.toggleShowNew}
                                addResult={this.addResult}
                            />
                        </div>
                    )}
                    <div className="col-md-12">
                        <HoomCampaignsList
                            cooperationId={this.props.cooperationId}
                            showEditCooperation={this.props.showEditCooperation}
                            hoomCampaigns={this.state.hoomCampaigns}
                            removeResult={this.removeResult}
                        />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

export default HoomCampaigns;
