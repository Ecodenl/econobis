import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';

// Functionele wrapper voor de class component
const HousingFilesListItemWrapper = props => {
    const navigate = useNavigate();
    return <HousingFilesListItem {...props} navigate={navigate} />;
};

class HousingFilesListItem extends Component {
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
        this.props.navigate(`/woningdossier/${id}`);
    }

    render() {
        const {
            id,
            fullName,
            createdAt,
            fullAddress,
            postalCode,
            city,
            buildYear,
            buildingType,
            isHouseForSale,
            energyLabel,
        } = this.props;

        return (
            <tr
                className={this.state.highlightRow}
                onDoubleClick={() => this.openItem(id)}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                <td>{moment(createdAt).format('DD-MM-Y')}</td>
                <td>{fullAddress}</td>
                <td>{postalCode}</td>
                <td>{city}</td>
                <td>{fullName}</td>
                <td>{buildYear ? buildYear : ''}</td>
                <td>{buildingType ? buildingType : ''}</td>
                <td>{isHouseForSale ? 'Ja' : 'Nee'}</td>
                <td>{energyLabel ? energyLabel : ''}</td>

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

export default HousingFilesListItemWrapper;
