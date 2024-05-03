import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from "../components/FormContainer";
import { setAdminCredentials } from "../slices/authAdminSlice";
import {toast } from 'react-toastify';
import Loader from "../components/Loader";
import { useAdminLoginMutation } from "../slices/adminApiSlice";


function AdminLoginScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('')

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useAdminLoginMutation();

  const { adminInfo } = useSelector((state) => state.adminAuth);

  useEffect(() => {
    if (adminInfo) {
      navigate('/dashboard');
    }
  }, [navigate, adminInfo]);

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
     const res = await login({email,password}).unwrap();
     dispatch(setAdminCredentials({...res}));
     navigate('/dashboard');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    console.log(err);
    }
  };

  return (
    <FormContainer>
      <h1>Admin Login In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        { isLoading && <Loader />}

        <Button type="submit" variant="primary" className="mt-3">
          Sign In
        </Button>

       
      </Form>
    </FormContainer>
  )
}

export default AdminLoginScreen;
