import React from 'react';
import { Pie } from 'react-chartjs-2';
import { dashboard } from '../../services/dashboard.services'

export function DashBoardPie({ groups, activities, board }) {

  const activitiesMap = dashboard.mapActivitiesByUsername(activities)
  const activitiesCountArr = Object.values(activitiesMap)
  const usernames = Object.keys(activitiesMap)

  const data = {
    labels: usernames,
    datasets: [
      {
        data: activitiesCountArr,
        backgroundColor: [
          '#FFD47A',
          '#9DF5FF',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className='header'>
        <h1 className='title-pie-dash flex align-center justify-center'>Activities Per User</h1>
        {/* <div className='links'>
      </div> */}
      </div>
      <Pie data={data} />
    </>
  );

}