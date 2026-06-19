import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

// Functionele wrapper voor de class component
const DocumentsListWrapper = props => {
    const navigate = useNavigate();
    return <DocumentsList {...props} navigate={navigate} />;
};

class DocumentsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relatedDocuments: '',
        };
    }

    openItem = id => {
        this.props.navigate(`/document/${id}`);
    };

    render() {
        const { relatedDocuments } = this.props;
        return (
            <div>
                {relatedDocuments == '' && <div>Geen documenten gevonden.</div>}

                {relatedDocuments != '' && (
                    <table className="table harmonica-table">
                        <tbody>
                            {relatedDocuments.map((item, i) => {
                                return (
                                    <tr onClick={() => this.openItem(item.id)} key={i}>
                                        <td className="col-xs-12 clickable">
                                            {moment(item.created_at).format('L')} - {item.filename}
                                        </td>
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
        relatedDocuments: state.opportunityDetails.relatedDocuments,
    };
};

export default connect(mapStateToProps)(DocumentsListWrapper);
