import React from 'react'
import Chart from "react-apexcharts";
function SparkLine({ Prev, Current }) {
  // const data = {
  //   lastMonth: [PvtPrev.Total, GcvPrev.Total, HealthPrev.Total],
  //   currentMonth: [PvtCurrent.Total, GcvCurrent.Total, HealthCurrent.Total]
  // };
  const data = {
    currentMonth: [Prev.Premium],
    lastMonth: [Current.Premium]
  };

  const options = {
    chart: {
      type: "bar",
      foreColor: "#FFFFFF"
    },
    xaxis: {
      categories: ["Collected Premuim Count"]
    },
    series: [
      {
        name: "Current Month Premuim",
        data: data.currentMonth,
      },
      {
        name: "Last Month Premuim",
        data: data.lastMonth,
      },
    ],
  };
  return (
    <Chart options={options} series={options.series} type="bar" height={200} />
  )
}

export default SparkLine
