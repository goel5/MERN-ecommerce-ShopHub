import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { FavoriteBorderOutlined, SearchOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
const Info = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;
const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #f5fbf8;

  &:hover ${Info} {
    opacity: 1;
  }
`;
const Circle = styled.div`
  width: 200px;
  height: 200px;
  position: absolute;
  border-radius: 50%;
  background-color: white;
`;
const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ffff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  transition: all ease 0.5s;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
export const Product = ({ item }) => {
  const history = useHistory();
  return (
    <Container onClick={() => history.push(`/product/${item._id}`)}>
      <Circle />
      <Image src={item.img} />
      <Info>
        {/* <Icon>{
          }
          <ShoppingCartOutlinedIcon />
        </Icon> */}
        <Icon>
          <Link to={`/product/${item._id}`}>
            <SearchOutlined />
          </Link>
        </Icon>
        {/* <Icon>
          <FavoriteBorderOutlined />
        </Icon> */}
      </Info>
    </Container>
  );
};
