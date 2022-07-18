import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PortalDashboardWidgetOrderRow from './PortalDashboardWidgetOrderRow';
import update from 'immutability-helper';
import { FaInfoCircle } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';

const PortalDashboardWidgetOrderTable = ({
    columns,
    data,
    showEditSort,
    handleInputChange,
    deletePortalSettingsDashboardWidget,
    imageHash,
}) => {
    const [records, setRecords] = useState(data);

    useEffect(
        function() {
            setRecords(data);
        },
        [data]
    );

    useEffect(
        function() {
            for (let [index, value] of records.entries()) {
                value.order = index + 1;
            }
        },
        [records]
    );

    const getRowId = React.useCallback(row => {
        return row.id;
    }, []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        data: records,
        columns,
        getRowId,
    });

    const moveRow = (dragIndex, hoverIndex) => {
        const dragRecord = records[dragIndex];
        setRecords(
            update(records, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragRecord],
                ],
            })
        );
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <table {...getTableProps()} className={'table table-condensed table-hover table-striped col-xs-12'}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} className={'thead-title'}>
                            {headerGroup.headers.map(column => (
                                <>
                                    {column.fieldName === 'order' && showEditSort === true ? (
                                        <th
                                            {...column.getHeaderProps({
                                                style: { width: column.width },
                                            })}
                                        >
                                            <span>
                                                <FaInfoCircle
                                                    color={'white'}
                                                    size={'15px'}
                                                    data-tip={`Je kunt de volgorde van de widgets aanpassen door deze te slepen.`}
                                                    data-for={`tooltip-order`}
                                                />
                                                <ReactTooltip
                                                    id={`tooltip-order`}
                                                    effect="float"
                                                    place="right"
                                                    multiline={true}
                                                    aria-haspopup="true"
                                                />
                                            </span>
                                        </th>
                                    ) : column.fieldName === 'title' ? (
                                        <th
                                            {...column.getHeaderProps({
                                                style: { width: column.width },
                                            })}
                                        >
                                            {column.render('Header')}
                                        </th>
                                    ) : column.fieldName === 'widgetImageFileName' ? (
                                        <th
                                            {...column.getHeaderProps({
                                                style: { width: column.width },
                                            })}
                                        >
                                            {column.render('Header')}
                                        </th>
                                    ) : column.fieldName === 'active' ? (
                                        <th
                                            {...column.getHeaderProps({
                                                style: { width: column.width },
                                            })}
                                        >
                                            {column.render('Header')}
                                        </th>
                                    ) : column.fieldName === 'codeRef' && showEditSort !== true ? (
                                        <th
                                            {...column.getHeaderProps({
                                                style: { width: column.width },
                                            })}
                                        />
                                    ) : null}
                                </>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(
                        (row, index) =>
                            prepareRow(row) || (
                                <PortalDashboardWidgetOrderRow
                                    index={index}
                                    row={row}
                                    moveRow={moveRow}
                                    showEditSort={showEditSort}
                                    handleInputChange={handleInputChange}
                                    deletePortalSettingsDashboardWidget={deletePortalSettingsDashboardWidget}
                                    {...row.getRowProps()}
                                    imageHash={imageHash}
                                />
                            )
                    )}
                </tbody>
            </table>
        </DndProvider>
    );
};

export default PortalDashboardWidgetOrderTable;
