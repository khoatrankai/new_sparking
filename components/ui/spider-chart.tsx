"use client";

import React from "react";
import { Radar } from "@ant-design/plots";

type RadarChartProps = {
  data: { [key: string]: any }[]; // bạn có thể định nghĩa rõ hơn type nếu muốn
};

const RadarChart: React.FC<RadarChartProps> = ({ data }) => {
  const config = {
    data,
    xField: "Thành phần",
    yField: "Điểm",
    colorField: "type",
    coordinateType: "polar",
    axis: {
      x: {
        grid: true,
        gridLineWidth: 1,
        tick: false,
        gridLineDash: [0, 0],
        line: false,
        title: {
          text: "Nguồn",
          style: {
            fontSize: 14,
            fontWeight: "bold",
          },
        },
      },
      y: {
        zIndex: 1,
        title: false,
        gridConnect: "line",
        gridLineWidth: 1,
        gridLineDash: [0, 0],
      },
    },
    legend: {
        color: {
        title: false,
        position: 'bottom',
      },
    },
    area: {
      style: {
        fillOpacity: 0.5,
      },
    },
    point: {
      shapeField: "point",
      sizeField: 3,
    },
    scale: { x: { padding: 0.5, align: 0 }, y: { tickCount: 5, domainMax: 80 } },
    style: {
      lineWidth: 2,
    },
  };

  return <Radar {...config} />;
};

export default RadarChart;
