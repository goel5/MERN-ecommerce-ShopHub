// import { Add, Remove } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Announcement } from '../components/Announcement';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { Newsletter } from '../components/Newsletter';
import { addProduct } from '../redux/cartRedux';
import { publicRequest } from '../requestMethods';
import { mobile } from '../responsive';
import { addToCart } from '../setters';

const Container = styled.div``;
const Wrapper = styled.div`
  display: flex;
  padding: 50px;
  ${mobile({ padding: '10px', flexDirection: 'column' })}
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: '40vh' })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: '10px' })}
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Desc = styled.p`
  margin: 20px 0px;
`;
const Price = styled.span`
  font-weight: 400;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin: 30px 0px;
  ${mobile({ width: '100%' })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: ${(props) => (props.active ? `2px solid black` : null)};
  margin: 0 5px;
  padding: 2px;
  cursor: pointer;
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;
const FilterSizeOption = styled.option``;
const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: '100%' })}
`;
// const AmountContainer = styled.div`
//   display: flex;
//   align-items: center;
//   font-weight: 700;
// `;
// const Amount = styled.span`
//   width: 30px;
//   height: 30px;
//   border-radius: 10px;
//   border: 1px solid teal;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 0 5px;
// `;
const Button = styled.button`
  padding-block: 10px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 20px;
  width: 100%;
  &:hover {
    background-color: #f8f4f4;
  }
  &:active {
    background-color: teal;
    color: white;
  }
`;

export const Product = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [product, setProduct] = useState({});
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const quantity = 1;
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/find/${id}`);
        await setProduct(res.data);
        color === '' && (await setColor(res.data.color[0]));
        size === '' && (await setSize(res.data.size[0]));
      } catch {}
    };
    getProduct();
  }, [id]);
  const handleClick = () => {
    if (cart.products.find((p) => p._id === id)) {
      history.push('/cart');
    } else {
      const userId = user.currentUser && user.currentUser._id;
      const token = user.currentUser && user.currentUser.accessToken;
      const data = {
        _id: id,
        quantity,
        size,
        color,
      };
      userId && addToCart(userId, data, token);
      dispatch(addProduct({ ...product, quantity, color, size }));
    }
  };
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>Rs. {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c) => (
                <FilterColor
                  active={c === color}
                  color={c}
                  key={c}
                  onClick={() => setColor(c)}
                />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            {/* <AmountContainer>
              <Remove onClick={() => handleQuantity('dec')} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity('inc')} />
            </AmountContainer> */}
            <Button onClick={() => handleClick()}>
              {cart.products.find((p) => p._id === id)
                ? 'GO TO CART'
                : 'ADD TO CART'}
            </Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};
