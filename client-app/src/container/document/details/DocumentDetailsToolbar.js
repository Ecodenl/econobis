import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, hashHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';
import { Link } from 'react-router';
import DocumentDeleteItem from './DocumentDeleteItem';

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
        const { documentFilename = '' } = this.props;

        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group" role="group">
                        <ButtonIcon iconName={'arrowLeft'} onClickAction={browserHistory.goBack} />
                        <ButtonIcon iconName={'download'} onClickAction={this.props.download} />
                        {documentFilename.toLowerCase().endsWith('.pdf') && (
                            <ButtonIcon
                                iconName={'eye'}
                                onClickAction={() => hashHistory.push(`/document/inzien/${this.props.documentId}`)}
                            />
                        )}
                        <ButtonIcon
                            iconName={'envelopeO'}
                            onClickAction={() => hashHistory.push(`/email/nieuw/document/${this.props.documentId}`)}
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

export default connect(mapStateToProps, null)(DocumentDetailsToolbar);
