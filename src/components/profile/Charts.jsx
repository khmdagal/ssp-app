import React, { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Charts as ChartJS } from "chart.js/auto";
import Dropdown from "react-bootstrap/Dropdown";

export default function Charts({ chartData }) {
  const [chartType, setChartType] = useState("Line");

  function selectChartType(e) {
    const value = e.target.value;
    
    setChartType(value);

  }
return <div></div>
}
