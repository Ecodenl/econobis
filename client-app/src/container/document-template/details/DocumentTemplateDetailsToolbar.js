import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';
import DocumentTemplatesDeleteItem from "./DocumentTemplatesDeleteItem";

class DocumentTemplateDetailsToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDelete: false,
        }
    }

    toggleDelete = () => {
        this.setState({showDelete: !this.state.showDelete});
    };


    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group" role="group">
                        <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack}/>
                        { false &&
                            <ButtonIcon iconName={"glyphicon-trash"} onClickAction={this.toggleDelete}/>
                        }
                    </div>
                </div>
                <div className="col-md-4"><h4 className="text-center">{'Document template: ' + this.props.templateName}</h4>
                </div>
                <div className="col-md-4"/>
                {
                    this.state.showDelete &&
                    <DocumentTemplatesDeleteItem
                        closeDeleteItemModal={this.toggleDelete}
                        templateName={this.props.templateName}
                        templateId={this.props.templateId}
                    />
                }
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        templateName: state.documentTemplateDetails.name,
        templateId: state.documentTemplateDetails.id,
    };
};

export default connect(mapStateToProps, null)(DocumentTemplateDetailsToolbar);