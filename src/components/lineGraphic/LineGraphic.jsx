import React from "react";
import "./lineGraphic.scss";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Card } from "antd";

import {
  LoadingAvatar,
  TittleGraph,
} from "@/components/graphicAddons/GraphicAddons";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineGraphic = ({ title, labels, values, loading, color, tooltip }) => {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: values,
        fill: "start",
        borderWidth: 2,
        pointBorderWidth: 2,
        pointBorderColor: "white",
        borderColor: color.borderColor,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, color.backgroundColor);
          gradient.addColorStop(1, "rgba(238,174,202,0)");
          return gradient;
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <Card>
      <TittleGraph title={title} tooltip={tooltip} />
      <div>
        {loading ? (
          <LoadingAvatar />
        ) : (
          <Line data={data} options={options} className="canvas-container" />
        )}
      </div>
    </Card>
  );
};

export default LineGraphic;
