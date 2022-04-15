import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { arrows_vertical } from 'react-icons-kit/ikons/arrows_vertical';
import Icon from 'react-icons-kit';

const DND_ITEM_TYPE = 'row';

const OrderRow = ({ row, index, moveRow }) => {
    const dropRef = React.useRef(null);
    const dragRef = React.useRef(null);

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
        type: 'ROW',
        item: { type: DND_ITEM_TYPE, index },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;

    preview(drop(dropRef));
    drag(dragRef);

    return (
        <tr ref={dropRef} style={{ opacity }}>
            <td ref={dragRef}>
                <Icon icon={arrows_vertical} />
            </td>
            {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
            })}
        </tr>
    );
};

export default OrderRow;
