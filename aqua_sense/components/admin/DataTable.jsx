'use client';

export default function DataTable({ columns, data, onRowClick }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-shakespeare-300/30">
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="px-6 py-4 text-left text-sm font-display font-semibold text-shakespeare-900 uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-shakespeare-200/20">
          {data.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              onClick={() => onRowClick?.(row)}
              className={`
                hover:bg-shakespeare-100/30 transition-colors duration-200
                ${onRowClick ? 'cursor-pointer' : ''}
              `}
            >
              {columns.map((col, colIdx) => (
                <td key={colIdx} className="px-6 py-4 text-sm text-shakespeare-800">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
