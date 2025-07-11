import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import DocumentHarmonica from './harmonica/DocumentHarmonica';
import OrderHarmonica from './harmonica/OrderHarmonica';

// Functionele wrapper voor de class component
const ParticipantDetailsHarmonicaWrapper = props => {
    const navigate = useNavigate();
    return <ParticipantDetailsHarmonica {...props} navigate={navigate} />;
};

class ParticipantDetailsHarmonica extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleShowList: {
                documentsNotOnPortal: false,
                documentsOnPortal: false,
                orders: false,
            },
        };

        this.toggleShowList = this.toggleShowList.bind(this);
    }

    toggleShowList(name) {
        this.setState({
            ...this.state,
            toggleShowList: {
                ...this.state.toggleShowList,
                [name]: !this.state.toggleShowList[name],
            },
        });
    }

    newDocumentNotOnPortal = type => {
        this.props.navigate(
            `/document/nieuw/${type}/eco/project/${this.props.participant.projectId}/deelnemer/${this.props.participant.id}/contact/${this.props.participant.contact.id}`
        );
    };
    newDocumentOnPortal = type => {
        this.props.navigate(
            `/document/nieuw/${type}/portal/project/${this.props.participant.projectId}/deelnemer/${this.props.participant.id}/contact/${this.props.participant.contact.id}`
        );
    };

    newOrder = () => {
        this.props.navigate(
            `/order/nieuw/contact/${this.props.participant.contact.id}/deelnemer/${this.props.participant.id}/administratie/${this.props.participant.project.administrationId}`
        );
    };

    render() {
        let orderCount = 0;
        if (this.props.participant.relatedOrders) {
            orderCount = this.props.participant.relatedOrders.length;
        }

        return (
            <div>
                <div className="margin-10-top">
                    <DocumentHarmonica
                        title={'DOCUMENTEN ALLEEN IN ECONOBIS'}
                        toggleShowList={() => this.toggleShowList('documentsNotOnPortal')}
                        showDocumentsList={this.state.toggleShowList.documentsNotOnPortal}
                        newDocument={this.newDocumentNotOnPortal}
                        documentCount={this.props.participant.documentCountNotOnPortal}
                        relatedDocuments={this.props.participant.relatedDocumentsNotOnPortal}
                    />

                    <DocumentHarmonica
                        title={'DOCUMENTEN PORTAL'}
                        toggleShowList={() => this.toggleShowList('documentsOnPortal')}
                        showDocumentsList={this.state.toggleShowList.documentsOnPortal}
                        newDocument={this.newDocumentOnPortal}
                        documentCount={this.props.participant.documentCountOnPortal}
                        relatedDocuments={this.props.participant.relatedDocumentsOnPortal}
                    />

                    <OrderHarmonica
                        toggleShowList={() => this.toggleShowList('orders')}
                        showOrdersList={this.state.toggleShowList.orders}
                        newOrder={this.newOrder}
                        orderCount={orderCount}
                        permissions={this.props.meDetails.permissions}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        participant: state.participantProjectDetails,
        meDetails: state.meDetails,
    };
};

export default connect(mapStateToProps, null)(ParticipantDetailsHarmonicaWrapper);
