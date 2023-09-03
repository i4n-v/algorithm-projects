import CustomArray from "../../entities/CustomArray";

const Table = ({
  columns = new CustomArray(),
  rows = new CustomArray(),
  disabledIdentifier = new CustomArray(),
  className = "",
  headerClassName = "",
  bodyClassName = "",
}) => {
  return (
    <table className={`rounded-md bg-transparent w-full ${className} `}>
      <thead
        className={`rounded-tl-md rounded-tr-md bg-violet-400 text-xs text-neutral-100 font-title ${headerClassName}`}
      >
        <tr className="flex justify-between w-auto">
          {columns.map((column, index) => (
            <th
              key={`${column}-${index}`}
              className="first:rounded-tl-md last:rounded-tr-md h-8 flex-1 text-center"
            >
              {column}
            </th>
          )).getStructure()}
        </tr>
      </thead>
      <tbody
        className={`text-center text-xs text-neutral-900 ${bodyClassName}`}
      >
        {rows.map((row, rowIndex) => (
          <tr
            key={`row-${Object.keys(row)[0]}-${rowIndex}`}
            className="even:bg-neutral-900/10 h-6 flex justify-between text-white"
          >
            {Object.entries(row).map(([key, value], tdIndex) => {
              return (
                <td
                  key={`td-${key}-${tdIndex}`}
                  className={
                    rowIndex === rows.length - 1
                      ? "first:rounded-bl-md last:rounded-br-md h-8 flex-1 "
                      : "text-center flex-1"
                  }
                >
                  {value}
                </td>
              );
            })}
          </tr>
        )).getStructure()}
      </tbody>
    </table>
  );
};

export default Table;
