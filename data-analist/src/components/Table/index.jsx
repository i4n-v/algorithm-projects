const Table = ({
  columns = [],
  rows = [],
  disabledIdentifier = [],
  className = "",
  headerClassName = "",
  bodyClassName = "",
}) => {
  return (
    <table className={`rounded-md bg-transparent ${className}`}>
      <thead
        className={`rounded-tl-md rounded-tr-md bg-violet-400 text-xs text-neutral-100 font-title ${headerClassName}`}
      >
        <tr>
          {columns.map((column, index) => (
            <th
              key={`${column}-${index}`}
              className="first:rounded-tl-md last:rounded-tr-md h-8"
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody
        className={`text-center text-xs text-neutral-900 ${bodyClassName}`}
      >
        {rows.map((row, rowIndex) => (
          <tr
            key={`row-${Object.keys(row)[0]}-${rowIndex}`}
            className="even:bg-neutral-900/10 h-6"
          >
            {Object.entries(row).map(([key, value], tdIndex) => {
              const disabled = disabledIdentifier.some(
                (identifier) => identifier === key
              );

              if (disabled) {
                return null;
              } else {
                return (
                  <td
                    key={`td-${key}-${tdIndex}`}
                    className={
                      rowIndex === rows.length - 1
                        ? "first:rounded-bl-md last:rounded-br-md h-8"
                        : ""
                    }
                  >
                    {value}
                  </td>
                );
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
