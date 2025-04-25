import React, { Component } from 'react';
import { connect } from 'react-redux';

import TaskHarmonica from './harmonica/TaskHarmonica';
import EmailHarmonica from './harmonica/EmailHarmonica';
import { useNavigate } from 'react-router-dom';

// Functionele wrapper voor de class component
const InvoiceDetailsHarmonicaWrapper = props => {
    const navigate = useNavigate();
    return <InvoiceDetailsHarmonica {...props} navigate={navigate} />;
};

class InvoiceDetailsHarmonica extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleShowList: {
                tasks: false,
                emails: false,
            },
        };

        this.toggleShowList = this.toggleShowList.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.id !== nextProps.id) {
            this.setState({
                toggleShowList: {
                    tasks: false,
                    emails: false,
                },
            });
        }
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

    newTask = type => {
        if (this.props.invoiceDetails) {
            this.props.navigate(
                `/taak/nieuw/${type}/nota/${this.props.invoiceDetails.id}/order/${this.props.invoiceDetails.orderId}/contact/${this.props.invoiceDetails.contactId}`
            );
        }
    };

    newEmail = () => {
        this.props.navigate(`/email/nieuw`);
    };

    render() {
        return (
            <div className="margin-10-top">
                <TaskHarmonica
                    toggleShowList={() => this.toggleShowList('tasks')}
                    showTasksList={this.state.toggleShowList.tasks}
                    taskCount={this.props.invoiceDetails.taskCount}
                    newTask={this.newTask}
                />
                <EmailHarmonica
                    toggleShowList={() => this.toggleShowList('emails')}
                    showEmailsList={this.state.toggleShowList.emails}
                    newEmail={this.newEmail}
                    emailCount={this.props.invoiceDetails.emailCount}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        invoiceDetails: state.invoiceDetails,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(InvoiceDetailsHarmonicaWrapper);
