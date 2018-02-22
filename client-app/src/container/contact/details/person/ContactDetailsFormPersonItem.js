import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import moment from "moment/moment";

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

    openPerson = () => {
        hashHistory.push(`/contact/${this.props.person.person.contactId}`);
    };

    render() {
        const {occupation, person, startDate, endDate, primary} = this.props.person;

        return (
            <div className={`row border ${this.state.highlightLine}`} onMouseEnter={() => this.onLineEnter()} onMouseLeave={() => this.onLineLeave()}>
                <div className="col-sm-3">
                    { occupation ? occupation.name : '' }
                </div>
                <div className="col-sm-2">
                    { person ? person.fullName : '' }
                </div>
                <div className="col-sm-2">
                    { startDate ? moment(startDate.date).format('DD-MM-Y') : '' }
                </div>
                <div className="col-sm-2">
                    { endDate ? moment(endDate.date).format('DD-MM-Y') : '' }
                </div>
                <div className="col-sm-2">
                    { primary ? 'Ja' : 'Nee' }
                </div>
                <div className="col-sm-1">
                    {(this.state.showActionButtons ? <a role="button" onClick={this.openPerson}><span className="glyphicon glyphicon-search mybtn-success" /> </a> : '')}
                </div>
            </div>
        );
    }
};


export default ContactDetailFormPersonItem;
