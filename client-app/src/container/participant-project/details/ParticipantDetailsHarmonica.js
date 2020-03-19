import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import DocumentHarmonica from './harmonica/DocumentHarmonica';
import OrderHarmonica from './harmonica/OrderHarmonica';

class ParticipantDetailsHarmonica extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleShowList: {
                documents: false,
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

    newDocument = type => {
        hashHistory.push(
            `/document/nieuw/${type}/project/${this.props.participant.projectId}/deelnemer/${
                this.props.participant.id
            }/contact/${this.props.participant.contact.id}`
        );
    };

    newOrder = () => {
        hashHistory.push(`/order/nieuw/contact/${this.props.participant.contact.id}`);
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
                        toggleShowList={() => this.toggleShowList('documents')}
                        showDocumentsList={this.state.toggleShowList.documents}
                        newDocument={this.newDocument}
                        documentCount={this.props.participant.documentCount}
                    />
                </div>
                <div className="margin-10-top">
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

export default connect(
    mapStateToProps,
    null
)(ParticipantDetailsHarmonica);
