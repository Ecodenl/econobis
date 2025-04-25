import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

// Functionele wrapper voor de class component
const DocumentsListWrapper = props => {
    const navigate = useNavigate();
    return <DocumentsList {...props} navigate={navigate} />;
};

class DocumentsList extends Component {
    constructor(props) {
        super(props);
    }

    openItem = id => {
        this.props.navigate(`/document/${id}`);
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

export default DocumentsListWrapper;
