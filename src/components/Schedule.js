import React, {useEffect, useState} from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { DateLocalizer } from "react-big-calendar";
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer =momentLocalizer (moment);

export default function Schedule() {
    const [trainings, setTraining] =useState([]);

    useEffect(()=> {
        const fetchData =() => {
            fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response=>response.json())
            .then(data=>setTraining(data))
            .catch(err=>console.log(err));
        };
        fetchData();
     }, [])

    const events = trainings.map((training) =>{
        return{
            title: training.activity,
            start: new Date(training.date),
            end: moment(training.date).add(parseInt(training.duration),'m').toDate()
        }
    })

return (
    <>
    <div>
        <h1>Calendar</h1>
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 750 }}
        />
        </div>
    </>
    )
}