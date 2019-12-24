import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import moment from 'moment';
import { setCheckedIntake } from '../../../actions/intake/IntakesActions';
import { connect } from 'react-redux';

class IntakesListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightRow: '',
        };
    }

    onRowEnter() {
        this.setState({
            showActionButtons: true,
            highlightRow: 'highlight-row',
        });
    }

    onRowLeave() {
        this.setState({
            showActionButtons: false,
            highlightRow: '',
        });
    }

    setCheckedIntake(id) {
        this.props.setCheckedIntake(id);
    }

    openItem(id) {
        hashHistory.push(`/intake/${id}`);
    }

    render() {
        const { checked, id, fullName, createdAt, fullAddress, status, measuresRequestedNames = [] } = this.props;

        return (
            <tr
                className={this.state.highlightRow}
                onDoubleClick={() => this.openItem(id)}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                {this.props.showCheckbox && (
                    <td>
                        <input type="checkbox" checked={checked} onChange={() => this.setCheckedIntake(id)} />
                    </td>
                )}
                <td>{moment(createdAt).format('DD-MM-Y')}</td>
                <td>{fullName}</td>
                <td>{fullAddress}</td>
                <td>{measuresRequestedNames.join(', ')}</td>
                <td>{status}</td>
                <td>
                    {this.state.showActionButtons ? (
                        <a role="button" onClick={() => this.openItem(id)}>
                            <span className="glyphicon glyphicon-pencil mybtn-success" />{' '}
                        </a>
                    ) : (
                        ''
                    )}
                </td>
            </tr>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setCheckedIntake: id => {
        dispatch(setCheckedIntake(id));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(IntakesListItem);
