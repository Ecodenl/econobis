import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

class DocumentsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relatedDocumentsNotOnPortal: '',
            relatedDocumentsOnPortal: '',
        };
    }

    openItem = id => {
        hashHistory.push(`/document/${id}`);
    };

    render() {
        // const { relatedDocuments } = this.props;
        const relatedDocuments = this.props.showOnPortal
            ? this.props.relatedDocumentsOnPortal
            : this.props.relatedDocumentsNotOnPortal;
        return (
            <div>
                {relatedDocuments && relatedDocuments == '' && <div>Geen documenten gevonden.</div>}

                {relatedDocuments && relatedDocuments != '' && (
                    <table className="table harmonica-table">
                        <tbody>
                            {relatedDocuments.map((item, i) => {
                                return (
                                    <tr onClick={() => this.openItem(item.id)} key={i}>
                                        <td className="col-xs-5 clickable">{moment(item.createdAt).format('L')}</td>
                                        <td className="col-xs-6 clickable">{item.filename}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        relatedDocumentsNotOnPortal: state.projectDetails.relatedDocumentsNotOnPortal,
        relatedDocumentsOnPortal: state.projectDetails.relatedDocumentsOnPortal,
    };
};

export default connect(mapStateToProps)(DocumentsList);
