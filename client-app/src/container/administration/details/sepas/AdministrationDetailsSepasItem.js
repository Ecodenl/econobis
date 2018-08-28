import React, {Component} from 'react';

import AdministrationDetailsSepasView from './AdministrationDetailsSepasView';
import fileDownload from "js-file-download";
import AdministrationDetailsAPI from "../../../../api/administration/AdministrationDetailsAPI";
import AdministrationDetailsSepasDelete from "./AdministrationDetailsSepasDelete";

class AdministrationDetailsSepasItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            showDelete: false,
            highlightLine: '',
            sepa: {
                ...props.sepa,
            },
        };
    };

    onLineEnter = () => {
        this.setState({
            showActionButtons: true,
            highlightLine: 'highlight-line',
        });
    };

    onLineLeave = () => {
        this.setState({
            showActionButtons: false,
            highlightLine: '',
        });
    };

    downloadSepa = (id) => {
        AdministrationDetailsAPI.downloadSepa(id).then((payload) => {
            fileDownload(payload.data, payload.headers['x-filename']);
        });
    };

    toggleDelete = () => {
        this.setState({showDelete: !this.state.showDelete});
    };

    render() {
        return (
            <div>
                <AdministrationDetailsSepasView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    sepa={this.state.sepa}
                    downloadSepa={this.downloadSepa}
                    toggleDelete={this.toggleDelete}
                />
                {
                    this.state.showDelete &&
                    <AdministrationDetailsSepasDelete
                        toggleDelete={this.toggleDelete}
                        sepaId={this.state.sepa.id}
                    />
                }
            </div>
        );
    }
};

export default AdministrationDetailsSepasItem;
