import React from 'react';
import {dashboard} from '../../services/dashboard.services'
import { Bar } from 'react-chartjs-2';

export function DashBoard({groups ,activities, board}){
    
    const data = {
      
        labels:dashboard.getGroupTitle(groups),
        datasets: [
          {
            label:'Done Tasks' ,
            data: dashboard.getDoneTasks(groups),
            backgroundColor: '#8DA47E',
          },
          {
            label:'UnDone Tasks',
            data: dashboard.getUndoneTasks(groups),
            backgroundColor: '#ff7a7b',
          },
        
        ],
      };
      
      const options = {
        scales: {
            yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };
      
      
      return(
        <div className="container">
          <div className='header'>
            <h1 className='title-dashboard flex align-center justify-center'>Tasks by group</h1>
            <div className='links'>
            </div>
          </div>
          <Bar className="labels" data={data} options={options} />
        </div>
      );
}
