import React, { Component } from 'react';
import moment from 'moment';

import Icon from 'react-icons-kit';
// import { trash } from 'react-icons-kit/fa/trash';
import { pencil } from 'react-icons-kit/fa/pencil';

class HousingFileSpecificationsListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showMore: false,
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

    toggleShowMore() {
        this.setState({
            showMore: !this.state.showMore,
        });
    }

    render() {
        const {
            id,
            fullName,
            fullAddress,
            postalCode,
            city,
            measureCategoryName,
            measureName,
            status,
            measureDate,
            answer,
            floor,
            side,
            typeBrand,
            externalHoomName,
            typeOfExecution,
            savingsGas,
            savingsElectricity,
            co2Savings,
        } = this.props;

        const { showMore } = this.state;

        return (
            <>
                <tr
                    className={this.state.highlightRow}
                    // onDoubleClick={permissions.manageFinancial ? () => this.openItem(id) : null}
                    onMouseEnter={() => this.onRowEnter()}
                    onMouseLeave={() => this.onRowLeave()}
                    onClick={() => this.toggleShowMore()}
                >
                    {this.props.showCheckboxList ? (
                        <td>
                            <div>
                                {status && status.codeRef === 'desirable' ? (
                                    <input
                                        type="checkbox"
                                        name={id}
                                        onChange={this.props.toggleSpecificationCheck}
                                        checked={
                                            this.props.specificationIds
                                                ? this.props.specificationIds.includes(id)
                                                : false
                                        }
                                    />
                                ) : (
                                    ' '
                                )}
                            </div>
                        </td>
                    ) : null}
                    <td>{fullName}</td>
                    <td>{fullAddress}</td>
                    <td>{postalCode}</td>
                    <td>{city}</td>
                    <td>{measureCategoryName}</td>
                    <td>{measureName}</td>
                    <td>{status ? status.name : ''}</td>
                    <td>{measureDate ? moment(measureDate).format('DD-MM-Y') : ''}</td>
                    <td>
                        {this.state.showActionButtons ? (
                            <a role="button" onClick={() => this.toggleShowMore()}>
                                <Icon className="mybtn-success" size={14} icon={pencil} />
                                &nbsp;
                            </a>
                        ) : (
                            ''
                        )}
                        {/*{this.state.showActionButtons &&*/}
                        {/*permissions.manageFinancial &&*/}
                        {/*!definitive &&*/}
                        {/*statusId === 'concept' ? (*/}
                        {/*    <a role="button" onClick={this.props.showDeleteItemModal.bind(this, id, description)}>*/}
                        {/*        <Icon className="mybtn-danger" size={14} icon={trash} />*/}
                        {/*        &nbsp;*/}
                        {/*    </a>*/}
                        {/*) : (*/}
                        {/*    ''*/}
                        {/*)}*/}
                    </td>
                </tr>
                {showMore && answer ? (
                    <tr style={{ backgroundColor: 'initial' }}>
                        <td colSpan={this.props.showCheckboxList ? '5' : '4'}>&nbsp;</td>
                        <td>Waarde:</td>
                        <td colSpan={this.props.showCheckboxList ? '3' : '4'}>{answer}</td>
                    </tr>
                ) : null}
                {showMore && floor ? (
                    <tr style={{ backgroundColor: 'initial' }}>
                        <td colSpan={this.props.showCheckboxList ? '5' : '4'}>&nbsp;</td>
                        <td>Verdieping:</td>
                        <td colSpan={this.props.showCheckboxList ? '3' : '4'}>{floor ? floor.name : ''}</td>
                    </tr>
                ) : null}
                {showMore && side ? (
                    <tr style={{ backgroundColor: 'initial' }}>
                        <td colSpan={this.props.showCheckboxList ? '5' : '4'}>&nbsp;</td>
                        <td>Zijde:</td>
                        <td colSpan={this.props.showCheckboxList ? '3' : '4'}>{side ? side.name : ''}</td>
                    </tr>
                ) : null}
                {showMore && typeBrand ? (
                    <tr style={{ backgroundColor: 'initial' }}>
                        <td colSpan={this.props.showCheckboxList ? '5' : '4'}>&nbsp;</td>
                        <td>Type/merk:</td>
                        <td colSpan={this.props.showCheckboxList ? '3' : '4'}>{typeBrand}</td>
                    </tr>
                ) : null}
                {showMore && typeOfExecution ? (
                    <tr style={{ backgroundColor: 'initial' }}>
                        <td colSpan={this.props.showCheckboxList ? '5' : '4'}>&nbsp;</td>
                        <td>Uitvoering:</td>
                        <td colSpan={this.props.showCheckboxList ? '3' : '4'}>
                            {typeOfExecution === null
                                ? 'Onbekend'
                                : typeOfExecution === 'Z'
                                ? 'Zelf doen'
                                : 'Laten doen'}
                        </td>
                    </tr>
                ) : null}
                {showMore && savingsGas ? (
                    <tr style={{ backgroundColor: 'initial' }}>
                        <td colSpan={this.props.showCheckboxList ? '5' : '4'}>&nbsp;</td>
                        <td>Besparing gas:</td>
                        <td colSpan={this.props.showCheckboxList ? '3' : '4'}>{savingsGas}</td>
                    </tr>
                ) : null}
                {showMore && savingsElectricity ? (
                    <tr style={{ backgroundColor: 'initial' }}>
                        <td colSpan={this.props.showCheckboxList ? '5' : '4'}>&nbsp;</td>
                        <td>Besparing electriciteit:</td>
                        <td colSpan={this.props.showCheckboxList ? '3' : '4'}>{savingsElectricity}</td>
                    </tr>
                ) : null}
                {showMore && co2Savings ? (
                    <tr style={{ backgroundColor: 'initial' }}>
                        <td colSpan={this.props.showCheckboxList ? '5' : '4'}>&nbsp;</td>
                        <td>CO2 besparing:</td>
                        <td colSpan={this.props.showCheckboxList ? '3' : '4'}>{co2Savings}</td>
                    </tr>
                ) : null}
            </>
        );
    }
}

export default HousingFileSpecificationsListItem;
