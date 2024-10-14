import React from "react";
import ReactApexChart from "react-apexcharts";

interface TimeSeriesChartProps {
  data: { date: string; visitors: number }[];
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data }) => {
  // Map the data into an array of arrays with [timestamp, value]
  const series = [
    {
      name: "Visitors",
      data: data.map((d) => {
        const timestamp = new Date(d.date).getTime();  // Convert date string to a timestamp
        return [timestamp, d.visitors];  // Array of [timestamp, value]
      }),
    },
  ];

  const options = {
    chart: {
      type: "line" as "line",
      zoom: { enabled: true },
    },
    xaxis: {
      type: "datetime" as "datetime",
    },
  };

  return <ReactApexChart options={options} series={series} type="line" height={350} />;
};

export default TimeSeriesChart;
