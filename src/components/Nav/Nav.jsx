import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartIconPage from '../ShoppingCartIcon/ShoppingCartIcon';
import './Nav.css';
import { useDispatch, useSelector } from 'react-redux';
import '@fontsource/special-elite';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import bunnycup from '/images/bunnycup.png';

function Nav() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const client = useSelector((store) => store.clients);
  const clientID = client && Number(client.map((clientItem) => clientItem.id));
  // Grabbing orders
  const orders = useSelector((store) => store.orders);

  // setting up clientOrders data
  const clientOrders = orders.clientOrders;

  const defaultOrderId = clientOrders.length > 0 ? clientOrders[0].id : null;
  // console.log('defaultOrderId', defaultOrderId);

  useEffect(() => {
    dispatch({ type: 'FETCH_CLIENTS' });
    dispatch({ type: 'FETCH_CLIENT_DETAILS', payload: { id: clientID } });
    dispatch({ type: 'GET_CLIENT_ORDERS', payload: clientID });
  }, [dispatch, clientID]);

  function userType() {
    if (user.id && user.access_level === 10) {
      return (
        <>
          <ListItem disablePadding>
            <ListItemButton>
              <Typography
                component={Link}
                to="/admin_user"
                sx={{ textDecoration: 'none', color: 'black' }}
              >
                <ListItemText>HOME</ListItemText>
              </Typography>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => dispatch({ type: 'LOGOUT' })}>
              <Typography>LOGOUT</Typography>
            </ListItemButton>
          </ListItem>
        </>
      );
    }
    if (user.id) {
      return (
        <>
          <ListItem disablePadding>
            <ListItemButton>
              <Typography
                component={Link}
                to="/products"
                sx={{ textDecoration: 'none', color: 'black' }}
              >
                <ListItemText>PRODUCTS</ListItemText>
              </Typography>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <Typography
                component={Link}
                to={`/orderSummary/${defaultOrderId}`}
                sx={{ textDecoration: 'none', color: 'black' }}
              >
                <ListItemText>ORDER SUMMARY</ListItemText>
              </Typography>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <Typography
                component={Link}
                to="/orderHistory"
                sx={{ textDecoration: 'none', color: 'black' }}
              >
                <ListItemText>ORDER HISTORY</ListItemText>
              </Typography>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => dispatch({ type: 'LOGOUT' })}>
              <Typography>LOGOUT</Typography>
            </ListItemButton>
          </ListItem>
        </>
      );
    } else {
      return (
        <>
          <ListItem disablePadding>
            <ListItemButton>
              <Typography
                component={Link}
                to="/home"
                sx={{ textDecoration: 'none', color: 'black' }}
              >
                <ListItemText>HOME</ListItemText>
              </Typography>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <Typography
                component={Link}
                to="/login"
                sx={{ textDecoration: 'none', color: 'black' }}
              >
                <ListItemText>LOG IN</ListItemText>
              </Typography>
            </ListItemButton>
          </ListItem>
        </>
      );
    }
  }

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem>
          <img
            src={bunnycup}
            width="100"
            height="100"
            alt="Bunnycup Winery Logo"
          />
        </ListItem>
      </List>
      <Divider />
      <List>
        <div>{userType()}</div>
      </List>
    </Box>
  );

  return (
    <div className="nav">
      <div>
        <MenuRoundedIcon
          onClick={toggleDrawer(true)}
          sx={{
            color: '#ffffff',
            p: '25px',
            position: 'absolute',
            right: '10px',
          }}
          display="block"
          fontSize="large"
        />
        <Typography>
          <h4 className="nav-title">Bunnycup Winery</h4>
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {user.id && user.access_level !== 10 && (
          <IconButton
            className="cart"
            component={Link}
            sx={{
              textDecoration: 'none',
              color: '#ffffff',
              position: 'absolute',
              right: '80px',
              top: '23px',
              fontSize: 'x-large',
            }}
          >
            <ShoppingCartIconPage />
          </IconButton>
        )}
        <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>
    </div>
  );
}

export default Nav;
