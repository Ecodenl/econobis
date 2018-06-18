import React, {Component} from 'react';

import AdministrationDetailsSepasView from './AdministrationDetailsSepasView';
import fileDownload from "js-file-download";
import AdministrationDetailsAPI from "../../../../api/administration/AdministrationDetailsAPI";

class AdministrationDetailsSepasItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
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

    render() {
        return (
            <div>
                <AdministrationDetailsSepasView
                    highlightLine={this.state.highlightLine}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    sepa={this.state.sepa}
                    downloadSepa={this.downloadSepa}
                />
            </div>
        );
    }
};

export default AdministrationDetailsSepasItem;
