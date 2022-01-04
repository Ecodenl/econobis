import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import moment from 'moment';

class DocumentsList extends Component {
    constructor(props) {
        super(props);
    }

    openItem = id => {
        hashHistory.push(`/document/${id}`);
    };

    render() {
        const { relatedDocuments } = this.props;

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

export default DocumentsList;
