import React, {useEffect, useState} from 'react';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import PanelHeader from "../../../components/panel/PanelHeader";
import moment from "moment/moment";
import ContactAvailabilityAPI from "../../../api/contact/ContactAvailabilityAPI";
import ButtonIcon from "../../../components/button/ButtonIcon";
import QuotationRequestDetailsAPI from "../../../api/quotation-request/QuotationRequestDetailsAPI";
import {hashHistory} from "react-router";
import QuotationRequestPlanNewSelectCoachModal from "./QuotationRequestPlanNewSelectCoachModal";

export default function QuotationRequestPlanNewPlanningPanel({districtId, opportunityId}) {
    const intervalMinutes = 30;
    const durationMinutes = 60;

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

    const [selectedTimeslot, setSelectedTimeslot] = useState(null);

    useEffect(() => {
        /**
         * Bij laden de weekinstelling op de huidige instellen
         */
        setCurrentWeek(moment().startOf('isoWeek').format('YYYY-MM-DD'));
    }, []);

    useEffect(() => {
        if (!currentWeek) {
            return;
        }

        ContactAvailabilityAPI.fetchDistrictAvailabilitiesByWeek({
            districtId,
            startOfWeek: currentWeek,
        }).then(coachAvailabilities => {
            setAvailabilities(transformCoachAvailabilitiesToAvailabilities(coachAvailabilities));
        });

        initDays();
    }, [currentWeek]);

    const transformCoachAvailabilitiesToAvailabilities = (coachAvailabilities) => {
        return coachAvailabilities.reduce((acc, coach) => {
            coach.availabilities = coach.availabilities.map(availability => {
                return {
                    ...availability,
                    from: moment(availability.from),
                    to: moment(availability.to),
                }
            });

            let filteredAvailabilities = filterAvailabilitiesByPlannedQuotationRequests(coach);

            filteredAvailabilities.forEach(av => {
                acc.push({
                    ...av,
                    coach: {
                        id: coach.id,
                        fullName: coach.fullName,
                    }
                });
            });

            return acc;
        }, []);
    }

    const filterAvailabilitiesByPlannedQuotationRequests = (coach) => {
        let blockedTimeslots = coach.quotationRequests.map(qr => {
            return {
                from: moment(qr.datePlanned).subtract(coach.coachMinMinutesBetweenAppointments, 'minutes'),
                to: moment(qr.datePlanned).add(qr.durationMinutes, 'minutes').add(coach.coachMinMinutesBetweenAppointments, 'minutes'),
            }
        });


        let availabilities = coach.availabilities;
        for (let i = 0; i < blockedTimeslots.length; i++) {
            let timeslot = blockedTimeslots[i];

            availabilities = availabilities.reduce((acc, availability) => {
                /**
                 * Het geblokkeerde slot valt volledig binnen de beschikbaarheid;
                 * de beschikbaarheid moet dus in twee stukken worden gesplitst.
                 */
                if (availability.from.isBefore(timeslot.from) && availability.to.isAfter(timeslot.to)) {
                    acc.push({
                        ...availability,
                        from: availability.from,
                        to: timeslot.from,
                    });
                    acc.push({
                        ...availability,
                        from: timeslot.to,
                        to: availability.to,
                    });

                    return acc;
                }

                /**
                 * Het geblokkeerde slot start in de beschikbaarheid, maar eindigt buiten de beschikbaarheid.
                 * De beschikbaarheid moet dus worden ingekort.
                 */
                if (availability.from.isBefore(timeslot.from) && availability.to.isAfter(timeslot.from)) {
                    acc.push({
                        ...availability,
                        from: availability.from,
                        to: timeslot.from,
                    });

                    return acc;
                }

                /**
                 * Het geblokkeerde slot start voor de beschikbaarheid, maar eindigt in de beschikbaarheid.
                 * De beschikbaarheid moet dus worden ingekort.
                 */
                if (availability.from.isBefore(timeslot.to) && availability.to.isAfter(timeslot.to)) {
                    acc.push({
                        ...availability,
                        from: timeslot.to,
                        to: availability.to,
                    });

                    return acc;
                }

                /**
                 * Het geblokkeerde slot valt volledig buiten de beschikbaarheid;
                 * de beschikbaarheid blijft ongewijzigd.
                 */
                acc.push(availability);

                return acc;
            }, []);
        }

        return availabilities;
    }

    useEffect(() => {
        initTimeslots();
    }, [availabilities]);

    const initTimeslots = () => {
        /**
         * De tijdsblokken in het huidige overzicht in integers met minuten vanaf middernacht, dus 0, 30, 60, 90, etc.
         *
         * Get the availability with the earliest start time and the availability with the latest end time.
         */
        let earliestMinute = availabilities.reduce((acc, availability) => {
            if (!acc || availability.from.get('hour') * 60 + availability.from.get('minute') < acc) {
                return availability.from.get('hour') * 60 + availability.from.get('minute');
            }

            return acc;
        }, null);

        let latestMinute = availabilities.reduce((acc, availability) => {
            if (!acc || availability.to.get('hour') * 60 + availability.to.get('minute') > acc) {
                return availability.to.get('hour') * 60 + availability.to.get('minute');
            }

            return acc;
        }, null);

        if (!earliestMinute || !latestMinute) {
            setTimeslots([]);
        }

        earliestMinute = Math.floor(earliestMinute / intervalMinutes) * intervalMinutes;

        let temp = [];
        for (let i = earliestMinute; i <= latestMinute - durationMinutes; i = i + intervalMinutes) {
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

    /**
     * Formatteer een aantal minuten vanaf middernacht naar een tijd in het formaat HH:mm.
     */
    const formatMinutesToTime = (minutes) => {
        let hours = Math.floor(minutes / 60);
        let minutesLeft = minutes % 60;

        // Voorloop en achterloop nul toevoegen als dat nodig is.
        hours = hours < 10 ? '0' + hours : hours;
        minutesLeft = minutesLeft < 10 ? '0' + minutesLeft : minutesLeft;

        return hours + ':' + minutesLeft;
    }

    /**
     * Geef de opties voor de weekselectie.
     */
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

    const getAvailabilitiesForTimeslot = (day, timeslot) => {
        return availabilities.filter(availability => {
            /**
             * Kijk of er een availability is waar het timeslot volledig binnen valt.
             * availabilties kunnen niet aansluitend zijn in de database (dan zouden ze samengevoegd moeten worden), dus het is niet nodig om te kijken of het timeslot door meerdere availabilities wordt gedekt.
             */
            return availability.from <= moment(day).add(timeslot, 'minutes')
                && availability.to >= moment(day).add(timeslot + durationMinutes, 'minutes');
        });
    }

    const handleTimeslotClick = (day, timeslot) => {
        let availabilitiesForTimeslot = getAvailabilitiesForTimeslot(day, timeslot);

        if (availabilitiesForTimeslot.length === 1) {
            createQuotationRequest(day, timeslot, availabilitiesForTimeslot[0].coach.id);

            return;
        }

        setSelectedTimeslot({
            day,
            timeslot,
        });
    }

    const createQuotationRequest = (day, timeslot, coachId) => {
        QuotationRequestDetailsAPI.newQuotationRequest({
            organisationOrCoachId: coachId,
            opportunityId: opportunityId,
            datePlanned: day.format('YYYY-MM-DD'),
            timePlanned: formatMinutesToTime(timeslot),
            durationMinutes: durationMinutes,
            usesPlanning: true,
            statusId: 8, // "Afspraak gemaakt" todo; id ophalen?
            opportunityActionCodeRef: 'visit',
            projectManagerId: null,
            externalPartyId: null,
            dateRecorded: '',
            dateReleased: '',
            dateApprovedClient: '',
            dateApprovedProjectManager: '',
            dateApprovedExternal: '',
        }).then(payload => {
            hashHistory.push(`/offerteverzoek/${payload.data.id}`);
        });

        setSelectedTimeslot(null);
    }

    return (
        <Panel>
            <PanelHeader>
                <div className="row">
                    <div className={'col-sm-4'}>
                        <ButtonIcon disabled={!getPreviousWeek()} iconName={'glyphicon-arrow-left'}
                                    buttonClassName="btn-default btn-sm"
                                    onClickAction={() => setCurrentWeek(getPreviousWeek())}/>
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
                        <ButtonIcon disabled={!getNextWeek()} iconName={'glyphicon-arrow-right'}
                                    buttonClassName="btn-default btn-sm"
                                    onClickAction={() => setCurrentWeek(getNextWeek())}/>
                    </div>
                </div>
            </PanelHeader>
            <PanelBody>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table-drag-select" style={{width: '100%'}}>
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
                            <tbody>
                            {
                                timeslots.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} style={{ textAlign: 'center'}}>Geen beschikbare data gevonden</td>
                                        </tr>
                                    ) :
                                    timeslots.map((timeslot, i) => {
                                        return (
                                            <tr key={i}>
                                                {
                                                    days.map((day, j) => {
                                                        let isAvailable = getAvailabilitiesForTimeslot(day, timeslot).length > 0;

                                                        if (!isAvailable) {
                                                            return (
                                                                <td key={j} style={{textAlign: 'center'}}></td>
                                                            );
                                                        }

                                                        return (
                                                            <td key={j}
                                                                style={{
                                                                    textAlign: 'center',
                                                                    padding: '3px',
                                                                }}>
                                                                <button className="btn btn-sm" style={{width: '100%'}}
                                                                        onClick={() => handleTimeslotClick(day, timeslot)}>
                                                                    {formatMinutesToTime(timeslot)} - {formatMinutesToTime(timeslot + durationMinutes)}
                                                                </button>
                                                            </td>
                                                        );
                                                    })
                                                }
                                            </tr>
                                        );
                                    })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </PanelBody>
            {selectedTimeslot !== null && (
                <QuotationRequestPlanNewSelectCoachModal
                    coaches={getAvailabilitiesForTimeslot(selectedTimeslot.day, selectedTimeslot.timeslot).map(av => av.coach)}
                    onSelectCoach={coachId => createQuotationRequest(selectedTimeslot.day, selectedTimeslot.timeslot, coachId)}
                    onCancel={() => setSelectedTimeslot(null)}/>
            )}
        </Panel>
    );
}