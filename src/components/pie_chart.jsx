import { RadialBarChart, RadialBar, Legend, Tooltip } from "recharts";

function Pie_Chart({ title, data, color, footer }) {
  const pieChartStyle = {
    background: `conic-gradient(from 0deg, ${color} 0%, ${color} ${data}%, #98958e ${data}%, #98958e 100%)`,
  };

  return (
    <div className="pie-chart">
      <div className="pie-title">{title}</div>
      <div className="pie-chart-circle" style={pieChartStyle}>
        <h1 className="pie-center-value">{data}%</h1>
      </div>
      <div className="pie-footer">{footer}</div>
    </div>
  );
}

export default Pie_Chart;
