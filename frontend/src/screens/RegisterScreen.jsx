import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { toast } from 'react-toastify';
import Loader from "../components/Loader";
import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import validator from "validator";


function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [errors,setErrors]=useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  

  const validateForm = () => {
    const errors = {};
  
    if (!name.trim()) {
      errors.name = 'Name is required';
    }
  
    if (!email.trim() || !validator.isEmail(email)) {
      errors.email = 'Valid email is required';
    }
  
    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
  
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
       
    }
  
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const isValid=validateForm();
    
    if(isValid){
      try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('profilePhoto', profilePhoto);

        const res=await register(formData).unwrap();
        dispatch(setCredentials({...res}))
        navigate('/') 

        
      } catch (err) {
        console.log(err)
        toast.error(err?.data?.message || err.error);
      }

    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={!!errors.name}
          ></Form.Control>
          {errors.name && <p style={{color: "red"}}>{errors.name}</p>}
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!!errors.email}
          ></Form.Control>
          {errors.email && <p style={{color: "red"}}>{errors.email}</p>}
        </Form.Group>

        <Form.Group controlId="profilePhoto">
          <Form.Label>Profile Photo</Form.Label>
          <Form.Control
            type="file"
            accept=".jpg,.png,.jpeg" // Specify accepted file types
            onChange={(e)=>setProfilePhoto(e.target.files[0])} // Handle file change
          />
        </Form.Group>


        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={!!errors.password}
          ></Form.Control>
          {errors.password && <p style={{color: "red"}}>{errors.password}</p>}
        </Form.Group>

        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            isInvalid={!!errors.confirmPassword}
          ></Form.Control>
          {errors.confirmPassword && <p style={{color: "red"}}>{errors.confirmPassword}</p>}
        </Form.Group>

        {isLoading && <Loader />}

        <Button type="submit" variant="primary" className="mt-3">
          Sign Up
        </Button>

        <Row className="py-3">
          <Col>
            Already have an account? <Link to='/login' >Login</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}

export default RegisterScreen;
