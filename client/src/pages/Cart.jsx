import React, { useEffect, useState } from 'react';
import { Announcement } from '../components/Announcement';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import styled from 'styled-components';
import { Add, Remove } from '@mui/icons-material';
import { mobile } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { useHistory } from 'react-router-dom';
import { clearCart, removeProduct, updateProduct } from '../redux/cartRedux';
import axios from 'axios';
import { createOrder, emptyCart, setUserCart } from '../setters';
import { addOrder } from '../redux/orderRedux';
const KEY = process.env.REACT_APP_STRIPE;
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
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  justify-content: space-around;
`;
const Image = styled.img`
  width: 200px;
  /* ${mobile({ width: '150px' })} */
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
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
  background-color: #eee;
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
export const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const onToken = (token) => {
    setStripeToken(token);
  };
  useEffect(() => {
    // const getUserCart = async () => {
    //   const cart = await axios.get(`/api/carts/find/${user.currentUser._id}`, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       token: `Bearer ${user.currentUser.accessToken}`,
    //     },
    //   });
    //   dispatch(updateCart(cart.data));
    // };
    // user.currentUser && getUserCart();
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          '/api/checkout/payment',
          {
            tokenId: stripeToken.id,
            amount: cart.total * 100,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              token: `Bearer ${user.currentUser.accessToken}`,
            },
          }
        );
        // const order = {
        //   userId:user.currentUser._id,
        //   products:cart.products.map((item)=>)
        // }
        const order = await createOrder(
          user.currentUser._id,
          cart,
          user.currentUser.accessToken
        );
        history.push('/orders', { data: res.data });
        await dispatch(addOrder({ order }));

        await dispatch(clearCart());
        await emptyCart(user.currentUser._id, user.currentUser.accessToken);
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, history]);
  console.log(cart);

  const removeItem = async (product) => {
    user.currentUser &&
      setUserCart(
        user.currentUser._id,
        cart.products.filter((p) => p._id !== product._id),
        user.currentUser.accessToken
      );
    await dispatch(removeProduct({ ...product }));
  };
  const handleQuantity = async (product, operation) => {
    const price = product.price;
    const productId = product._id;
    const userId = user.currentUser && user.currentUser._id;
    const token = user.currentUser && user.currentUser.accessToken;
    if (operation === 'dec') {
      if (product.quantity > 1) {
        let decProduct = cart.products.map((p) =>
          p._id === product._id ? { ...p, quantity: p.quantity - 1 } : p
        );
        user.currentUser &&
          setUserCart(
            user.currentUser._id,
            decProduct,
            user.currentUser.accessToken
          );
        await dispatch(
          updateProduct({ price, productId, userId, operation, token })
        );
      }
    } else {
      let incProduct = cart.products.map((p) =>
        p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
      );
      user.currentUser &&
        setUserCart(
          user.currentUser._id,
          incProduct,
          user.currentUser.accessToken
        );
      await dispatch(
        updateProduct({ price, productId, userId, operation, token })
      );
    }
  };
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>
          {cart.products.length === 0 ? 'YOUR CART IS EMPTY' : 'YOUR BAG'}
        </Title>
        <Top>
          <TopButton onClick={() => history.push('/')}>
            CONTINUE SHOPPING
          </TopButton>
          <TopTexts>
            <TopText>Shopping Bag({cart.products.length})</TopText>
            <TopText>Your Wishlist(0)</TopText>
          </TopTexts>
          {cart.products.length > 0 && (
            <StripeCheckout
              name="ShopHub"
              image="https://i.ytimg.com/vi/sFL1-zFSeHE/maxresdefault.jpg"
              billingAddress
              shippingAddress
              description={`Your total is Rs.${
                cart.total > 500 ? cart.total : cart.total + 59
              }`}
              amount={
                cart.total > 500 ? cart.total * 100 : (cart.total + 59) * 100
              }
              token={onToken}
              stripeKey={KEY}
              currency="INR"
            >
              <TopButton type="filled">CHECKOUT NOW</TopButton>
            </StripeCheckout>
          )}
        </Top>
        {cart.products.length > 0 && (
          <Bottom>
            <Info>
              {cart.products.map((product) => (
                <>
                  <Product>
                    <ProductDetail>
                      <Image src={product.img} />
                      <Details>
                        <ProductName>{product.title}</ProductName>
                        <ProductPrice>
                          Rs. {product.price * product.quantity}
                        </ProductPrice>
                        {/* <ProductId>
                          <b>ID:</b>
                          {product._id}
                        </ProductId> */}
                        <ProductColor color={product.color} />
                        <ProductSize>
                          <b>Size: </b>
                          {product.size}
                        </ProductSize>
                      </Details>
                      <UpdateDetails>
                        <ProductAmountContainer>
                          <Add onClick={() => handleQuantity(product, 'inc')} />
                          <ProductAmount>{product.quantity}</ProductAmount>
                          <Remove
                            onClick={() => handleQuantity(product, 'dec')}
                          />
                        </ProductAmountContainer>
                        <DeleteButton onClick={() => removeItem(product)}>
                          Remove
                        </DeleteButton>
                      </UpdateDetails>
                    </ProductDetail>
                    {/* <PriceDetail>
                    <ProductPrice>
                      Rs. {product.price * product.quantity}
                    </ProductPrice>
                    <ProductAmountContainer>
                      Remove
                      <Add />
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <Remove />
                    </ProductAmountContainer>
                  </PriceDetail> */}
                  </Product>
                  <UpdateDetailsMobile>
                    <ProductAmountContainer>
                      <Add onClick={() => handleQuantity(product, 'inc')} />
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <Remove onClick={() => handleQuantity(product, 'dec')} />
                    </ProductAmountContainer>
                    <DeleteButton onClick={() => removeItem(product)}>
                      Remove
                    </DeleteButton>
                  </UpdateDetailsMobile>
                  <Hr />
                </>
              ))}
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>Rs. {cart.total}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>Rs. 59</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>
                  Rs. {cart.total > 500 ? -59 : 0}
                </SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>
                  Rs. {cart.total > 500 ? cart.total : cart.total + 59}
                </SummaryItemPrice>
              </SummaryItem>
              <StripeCheckout
                name="ShopHub"
                image="https://i.ytimg.com/vi/sFL1-zFSeHE/maxresdefault.jpg"
                billingAddress
                shippingAddress
                description={`Your total is Rs.${
                  cart.total > 500 ? cart.total : cart.total + 59
                }`}
                amount={
                  cart.total > 500 ? cart.total * 100 : (cart.total + 59) * 100
                }
                token={onToken}
                stripeKey={KEY}
                currency="INR"
              >
                <Button>CHECKOUT NOW</Button>
              </StripeCheckout>
            </Summary>
          </Bottom>
        )}
      </Wrapper>
      <Footer />
    </Container>
  );
};
