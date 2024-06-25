import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface LineChartProps {
  data: any;
  xAxisName: string;
  // lines is an array of objects that contain the dataKey and stroke color
  lines: { dataKey: string; stroke: string; type: string }[];
}

const LineChart = (props: LineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLineChart data={props.data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={props.xAxisName} />
        <YAxis />
        <Tooltip />
        <Legend />
        {props.lines.map((line, index) => (
          <Line key={index} dataKey={line.dataKey} stroke={line.stroke} />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
