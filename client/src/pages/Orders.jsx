import React, { useEffect, useState } from 'react';
import { Announcement } from '../components/Announcement';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getOrders } from '../redux/orderRedux';
const Container = styled.div`
  ${mobile({ width: '100vw', overflowX: 'hidden' })}
`;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: '10px' })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === 'filled' && 'none'};
  background-color: ${(props) =>
    props.type === 'filled' ? 'black' : 'transparent'};
  color: ${(props) => props.type === 'filled' && 'white'};
`;
const TopTexts = styled.div`
  ${mobile({ display: 'none' })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
`;
const Info = styled.div`
  flex: 3;
`;
const Product = styled.div`
  display: flex;
  /* justify-content: space-between; */
  /* height: 50%; */
  ${mobile({ flexDirection: 'column' })}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  justify-content: space-around;
`;
const Image = styled.img`
  width: 200px;
  /* border: 2px solid red; */
  /* ${mobile({ width: '150px' })} */
`;
const Details = styled.div`
  padding: 20px;
  /* border: 2px solid black; */
  display: flex;
  width: 300px;
  flex-direction: column;
  justify-content: space-around;
`;
const UpdateDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${mobile({ display: 'none' })}
`;
const UpdateDetailsMobile = styled.div`
  display: none;
  justify-content: space-around;
  align-items: center;
  ${mobile({ display: 'flex' })}
`;
const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 10px;
  border: 1px solid black;
  border-radius: 5px;
  color: black;
  padding: 2px 5px;
  font-size: 15px;
  background-color: white;
  cursor: pointer;
  &:active {
    background-color: red;
    color: white;
    border: 1px solid red;
  }
  ${mobile({ margin: '0' })}
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const ProductSize = styled.span``;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 5px;
  padding: 2px 5px;
  font-size: 15px;
  ${mobile({ margin: '0' })}
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: ' 5px 15px' })}
`;
const ProductPrice = styled.div`
  font-size: 25px;
  font-weight: 600;
  ${mobile({ marginBottom: '20px', fontSize: '20px' })}
`;
const Hr = styled.hr`
  background-color: teal;
  border: none;
  height: 1px;
`;
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === 'total' && '500'};
  font-size: ${(props) => props.type === 'total' && '24px'};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  font-weight: 600;
  color: white;
`;
const DeliveryInfo = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  flex-direction: column;
  ${mobile({ display: 'none' })}
`;
const Confirmation = styled.div`
  color: green;
  font-weight: 600;
  font-size: 15px;
`;
const OrderArrival = styled.div`
  font-size: 18px;
  ${mobile({ marginBottom: '15px' })}
`;
export const Orders = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('orders-page', order);
    // user.currentUser &&
    //   dispatch(getOrders(user.currentUser._id, user.currentUser.accessToken));
  }, []);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>
          {order.orders.length === 0 ? 'NO RECENT ORDERS' : 'YOUR ORDERS'}
        </Title>
        <Top>
          <TopButton onClick={() => history.push('/')}>
            CONTINUE SHOPPING
          </TopButton>
          <TopButton onClick={() => history.push('/cart')}>
            GO TO CART
          </TopButton>
          {/* <TopTexts>
            <TopText>Shopping Bag({cart.products.length})</TopText>
            <TopText>Your Wishlist(0)</TopText>
          </TopTexts> */}
        </Top>
        {order.orders.length > 0 && (
          <Bottom>
            <Info>
              {order.orders.map((product) => (
                <>
                  <Product>
                    <ProductDetail>
                      <Image src={product.img} />
                      <Details>
                        <ProductName>{product.title}</ProductName>
                        <ProductPrice>
                          Rs. {product.price * product.quantity}
                        </ProductPrice>
                        <ProductId>
                          <b>Quantity: </b>
                          {product.quantity}
                        </ProductId>
                        <ProductColor color={product.color} />
                        <ProductSize>
                          <b>Size: </b>
                          {product.size}
                        </ProductSize>
                      </Details>
                      <DeliveryInfo>
                        <Confirmation>Order confirmed</Confirmation>
                        {new Date().getTime() >
                        new Date(product.orderDate).getTime() +
                          7 * 24 * 3600 * 1000 ? (
                          <OrderArrival>
                            Delivered on {new Date(product.orderDate).getDate()}
                            /{new Date(product.orderDate).getMonth()}/
                            {new Date(product.orderDate).getFullYear()}
                          </OrderArrival>
                        ) : (
                          <OrderArrival>
                            Arriving on{' '}
                            {new Date(
                              new Date(product.orderDate).getTime() +
                                7 * 24 * 3600 * 1000
                            ).getDate()}
                            /
                            {new Date(
                              new Date(product.orderDate).getTime() +
                                7 * 24 * 3600 * 1000
                            ).getMonth()}
                            /
                            {new Date(
                              new Date(product.orderDate).getTime() +
                                7 * 24 * 3600 * 1000
                            ).getFullYear()}
                          </OrderArrival>
                        )}
                      </DeliveryInfo>
                    </ProductDetail>
                  </Product>
                  <UpdateDetailsMobile>
                    {new Date().getTime() >
                    new Date(product.orderDate).getTime() +
                      7 * 24 * 3600 * 1000 ? (
                      <OrderArrival>
                        Delivered on {new Date(product.orderDate).getDate()}/
                        {new Date(product.orderDate).getMonth()}/
                        {new Date(product.orderDate).getFullYear()}
                      </OrderArrival>
                    ) : (
                      <OrderArrival>
                        Arriving on{' '}
                        {new Date(
                          new Date(product.orderDate).getTime() +
                            7 * 24 * 3600 * 1000
                        ).getDate()}
                        /
                        {new Date(
                          new Date(product.orderDate).getTime() +
                            7 * 24 * 3600 * 1000
                        ).getMonth()}
                        /
                        {new Date(
                          new Date(product.orderDate).getTime() +
                            7 * 24 * 3600 * 1000
                        ).getFullYear()}
                      </OrderArrival>
                    )}
                  </UpdateDetailsMobile>
                  <Hr />
                </>
              ))}
            </Info>
          </Bottom>
        )}
      </Wrapper>
      <Footer />
    </Container>
  );
};
