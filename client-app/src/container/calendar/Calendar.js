import React, {Component} from 'react';
import {connect} from 'react-redux';
import {hashHistory} from "react-router";
import BigCalendar from 'react-big-calendar';
BigCalendar.momentLocalizer(moment);
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
moment.locale('nl');

import TasksAPI from "../../api/task/TasksAPI";
import {setSelectedView, setSelectedDate} from "../../actions/calendar/CalendarActions";

class Calendar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            events: [],
            selectedDate: props.calendar.date ? props.calendar.date : moment().format('YYYY-MM-DD'),
            selectedView: props.calendar.view,
        };

        this.onNavigate = this.onNavigate.bind(this);
        this.onViewChange = this.onViewChange.bind(this);
        this.loadCalendarEvents = this.loadCalendarEvents.bind(this);
        this.openItem = this.openItem.bind(this);
    }

    componentDidMount() {
        this.loadCalendarEvents(this.state.selectedDate, this.state.selectedView);
    };

    // Reload data after navigating through dates
    onNavigate(date, view) {
        this.loadCalendarEvents(date, view);
    };

    // Reload data when switching to another view. Example 'month, week or day'
    onViewChange(view){
        this.loadCalendarEvents(this.state.selectedDate, view);
    };

    // Load data from Api
    loadCalendarEvents(date, view) {
        let startDate = moment(date).startOf(view).format("YYYY-MM-DD");
        let endDate = moment(date).endOf(view).format("YYYY-MM-DD");

        //
        if(view == 'month') {
            startDate = moment(date).startOf(view).subtract(1, 'w').format("YYYY-MM-DD");
            endDate = moment(date).endOf(view).add(1, 'w').format("YYYY-MM-DD");
        }

        TasksAPI.fetchTasksCalendarEvents(startDate, endDate).then(payload => {
            let calendar = [];

            payload.data.data.map(item => {
                //Php datetime to moment date to js date
                let momentStartDate = moment(item.start.date);
                let momentEndDate = moment(item.end.date);

                calendar.push({
                    id: item.id,
                    title: item.noteSummary,
                    start: new Date(momentStartDate.toDate()),
                    end: new Date(momentEndDate.toDate()),
                })
            });

            this.setState({
                events: calendar,
                selectedDate: date,
                selectedView: view
            });

            this.props.setSelectedDate(date);
            this.props.setSelectedView(view);
        });
    };

    // Open item in new view
    openItem({id}) {
        hashHistory.push(`/taak/${id}`);
    };

    render() {
        const localizedLabel = {
            allDay: 'Gehele dag',
            previous: '<',
            next: '>',
            today: "Vandaag",
            month: 'Maand',
            week: 'Week',
            day: 'Dag',
            agenda: 'Agenda',
            date: 'Datum',
            time: 'Tijd',
            showMore: total => `+${total} meer`
        };

        return (
            <BigCalendar
                date={new Date(this.state.selectedDate)}
                defaultView={this.state.selectedView}
                endAccessor='end'
                events={this.state.events}
                max={new Date('2018-01-01T20:00:00.000Z')}
                messages={localizedLabel}
                min={new Date('2018-01-01T07:00:00.000Z')}
                onNavigate={this.onNavigate}
                onSelectEvent={this.openItem}
                onView={this.onViewChange}
                popup
                startAccessor='start'
                step={15}
                timeslots={4}
                views={['month', 'week', 'day']}
            />
        )
    };
};

const mapStateToProps = (state) => {
    return {
        calendar: state.calendar,
    };
};

const mapDispatchToProps = dispatch => ({
    setSelectedDate: (date) => {
        dispatch(setSelectedDate(date));
    },
    setSelectedView: (view) => {
        dispatch(setSelectedView(view));
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(Calendar);