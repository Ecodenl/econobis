import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';

// Functionele wrapper voor de class component
const VatCodesListItemWrapper = props => {
    const navigate = useNavigate();
    return <VatCodesListItem {...props} navigate={navigate} />;
};

class VatCodesListItem extends Component {
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
        this.props.navigate(`/btw-code/${id}`);
    }

    render() {
        const { id, startDate, description, percentage, permissions } = this.props;

        return (
            <tr
                className={this.state.highlightRow}
                onDoubleClick={permissions.manageFinancial ? () => this.openItem(id) : null}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                <td>{startDate && moment(startDate).format('L')}</td>
                <td>{description}</td>
                <td>{percentage}%</td>
                <td>
                    {this.state.showActionButtons && permissions.manageFinancial ? (
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

export default connect(mapStateToProps)(VatCodesListItemWrapper);
