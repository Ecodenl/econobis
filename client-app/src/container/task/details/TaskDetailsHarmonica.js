import React, {Component} from 'react';
import { connect } from 'react-redux';

import Panel from "../../../components/panel/Panel";
import PanelBody from '../../../components/panel/PanelBody';
import TaskUploadsList from './harmonica/TaskUploadsList';
import TaskUploadFile from './harmonica/TaskUploadFile';

class TaskDetailsHarmonica extends Component {
    constructor(props){
        super(props);

        this.state = {
            showModalUploadfile: false,
            showUploads: false,
        };

        this.toggleUploads = this.toggleUploads.bind(this);
        this.toggleUploadfile = this.toggleUploadfile.bind(this);
    };

    componentWillReceiveProps(nextProps) {
        if(this.props.id !== nextProps.id) {
            this.setState({
                showUploads: false,
            })
        }
    };

    toggleUploads() {
        this.setState({
            showUploads: !this.state.showUploads
        });
    };

    toggleUploadfile() {
        this.setState({
            showModalUploadfile: !this.state.showModalUploadfile
        });
    };

    render(){
        return (
            <div className="col-md-12">
                <Panel className="harmonica-button">
                    <PanelBody>
                        <div className="col-sm-12">
                            <span onClick={this.toggleUploads} className="">UPLOADS <span className="badge">{ this.props.taskDetails.attachmentCount }</span></span>
                            <a role="button" className="pull-right" onClick={this.toggleUploadfile}><span className="glyphicon glyphicon-plus glyphicon-white"/></a>
                            { this.state.showUploads && <TaskUploadsList /> }
                        </div>
                    </PanelBody>
                </Panel>

                { this.state.showModalUploadfile &&
                <TaskUploadFile toggleUploadfile={this.toggleUploadfile} id={this.props.taskDetails.id}/>
                }
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        taskDetails: state.taskDetails,
    };
};

export default connect(mapStateToProps, null)(TaskDetailsHarmonica);
