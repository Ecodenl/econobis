import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import MeasureAPI from '../../../../api/measure/MeasureAPI';

import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import { fetchMeasure } from '../../../../actions/measure/MeasureDetailsActions';

class MeasureDetailsFaqNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            faq: {
                question:'',
                answer:'',
            },
            errors: {
                question: false,
                answer: false,
            },
        };
    };

    handleQuestionChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
            this.setState({
                ...this.state,
                faq: {
                    question: value,
                    answer: this.state.faq.answer,
                }

            });
    }

    handleAnswerChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

            this.setState({
                ...this.state,
                faq: {
                    question: this.state.faq.question,
                    answer: value,
                }
            });
    }

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
        }
        else if (isEmpty(faq.question)) {
            this.setState({
                ...this.state,
                errors: {
                    question: true,
                },
            });
        }
        else if (isEmpty(faq.answer)) {
            this.setState({
                ...this.state,
                errors: {
                    answer: true,
                },
            });
        }
        else
        {
            this.setState({
                ...this.state,
                errors: {
                    question: false,
                    answer: false,
                },
            });
            MeasureAPI.storeFaq(this.props.measureId, faq).then(() => {
                this.props.fetchMeasure(this.props.measureId);
                this.props.toggleShowNew();
            });
        }

    };

    render() {
        const {question, answer} = this.state.faq;
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label={"Vraag"}
                                name={"question"}
                                value={question}
                                onChangeAction={this.handleQuestionChange}
                                required={"required"}
                                error={this.state.errors.question}
                            />
                            <InputText
                                label={"Antwoord"}
                                name={"answer"}
                                value={answer}
                                onChangeAction={this.handleAnswerChange}
                                required={"required"}
                                error={this.state.errors.answer}
                            />
                        </div>

                        <div className="pull-right btn-group" role="group">
                            <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"} onClickAction={this.props.toggleShowNew}/>
                            <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit} type={"submit"} value={"Submit"}/>
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        measureId: state.measureDetails.id,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchMeasure: (id) => {
        dispatch(fetchMeasure(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MeasureDetailsFaqNew);

