import React, { useState, useEffect} from 'react';
import {
    Grid,
    Typography, InputAdornment, OutlinedInput
} from '@mui/material';
import { SearchOutlined } from '@ant-design/icons';
import OrdersTable from './OrdersTable';
import MonthlyBarChart from './MonthlyBarChart';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import ContinentCases from './ContinentCases';
import CasesVersusDeath from './CasesVsDeath';
// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    const [deaths, setDeaths] = useState(0)
    const [totalCases, setTotalCases] = useState(0)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(0)

   
    const getTotalDeaths = async() =>{
       return fetch('https://seun-covid.herokuapp.com/api/v1/corona/sumTotalDeaths')
  .then((response) => response.json())
  .then((data) => {
    if(data.length) setDeaths(data[0].total)
  });
        // const {data} = await axios.get('https://seun-covid.herokuapp.com/api/v1/corona/sumTotalDeaths')
        // if(data.length) setDeaths(data[0].total)
       
    }

    const getTotalCases = async() =>{
        return fetch('https://seun-covid.herokuapp.com/api/v1/corona/sumTotalCases')
        .then((response) => response.json())
        .then((data) => {
            setTotalCases(data[0].total)
        });
        // const {data} = await axios.get('https://seun-covid.herokuapp.com/api/v1/corona/sumTotalCases')
        // if(data.length) setTotalCases(data[0].total)
    }

    useEffect(()=>{
        getTotalDeaths()
        getTotalCases()
    },[])
  console.log(deaths,totalCases)
    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Dashboard</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Deaths" count={'4647484474'}/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Cases" count={'46664474'}/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Vaccine" count="188,800"  extra="1,943" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Bed space" count="935,878" />
            </Grid>

            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
            <Grid item xs={12} md={7} lg={8}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Yearly case chart</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <MonthlyBarChart />
                </MainCard>
            </Grid>
            {/* row 2 */}
            <Grid item xs={12} md={7} lg={8}>
            </Grid>
            <Grid item xs={12} md={7} lg={8}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Cases by region</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <ContinentCases />
                </MainCard>
            </Grid>
            {/*  */}
             <Grid item xs={12} md={7} lg={8}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Sales Report</Typography>
                    </Grid>
                    
                </Grid>
                <MainCard sx={{ mt: 1.75 }}>
                    {/* <Stack spacing={1.5} sx={{ mb: -12 }}>
                        <Typography variant="h6" color="secondary">
                            Net Profit
                        </Typography>
                        <Typography variant="h4">$1560</Typography>
                    </Stack> */}
                    <CasesVersusDeath />
                </MainCard>
            </Grid>
            
           

            

            {/* row 3 */}
            <Grid item xs={12} md={7} lg={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Countries data</Typography>
                    </Grid>
                    <Grid item>
                    <OutlinedInput
                    value={searchTerm}
                    onChange={(e)=>{
                        setSearchTerm(e.target.value)
                        setCurrentPage(0)
                    }}
                size="small"
                id="header-search"
                name="searchTerm"
                startAdornment={
                    <InputAdornment position="start" sx={{ mr: -0.5 }}>
                        <SearchOutlined />
                    </InputAdornment>
                }
                aria-describedby="header-search-text"
                inputProps={{
                    'aria-label': 'weight'
                }}
                placeholder="Search country"
            />
                    </Grid>
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <OrdersTable searchTerm={searchTerm} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                </MainCard>
            </Grid>
           

            {/* row 4 */}
            <Grid item xs={12} md={7} lg={8}>
             
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
                
            </Grid>
        </Grid>
    );
};

export default DashboardDefault;
