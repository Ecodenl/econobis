import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import CampaignHarmonica from "./harmonica/CampaignHarmonica";
import DocumentHarmonica from "./harmonica/DocumentHarmonica";

class MeasureDetailsHarmonica extends Component {
    constructor(props){
        super(props);

        this.state = {
            toggleShowList: {
                campaigns: false,
                documents: false,
            },
        };

        this.toggleShowList = this.toggleShowList.bind(this);
        this.newDocument = this.newDocument.bind(this);
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

    newDocument(type) {
        hashHistory.push(`/document/nieuw/${type}/maatregel/${this.props.measureDetails.id}`);
    };

    render(){
        return (
            <div className="col-md-12 margin-10-top">
                <DocumentHarmonica
                    toggleShowList={() => this.toggleShowList('documents')}
                    showDocumentsList={this.state.toggleShowList.documents}
                    newDocument={this.newDocument}
                    documentCount={this.props.measureDetails.documentCount}
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
