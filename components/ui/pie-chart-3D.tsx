// components/PieChart3D.tsx
"use client"; // nếu bạn dùng app router - Next 13+

import { useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import './styles.scss';

type Props = { data: { category: string; value: number }[] };

export default function PieChart3D({ data }: Props) {
  useLayoutEffect(() => {
    am4core.useTheme(am4themes_animated);

    const chart = am4core.create("chartdiv", am4charts.PieChart3D);
    chart.data = data;
    chart.depth = 60;
    chart.angle = 30;

    const series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "value";
    series.dataFields.category = "category";

    return () => {
      chart.dispose();
    };
  }, [data]);

  return <>
    <style jsx>{`
      #chartdiv [aria-labelledby^="id-"][aria-labelledby$="-title"] {
        display: none !important;
      }
    `}</style>
    <div id="chartdiv" style={{ width: "100%", height: "400px" }} />
  </>
}
