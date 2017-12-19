import React, {Component} from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ButtonIcon from '../../../components/button/ButtonIcon';
import CampaignDetailsDelete from './CampaignDetailsDelete';


class CampaignDetailsToolbar extends Component {
    constructor(props){
        super(props);

        this.state = {
            showDelete: false,
        }
    }

    toggleDelete = () => {
        this.setState({showDelete: !this.state.showDelete});
    };


    render() {
        const { campaign }  = this.props;

        return (
            <div className="row">
                <div className="col-sm-12">
                    <Panel>
                        <PanelBody className={"panel-small"}>
                            <div className="col-md-2">
                                <div className="btn-group margin-small" role="group">
                                    <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack} />
                                    {this.props.permissions.manageMarketing &&
                                    <ButtonIcon iconName={"glyphicon-trash"} onClickAction={this.toggleDelete}/>
                                    }
                                </div>
                            </div>
                            <div className="col-md-8"><h4 className="text-center text-success margin-small"><strong>{campaign ? 'Campagne: ' + campaign.name : ''}</strong></h4></div>
                            <div className="col-md-2" />
                        </PanelBody>
                    </Panel>
                </div>

                {
                    this.state.showDelete &&
                    <CampaignDetailsDelete
                        closeDeleteItemModal={this.toggleDelete}
                        id={campaign.id}
                    />
                }
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        campaign: state.campaign,
        permissions: state.meDetails.permissions,
    }
};

export default connect(mapStateToProps)(CampaignDetailsToolbar);
