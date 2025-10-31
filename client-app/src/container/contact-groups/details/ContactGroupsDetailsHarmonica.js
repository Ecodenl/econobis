import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import TaskHarmonica from './harmonica/TaskHarmonica';
import DocumentHarmonica from './harmonica/DocumentHarmonica';

// Functionele wrapper voor de class component
const IntakeDetailsHarmonicaWrapper = props => {
    const navigate = useNavigate();
    return <IntakeDetailsHarmonica {...props} navigate={navigate} />;
};

class IntakeDetailsHarmonica extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleShowList: {
                tasks: false,
                documents: false,
            },
        };

        this.toggleShowList = this.toggleShowList.bind(this);
    }

    toggleShowList(name) {
        this.setState({
            ...this.state,
            toggleShowList: {
                ...this.state.toggleShowList,
                [name]: !this.state.toggleShowList[name],
            },
        });
    }

    newTask = () => {
        this.props.navigate(`/taak/nieuw/contact-groep/${this.props.id}`);
    };

    newDocument = type => {
        this.props.navigate(`/document/nieuw/${type}/contact-groep/${this.props.id}`);
    };

    render() {
        const { permissions = {} } = this.props;
        return (
            <div className="margin-10-top">
                <TaskHarmonica
                    toggleShowList={() => this.toggleShowList('tasks')}
                    showTasksList={this.state.toggleShowList.tasks}
                    taskCount={this.props.contactGroupDetails.taskCount}
                    newTask={this.newTask}
                />

                <DocumentHarmonica
                    toggleShowList={() => this.toggleShowList('documents')}
                    showDocumentsList={this.state.toggleShowList.documents}
                    newDocument={this.newDocument}
                    documentCount={this.props.contactGroupDetails.documentCount}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        contactGroupDetails: state.contactGroupDetails,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(IntakeDetailsHarmonicaWrapper);
