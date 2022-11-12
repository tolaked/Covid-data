import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {
    Grid,
    Typography, InputAdornment, OutlinedInput
} from '@mui/material';
import { SearchOutlined } from '@ant-design/icons';
import OrdersTable from './OrdersTable';
import MonthlyBarChart from './MonthlyBarChart';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    const [deaths, setDeaths] = useState(0)
    const [totalCases, setTotalCases] = useState(0)
    const [searchTerm, setSearchTerm] = useState('')

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    const getTotalDeaths = async() =>{
        const {data} = await axios.get('https://seun-covid.herokuapp.com/api/v1/corona/sumTotalDeaths')
        if(data.length) setDeaths(data[0].total)
       
    }

    const getTotalCases = async() =>{
        const {data} = await axios.get('https://seun-covid.herokuapp.com/api/v1/corona/sumTotalCases')
        if(data.length) setTotalCases(data[0].total)
    }

    useEffect(()=>{
        getTotalDeaths()
        getTotalCases()
    },[])
  
    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Dashboard</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Deaths" count={String(numberWithCommas(deaths)) || 0}/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Cases" count={String(numberWithCommas(totalCases)) || 0} />
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
                        console.log('eee',e.target.value)
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
                    <OrdersTable searchTerm={searchTerm}/>
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
