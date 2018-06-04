import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory, hashHistory} from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';
import {Link} from 'react-router';
import DocumentDeleteItem from "./DocumentDeleteItem";

class DocumentDetailsToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDelete: false,
        };
    }

    toggleDelete = () => {
        this.setState({showDelete: !this.state.showDelete});
    };

    render() {
        const {documentFilename = ''} = this.props;

        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group" role="group">
                        <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack}/>
                        <ButtonIcon iconName={"glyphicon-download-alt"} onClickAction={this.props.download}/>
                        {documentFilename.endsWith('.pdf') &&
                        <ButtonIcon iconName={"glyphicon-eye-open"}
                                    onClickAction={() => hashHistory.push(`/document/inzien/${this.props.documentId}`)}/>
                        }
                        <ButtonIcon iconName={"glyphicon-envelope"}
                                    onClickAction={() => hashHistory.push(`/email/nieuw/document/${this.props.documentId}`)}/>
                        <ButtonIcon iconName={"glyphicon-trash"} onClickAction={this.toggleDelete}/>
                    </div>
                </div>
                {documentFilename.endsWith('.pdf') ?
                    <div className="col-md-4"><h4 className="text-center">{'Document: '} <Link
                        to={`/document/inzien/${this.props.documentId}`} className="link-underline">{documentFilename}</Link>
                    </h4></div>
                    :
                    <div className="col-md-4"><h4 className="text-center">{'Document: ' + documentFilename}</h4></div>
                }
                <div className="col-md-4"/>
                {
                    this.state.showDelete &&
                <DocumentDeleteItem
                    id={this.props.documentId}
                    filename={documentFilename}
                    closeDeleteItemModal={this.toggleDelete}
                />
                }

            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        documentFilename: state.documentDetails.filename,
        documentId: state.documentDetails.id,
    };
};

export default connect(mapStateToProps, null)(DocumentDetailsToolbar);