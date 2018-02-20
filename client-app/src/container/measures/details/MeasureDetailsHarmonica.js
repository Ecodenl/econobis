import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import CampaignHarmonica from "./harmonica/CampaignHarmonica";
import UploadHarmonica from "./harmonica/UploadHarmonica";

class MeasureDetailsHarmonica extends Component {
    constructor(props){
        super(props);

        this.state = {
            toggleShowList: {
                campaigns: false,
                uploads: false,
            },
        };

        this.toggleShowList = this.toggleShowList.bind(this);
        this.toggleUploadfile = this.toggleUploadfile.bind(this);
    };

    newCampaign = () => {
        hashHistory.push(`/campagne/nieuw/maatregel/${this.props.measureDetails.id}`);
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
        return (
            <div className="col-md-12 margin-10-top">
                <UploadHarmonica
                    toggleShowList={() => this.toggleShowList('uploads')}
                    showUploadsList={this.state.toggleShowList.uploads}
                    toggleUploadfile={this.toggleUploadfile}
                    showModalUploadfile={this.state.showModalUploadfile}
                    attachmentCount={this.props.measureDetails.attachmentCount}
                    id={this.props.measureDetails.id}
                />
                <CampaignHarmonica
                    toggleShowList={() => this.toggleShowList('campaigns')}
                    showCampaignsList={this.state.toggleShowList.campaigns}
                    campaignCount={this.props.measureDetails.campaignCount}
                    newCampaign={this.newCampaign}
                />
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        measureDetails: state.measureDetails,
    };
};

export default connect(mapStateToProps)(MeasureDetailsHarmonica);
