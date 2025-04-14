import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { arrows_vertical } from 'react-icons-kit/ikons/arrows_vertical';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';

import { Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PortalSettingsDashboardWidgetDeleteItem from './details/PortalSettingsDashboardWidgetDeleteItem';

const DND_ITEM_TYPE = 'row';

const PortalDashboardWidgetOrderRow = ({
    row,
    index,
    moveRow,
    showEditSort,
    deletePortalSettingsDashboardWidget,
    imageHash,
}) => {
    const navigate = useNavigate();

    const dropRef = useRef(null);
    const dragRef = useRef(null);
    const [showDelete, setShowDelete] = useState(false);
    const [showActionButtons, setShowActionButtons] = useState(false);
    const [highlightRow, setHighLightRow] = useState('');

    const staticWidgets = ['over-ons', 'project-schrijf-je-in', 'huidige-deelnames'];

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

    return (
        <>
            <tr
                ref={dropRef}
                style={{ opacity }}
                className={highlightRow}
                onDoubleClick={() => navigate(`/portal-instellingen-dashboard-widget/${row.id}`)}
                onMouseEnter={() => {
                    setShowActionButtons(true);
                    setHighLightRow('highlight-row');
                }}
                onMouseLeave={() => {
                    setShowActionButtons(false);
                    setHighLightRow('');
                }}
            >
                {row.cells.map(cell => {
                    switch (cell.column.id) {
                        case 'order':
                            if (showEditSort === true) {
                                return (
                                    <td ref={dragRef}>
                                        <Icon icon={arrows_vertical} />
                                    </td>
                                );
                            } else {
                                return null;
                            }
                        case 'title':
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                        case 'widgetImageFileName': {
                            const imageUrl = cell.value && `${URL_API}/portal/images/${cell.value}?${imageHash}`;
                            return (
                                <td key={cell.column.id}>
                                    <Image
                                        src={imageUrl}
                                        thumbnail={true}
                                        style={{
                                            border: '1px solid #999',
                                            display: 'inline-block',
                                            padding: '1px',
                                            borderRadius: '1px',
                                            height: 'auto',
                                            width: '100px',
                                            boxShadow: '0 0 0 1px #fff inset',
                                        }}
                                    />
                                </td>
                            );
                        }
                        case 'active':
                            return <td {...cell.getCellProps()}>{cell.value ? 'Ja' : 'Nee'}</td>;
                        case 'codeRef':
                            if (!showEditSort) {
                                return (
                                    <td>
                                        {showActionButtons && (
                                            <a
                                                role="button"
                                                onClick={() =>
                                                    navigate(`/portal-instellingen-dashboard-widget/${row.id}`)
                                                }
                                            >
                                                <Icon className="mybtn-success" size={14} icon={pencil} />
                                            </a>
                                        )}
                                        &nbsp;
                                        {!staticWidgets.includes(cell.value) && showActionButtons ? (
                                            <a role="button" onClick={() => setShowDelete(true)}>
                                                <Icon className="mybtn-danger" size={14} icon={trash} />
                                            </a>
                                        ) : null}
                                    </td>
                                );
                            } else {
                                return null;
                            }
                    }
                })}
            </tr>

            {showDelete && (
                <PortalSettingsDashboardWidgetDeleteItem
                    closeDeleteItemModal={() => setShowDelete(false)}
                    description={row.cells.find(cell => cell.column.id === 'title').value}
                    id={row.id}
                    deletePortalSettingsDashboardWidget={deletePortalSettingsDashboardWidget}
                />
            )}
        </>
    );
};

export default PortalDashboardWidgetOrderRow;
