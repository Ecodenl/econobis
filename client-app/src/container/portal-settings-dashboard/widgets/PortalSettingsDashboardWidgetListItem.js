import React, { Component } from 'react';
import moment from 'moment';
import InputTextArea from '../../../components/form/InputTextarea';
import InputText from '../../../components/form/InputText';
import ButtonIcon from '../../../components/button/ButtonIcon';
import InputToggle from '../../../components/form/InputToggle';
import { Image } from 'react-bootstrap';
import AddPortalSettingsDashboardWidgetImageModal from './AddPortalSettingsDashboardWidgetImageModal';
import PortalSettingsDashboardAPI from '../../../api/portal-settings-dashboard/PortalSettingsDashboardAPI';
moment.locale('nl');

class PortalSettingsDashboardWidgetListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: props.edit,
            showActionButtons: false,
            highlightRow: '',
            newWidgetImage: false,
            widgetImage: null,
        };
    }

    onRowEnter() {
        this.setState({
            showActionButtons: true,
            highlightRow: 'highlight-row',
            widgetImage: this.state.widgetImage,
        });
    }

    onRowLeave() {
        this.setState({
            showActionButtons: false,
            highlightRow: '',
            widgetImage: this.state.widgetImage,
        });
    }

    toggleNewWidgetImage = () => {
        this.setState({
            newWidgetImage: !this.state.newWidgetImage,
        });
    };

    addWidgetImage = file => {
        this.setState({
            ...this.state,
            widgetImage: file[0],
        });

        const data = new FormData();
        data.append('id', this.props.id);
        data.append('image', file[0]);

        PortalSettingsDashboardAPI.updateDashboardWidget(data)
            .then(payload => {
                alert(payload.data.message);
            })
            .catch(error => {
                console.log(error);
                alert('Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals.');
            });
    };

    render() {
        const staticWidgets = ['project-schrijf-je-in', 'over-ons'];
        const { edit, id, order, title, text, image, buttonText, buttonLink, active } = this.props;

        const logoUrl = image.includes('images/') ? `${URL_API}/portal${image}` : `${URL_API}/portal/images/${image}`;

        return (
            <>
                <tr onMouseEnter={() => this.onRowEnter()} onMouseLeave={() => this.onRowLeave()}>
                    <td>
                        {edit ? (
                            <InputText
                                type={'number'}
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
                                label={''}
                                divSize={'col-sm-12'}
                                size={'col-sm-12'}
                                value={this.state.widgetImage ? this.state.widgetImage.name : image}
                                onClickAction={this.toggleNewWidgetImage}
                                onChangeaction={() => {}}
                            />
                        ) : (
                            <Image
                                src={
                                    this.state.widgetImage && this.state.widgetImage.preview
                                        ? this.state.widgetImage.preview
                                        : logoUrl
                                }
                            />
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
                    <td>
                        {edit ? (
                            <InputToggle
                                name={`${id}-active`}
                                value={active}
                                onChangeAction={this.props.handleInputChange}
                                itemId={id}
                            />
                        ) : active ? (
                            'Ja'
                        ) : (
                            'Nee'
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
                {this.state.newWidgetImage && (
                    <AddPortalSettingsDashboardWidgetImageModal
                        toggleNewWidgetImage={this.toggleNewWidgetImage}
                        addWidgetImage={this.addWidgetImage}
                    />
                )}
            </>
        );
    }
}

export default PortalSettingsDashboardWidgetListItem;
