import c from "./Charts.module.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import React from "react";

const Charts = (p) => {
  console.log(p.datasets);
  const data = {
    labels: p.data.labels,
    datasets: p.data.datasets,
  };

  const options = {
    hover: {
      mode: "nearest",
      intersect: false,
      animationDuration: 400,
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: "white",
          fontWeight: "bold",
        },
      },
      y: {
        grid: {
          color: "#f3f3f34f",
        },
        ticks: {
          color: "white",
          fontWeight: "bold",
        },
        y: {
          stacked: true,
        },
      },
    },
    // plugins: {

    //   legend: {
    //     labels: {
    //       color: "#FAF0E6",
    //     },
    //     display: true,
    //   },
    //   datalabels: {
    //     display: true,
    //   },

    // },
    plugins: {
      hover: {
        mode: "nearest",
        intersect: false,
        animationDuration: 400,
      },
      tooltip: {
        callbacks: {
          beforeTitle: function (context) {
            if (context[0].datasetIndex === 0) {
              return "First Dataset: ";
            }
          },
          title: function (context) {
            return context[0].dataset.label;
          },
          label: function (context) {
            const labelIndex = context.dataIndex;
            const dataset = context.dataset;
            console.log(labelIndex, context, dataset);
            //   const label = dataset.labels[labelIndex];
            const label = context.label;
            const value = context.parsed.y;

            const statusCounts = dataset.tooltips[label];

            let statusText = statusCounts.map(
              (sc) => `${sc.status}: ${sc.count}`
            );

            return `   ${value} ( ${statusText} )`;
          },
        },
      },
    },
    // animation: {
    //   onComplete: (animation) => {
    //     const { chart } = animation;
    //     const ctx = chart.ctx;
    //     chart.data.datasets.forEach((dataset, index) => {
    //       const meta = chart.getDatasetMeta(index);
    //       meta.data.forEach((element, index) => {
    //         const data = dataset.data[index];
    //         let xPos, yPos;

    //         xPos = element.x;
    //         yPos = element.y - 10;

    //         ctx.save();
    //         ctx.textAlign = "center";
    //         ctx.fillStyle = "#EEEEEE";
    //         ctx.font = "17px Arial";
    //         ctx.fillText(data, xPos, yPos);
    //         ctx.restore();
    //       });
    //     });
    //   },
    // },
  };
  ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    BarElement
  );

  return (
    <div className={c.chartHolder}>
      <div className={c.title}>
        <span></span>
        <h3> {p.title} </h3>
        <span></span>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default Charts;
