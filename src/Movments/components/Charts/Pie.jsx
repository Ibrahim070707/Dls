import React from 'react';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationLegend, PieSeries, AccumulationDataLabel, Inject, AccumulationTooltip } from '@syncfusion/ej2-react-charts';


function Pie({ Data, Width }) {
  const ecomPieChartData = [
    { x: "Convert", y: Data.Convert, text: Data.Convert },
    { x: "Connect", y: Data.Connect, text: Data.Connect },
    { x: "Convience", y: Data.Convience, text: Data.Convience },
    { x: "Lost", y: Data.Lost, text: Data.Lost },
    { x: "Appointment", y: Data.Appointment, text: Data.Appointment },
  ];
  return (
    <>
      <AccumulationChartComponent
        id="pie-chart"
        legendSettings={{ visible: true }}
        height="200px" // You can set the height here or use the "width" prop to control it
        width={`${Width}px`}  // Use the "width" prop to control the width of the chart
        tooltip={{ enable: true }}

      >
        <Inject services={[AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip]} />
        <AccumulationSeriesCollectionDirective>
          <AccumulationSeriesDirective
            name="Data"
            dataSource={ecomPieChartData}
            xName="x"
            yName="y"
            innerRadius="40%"
            startAngle={0}
            endAngle={360}
            radius="70%"
            explode
            explodeOffset="10%"
            explodeIndex={2}
            dataLabel={{
              visible: true,
              name: 'text',
              position: 'Inside',
              font: {
                fontWeight: '600',
                color: '#fff',
              },
            }}
          />
        </AccumulationSeriesCollectionDirective>
      </AccumulationChartComponent>
    </>
  );
}

export default Pie
