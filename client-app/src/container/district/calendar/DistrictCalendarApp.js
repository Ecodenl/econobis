import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './DistrictCalendar.css';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ButtonIcon from '../../../components/button/ButtonIcon';
import { useNavigate, useParams } from 'react-router-dom';
import DistrictAPI from '../../../api/district/DistrictAPI';
import InputToggle from '../../../components/form/InputToggle';
import InputSelect from '../../../components/form/InputSelect';

moment.locale('nl');

const DistrictCalendarApp = props => {
    const navigate = useNavigate();
    const params = useParams();

    const [view, setView] = useState('week');
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [showAvailabilities, setShowAvailabilities] = useState(false);
    const [filterCoachId, setFilterCoachId] = useState(null);
    const [district, setDistrict] = useState({});

    useEffect(() => {
        loadCalendarEvents();
    }, [date, view]);

    const loadCalendarEvents = () => {
        let startDate = moment(date)
            .startOf(view)
            .format('YYYY-MM-DD');
        let endDate = moment(date)
            .endOf(view)
            .format('YYYY-MM-DD');

        if (view === 'month') {
            startDate = moment(date)
                .startOf(view)
                .subtract(1, 'w')
                .format('YYYY-MM-DD');
            endDate = moment(date)
                .endOf(view)
                .add(1, 'w')
                .format('YYYY-MM-DD');
        }

        DistrictAPI.fetchDistrictCalendarItems(params.id, startDate, endDate).then(data => {
            let quotationRequests = data.quotationRequests.map(item => {
                return {
                    type: 'quotationRequest',
                    id: item.id,
                    coach: item.coach,
                    title: item.coach.fullName,
                    start: new Date(item.datePlanned),
                    end: moment(item.datePlanned)
                        .add(item.durationMinutes, 'm')
                        .toDate(),
                };
            });

            let availabilities = data.availabilities.map(item => {
                return {
                    type: 'availability',
                    coach: item.coach,
                    title: item.coach.fullName,
                    start: new Date(item.from),
                    end: new Date(item.to),
                };
            });

            setEvents(quotationRequests.concat(availabilities));
            setDistrict(data.district);
        });
    };

    const selectEventHandler = event => {
        switch (event.type) {
            case 'quotationRequest':
                navigate(`/offerteverzoek/${event.id}`);
        }
    };

    const eventPropGetter = event => {
        return { className: getEventClass(event) };
    };

    const getEventClass = event => {
        switch (event.type) {
            case 'quotationRequest':
                return 'quotation-request';
            case 'availability':
                return 'availability';
        }
    };

    const getFilteredEvents = () => {
        return events.filter(event => {
            if (!showAvailabilities && event.type === 'availability') {
                return false;
            }

            if (filterCoachId && event.coach.id !== parseInt(filterCoachId)) {
                return false;
            }

            return true;
        });
    };

    const getCoaches = () => {
        // Filter unique coaches (id and fullName) from events ordered by fullName
        return events
            .reduce((carry, event) => {
                if (!carry.find(coach => coach.id === event.coach.id)) {
                    carry.push(event.coach);
                }

                return carry;
            }, [])
            .sort((a, b) => {
                return a.fullName.localeCompare(b.fullName);
            })
            .map(coach => {
                return {
                    id: coach.id,
                    name: coach.fullName,
                };
            });
    };

    return (
        <Panel>
            <PanelBody>
                <div className="row margin-10-bottom">
                    <div className="col-md-4">
                        <div className="btn-group" role="group">
                            <ButtonIcon iconName={'arrowLeft'} onClickAction={() => navigate(-1)} />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h3 className="text-center table-title">Afspraakkalender {district.name}</h3>
                    </div>
                    <div className="col-md-4">
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex' }}>
                                <InputSelect
                                    size={'col-12 col-sm-12'}
                                    label={'Coach'}
                                    name={'coach_id'}
                                    options={getCoaches()}
                                    value={filterCoachId}
                                    onChangeAction={e => setFilterCoachId(e.target.value)}
                                    placeholder="Alle"
                                />
                            </div>
                            <div>
                                <InputToggle
                                    divSize={'col-12 col-sm-12'}
                                    label="Toon beschikbaarheid"
                                    name={'show_availabilities'}
                                    value={showAvailabilities}
                                    onChangeAction={e => setShowAvailabilities(e.target.checked)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Calendar
                    events={getFilteredEvents()}
                    style={{ height: 'calc(100vh - 200px)' }}
                    step={15}
                    timeslots={4}
                    views={['month', 'week', 'day']}
                    view={view}
                    onView={setView}
                    date={date}
                    onNavigate={setDate}
                    onSelectEvent={selectEventHandler}
                    localizer={momentLocalizer(moment)}
                    eventPropGetter={eventPropGetter}
                    messages={{
                        allDay: 'Gehele dag',
                        previous: '<',
                        next: '>',
                        today: 'Vandaag',
                        month: 'Maand',
                        week: 'Week',
                        day: 'Dag',
                        agenda: 'Agenda',
                        date: 'Datum',
                        time: 'Tijd',
                        showMore: total => `+${total} meer`,
                    }}
                    min={new Date(`${moment().format('YYYY-MM-DD')} 06:00:00`)}
                />
            </PanelBody>
        </Panel>
    );
};

export default DistrictCalendarApp;
