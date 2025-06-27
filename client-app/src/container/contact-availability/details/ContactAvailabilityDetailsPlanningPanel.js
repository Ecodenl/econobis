import React, {useEffect, useState} from 'react';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import PanelHeader from "../../../components/panel/PanelHeader";
import TableDragSelect from "./TableDragSelect"
import "./style.css";
import moment from "moment/moment";
import ContactAvailabilityAPI from "../../../api/contact/ContactAvailabilityAPI";
import ButtonIcon from "../../../components/button/ButtonIcon";
import ContactAvailabilityDetailsPlanningCopyModal from "./ContactAvailabilityDetailsPlanningCopyModal";

export default function ContactAvailabilityDetailsPlanningPanel({contactId}) {
    const intervalMinutes = 30;

    /**
     * De 7 dagen van de week in het huidige overzicht in moment objecten.
     */
    const [days, setDays] = useState([]);

    /**
     * De tijdsblokken in het huidige overzicht in integers met minuten vanaf middernacht, dus 0, 30, 60, 90, etc.
     */
    const [timeslots, setTimeslots] = useState([]);

    /**
     * De maandag-datum van de huidige geselecteerde week in de dropdown in format YYYY-MM-DD.
     */
    const [currentWeek, setCurrentWeek] = useState('');

    /**
     * De contact_availabilities database records van de huidige geselecteerde week/contact.
     * Het "to" in de database is "tot" (en dus niet "tot en met"), dus als je tijdslot 8:00 hebt geselecteerd, dan is het "from" 8:00 en "to" 8:30.
     */
    const [availabilities, setAvailabilities] = useState([]);

    useEffect(() => {
        /**
         * Bij laden de weekinstelling op de huidige instellen
         */
        setCurrentWeek(moment().startOf('isoWeek').format('YYYY-MM-DD'));

        /**
         * De timeslots zijn hetzelfde ongeacht de gekozen week, dus deze hoeven maar één keer te worden ingesteld.
         */
        initTimeslots();
    }, []);

    useEffect(() => {
        if (!currentWeek) {
            return;
        }

        ContactAvailabilityAPI.fetchContactAvailabilitiesByWeek(contactId, currentWeek).then(data => {
            setAvailabilities(data);
        });

        initDays();
    }, [currentWeek]);

    const initTimeslots = () => {
        /**
         * De tijdsblokken in het huidige overzicht in integers met minuten vanaf middernacht, dus 0, 30, 60, 90, etc.
         */
        let temp = [];
        for (let i = 6 * 60; i < 22 * 60; i = i + intervalMinutes) {
            temp.push(i);
        }
        setTimeslots(temp);
    }

    const initDays = () => {
        /**
         * De 7 dagen van de week in het huidige overzicht in moment objecten vullen.
         */
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
        /**
         * De input waarde van het TableDragSelect component is een array met arrays van de geselecteerde cellen.
         * Zie voorbeeld op https://github.com/mcjohnalds/react-table-drag-select.
         */
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

    /**
     * Bepaal of een gegeven dag/timeslot op een gegeven dag geactiveerd is.
     * Oftewel; of het dag/timeslot binnen een van de contact_availabilities database records valt.
     */
    const getTimeslotValue = (day, timeslot) => {
        return availabilities.some(availability => {
            /**
             * Kijk of er een availability is waar het timeslot volledig binnen valt.
             * availabilties kunnen niet aansluitend zijn in de database (dan zouden ze samengevoegd moeten worden), dus het is niet nodig om te kijken of het timeslot door meerdere availabilities wordt gedekt.
             */
            return moment(availability.from) <= moment(day).add(timeslot, 'minutes')
                && moment(availability.to) >= moment(day).add(timeslot + intervalMinutes, 'minutes');
        });
    }

    /**
     * De output van het TableDragSelect component is een array met arrays van de geselecteerde cellen.
     * Dit omvormen naar een array met contact_availabilities database records om te versturen naar de backend.
     */
    const saveTableDragSelectCells = (values) => {
        let availabilities = [];

        for (let i = 0; i < days.length; i++) {
            let firstActiveIndex = false;
            for (let j = 0; j < timeslots.length; j++) {
                if (values[j][i]) {
                    /**
                     * Huidige timeslot is actief.
                     * Als de vorige timeslot niet actief was, dan is dit eerste actieve timeslot van deze reeks.
                     */
                    if (firstActiveIndex === false) { // strict check, want eerste item met index 0 is ook false
                        firstActiveIndex = j;
                    }
                } else {
                    /**
                     * Huidige timeslot is niet actief.
                     * Als vorige timeslot niet actie was hoeven we niets te doen.
                     * Als vorige timeslot wel actief was, dan was het vorige timeslot het laatste actieve timeslot van die reeks, dus dan moeten we die opslaan.
                     */
                    if (firstActiveIndex !== false) {
                        availabilities.push({
                            day: i, // Van de dag slaan we de index op, want de dagen zijn altijd hetzelfde. 0 = maandag, 1 = dinsdag, etc.
                            from: formatMinutesToTime(timeslots[firstActiveIndex], false),
                            to: formatMinutesToTime(timeslots[j - 1] + intervalMinutes, false), // Het "to" in de database is "tot" (en dus niet "tot en met"), dus als je tijdslot 8:00 hebt geselecteerd, dan is het "from" 8:00 en "to" 8:30. Dus intervalMinutes erbij optellen.
                        });
                        firstActiveIndex = false;
                    }
                }

                /**
                 * Als we aan het einde van de timeslots zitten, maar de laatste timeslot was wel actief, dan moet die ook nog opgeslagen worden.
                 */
                if (j === timeslots.length - 1 && firstActiveIndex) {
                    availabilities.push({
                        day: i,
                        from: formatMinutesToTime(timeslots[firstActiveIndex], false),
                        to: formatMinutesToTime(timeslots[j] + intervalMinutes, false),
                    });
                }
            }
        }

        ContactAvailabilityAPI.updateContactAvailabilities(contactId, {
            startOfWeek: currentWeek,
            availabilities: availabilities,
        }).catch(() => {
            alert('Er is iets misgegaan met opslaan, probeer het opnieuw.');
        });
    }

    /**
     * Formatteer een aantal minuten vanaf middernacht naar een tijd in het formaat HH:mm.
     */
    const formatMinutesToTime = (minutes, withEndTime = false) => {
        let hours = Math.floor(minutes / 60);
        let minutesLeft = minutes % 60;
        let endHours = hours;
        let endMinutes = '00';

        // Voorloop en achterloop nul toevoegen als dat nodig is.
        hours = hours < 10 ? '0' + hours : hours;
        minutesLeft = minutesLeft < 10 ? '0' + minutesLeft : minutesLeft;

        if(minutesLeft == 30) {
            endHours = endHours + 1;
        } else {
            endMinutes = '30';
        }

        if(withEndTime === true) {
            return hours + ':' + minutesLeft + ' - ' + endHours + ':' + endMinutes;
        }

        return hours + ':' + minutesLeft;
    }

    /**
     * Geef de opties voor de weekselectie.
     */
    const getWeekOptions = () => {
        let current = moment().startOf('isoWeek');
        let options = [];
        for (let i = 0; i < 78; i++) {
            options.push({
                value: current.format('YYYY-MM-DD'),
                text: 'Week ' + current.format('W') + ' (' + current.format('DD-MM-YY') + ')',
            });
            current.add(1, 'w');
        }
        return options;
    }

    const getPreviousWeek = () => {
        let currentIndex = getWeekOptions().findIndex((option) => {
            return option.value === currentWeek;
        });

        if (currentIndex > 0) {
            return getWeekOptions()[currentIndex - 1].value;
        }
    }

    const getNextWeek = () => {
        let currentIndex = getWeekOptions().findIndex((option) => {
            return option.value === currentWeek;
        });

        if (currentIndex < getWeekOptions().length - 1) {
            return getWeekOptions()[currentIndex + 1].value;
        }
    }

    return (
        <Panel>
            <PanelHeader>
                <div className="row">
                    <div className={'col-sm-4'}>
                        <ButtonIcon disabled={!getPreviousWeek()} iconName={'arrowLeft'} buttonClassName="btn-default btn-sm" onClickAction={() => setCurrentWeek(getPreviousWeek())}/>
                    </div>
                    <div className={'col-sm-4'}>
                        <select
                            className="form-control input-sm"
                            value={currentWeek}
                            onChange={(event) => setCurrentWeek(event.target.value)}
                        >
                            {getWeekOptions().map(option => {
                                return (
                                    <option key={option.value} value={option.value}>
                                        {option.text}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className={'col-sm-4'} style={{textAlign: 'right'}}>
                        <ContactAvailabilityDetailsPlanningCopyModal weekOptions={getWeekOptions()} copyFromWeek={currentWeek} contactId={contactId}/>
                        {' '}
                        <ButtonIcon disabled={!getNextWeek()} iconName={'arrowRight'} buttonClassName="btn-default btn-sm" onClickAction={() => setCurrentWeek(getNextWeek())}/>
                    </div>
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
                                                style={{textAlign: 'center'}}>{day.format('dd DD-MM-YY')}</th>
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
                                                            <td key={j} >{formatMinutesToTime(timeslot, true)}</td>
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
    );
}