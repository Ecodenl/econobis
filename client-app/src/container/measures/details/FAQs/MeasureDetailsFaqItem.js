import React, { Component } from 'react';
import { isEmpty } from 'lodash';

import MeasureAPI from '../../../../api/measure/MeasureAPI';

import MeasureDetailsFaqView from './MeasureDetailsFaqView';
import MeasureDetailsFaqItemDelete from './MeasureDetailsFaqItemDelete';
import MeasureDetailsFaqEdit from './MeasureDetailsFaqEdit';
import { connect } from 'react-redux';

class MeasureDetailsFaqItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showDelete: false,

            faq: {
                ...props.faq,
            },
            errors: {
                question: false,
                answer: false,
            },
        };
    }

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

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    };

    openEdit = () => {
        if (this.props.permissions.manageMeasure) {
            this.setState({ showEdit: true });
        }
    };

    closeEdit = () => {
        this.setState({ showEdit: false });
    };

    cancelEdit = () => {
        this.setState({
            ...this.state,
            faq: {
                ...this.props.faq,
            },
            errors: {
                question: false,
                answer: false,
            },
        });

        this.closeEdit();
    };

    setQuestion = value => {
        this.setState({
            ...this.state,
            faq: {
                ...this.state.faq,
                question: value,
            },
        });
    };

    setAnswer = value => {
        this.setState({
            ...this.state,
            faq: {
                ...this.state.faq,
                answer: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { faq } = this.state;

        if (isEmpty(faq.question) && isEmpty(faq.answer)) {
            this.setState({
                ...this.state,
                errors: {
                    answer: true,
                    question: true,
                },
            });
        } else if (isEmpty(faq.question)) {
            this.setState({
                ...this.state,
                errors: {
                    question: true,
                },
            });
        } else if (isEmpty(faq.answer)) {
            this.setState({
                ...this.state,
                errors: {
                    answer: true,
                },
            });
        } else {
            this.setState({
                ...this.state,
                errors: {
                    question: false,
                    answer: false,
                },
            });
            MeasureAPI.updateFaq(faq).then(() => {
                this.closeEdit();
            });
        }
    };

    render() {
        return (
            <div>
                <MeasureDetailsFaqView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    toggleDelete={this.toggleDelete}
                    faq={this.state.faq}
                    openEdit={this.openEdit}
                />
                {this.state.showEdit && (
                    <MeasureDetailsFaqEdit
                        faq={this.state.faq}
                        setQuestion={this.setQuestion}
                        setAnswer={this.setAnswer}
                        handleSubmit={this.handleSubmit}
                        cancelEdit={this.cancelEdit}
                        errors={this.state.errors}
                    />
                )}
                {this.state.showDelete && (
                    <MeasureDetailsFaqItemDelete toggleDelete={this.toggleDelete} id={this.state.faq.id} />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(MeasureDetailsFaqItem);
