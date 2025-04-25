import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';

moment.locale('nl');

// Functionele wrapper voor de class component
const ConceptsInListItemWrapper = props => {
    const navigate = useNavigate();
    return <ConceptsInListItem {...props} navigate={navigate} />;
};

class ConceptsInListItem extends Component {
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

    openItem(id) {
        this.props.navigate(`/email/concept/${id}`);
    }

    render() {
        const { id, createdAt, mailboxName, from, subject } = this.props;

        return (
            <tr
                className={this.state.highlightRow}
                onDoubleClick={() => this.openItem(id)}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                <td>{createdAt && moment(createdAt).format('L')}</td>
                <td>{mailboxName}</td>
                <td>{from}</td>
                <td>{subject}</td>
                <td>
                    {this.state.showActionButtons ? (
                        <a role="button" onClick={() => this.openItem(id)}>
                            <Icon className="mybtn-success" size={14} icon={pencil} />
                        </a>
                    ) : (
                        ''
                    )}
                </td>
            </tr>
        );
    }
}

export default ConceptsInListItemWrapper;
