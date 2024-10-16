import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import { getAllBokkings } from "../api/auth";

const BookingDetails = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages
  const [pageSize, setPageSize] = useState(5);

  const columns = [
    {
      Header: "Customer Name",
      accessor: "customerName",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Address",
      accessor: "address",
    },
    {
      Header: "Phone",
      accessor: "phone",
    },
    {
      Header: "Booking Date",
      accessor: "bookingDate",
      Cell: ({ value }) => new Date(value).toLocaleString(),
    },
    {
      Header: "Event Type",
      accessor: "eventType",
    },
    {
      Header: "Amount Paid",
      accessor: "amountPaid",
      Cell: ({ value }) => `$${value.toLocaleString()}`,
    },
  ];

  const getAll = async () => {
    const res = await getAllBokkings();
    console.log(res);
    setData(res?.data);
  };

  useEffect(() => {
    getAll();
  }, []);
  const handleEdit = (row) => {
    const newName = prompt("Enter new name:", row.name);
    const newAge = prompt("Enter new age:", row.age);
    setData(
      data.map((item) =>
        item.id === row.id
          ? { ...item, name: newName, age: Number(newAge) }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  return (
    <div>
      <h1 className="text-3xl text-center border-l">Booking Details </h1>
      <Table
        columns={columns}
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
        onPageSizeChange={(size) => setPageSize(size)}
          emptyView="No bookings available"
      />
    </div>
  );
};

export default BookingDetails;
