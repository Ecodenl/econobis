import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { sort } from 'react-icons-kit/fa/sort';
import Icon from 'react-icons-kit';
import AddPortalSettingsDashboardWidgetImageModal from '../../../container/portal-settings-dashboard/widgets/AddPortalSettingsDashboardWidgetImageModal';
import PortalSettingsDashboardAPI from '../../../api/portal-settings-dashboard/PortalSettingsDashboardAPI';
import ButtonIcon from '../../button/ButtonIcon';
import InputText from '../../form/InputText';
import InputTextArea from '../../form/InputTextarea';
import InputToggle from '../../form/InputToggle';
import { Image } from 'react-bootstrap';
import Modal from '../../modal/Modal';

const DND_ITEM_TYPE = 'row';

const PortalDashboardWidgetOrderRow = ({ row, index, moveRow, edit, handleInputChange, removeWidget }) => {
    const dropRef = useRef(null);
    const dragRef = useRef(null);
    const [newWidgetImage, setNewWidgetImage] = useState();
    const [widgetImage, setWidgetImage] = useState();
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

    const toggleNewWidgetImage = () => {
        setNewWidgetImage(!newWidgetImage);
    };

    const toggleShowUploadSucces = () => {
        setShowUploadSucces(!showUploadSucces);
    };

    const addWidgetImage = file => {
        setWidgetImage(file[0]);

        const data = new FormData();
        data.append('id', row.id);
        data.append('image', file[0]);

        PortalSettingsDashboardAPI.updateDashboardWidget(data)
            .then(payload => {
                setShowUploadSucces(true);
                setUploadSuccesMessage(payload.data.message);
                // alert(payload.data.message);
            })
            .catch(error => {
                console.log(error);
                alert('Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals.');
            });
    };

    return (
        <>
            <tr ref={dropRef} style={{ opacity }}>
                {edit && (
                    <td ref={dragRef}>
                        <Icon icon={sort} />
                    </td>
                )}
                {edit
                    ? // edit
                      row.cells.map(cell => {
                          switch (cell.column.id) {
                              case 'title':
                              case 'text':
                              case 'buttonText':
                              case 'buttonLink':
                                  return (
                                      <td key={cell.column.id}>
                                          <InputTextArea
                                              sizeInput={'col-sm-12'}
                                              size={'col-sm-12'}
                                              name={`${cell.row.id}-${cell.column.id}`}
                                              value={cell.value}
                                              onChangeAction={handleInputChange}
                                              itemId={cell.row.id}
                                          />
                                      </td>
                                  );
                              case 'image':
                                  const logoUrl =
                                      cell.value && cell.value.includes('images/')
                                          ? `${URL_API}/portal${cell.value}`
                                          : `${URL_API}/portal/images/${cell.value}`;
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
                                              onClick={toggleNewWidgetImage}
                                          />
                                          <InputText
                                              type={'hidden'}
                                              label={''}
                                              divSize={'col-sm-12'}
                                              size={'col-sm-12'}
                                              value={widgetImage ? widgetImage.name : cell.value}
                                              onClickAction={toggleNewWidgetImage}
                                              onChangeaction={() => {}}
                                          />
                                      </td>
                                  );
                              case 'active':
                                  return (
                                      <td key={cell.column.id}>
                                          <InputToggle
                                              label={''}
                                              name={`${cell.row.id}-${cell.column.id}`}
                                              value={cell.value}
                                              onChangeAction={handleInputChange}
                                              itemId={cell.row.id}
                                          />
                                      </td>
                                  );
                              default:
                                  return (
                                      <td key={cell.column.id}>
                                          <InputText
                                              type={'text'}
                                              divSize={'col-sm-12'}
                                              divClassName={'no-padding'}
                                              size={'col-sm-12'}
                                              name={`${cell.row.id}-${cell.column.id}`}
                                              value={cell.value}
                                              onChangeAction={handleInputChange}
                                              itemId={cell.row.id}
                                              disabled={
                                                  staticWidgets.includes(cell.row.id) &&
                                                  staticInput.includes(cell.column.id)
                                              }
                                          />
                                      </td>
                                  );
                          }
                      })
                    : // view
                      row.cells.map(cell => {
                          switch (cell.column.id) {
                              case 'active':
                                  return <td {...cell.getCellProps()}>{cell.value ? 'Ja' : 'Nee'}</td>;
                              case 'image': {
                                  const logoUrl =
                                      cell.value && cell.value.includes('images/')
                                          ? `${URL_API}/portal${cell.value}`
                                          : `${URL_API}/portal/images/${cell.value}`;
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
                          }

                          return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                      })}
                {edit && (
                    <td>
                        <ButtonIcon
                            iconName={'glyphicon-remove'}
                            buttonClassName={'btn-danger btn-sm'}
                            disabled={staticWidgets.includes(row.id)}
                            onClickAction={() => removeWidget(row.id)}
                        />
                    </td>
                )}
            </tr>
            {newWidgetImage && (
                <AddPortalSettingsDashboardWidgetImageModal
                    toggleNewWidgetImage={toggleNewWidgetImage}
                    addWidgetImage={addWidgetImage}
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