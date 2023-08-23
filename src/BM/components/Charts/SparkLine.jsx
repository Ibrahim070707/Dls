import React from 'react'
import Chart from "react-apexcharts";
function SparkLine({ Current }) {
  // const data = {
  //   lastMonth: [PvtPrev.Total, GcvPrev.Total, HealthPrev.Total],
  //   currentMonth: [PvtCurrent.Total, GcvCurrent.Total, HealthCurrent.Total]
  // };
  const data = {
    month: [Current.Total, Current.Premium]
  };

  const options = {
    chart: {
      type: "bar",
      foreColor: "#FFFFFF"
    },
    xaxis: {
      categories: ["Policy Count", "Premuim Count"]
    },
    series: [
      {
        name: "Current Month Premuim",
        data: data.month,
      }
    ],
  };
  return (
    <Chart options={options} series={options.series} type="bar" height={220} />
  )
}

export default SparkLine
