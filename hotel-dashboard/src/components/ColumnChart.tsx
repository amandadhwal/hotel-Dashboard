import React from "react";
import ReactApexChart from "react-apexcharts";

interface ColumnChartProps {
  data: { country: string; visitors: number }[];
}

const ColumnChart: React.FC<ColumnChartProps> = ({ data }) => {
  const series = [
    {
      name: "Visitors",
      data: data.map((d) => d.visitors),
    },
  ];

  const options = {
    chart: {
      type: "bar" as "bar",  // Corrected
    },
    xaxis: {
      categories: data.map((d) => d.country),
    },
  };

  return <ReactApexChart options={options} series={series} type="bar" height={350} />;
};

export default ColumnChart;
