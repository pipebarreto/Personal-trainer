import React, {useState, useEffect} from 'react';
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar} from 'recharts';
import _ from 'lodash';

export default function Statistics() {

    const [trainings, setTrainings] = useState([]);

    useEffect(()=> {
    function fetchData(){
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response=>response.json())
        .then(data=>setTrainings(data.content))
        .catch(err=>console.log(err))
    }
    fetchData();   
    } , []); 

    const chart = trainings.map((training) => {
        return {
            name: training.activity,
            minutes: training.duration
        }
    })

    const data = _(chart)
    .groupBy('name')
    .map((activity, id)=> ({
        name: id,
        minutes: _.sumBy(activity, 'minutes')
    }))
    .value()

return (
    <div>
    <h1>Statistics</h1>

    <BarChart width={1500} height={750} data={data}>
            
        <XAxis dataKey="name" />
        <YAxis label={{ value: 'Duration (min)', angle: -90, position: 'insideLeft' }}/>
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
       
        <Bar dataKey="minutes" fill="#5A95D5" />
    </BarChart>
    </div>
  );
}