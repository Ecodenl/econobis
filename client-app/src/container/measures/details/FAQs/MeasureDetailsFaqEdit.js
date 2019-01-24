import React, { Component } from 'react';

import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

class MeasureDetailsFaqEdit extends Component {
    constructor(props) {
        super(props);

        const { id, question, answer } = props.faq;

        this.state = {
            faq: {
                id,
                question,
                answer,
            },
        };
    }

    handleQuestionChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            ...this.state,
            faq: {
                ...this.state.faq,
                question: value,
            },
        });

        this.props.setQuestion(value);
    };

    handleAnswerChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            ...this.state,
            faq: {
                ...this.state.faq,
                answer: value,
            },
        });

        this.props.setAnswer(value);
    };

    render() {
        const { question, answer } = this.state.faq;
        return (
            <div>
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <Panel className={'panel-grey'}>
                        <PanelBody>
                            <div className="row">
                                <div className="row">
                                    <InputText
                                        label={'Vraag'}
                                        size={'col-sm-6'}
                                        name={'question'}
                                        value={question}
                                        onChangeAction={this.handleQuestionChange}
                                        required={'required'}
                                        error={this.props.errors.question}
                                    />
                                    <InputText
                                        label={'Antwoord'}
                                        size={'col-sm-6'}
                                        name={'answer'}
                                        value={answer}
                                        onChangeAction={this.handleAnswerChange}
                                        required={'required'}
                                        error={this.props.errors.answer}
                                    />
                                </div>
                            </div>
                            <div className="pull-right btn-group" role="group">
                                <ButtonText
                                    buttonClassName={'btn-default'}
                                    buttonText={'Annuleren'}
                                    onClickAction={this.props.cancelEdit}
                                />
                                <ButtonText
                                    buttonText={'Opslaan'}
                                    onClickAction={this.props.handleSubmit}
                                    type={'submit'}
                                    value={'Submit'}
                                />
                            </div>
                        </PanelBody>
                    </Panel>
                </form>
            </div>
        );
    }
}

export default MeasureDetailsFaqEdit;
