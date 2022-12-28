import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft,faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import './table.css'

// material-ui
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';


function createData(country, totalCases,totalDeaths, population, lifeExpectancy, medianAge) {
    return { country, totalCases, totalDeaths, population, lifeExpectancy, medianAge };
}

// function descendingComparator(a, b, orderBy) {
//     if (b[orderBy] < a[orderBy]) {
//         return -1;
//     }
//     if (b[orderBy] > a[orderBy]) {
//         return 1;
//     }
//     return 0;
// }

// function getComparator(order, orderBy) {
//     return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//     const stabilizedThis = array.map((el, index) => [el, index]);
//     stabilizedThis.sort((a, b) => {
//         const order = comparator(a[0], b[0]);
//         if (order !== 0) {
//             return order;
//         }
//         return a[1] - b[1];
//     });
//     return stabilizedThis.map((el) => el[0]);
// }

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
    {
        id: 'country',
        align: 'center',
        disablePadding: false,
        label: 'Country'
    },
    {
        id: 'totalCases',
        align: 'center',
        disablePadding: true,
        label: 'Total cases'
    },
    {
        id: 'totalDeaths',
        align: 'center',
        disablePadding: true,
        label: 'Total deaths'
    },
    {
        id: 'population',
        align: 'center',
        disablePadding: false,
        label: 'Population'
    },
    {
        id: 'lifeExpectancy',
        align: 'center',
        disablePadding: false,
        label: 'Life Expectancy'
    },
    {
        id: 'medianAge',
        align: 'center',
        disablePadding: false,
        label: 'Median Age'
    }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
   
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

OrderTableHead.propTypes = {
    order: PropTypes.string,
    orderBy: PropTypes.string
};



// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable({searchTerm,setCurrentPage, currentPage}) {
    const [order] = useState('asc');
    const [orderBy] = useState('trackingNo');
    const [selected] = useState([]);

    const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;
    const [countryData, setCountryData] = useState([])
    // const [currentPage, setCurrentPage] = useState(0)

    const filteredItems = countryData?.filter((ele) =>
    ele.country
      ?.toLocaleLowerCase()
      .includes(searchTerm.toLocaleLowerCase())
  );
  console.log('filteredItems',filteredItems)

  const pageSize = 15;

  const verificationsCount = Math.ceil(filteredItems.length / pageSize);
  const handleNext=(data)=>{
    return setCurrentPage(data.selected)
  }
    const getYearlyCaseCount = async() =>{
        return fetch('https://seun-covid.herokuapp.com/api/v1/corona/tabledata')
        .then((response) => response.json())
        .then((data) => {
            if(data.length){
                const allCountries = data
                .sort(
                    (a,b) =>
                      a.country < b.country ? -1 : 1
                  )
                  .map(({country,total_cases,total_deaths,population,life_expectancy,median_age})=>createData(country, total_cases,total_deaths, population, life_expectancy, median_age))
                  console.log('allCountries',allCountries)
                setCountryData(allCountries)
            }
        })
       
    }

    useEffect(()=>{
        getYearlyCaseCount()
    },[])

    return (
        <Box>
            <TableContainer
                sx={{
                    width: '100%',
                    overflowX: 'auto',
                    position: 'relative',
                    display: 'block',
                    maxWidth: '100%',
                    '& td, & th': { whiteSpace: 'nowrap' }
                }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    sx={{
                        '& .MuiTableCell-root:first-child': {
                            pl: 2
                        },
                        '& .MuiTableCell-root:last-child': {
                            pr: 3
                        }
                    }}
                >
                    <OrderTableHead order={order} orderBy={orderBy} />
                    <TableBody>
                        {filteredItems.length > 0
                  && filteredItems
                      .slice(currentPage * pageSize, (currentPage + 1) * pageSize).map((row, index) => {
                            const isItemSelected = isSelected(row.trackingNo);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.country}
                                    selected={isItemSelected}
                                >
                                    <TableCell id={labelId} scope="row" align="center">
                                            {row.country || 'N/A'}
                                    </TableCell>
                                    <TableCell align="center">
                                        <NumberFormat value={row.totalCases} displayType="text" thousandSeparator />
                                    </TableCell>
                                    <TableCell align="center">
                                        <NumberFormat value={row.totalDeaths} displayType="text" thousandSeparator />
                                    </TableCell>
                                    <TableCell align="center">
                                    <NumberFormat value={row.population} displayType="text" thousandSeparator /></TableCell>
                                    <TableCell align="center">
                                        <Typography>{row.lifeExpectancy || 'N/A'}</Typography>
                                    </TableCell>
                                    <TableCell align="center">{row.medianAge || 'N/A'}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <div className="pagination-line">
                    <p>
                Showing{" "}
                {
                  filteredItems.slice(
                    currentPage * pageSize,
                    (currentPage + 1) * pageSize
                  ).length
                }{" "}
                of {filteredItems.length} of countries
              </p>
                <ReactPaginate
                    previousLabel={<FontAwesomeIcon
                      className="icon"
                      icon={faAngleDoubleLeft}
                      style={{ fontSize: "15px" }}
                    />}
                    nextLabel={<FontAwesomeIcon
                      className="icon"
                      icon={faAngleDoubleRight}
                      style={{ fontSize: "15px" }}
                    />}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={verificationsCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={(e) => handleNext(e)}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                  /> 
                  </div>
            </TableContainer>
        </Box>
    );
}
