export default function Table({ theads, rows }) {
  return (
    <table border="1">
      <thead>
        <tr>
          {theads.map((thead, index) => {
            return <th key={"Thead: " + index}>{thead}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, row_index) => {
          return (
            <tr key={"Row: " + row_index}>
              {row.map((item, item_index) => {
                return <td key={"Item: " + item_index}>{item}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
