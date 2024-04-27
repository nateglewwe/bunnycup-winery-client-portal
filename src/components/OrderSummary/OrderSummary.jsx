import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './OrderSummary.css';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

function OrderSummary() {
  //dispatch hook
  const dispatch = useDispatch();
  const reducer = useSelector((store) => store.reducer);

  /*//Formatting Date
  const formatDate = (newDate) => {
    // //This splits string into substrings/array
    // const splitDate = newDate.split('T');
    // // console.log('new date object', splitDate);
    // return splitDate[0];

    //new date formatting
    const date = new Date(newDate);
    // console.log(date);
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    });
    // console.log(formattedDate);
    const splitDate = formattedDate.split(',');
    // console.log(splitDate);
    // const weekday = splitDate[0];
    const monthDay = splitDate[1];
    const splitMonthDay = monthDay.split(' ');
    // console.log('splitMonthDay', splitMonthDay);
    const newDateFormat = splitMonthDay[1];
    // console.log('newDateFormat', newDateFormat);
    const replaceNewDateFormat = newDateFormat.replace(/\//g, '-');
    // console.log('replaceNewDateFormat', replaceNewDateFormat);

    return `${replaceNewDateFormat}`;
  };*/

  // Fetch orders on component mount
  useEffect(() => {
    dispatch({ type: 'FETCH_REDUCER' });
  }, [dispatch]);

  return (
    <>
      <div className="header">
        <h1>Order #XXXXXX-1</h1>
      </div>
      <div className="customerInfo">
        {/*To Do: Retailer info includes Name, Address, contact info */}
        <h3>Order Summary </h3>
        <p className="date">Date:</p>
        Retailer Name <br />
        Address <br />
        Phone <br />
        Email <br />
      </div>

      {/*To Do: set up Table with MUI */}
      <TableContainer sx={{ margin: '0 auto', width: '80%' }}>
        <Table>
          <TableHead>
            {/*To Do: Table headers needed are item, description, quantity, price, amount */}
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1.</TableCell>
              <TableCell>Product Description</TableCell>
              <TableCell>12</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>$120.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <div className="total">
        <p>Total: $</p>
      </div>
    </>
  );
}

export default OrderSummary;
