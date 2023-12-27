import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

// Bar chart, aka histogram.

function Bar_Chart({ data, parts, max_value }) {
  function Fixed_Legend() {
    return (
      <>
        <div className="legend">
          {parts.map((part, index) => {
            return (
              <span key={"Part: " + index} className="legend-item">
                {part}
              </span>
            );
          })}
        </div>
      </>
    );
  }

  return (
    <BarChart
      width={730}
      barSize={200}
      height={700}
      data={[
        { max_value_in_barchart: max_value },
        ...data,
        { max_value_in_barchart: max_value },
      ]}
    >
      <CartesianGrid strokeDasharray="3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Legend content={Fixed_Legend} />
      <Bar dataKey="b1" fill="red" />
      <Bar dataKey="b2" fill="yellow" />
      <Bar dataKey="b3" fill="green" />
      <Bar dataKey="max_value_in_barchart" fill="transparent" />
    </BarChart>
  );
}

export default Bar_Chart;
