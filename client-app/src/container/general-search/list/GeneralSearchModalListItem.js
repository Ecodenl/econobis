import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

// Functionele wrapper voor de class component
const GeneralSearchModalListItemWrapper = props => {
    const navigate = useNavigate();
    return <GeneralSearchModalListItem {...props} navigate={navigate} />;
};

class GeneralSearchModalListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
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

    redirect() {
        this.props.navigate(this.props.redirect);
        this.props.closeModal();
    }

    render() {
        const { relation, found_in, found_value } = this.props;

        return (
            <tr
                className={this.state.highlightRow}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                <td className="link-underline" onClick={() => this.redirect()}>
                    {' '}
                    {relation}{' '}
                </td>
                <td>{found_in}</td>
                <td>{found_value}</td>
            </tr>
        );
    }
}

export default GeneralSearchModalListItemWrapper;
