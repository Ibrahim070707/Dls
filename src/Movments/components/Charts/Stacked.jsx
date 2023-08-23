import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Stacked = ({ data, type, lenght }) => {
  const [series] = useState([
    type === 1 ? {
      name: ["Policy"],
      data: [data?.Prev?.Nop, data?.Current?.Nop],
    } :
      {
        name: ["Premuim"],
        data: [data?.Prev?.Premuim, data?.Current?.Premuim],
      }
  ]);
  const [options] = useState({
    chart: {
      height: 350,
      type: 'bar',
      toolbar: {
        show: false, // Set to false to disable the toolbar with download options
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val;
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#304758'],
      },
    },
    xaxis: {
      categories: ['Prev Month', 'Current Month'],
      position: 'top',
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val;
        },
      },
      max: lenght
    },
  });
  return (
    <div id="chart" className='w-full'>
      <ReactApexChart options={options} series={series} type="bar" height={220} />
    </div>
  );
};

export default Stacked;
