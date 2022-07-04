import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { arrows_vertical } from 'react-icons-kit/ikons/arrows_vertical';
import Icon from 'react-icons-kit';
import AddPortalSettingsDashboardWidgetImageModal from './AddPortalSettingsDashboardWidgetImageModal';
import PortalSettingsDashboardAPI from '../../../api/portal-settings-dashboard/PortalSettingsDashboardAPI';
import ButtonIcon from '../../../components/button/ButtonIcon';
import InputText from '../../../components/form/InputText';
import InputTextArea from '../../../components/form/InputTextarea';
import InputToggle from '../../../components/form/InputToggle';
import { Image } from 'react-bootstrap';
import Modal from '../../../components/modal/Modal';
import { FaInfoCircle } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';
import PortalLayoutImageCrop from '../../../components/cropImage/portalLayout/PortalLayoutImageCrop';

const DND_ITEM_TYPE = 'row';

const PortalDashboardWidgetOrderRow = ({ row, index, moveRow, handleInputChange, removeWidget, imageHash }) => {
    const dropRef = useRef(null);
    const dragRef = useRef(null);
    const [newWidgetImage, setNewWidgetImage] = useState(false);
    const [useAutoCropper, setUseAutoCropper] = useState(true);
    const [showCropImageModal, setShowCropImageModal] = useState(false);
    const [widgetImage, setWidgetImage] = useState('');
    const [showUploadSucces, setShowUploadSucces] = useState(false);
    const [uploadSuccesMessage, setUploadSuccesMessage] = useState('');

    const staticWidgets = ['over-ons', 'project-schrijf-je-in', 'huidige-deelnames'];
    const staticInput = ['buttonLink'];

    const [, drop] = useDrop({
        accept: DND_ITEM_TYPE,
        hover(item, monitor) {
            if (!dropRef.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = dropRef.current.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveRow(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag, preview] = useDrag({
        type: DND_ITEM_TYPE,
        item: { type: DND_ITEM_TYPE, index },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;

    preview(drop(dropRef));
    drag(dragRef);

    const toggleUseAutoCropper = () => {
        setUseAutoCropper(!useAutoCropper);
    };

    const closeNewWidgetImage = () => {
        setNewWidgetImage(false);
    };

    const toggleNewWidgetImage = () => {
        setNewWidgetImage(!newWidgetImage);
    };

    const closeShowCropWidgetImage = () => {
        setWidgetImage('');
        setUseAutoCropper(true);
        setShowCropImageModal(false);
    };

    const toggleShowUploadSucces = () => {
        setShowUploadSucces(!showUploadSucces);
    };

    const addWidgetImage = file => {
        setWidgetImage(file[0]);
        setShowCropImageModal(true);
    };

    const cropWidgetImage = file => {
        setWidgetImage(file);

        const data = new FormData();
        data.append('id', row.id);
        data.append('image', file);
        data.append('widgetImageFileName', widgetImage.name);
        data.append('type', widgetImage.type);

        PortalSettingsDashboardAPI.updateDashboardWidget(data)
            .then(payload => {
                setShowCropImageModal(false);
                setShowUploadSucces(true);
                setUploadSuccesMessage(payload.data.message);
                // alert(payload.data.message);
            })
            .catch(error => {
                setShowCropImageModal(false);
                console.log(error);
                alert('Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals.');
            });
    };

    return (
        <>
            <tr ref={dropRef} style={{ opacity }}>
                {row.cells.map(cell => {
                    switch (cell.column.id) {
                        case 'active':
                            return <td {...cell.getCellProps()}>{cell.value ? 'Ja' : 'Nee'}</td>;
                        case 'order':
                            return (
                                <td ref={dragRef}>
                                    <Icon icon={arrows_vertical} />
                                    {/*todo WM: opschonen*/}
                                    {cell.value} | {row.index}
                                </td>
                            );
                        case 'widgetImageFileName': {
                            const logoUrl = cell.value && `${URL_API}/portal/images/${cell.value}?${imageHash}`;
                            return (
                                <td key={cell.column.id}>
                                    <Image
                                        src={widgetImage && widgetImage.preview ? widgetImage.preview : logoUrl}
                                        thumbnail={true}
                                        style={{
                                            border: '1px solid #999',
                                            display: 'inline-block',
                                            padding: '1px',
                                            borderRadius: '1px',
                                            height: '100%',
                                            width: '100px',
                                            boxShadow: '0 0 0 1px #fff inset',
                                        }}
                                    />
                                </td>
                            );
                        }
                        case 'codeRef':
                            // todo WM: opschonen
                            console.log(row);
                            return (
                                <td>
                                    <ButtonIcon
                                        iconName={'glyphicon-remove'}
                                        buttonClassName={'btn-danger btn-sm'}
                                        disabled={staticWidgets.includes(cell.value)}
                                        onClickAction={() => removeWidget(row.id)}
                                    />
                                    {/*todo WM: opschonen*/}
                                    {row.id}
                                </td>
                            );
                    }

                    // Anders default
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
            </tr>
            {newWidgetImage && (
                <AddPortalSettingsDashboardWidgetImageModal
                    closeNewWidgetImage={closeNewWidgetImage}
                    toggleUseAutoCropper={toggleUseAutoCropper}
                    useAutoCropper={useAutoCropper}
                    addWidgetImage={addWidgetImage}
                />
            )}
            {showCropImageModal && (
                <PortalLayoutImageCrop
                    closeShowCrop={closeShowCropWidgetImage}
                    useAutoCropper={useAutoCropper}
                    image={widgetImage}
                    imageLayoutItemName={'image-widget'}
                    cropLogo={cropWidgetImage}
                />
            )}

            {showUploadSucces && (
                <Modal
                    title={'Succes'}
                    closeModal={toggleShowUploadSucces}
                    buttonCancelText={'Ok'}
                    showConfirmAction={false}
                >
                    {uploadSuccesMessage}
                </Modal>
            )}
        </>
    );
};

export default PortalDashboardWidgetOrderRow;
