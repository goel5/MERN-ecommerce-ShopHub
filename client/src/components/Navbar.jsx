import { Search, ShoppingCartOutlined } from '@mui/icons-material';
import { Badge } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '../redux/apiCalls';
import { clearCart } from '../redux/cartRedux';
import { clearOrders } from '../redux/orderRedux';
import { userRequest } from '../requestMethods';
import { mobile } from '../responsive';
const Container = styled.div`
  height: 60px;
  ${mobile({ height: '50px' })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  ${mobile({ padding: '10px 0px' })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Language = styled.div`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: 'none' })}
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;
const Input = styled.input`
  border: none;
  ${mobile({ width: '50px' })}
`;
const Center = styled.div`
  display: flex;
  flex: 1;
  text-align: center;
  ${mobile({
    textAlign: 'right',
    marginLeft: '10px',
  })}
`;
const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: '24px' })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({
    // justifyContent: 'center',
    justifyContent: 'flex-end', //Comment out after including search bar
    marginRight: '15px', //Comment out after including search bar
    flex: 2,
  })}
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  color: black;
  ${mobile({ fontSize: '12px', marginLeft: '10px' })}
`;
export const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  // console.log(quantity);
  const user = useSelector((state) => state.user.currentUser);
  const cartProducts = useSelector((state) => state.cart.products);
  // console.log('cartProducts', cartProducts);
  // console.log(user);
  const history = useHistory();
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    // const userCart = { products: [] };
    // if (cartProducts.length) {
    //   await cartProducts.forEach((item) => {
    //     userCart.products.push({
    //       productId: item._id,
    //       quantity: item.quantity,
    //       size: item.size,
    //       color: item.color,
    //     });
    //   });
    //   await userRequest.put(`/carts/${user._id}`, userCart);
    // }

    logout(dispatch);
    dispatch(clearCart());
    dispatch(clearOrders());
    history.push('/');
  };
  useEffect(() => {}, [history]);
  return (
    <Container>
      <Wrapper>
        {/* <Left>   //TODO implement search functionality
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: 'gray', fontSize: 16 }} />
          </SearchContainer>
        </Left> */}
        <Center>
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
            <Logo>ShopHub</Logo>
          </Link>
        </Center>
        <Right>
          {user ? (
            <MenuItem>HI {user.username.toUpperCase()}</MenuItem>
          ) : (
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <MenuItem>REGISTER</MenuItem>
            </Link>
          )}
          {user && (
            <Link to="/orders" style={{ textDecoration: 'none' }}>
              <MenuItem>MY ORDERS</MenuItem>
            </Link>
          )}
          {user ? (
            <MenuItem onClick={logoutHandler}>LOGOUT</MenuItem>
          ) : (
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <MenuItem>SIGNIN</MenuItem>
            </Link>
          )}
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};
