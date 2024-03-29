import React, { Component } from 'react';
import moment from 'moment';

import Icon from 'react-icons-kit';
// import { trash } from 'react-icons-kit/fa/trash';
// import { pencil } from 'react-icons-kit/fa/pencil';
import { arrowDown } from 'react-icons-kit/fa/arrowDown';
import { arrowRight } from 'react-icons-kit/fa/arrowRight';

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
        if (!this.props.showCheckboxList) {
            this.setState({
                showMore: !this.state.showMore,
            });
        }
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
            isDefaultEconobisMeasure,
            externalHoomName,
            typeOfExecution,
            savingsGas,
            savingsElectricity,
            co2Savings,
            showCheckboxList,
        } = this.props;

        const { showMore, showActionButtons } = this.state;

        const hasMore = answer || floor || side || typeOfExecution || savingsGas || savingsElectricity || co2Savings;
        return (
            <>
                <tr
                    className={this.state.highlightRow}
                    // onDoubleClick={permissions.manageFinancial ? () => this.openItem(id) : null}
                    onMouseEnter={() => this.onRowEnter()}
                    onMouseLeave={() => this.onRowLeave()}
                    onClick={() => this.toggleShowMore()}
                >
                    {showCheckboxList ? (
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
                    <td>{isDefaultEconobisMeasure ? externalHoomName : measureName}</td>
                    <td>{status ? status.name : ''}</td>
                    <td>{measureDate ? moment(measureDate).format('DD-MM-Y') : ''}</td>
                    <td>{typeBrand}</td>
                    <td>
                        {!showCheckboxList && hasMore ? (
                            <a role="button" onClick={() => this.toggleShowMore()}>
                                {showMore ? (
                                    <Icon className="mybtn-success" size={14} icon={arrowDown} />
                                ) : (
                                    <Icon className="mybtn-success" size={14} icon={arrowRight} />
                                )}
                            </a>
                        ) : (
                            ''
                        )}
                    </td>
                </tr>
                {!showCheckboxList && showMore && answer ? (
                    <tr style={{ backgroundColor: 'initial' }}>
                        <td colSpan={'4'}>&nbsp;</td>
                        <td>Waarde:</td>
                        <td colSpan={'5'}>{answer}</td>
                    </tr>
                ) : null}
                {!showCheckboxList && showMore && floor ? (
                    <tr style={{ backgroundColor: 'initial' }}>
                        <td colSpan={'4'}>&nbsp;</td>
                        <td>Verdieping:</td>
                        <td colSpan={'5'}>{floor ? floor.name : ''}</td>
                    </tr>
                ) : null}
                {!showCheckboxList && showMore && side ? (
                    <tr style={{ backgroundColor: 'initial' }}>
                        <td colSpan={'4'}>&nbsp;</td>
                        <td>Zijde:</td>
                        <td colSpan={'5'}>{side ? side.name : ''}</td>
                    </tr>
                ) : null}
                {!showCheckboxList && showMore && typeOfExecution ? (
                    <tr style={{ backgroundColor: 'initial' }}>
                        <td colSpan={'4'}>&nbsp;</td>
                        <td>Uitvoering:</td>
                        <td colSpan={'5'}>
                            {typeOfExecution === null
                                ? 'Onbekend'
                                : typeOfExecution === 'Z'
                                ? 'Zelf doen'
                                : 'Laten doen'}
                        </td>
                    </tr>
                ) : null}
                {!showCheckboxList && showMore && savingsGas ? (
                    <tr style={{ backgroundColor: 'initial' }}>
                        <td colSpan={'4'}>&nbsp;</td>
                        <td>Besparing gas:</td>
                        <td colSpan={'5'}>{savingsGas}</td>
                    </tr>
                ) : null}
                {!showCheckboxList && showMore && savingsElectricity ? (
                    <tr style={{ backgroundColor: 'initial' }}>
                        <td colSpan={'4'}>&nbsp;</td>
                        <td>Besparing elektriciteit:</td>
                        <td colSpan={'5'}>{savingsElectricity}</td>
                    </tr>
                ) : null}
                {!showCheckboxList && showMore && co2Savings ? (
                    <tr style={{ backgroundColor: 'initial' }}>
                        <td colSpan={'4'}>&nbsp;</td>
                        <td>CO2 besparing:</td>
                        <td colSpan={'5'}>{co2Savings}</td>
                    </tr>
                ) : null}
            </>
        );
    }
}

export default HousingFileSpecificationsListItem;
