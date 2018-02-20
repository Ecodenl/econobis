import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import Panel from "../../../components/panel/Panel";
import PanelBody from '../../../components/panel/PanelBody';
import CampaignList from "./harmonica/CampaignList";
import UploadHarmonica from "./harmonica/UploadHarmonica";

class MeasureDetailsHarmonica extends Component {
    constructor(props){
        super(props);

        this.state = {
            toggleShowCampaigns: false,
            toggleShowList: {
                uploads: false,
            },
        }

        this.toggleShowList = this.toggleShowList.bind(this);
        this.toggleUploadfile = this.toggleUploadfile.bind(this);
    };

    newCampaign = () => {
        hashHistory.push(`/campagne/nieuw/`);
    };

    toggleShowCampaigns = () => {
        this.setState({
            toggleShowCampaigns: !this.state.toggleShowCampaigns
        });
    };

    toggleShowList(name) {
        this.setState({
            ...this.state,
            toggleShowList: {
                ...this.state.toggleShowList,
                [name]: !this.state.toggleShowList[name],
            }
        });
    };

    toggleUploadfile() {
        this.setState({
            showModalUploadfile: !this.state.showModalUploadfile
        });
    };

    render(){
        const { permissions = {} } = this.props;
        return (
            <div className="col-md-12 margin-10-top">
                <Panel className={"harmonica-button"}>
                    <PanelBody>
                        <div className="col-sm-12" onClick={this.toggleShowCampaigns}>
                            <span className="">CAMPAGNES <span className="badge">{ this.props.measureDetails.campaignCount }</span></span>
                            {permissions.manageMarketing &&
                            <a role="button" className="pull-right" onClick={this.newCampaign}><span
                                className="glyphicon glyphicon-plus glyphicon-white"/></a>
                            }
                            { this.state.toggleShowCampaigns && <CampaignList /> }
                        </div>
                    </PanelBody>
                </Panel>
                <UploadHarmonica
                    toggleShowList={() => this.toggleShowList('uploads')}
                    showUploadsList={this.state.toggleShowList.uploads}
                    toggleUploadfile={this.toggleUploadfile}
                    showModalUploadfile={this.state.showModalUploadfile}
                    attachmentCount={this.props.measureDetails.attachmentCount}
                    id={this.props.measureDetails.id}
                />
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        measureDetails: state.measureDetails,
        permissions: state.meDetails.permissions
    };
};

export default connect(mapStateToProps)(MeasureDetailsHarmonica);
