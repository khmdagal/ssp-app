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

    let chosenChartType;

      switch (chartType) {
        case "Bar":
          chosenChartType = (<Bar data={chartData} />);
          break;
        case "Line":
          chosenChartType = (<Line data={chartData} />);
          break;
        case "Pie":
          chosenChartType = (<Pie data={chartData} />);
          break;
          default:
              chosenChartType = null;
      }
   
    return (
      <div>
      
          <select
            style={{ width: 150 }}
            onChange={selectChartType}
            id="cars"
            name="cars"
          >
            <option defaultValue={Line} value="Line">
              Line Chart
            </option>
            <option value="Bar">Bar Chart</option>
            <option value="Pie">Pie Chart</option>
          </select>
     
        {chosenChartType}
      </div>
    );

}
