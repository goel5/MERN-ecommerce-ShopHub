import styled from 'styled-components';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { mobile } from '../responsive';
import axios from 'axios';
import { useState } from 'react';
import { login } from '../redux/apiCalls';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url('https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')
      center;
  display: flex;
  background-size: cover;
  /* align-items: center; */
  justify-content: space-between;
  flex-direction: column;
`;
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  align-self: center;
  ${mobile({ width: '75%' })}
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
export const Register = () => {
  const [username, setUsername] = useState('test1');
  const [email, setEmail] = useState('fvag@gmail.com');
  const [password, setPassword] = useState('123456');
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory;
  const handleClick = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const data = await axios.post(
        `/api/auth/register`,
        {
          username,
          email,
          password,
        },
        config
      );
      await login(dispatch, { username, password });
      console.log('njkfv', data.data._id);
      setTimeout(function () {
        axios.post(
          `/api/carts`,
          {
            userId: data.data._id,
            products: [],
          },
          {
            headers: {
              'Content-Type': 'application/json',
              token: `Bearer ${
                JSON.parse(
                  JSON.parse(localStorage.getItem('persist:root')).user
                ).currentUser.accessToken
              }`,
            },
          }
        );
      }, 500);

      history.push('/');
    } catch (err) {}
    // login(dispatch, { username, password });
  };
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="name" />
          <Input placeholder="last name" />
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input placeholder="confirm password" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleClick}>CREATE</Button>
        </Form>
      </Wrapper>
      <Footer />
    </Container>
  );
};
