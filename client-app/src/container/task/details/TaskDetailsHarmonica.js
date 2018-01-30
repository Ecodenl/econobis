import React, {Component} from 'react';
import { connect } from 'react-redux';

import UploadHarmonica from './harmonica/UploadHarmonica';

class TaskDetailsHarmonica extends Component {
    constructor(props){
        super(props);

        this.state = {
            toggleShowList: {
                uploads: false,
                emailsInbox: false,
                emailsSent: false,
                documents: false,
            },
            showModalUploadfile: false,
        };

        this.toggleShowList = this.toggleShowList.bind(this);
        this.toggleUploadfile = this.toggleUploadfile.bind(this);
    };

    componentWillReceiveProps(nextProps) {
        if(this.props.id !== nextProps.id) {
            this.setState({
                toggleShowList: {
                    uploads: false,
                    emailsInbox: false,
                    emailsSent: false,
                    documents: false,
                },
                showModalUploadfile: false,
            })
        }
    };

    toggleShowList(name) {
        this.setState({
            ...this.state,
            toggleShowList: {
                ...this.state.toggleShowList,
                [name]: !this.state.toggleShowList[name],
            }
        });
    };

    toggleUploadfile() {
        this.setState({
            showModalUploadfile: !this.state.showModalUploadfile
        });
    };

    render() {
        return (
            <div className="margin-10-top">
                <UploadHarmonica
                    toggleShowList={() => this.toggleShowList('uploads')}
                    showUploadsList={this.state.toggleShowList.uploads}
                    toggleUploadfile={this.toggleUploadfile}
                    showModalUploadfile={this.state.showModalUploadfile}
                    uploadCount={this.props.taskDetails.uploadCount}
                    id={this.props.taskDetails.id}
                />
            </div>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        taskDetails: state.taskDetails,
        permissions: state.meDetails.permissions
    };
};

export default connect(mapStateToProps, null)(TaskDetailsHarmonica);
