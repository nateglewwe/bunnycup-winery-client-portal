import React, { useEffect } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import bunnycup from "../../../public/images/bunnycup.png";

// MUI imports
// import * as React from 'react';
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { ThemeProvider } from "@mui/material/styles";
import { primaryTheme } from "../App/App";
import Typography from "@mui/material/Typography";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "black" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.main,
  fontSize: 15,
}));

function AdminRetailerView() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const clients = useSelector((store) => store.clients);
  const orders = useSelector((store) => store.orders.clientOrders);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const clientDetails = useSelector((store) => store.clientDetails);

  // onload makes GET call to fetch all boarding data.
  useEffect(() => {
    dispatch({ type: "FETCH_CLIENTS" });
    dispatch({ type: "FETCH_CLIENT_DETAILS_ADMIN", payload: { id } });
    dispatch({ type: "GET_CLIENT_ORDERS", payload: id });
  }, []);

  const handleClickEditClient = (id) => {
    history.push(`/update/${id}`);
  };

    // tracking counts for NEW ORDERS
    let newOrders = [];
    function checkNewOrders() {
      for (let order of orders)
        if (order.name === "Pending") {
          newOrders.push(order);
        }
      return newOrders.length;
    }

    // tracking counts for COMPLETED ORDERS
    let completedOrders = [];
    function checkCompletedOrders() {
      for (let order of orders)
        if (order.name === "Complete") {
          completedOrders.push(order);
        }
      return completedOrders.length;
    }

    // tracking counts for CANCELLED ORDERS
    let cancelledOrders = [];
    function checkCancelledOrders() {
      for (let order of orders)
        if (order.name === "Cancelled") {
          cancelledOrders.push(order);
        }
      return cancelledOrders.length;
    }

    const orderHolder = []
    function orderArray() {
      for (let order of orders) {
        orderHolder.push(order.id)
      }
      return orderHolder;
    };
    console.log('ORDER HOLDER', orderArray());

    // const orderObjHolder = []
    // function orderObjArray() {
    //   for (let order of orders) {
    //     orderObjHolder.push(order)
    //   }
    //   return orderObjHolder;
    // };
    // console.log('ORDER OBJ HOLDER', orderObjArray());
    // console.log('ORDERS', orders);

    // const uniqueOrders = [];
    // function uniqueOrders() {
    //   for (let order of orders) {
    //     if (!order.id)
    //   }
    // }

    const uniqueArray = orderHolder.reduce((accumulator, currentValue) => {
      if (!accumulator.includes(currentValue)) {
        accumulator.push(currentValue);
      }
      return accumulator;
    }, []);
    console.log('FILTERED ORDERS', uniqueArray);


  // console.log("CLIENTS", clients);
  // console.log("CLIENT DETAILS", clientDetails);
  // console.log("CLIENT ORDERS", orders);

  return (
    <Container maxWidth>
      <ThemeProvider theme={primaryTheme}>
        {/* <p>Your ID is: {user.id}</p> */}
        <center>
          <img src={bunnycup} width="150" height="150" />
        </center>
        <div className="container">
          {/* {clients.map((client) => {
          return (
            <p>{client.name}</p>
          )})} */}
          <div>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  bgcolor: "#F9F7F4",
                  m: 0,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Stack
                    spacing={3}
                    margin={1}
                    sx={{
                      direction: "row",
                      justifyContent: "end",
                      fontSize: "22px",
                    }}
                  >
                    <p>RETAILER INFO</p>
                  </Stack>
                </Box>
              </AccordionSummary>
              <Box
                sx={{
                  flexGrow: 1,
                  height: 2,
                  flexDirection: "column",
                  paddingLeft: 3,
                  paddingRight: 3,
                  paddingTop: 3,
                  fontFamily: "George Sans Serif",
                  fontSize: "20px",
                  width: 800,
                }}
              >
                <p>Name: {clientDetails.name}</p>
                <p>Email Address: {clientDetails.email}</p>
                <p>
                  Address: {clientDetails.street} {clientDetails.city},{" "}
                  {clientDetails.state} {clientDetails.zip}
                </p>
                <p>Discount: {clientDetails.discount}%</p>
                <p>Payment Type: {clientDetails.payment_type}</p>
                <Button
                  variant="contained"
                  size="large"
                  color="pinot"
                  fullWidth
                  onClick={() => handleClickEditClient(clientDetails.id)}
                >
                  EDIT
                </Button>
              </Box>
              <AccordionDetails
                sx={{
                  minHeight: 300,
                  maxHeight: 300,
                  overflowY: "scroll",
                }}
              ></AccordionDetails>
            </Accordion>
            <h2>ORDERS</h2>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
                sx={{
                  bgcolor: "#F9F7F4",
                }}
              >
                <Typography sx={{ width: "40%", flexShrink: 0 }}>
                  NEW
                </Typography>
                <Typography
                  color="#861f41"
                  sx={{ fontWeight: "bold", width: "35%" }}
                >
                  {checkNewOrders()} NEW ORDERS
                </Typography>
                <Typography>
                ${newOrders.reduce((n, {total_cost}) => n + Number(total_cost), 0)}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  minHeight: 300,
                  maxHeight: 300,
                  overflowY: "scroll",
                }}
              >
                {orders.map((order) => {
                  if (order.name === "Pending") {
                    return (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            p: 0,
                            m: 1,
                            bgcolor: "background.paper",
                            borderRadius: 1,
                          }}
                        >
                          <Typography sx={{ width: "40%" }}>
                            {order.id}
                          </Typography>
                          <Typography sx={{ width: "35%" }}>
                            {order.name}
                          </Typography>
                          <Typography sx={{ width: "25%" }}>
                            $ {order.total_cost}
                          </Typography>
                          <Button
                            variant="text"
                            sx={{
                              color: "#861F41",
                            }}
                            // onClick={() => handleClickOpenClient(client.id)}
                          >
                            VIEW
                          </Button>
                        </Box>
                      </>
                    );
                  }
                })}
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
                sx={{
                  bgcolor: "#F9F7F4",
                }}
              >
                <Typography sx={{ width: "40%", flexShrink: 0 }}>
                  COMPLETED
                </Typography>
                <Typography
                  color="pinot"
                  sx={{ width: "35%" }}
                >
                  {checkCompletedOrders()} ORDERS
                </Typography>
                <Typography>
                  ${completedOrders.reduce((n, {total_cost}) => n + Number(total_cost), 0)}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  minHeight: 300,
                  maxHeight: 300,
                  overflowY: "scroll",
                }}
              >
              {orders.map((order) => {
                  if (order.name === "Complete") {
                    return (
                      <>
                        <div key={order.id}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              p: 0,
                              m: 1,
                              bgcolor: "background.paper",
                              borderRadius: 1,
                            }}
                          >
                            <Typography sx={{ width: "40%" }}>
                              {order.id}
                            </Typography>
                            <Typography sx={{ width: "35%" }}>
                              {order.name}
                            </Typography>
                            <Typography sx={{ width: "25%" }}>
                              $ {order.total_cost}
                            </Typography>
                            <Button
                              variant="text"
                              sx={{
                                color: "#861F41",
                              }}
                              // onClick={() => handleClickOpenClient(client.id)}
                            >
                              VIEW
                            </Button>
                          </Box>
                        </div>
                      </>
                    );
                  }
                })}
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
                sx={{
                  bgcolor: "#F9F7F4",
                }}
              >
                <Typography sx={{ width: "40%", flexShrink: 0 }}>
                  CANCELLED
                </Typography>
                <Typography
                  color="#cccccc"
                  sx={{ width: "35%" }}
                >
                  {checkCancelledOrders()} ORDERS
                </Typography>
                <Typography color="#cccccc">
                  ${cancelledOrders.reduce((n, {total_cost}) => n + Number(total_cost), 0)}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  minHeight: 300,
                  maxHeight: 300,
                  overflowY: "scroll",
                }}
              >
                {orders.map((order) => {
                  if (order.name === "Cancelled") {
                    return (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            p: 0,
                            m: 1,
                            bgcolor: "background.paper",
                            borderRadius: 1,
                          }}
                        >
                          <Typography sx={{ width: "40%" }}>
                            {order.id}
                          </Typography>
                          <Typography sx={{ width: "35%" }}>
                            {order.name}
                          </Typography>
                          <Typography sx={{ width: "25%" }}>
                            $ {order.total_cost}
                          </Typography>
                          <Button
                            variant="text"
                            sx={{
                              color: "#861F41",
                            }}
                            // onClick={() => handleClickOpenClient(client.id)}
                          >
                            VIEW
                          </Button>
                        </Box>
                      </>
                    );
                  }
                })}
              </AccordionDetails>
            </Accordion>
          </div>
          {/* <br/>
    <LogOutButton className="btn" /> */}
        </div>
      </ThemeProvider>
    </Container>
  );
}

// this allows us to use <App /> in index.js
export default AdminRetailerView;
