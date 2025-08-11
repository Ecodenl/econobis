import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../components/button/ButtonIcon';
import DocumentDeleteItem from './DocumentDeleteItem';

// Functionele wrapper voor de class component
const DocumentDetailsToolbarWrapper = props => {
    const navigate = useNavigate();
    return <DocumentDetailsToolbar {...props} navigate={navigate} />;
};

class DocumentDetailsToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDelete: false,
        };
    }

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    };

    render() {
        const { documentFilename = '', navigate } = this.props;

        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group" role="group">
                        <ButtonIcon iconName={'arrowLeft'} onClickAction={() => navigate(-1)} />
                        <ButtonIcon iconName={'download'} onClickAction={this.props.download} />
                        {documentFilename.toLowerCase().endsWith('.pdf') && (
                            <ButtonIcon
                                iconName={'eye'}
                                onClickAction={() => this.props.navigate(`/document/inzien/${this.props.documentId}`)}
                            />
                        )}
                        <ButtonIcon
                            iconName={'envelopeO'}
                            onClickAction={() => this.props.navigate(`/email/nieuw/document/${this.props.documentId}`)}
                        />
                        <ButtonIcon iconName={'trash'} onClickAction={this.toggleDelete} />
                    </div>
                </div>
                {documentFilename.toLowerCase().endsWith('.pdf') ? (
                    <div className="col-md-4">
                        <h4 className="text-center">
                            {'Document: '}{' '}
                            <Link to={`/document/inzien/${this.props.documentId}`} className="link-underline">
                                {documentFilename}
                            </Link>
                        </h4>
                    </div>
                ) : (
                    <div className="col-md-4">
                        <h4 className="text-center">{'Document: ' + documentFilename}</h4>
                    </div>
                )}
                <div className="col-md-4">
                    <h4 className="text-right margin-10-right">
                        Gemaakt vanuit/voor:{' '}
                        <strong>{this.props.documentCreatedFrom ? this.props.documentCreatedFrom.name : ''}</strong>
                    </h4>
                </div>
                {this.state.showDelete && (
                    <DocumentDeleteItem
                        id={this.props.documentId}
                        filename={documentFilename}
                        closeDeleteItemModal={this.toggleDelete}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        documentFilename: state.documentDetails.filename,
        documentCreatedFrom: state.documentDetails.documentCreatedFrom,
        documentId: state.documentDetails.id,
    };
};

export default connect(mapStateToProps, null)(DocumentDetailsToolbarWrapper);
