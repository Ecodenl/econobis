import React, {Component} from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import { makePrimary } from '../../../../actions/contact/ContactDetailsActions';
import PersonAPI from '../../../../api/contact/PersonAPI';

class ContactDetailFormPersonItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showMakePrimair: false,
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

    makePrimary = () => {
        const person = {
            id: this.props.person.id,
            primary: true,
        };

        PersonAPI.updatePerson(person).then((payload) => {
            this.props.makePrimary(person.id);
        });
    };

    openPerson = () => {
        hashHistory.push(`/contact/${this.props.person.contactId}`);
    };

    render() {
        const {occupation, fullName, primary} = this.props.person;

        return (
            <div className={`row border ${this.state.highlightLine}`} onMouseEnter={() => this.onLineEnter()} onMouseLeave={() => this.onLineLeave()}>
                <div className="col-sm-2">
                    { occupation ? occupation.name : '' }
                </div>
                <div className="col-sm-8">
                    { fullName }
                </div>
                <div className="col-sm-1" onMouseEnter={() => this.onLineEnter()} onMouseLeave={() => this.onLineLeave()}>
                    { primary ?
                        <span className="h6">Primair</span>
                        :
                        (this.state.showActionButtons ? <a role="button" onClick={this.makePrimary}><span className="h6"><span className="glyphicon glyphicon-pencil mybtn-success" /></span></a> : '')
                    }
                </div>
                <div className="col-sm-1">
                    {(this.state.showActionButtons ? <a role="button" onClick={this.openPerson}><span className="glyphicon glyphicon-search mybtn-success" /> </a> : '')}
                </div>
            </div>
        );
    }
};

const mapDispatchToProps = dispatch => ({
    makePrimary: (id) => {
        dispatch(makePrimary(id));
    },
});

export default connect(null, mapDispatchToProps)(ContactDetailFormPersonItem);
