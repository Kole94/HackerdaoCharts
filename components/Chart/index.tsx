import React, { useState, useEffect } from "react";
import { Area } from "@ant-design/plots";

interface Data {
  date: string;
  value: number;
}

const Charts = () => {
  const [data, setData] = useState([]);
  const [dataAPR, setDataAPR] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      "https://api.multifarm.fi/jay_flamingo_random_6ix_vegas/get_assets?pg=1&tvl_min=50000&sort=tvlStaked&sort_order=desc&farms_tvl_staked_gte=10000000"
    )
      .then((response) => response.json())
      .then((json) => {
        let newData = json.data[0].selected_farm[0].tvlStakedHistory;
        let apr = 1;
        const newDataAPRParse = newData.map((item: Data) => {
          apr = apr * 1.05;
          return {
            date: item.date,
            value: apr,
          };
        });
        setDataAPR(newDataAPRParse);
        setData(newData);
      })
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const configTVL = {
    data,
    xField: "date",
    yField: "value",
    xAxis: {
      range: [0, 1],
      tickCount: 5,
    },
    areaStyle: () => {
      return {
        fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff",
      };
    },
  };

  const configAPR = {
    data: dataAPR,
    xField: "date",
    yField: "value",
    xAxis: {
      range: [0, 1],
      tickCount: 5,
    },
    areaStyle: () => {
      return {
        fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff",
      };
    },
  };

  return (
    <>
      <h1>TVL</h1>
      <Area {...configTVL} />
      <h1>APR</h1>
      <Area {...configAPR} />
    </>
  );
};

export default Charts;
