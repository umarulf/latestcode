import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import Labels from "./Labels";
import { chart_Data, getTotal } from "../helper/helper";
import { default as api } from "../store/apiSlice";
import { useSelector } from "react-redux";
Chart.register(ArcElement);

export default function Graph() {
  const pageData = {
    pageNumber: 0,
    pageSize: 3,
  };
  // const userId = localStorage.getItem();
  const { data, isFetching, isSuccess, isError } =
    api.useGetLabelsQuery(pageData);

  const totalcount = useSelector((state) => state.expense.totalcount);
  console.log(totalcount, "totalcou");

  let graphData;

  if (isFetching) {
    graphData = <div>Fetching</div>;
  } else if (isSuccess) {
    graphData = <Doughnut {...chart_Data(data?.transactions)}></Doughnut>;
    console.log(data);
  } else if (isError) {
    graphData = <div>Errorgraph</div>;
  }

  return (
    <div className="flex justify-content max-w-xs pt-6 mx-auto">
      <div className="item">
        <div className="chart relative">
          {graphData}
          <h3 className="mb-4 font-bold title">
            Total
            <span className="block text-3xl text-cyan-100">
              ${getTotal(data) ?? 0}
            </span>
          </h3>
        </div>

        <div className="flex flex-col pt-3 gap-4">
          <Labels></Labels>
        </div>
      </div>
    </div>
  );
}
