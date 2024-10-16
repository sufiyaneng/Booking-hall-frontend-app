import React from "react";
import { useTable, usePagination } from "react-table";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const Table = ({ columns, data, onEdit, onDelete, currentPage, totalPages, onPageChange, onPageSizeChange,emptyView }) => {
  const isMobile = useMediaQuery("(max-width:767px)");

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: currentPage - 1, pageSize:'5' }, // Set initial page and size
      manualPagination: true, // Manual pagination
      pageCount: totalPages,  // Total page count
    },
    usePagination
  );

  return (
    <div className="p-6">
      {data?.length ? (
        <>
          <table
            {...getTableProps()}
            className="min-w-full divide-y divide-gray-200 border border-gray-300"
          >
            <thead className="bg-gray-50">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <div>{column.render("Header")}</div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody
              {...getTableBodyProps()}
              className="bg-white divide-y divide-gray-200"
            >
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => onEdit(row.original)}
                        className="text-indigo-600 hover:text-indigo-900 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(row.original.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center space-x-2">
              <span>Show</span>
              <select
                value={pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
                className="border border-gray-300 rounded-md px-2 py-1"
              >
                {[5, 10, 20, 30, 50].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <span>entries</span>
            </div>

            <div className="flex items-center space-x-2">
              {!isMobile && (
                <span className="text-sm text-gray-700">
                  {pageIndex * pageSize + 1} to{" "}
                  {(pageIndex + 1) * pageSize < data.length
                    ? (pageIndex + 1) * pageSize
                    : data.length}{" "}
                  of {data.length}
                </span>
              )}

              <button
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                className={`p-1 ${currentPage === 1 ? "opacity-50" : ""}`}
              >
                <FirstPageIcon />
              </button>
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-1 ${currentPage === 1 ? "opacity-50" : ""}`}
              >
                <NavigateBeforeIcon />
              </button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-1 ${
                  currentPage === totalPages ? "opacity-50" : ""
                }`}
              >
                <NavigateNextIcon />
              </button>
              <button
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                className={`p-1 ${
                  currentPage === totalPages ? "opacity-50" : ""
                }`}
              >
                <LastPageIcon />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500 py-4">{emptyView}</div>
      )}
    </div>
  );
};

export default Table;
