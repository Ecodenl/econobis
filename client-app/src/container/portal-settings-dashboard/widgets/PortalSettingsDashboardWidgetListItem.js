import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import moment from 'moment';
import InputTextArea from '../../../components/form/InputTextarea';
import InputText from '../../../components/form/InputText';
import ButtonIcon from '../../../components/button/ButtonIcon';
moment.locale('nl');

class PortalSettingsDashboardWidgetListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: props.edit,
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
        hashHistory.push(`/project/deelnemer/${id}`);
    }

    render() {
        const staticWidgets = ['project-schrijf-je-in', 'over-ons'];
        const { edit, id, order, title, text, buttonText, buttonLink } = this.props;

        return (
            <tr
                onDoubleClick={() => this.openItem(id)}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                <td>
                    {edit ? (
                        <InputText
                            type={'number'}
                            min={'3'}
                            divSize={'col-sm-12'}
                            divClassName={'no-padding'}
                            size={'col-sm-12'}
                            name={`${id}-order`}
                            value={order}
                            onChangeAction={this.props.handleInputChange}
                            itemId={id}
                        />
                    ) : (
                        order
                    )}
                </td>
                <td>
                    {edit ? (
                        <InputText
                            divSize={'col-sm-12'}
                            divClassName={'no-padding'}
                            size={'col-sm-12'}
                            name={`${id}-title`}
                            value={title}
                            onChangeAction={this.props.handleInputChange}
                            itemId={id}
                        />
                    ) : (
                        title
                    )}
                </td>
                <td>
                    {edit ? (
                        <InputTextArea
                            sizeInput={'col-sm-12'}
                            size={'col-sm-12'}
                            name={`${id}-text`}
                            value={text}
                            onChangeAction={this.props.handleInputChange}
                            itemId={id}
                        />
                    ) : (
                        text
                    )}
                </td>
                <td>
                    {edit ? (
                        <InputText
                            divSize={'col-sm-12'}
                            divClassName={'no-padding'}
                            size={'col-sm-12'}
                            name={`${id}-buttonText`}
                            value={buttonText}
                            onChangeAction={this.props.handleInputChange}
                            itemId={id}
                        />
                    ) : (
                        buttonText
                    )}
                </td>
                <td>
                    {edit ? (
                        <InputText
                            divSize={'col-sm-12'}
                            divClassName={'no-padding'}
                            size={'col-sm-12'}
                            name={`${id}-buttonLink`}
                            value={buttonLink}
                            disabled={staticWidgets.includes(id)}
                            onChangeAction={this.props.handleInputChange}
                            itemId={id}
                        />
                    ) : (
                        buttonLink
                    )}
                </td>
                {edit && (
                    <td>
                        <ButtonIcon
                            iconName={'glyphicon-remove'}
                            buttonClassName={'btn-danger btn-sm'}
                            disabled={staticWidgets.includes(id)}
                            onClickAction={() => this.props.removeWidget(id)}
                        />
                    </td>
                )}
            </tr>
        );
    }
}

export default PortalSettingsDashboardWidgetListItem;
