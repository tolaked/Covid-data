import { useEffect, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";

// third-party
import ReactApexChart from "react-apexcharts";

// chart options
const columnChartOptions = {
  chart: {
    type: "bar",
    height: 630,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: "60%",
      borderRadius: 4,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 8,
    colors: ["transparent"],
  },
  xaxis: {
    categories: ["Africa", "Asia", "South America", "North America", "Europe", "Oceania"],
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter(val) {
        return `${val} `;
      },
    },
    x: {
        formatter(val) {
          return `${val} `;
        },
      }
  },
  legend: {
    show: true,
    fontFamily: `'Public Sans', sans-serif`,
    offsetX: 10,
    offsetY: 10,
    labels: {
      useSeriesColors: false,
    },
    markers: {
      width: 16,
      height: 16,
      radius: "50%",
      offsexX: 2,
      offsexY: 2,
    },
    itemMargin: {
      horizontal: 15,
      vertical: 50,
    },
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        yaxis: {
          show: false,
        },
      },
    },
  ],
};

// ==============================|| SALES COLUMN CHART ||============================== //

const CasesVersusDeath = () => {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const warning = theme.palette.warning.main;
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.dark;

  const [series, setSeries] = useState([
    {
      name: "Total cases",
      data: [180, 90, 135, 114, 120, 145],
    },
    {
      name: "Total deaths",
      data: [120, 45, 78, 150, 168, 99],
    },
  ]);
  const getYearlyCaseCount = async () => {
    return fetch(
      "https://seun-covid.herokuapp.com/api/v1/corona/totalCasesVersusDeathsPerRegion"
    )
      .then((response) => response.json())
      .then((data) => {
        const continents = data.map((ele) => ele.continent);
        setOptions({
          ...columnChartOptions,
          xaxis: { categories: continents },
        });
        const totalCases = data.map((ele) => Number(ele.total_cases));
        const totalDeaths = data.map((ele) => Number(ele.total_deaths));
        console.log('totalCases',totalCases)
        console.log('totalDeaths',totalDeaths)
        setSeries([
          { name: "Total Cases", data: totalCases },
          { name: "Total deaths", data: totalDeaths },
        ]);
        // if(data.length){
        //     const yearlyCases = data.map(yearlyCase=>Number(yearlyCase.total_cases))
        //     const reversed = yearlyCases.reverse()
        //     setSeries([{data: reversed, name: 'Cases'}])
        // }
      });
  };

  useEffect(() => {
    getYearlyCaseCount();
  }, []);
  const [options, setOptions] = useState(columnChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [warning, primaryMain],
      xaxis: {
        labels: {
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
            ],
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary],
          },
        },
      },
      grid: {
        borderColor: line,
      },
      tooltip: {
        theme: "light",
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        labels: {
          colors: "grey.500",
        },
      },
    }));
  }, [primary, secondary, line, warning, primaryMain, successDark]);

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={730}
      />
    </div>
  );
};

export default CasesVersusDeath;
