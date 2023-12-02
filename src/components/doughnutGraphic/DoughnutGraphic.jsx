import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {
  LoadingAvatar,
  TittleGraph,
} from "@/components/graphicAddons/GraphicAddons";
import { Card } from "antd";
import { getRandomColor } from "@/helpers/functions/functions";
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutGraphic = ({ title, labels, values, loading, tooltip }) => {
  const getRandomColorForDoughnut = (size) => {
    const backgroundColors = [];
    const borderColors = [];

    for (let i = 0; i < size; i++) {
      const randomColor = getRandomColor();
      backgroundColors.push(randomColor.replace("1)", "0.2)")); // Cambia el valor alfa a 0.2
      borderColors.push(randomColor);
    }

    return {
      backgroundColors,
      borderColors,
    };
  };
  const colors = getRandomColorForDoughnut(labels.length);
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: values,
        backgroundColor: colors.backgroundColors,
        borderColor: colors.borderColors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card>
      <TittleGraph title={title} tooltip={tooltip} />
      <div>
        {loading ? (
          <LoadingAvatar />
        ) : (
          <Doughnut data={data} style={{ maxHeight: "350px" }} />
        )}
      </div>
    </Card>
  );
};

export default DoughnutGraphic;
