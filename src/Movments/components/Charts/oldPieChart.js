import React from 'react'
import Chart from 'react-apexcharts';

function Pie({ Data, Width }) {
  const seriesData = Data.series.slice(1);
  const labelsData = Data.labels.slice(1);
  const mergedLabels = labelsData.map((label, index) => label + ' : ' + seriesData[index]);
  const PieChartDataa = {
    series: seriesData,
    options: {
      chart: {
        type: 'donut',
      },
      labels: mergedLabels,
      tooltip: {
        enabled: true,
        followCursor: true,
        offsetY: 50,
      },
      plotOptions: {
        donut: {
          dataLabels: {
            offset: 0,
            minAngleToShowLabel: 10,
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val.toFixed(2);
        },
      },
    },
  };

  return (
    <div>
      <Chart options={PieChartDataa.options} series={PieChartDataa.series} type="donut" width={Width} />
      <div className='absolute top-[187px] right-[19.6%]'>
        <span className='f01 flex flex-col items-center' ><span >Total Data</span><span className='font-semibold'>{Data.series[0]}</span></span>
      </div>
    </div>
  )
}

export default Pie