import React from "react";
import { default as api } from "../store/apiSlice";
import { getLabels, getSum } from "../helper/helper";

export default function Labels() {
  const pageData = {
    pageNumber: 0,
    pageSize: 3,
  };
  const { data, isFetching, isSuccess, isError } =
    api.useGetLabelsQuery(pageData);

  console.log("ogdata", data);

  let Transactions;
  const totalAmounts = getSum(data?.transactions, "type");

  const extractedTotals = totalAmounts.map((item) => item.total);
  console.log("Extracted Totals:", extractedTotals);

  if (isFetching) {
    Transactions = <div>Fetching</div>;
  } else if (isSuccess) {
    Transactions = getLabels(data?.transactions, "type").map((v, i) => (
      <LabelComponent
        extractedTotals={extractedTotals[i]}
        key={i}
        data={v}
      ></LabelComponent>
    ));
  } else if (isError) {
    Transactions = <div>Errorlabel</div>;
  }

  return (
    <>
      <div className="flex flex-col pt-2 pb-20 gap-2">
        <h1 className=" font-bold text-xl">Overview</h1>
        {Transactions}
      </div>
    </>
  );
}

function LabelComponent({ data, extractedTotals }) {
  if (!data) return <></>;
  return (
    <div className="labels flex justify-between">
      <div className="flex gap-2">
        <div
          className="w-6 h-2 rounded py-3"
          style={{ background: data.color ?? "#f9c74f" }}
        ></div>
        <h3 className="text-md">{data.type ?? ""}</h3>
      </div>
      <div className="flex gap-6  ">
        <h3 className="font-bold">{Math.round(data.percent) ?? 0}%</h3>
        <h3 className="min-w-[50px] font-bold">{extractedTotals}$</h3>
      </div>
    </div>
  );
}
