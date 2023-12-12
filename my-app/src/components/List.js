import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "boxicons";
import { default as api } from "../store/apiSlice";
import { useDispatch } from "react-redux";
import { gettotalcount } from "../store/reducer";

export default function List() {
  const pageData = {
    pageNumber: 0,
    pageSize: 3,
  };
  const { data, isFetching, isSuccess, isError } =
    api.useGetLabelsQuery(pageData);

  console.log("ogdata", data);
  const dispatch = useDispatch(); // Assuming you are using react-redux

  // Assuming you are inside a component or an action creator
  dispatch(gettotalcount(data?.totalTransactions));

  const [deleteTransaction] = api.useDeleteTransactionMutation();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handlerClick = (id) => {
    if (!id) return 0;
    deleteTransaction(id);
  };

  let filteredTransactions = data?.transactions;
  console.log(filteredTransactions, "filter");

  if (startDate && endDate) {
    filteredTransactions = data.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
  }

  let Transactions;

  if (isFetching) {
    Transactions = <div>Fetching</div>;
  } else if (isSuccess) {
    Transactions =
      filteredTransactions.length > 0 ? (
        filteredTransactions.map((v, i) => (
          <Transaction
            key={i}
            category={v}
            handler={handlerClick}
          ></Transaction>
        ))
      ) : (
        <div className="text-red-500 font-bold">
          No transactions found for the selected date range.
        </div>
      );
  } else if (isError) {
    Transactions = <div>Errorlist</div>;
  }

  return (
    <div className="flex flex-col pt-4 pb-1 gap-2">
      <h1 className="pt-3 pb-3 font-bold text-xl">
        My Expenditures{" "}
        <box-icon type="solid" color="grey" name="hand-down"></box-icon>{" "}
      </h1>

      {/* Date Range Picker */}
      <div className="pl-36 flex gap-4 mb-4">
        <DatePicker
          className="border rounded px-2 py-1"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Select start date"
        />
        <DatePicker
          className="border rounded px-2 py-1"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          placeholderText="Filter by end date"
        />
      </div>

      <thead>
        <tr>
          <th
            className="pl-24 py-2 "
            style={{ color: "green", textDecoration: "underline" }}
          >
            Spendings
          </th>
          <th
            className="pl-20 py-2 "
            style={{ color: "green", textDecoration: "underline" }}
          >
            Category
          </th>
          <th
            className="pl-24 py-2 "
            style={{ color: "green", textDecoration: "underline" }}
          >
            Date
          </th>
          <th
            className="pl-20 py-2 "
            style={{ color: "green", textDecoration: "underline" }}
          >
            Amount
          </th>
        </tr>
      </thead>

      {Transactions}
    </div>
  );
}

function Transaction({ category, handler }) {
  if (!category) return null;

  const { id, _id, name, color, amount, date, type } = category;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <div
      className="item flex bg-gray-50 py-2 rounded gap-2"
      style={{ borderRight: `12px solid ${color ?? "#e5e5e5"}` }}
    >
      <button className="ml-4" onClick={() => handler(id)}>
        <box-icon
          data-id={_id ?? ""}
          color={color ?? "#e5e5e5"}
          size="22px"
          name="trash"
        ></box-icon>
      </button>
      <div>
        <table className="w-full" style={{ tableLayout: "fixed" }}>
          <tbody>
            <tr>
              <td className="px-4 py-2 w-[180px] overflow-hidden overflow-ellipsis whitespace-nowrap">
                {name}
              </td>
              <td className="px-4 py-2 w-[154px] overflow-hidden overflow-ellipsis whitespace-nowrap">
                {type}
              </td>
              <td className="px-4 py-2 w-[120px]  whitespace-nowrap">{date}</td>
              <td className="px-4 py-2 w-[143px] overflow-hidden overflow-ellipsis whitespace-nowrap">
                {formatCurrency(amount)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
