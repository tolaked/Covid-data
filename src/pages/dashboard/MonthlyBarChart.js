import { useEffect, useState } from 'react';
import Axios from 'axios'
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
            columnWidth: '45%',
            borderRadius: 4
        }
    },
    dataLabels: {
        enabled: false
    },
    xaxis: {
        categories: ['2020', '2021', '2022'],
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        }
    },
    yaxis: {
        show: false
    },
    grid: {
        show: false
    }
};

// ==============================|| MONTHLY BAR CHART ||============================== //

const MonthlyBarChart = () => {
    const theme = useTheme();

    const { primary, secondary } = theme.palette.text;
    const info = theme.palette.info.light;

    const [series, setSeries] = useState([
        {
            data: [7635290647, 67085505873, 66412666583]
        }
    ]);
  
    const getYearlyCaseCount = async() =>{
        const {data} = await Axios.get('https://seun-covid.herokuapp.com/api/v1/corona/yearlyCaseCount')
        if(data.length){
            const yearlyCases = data.map(yearlyCase=>Number(yearlyCase.total_cases))
            console.log('yearlyCases',yearlyCases,data)
            const reversed = yearlyCases.reverse()
            setSeries([{data: reversed}])
        }
       
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

export default MonthlyBarChart;
