import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';

class MeasuresListItem extends Component {
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
        hashHistory.push(`maatregel/${id}`);
    }

    render() {
        const { id, number, measureCategory, name, name_custom, visible } = this.props;
        return (
            <tr
                className={this.state.highlightRow}
                onDoubleClick={() => this.openItem(id)}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                <td>{number}</td>
                <td>{measureCategory && measureCategory.name}</td>
                <td>{name}</td>
                <td>{name_custom}</td>
                <td>{visible ? 'Ja' : 'Nee'}</td>
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

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(MeasuresListItem);
