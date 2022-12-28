import { useEffect, useState } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const barChartOptions = {
    chart: {
        type: 'bar',
        height: 365,
        toolbar: {
            show: false
        }
    },
    plotOptions: {
        bar: {
            columnWidth: '35%',
            borderRadius: 4
        }
    },
    dataLabels: {
        enabled: false
    },
    xaxis: {
        categories: ['Europe', 'Asia', "North America", "South America", "Africa", "Oceania"],
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        }
    },
    yaxis: {
        show: true
    },
    grid: {
        show: false
    }
};

// ==============================|| MONTHLY BAR CHART ||============================== //

const ContinentCases = () => {
    const theme = useTheme();

    const { primary, secondary } = theme.palette.text;
    const info = theme.palette.info.light;

    const [series, setSeries] = useState([
        {
            data: [7635290647, 67085505873, 66412666583]
        }
    ]);
  
    const getYearlyCaseCount = async() =>{
        return fetch('http://seun-covid.herokuapp.com/api/v1/corona/regionWithHighestCases')
        .then((response) => response.json())
        .then((data) => {
            if(data.length){
                const cases = data.map(regionCase=>Number(regionCase.sum_new_cases))
                setSeries([{data: cases,name: 'Total cases'}])
            }
        });
      
       
    }

    useEffect(()=>{
        getYearlyCaseCount()
    },[])

    const [options, setOptions] = useState(barChartOptions);

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [info],
            xaxis: {
                labels: {
                    style: {
                        colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary]
                    }
                }
            },
            tooltip: {
                theme: 'light'
            }
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [primary, info, secondary]);

    return (
        <>
      { series.length ?
       <div id="chart">
            <ReactApexChart options={options} series={series} type="bar" height={365} />
        </div>
        : ''
    }
    </>
    );
};

export default ContinentCases;
