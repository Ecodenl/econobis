import React, {useEffect, useState} from 'react';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ButtonIcon from "../../../components/button/ButtonIcon";
import {browserHistory} from "react-router";
import PanelHeader from "../../../components/panel/PanelHeader";
import TableDragSelect from "./TableDragSelect"
import "./style.css";
import moment from "moment/moment";
import InputSelect from "../../../components/form/InputSelect";
import ContactAvailabilityAPI from "../../../api/contact/ContactAvailabilityAPI";

export default function ContactAvailabilityDetailsApp(props) {
    const intervalMinutes = 30;
    const [days, setDays] = useState([]);
    const [timeslots, setTimeslots] = useState([]);
    const [currentWeek, setCurrentWeek] = useState(null);
    const [availabilities, setAvailabilities] = useState([]);

    useEffect(() => {
        setCurrentWeek(moment().startOf('isoWeek').format('YYYY-MM-DD'));
    }, []);

    useEffect(() => {
        if(!currentWeek){
            return;
        }
        ContactAvailabilityAPI.fetchContactAvailabilitiesByWeek(props.params.id, currentWeek).then(data => {
            setAvailabilities(data);
        });
        initDays();
        initTimeslots();
    }, [currentWeek]);

    const initTimeslots = () => {
        let temp = [];
        for (let i = 6 * 60; i < 22 * 60; i = i + intervalMinutes) {
            temp.push(i);
        }
        setTimeslots(temp);
    }

    const initDays = () => {
        let temp = [];
        let day = moment(currentWeek);
        let endOfWeek = day.clone().endOf('isoWeek');
        while (day <= endOfWeek) {
            temp.push(day.clone());
            day.add(1, 'd');
        }
        setDays(temp);
    }

    const getTableDragSelectCells = () => {
        let cells = [];
        timeslots.map(timeslot => {
            let subCells = [];
            days.map(day => {
                subCells.push(getTimeslotValue(day, timeslot));
            });
            cells.push(subCells);
        });
        return cells;
    }

    const getTimeslotValue = (day, timeslot) => {
        if(!availabilities) {
            return false;
        }

        return availabilities.some(availability => {
            return moment(availability.from) <= moment(day).add(timeslot, 'minutes') && moment(availability.to) >= moment(day).add(timeslot + intervalMinutes, 'minutes');
        });
    }

    const saveTableDragSelectCells = (values) => {
        let availabilities = [];

        for (let i = 0; i < days.length; i++) {
            let firstActiveIndex = false;
            for (let j = 0; j < timeslots.length; j++) {
                if(values[j][i]) {
                    if(firstActiveIndex === false) {
                        firstActiveIndex = j;
                    }
                }else{
                    if(firstActiveIndex !== false) {
                        availabilities.push({
                            day: i,
                            from: formatMinutesToTime(timeslots[firstActiveIndex]),
                            to: formatMinutesToTime(timeslots[j - 1] + intervalMinutes),
                        });
                        firstActiveIndex = false;
                    }
                }

                if(j === timeslots.length - 1 && firstActiveIndex) {
                    availabilities.push({
                        day: i,
                        from: formatMinutesToTime(timeslots[firstActiveIndex]),
                        to: formatMinutesToTime(timeslots[j] + intervalMinutes),
                    });
                }
            }
        }

        ContactAvailabilityAPI.updateContactAvailabilities(props.params.id, {
            startOfWeek: currentWeek,
            availabilities: availabilities,
        }).catch(() => {
            alert('Er is iets misgegaan met opslaan, probeer het opnieuw.');
        });
    }

    const formatMinutesToTime = (minutes) => {
        let hours = Math.floor(minutes / 60);
        let minutesLeft = minutes % 60;

        // Add leading zeros
        hours = hours < 10 ? '0' + hours : hours;
        minutesLeft = minutesLeft < 10 ? '0' + minutesLeft : minutesLeft;

        return hours + ':' + minutesLeft;
    }

    const getWeekOptions = () => {
        let current = moment().startOf('isoWeek');
        let options = [];
        for (let i = 0; i < 52; i++) {
            options.push({
                value: current.format('YYYY-MM-DD'),
                text: 'Week ' + current.format('W') + ' (' + current.format('DD-MM') + ')',
            });
            current.add(1, 'w');
        }
        return options;
    }

    return (
        <div className="row">
            <div className="col-md-9">
                <div className="col-md-12 margin-10-top">
                    <Panel>
                        <PanelBody className={'panel-small'}>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="btn-group" role="group">
                                        <ButtonIcon iconName={'glyphicon-arrow-left'}
                                                    onClickAction={browserHistory.goBack}/>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <h4 className="text-center">Beschikbaarheid: TODO</h4>
                                </div>
                                <div className="col-md-4"/>
                            </div>
                        </PanelBody>
                    </Panel>
                </div>

                <div className="col-md-12 margin-10-top">
                    <Panel>
                        <PanelHeader>
                            <div className="row">
                                <div className="col-sm-6">
                                    <span className="h5 text-bold">Beschikbaarheid</span>
                                </div>
                                <InputSelect
                                    label={''}
                                    size={'col-sm-6'}
                                    name={'currentWeek'}
                                    options={getWeekOptions()}
                                    optionValue={'value'}
                                    optionName={'text'}
                                    value={currentWeek}
                                    onChangeAction={(event) => setCurrentWeek(event.target.value)}
                                />
                            </div>
                        </PanelHeader>
                        <PanelBody>
                            <div className="row">
                                <div className="col-md-12">
                                    <table className="table-drag-select">
                                        <thead>
                                        <tr>
                                            {
                                                days.map((day, j) => {
                                                    return (
                                                        <th key={j}
                                                            style={{textAlign: 'center'}}>{day.format('dd DD-MM')}</th>
                                                    );
                                                })
                                            }
                                        </tr>
                                        </thead>
                                        <TableDragSelect
                                            value={getTableDragSelectCells()}
                                            onChange={cells => saveTableDragSelectCells(cells)}
                                        >
                                            {
                                                timeslots.map((timeslot, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            {
                                                                days.map((day, j) => {
                                                                    return (
                                                                        <td key={j}>{formatMinutesToTime(timeslot)}</td>
                                                                    );
                                                                })
                                                            }
                                                        </tr>
                                                    );
                                                })
                                            }
                                        </TableDragSelect>
                                    </table>
                                </div>
                            </div>
                        </PanelBody>
                    </Panel>
                </div>
            </div>
            <div className="col-md-3"/>
        </div>
    )
        ;
}