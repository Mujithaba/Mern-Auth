import React from 'react'
import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className='py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          {userInfo ? (
            <>
              <h1 className="text-center mb-4">Welcome <b>{userInfo.name}</b></h1>
              <p className="text-center mb-4">
                This is a boilerplates for MERN authentication that stores a JWT in an HTTP-Only cookie. It also Redux ToolKit and the React Bosststrap library
              </p>
            </>
          ) : (
              <>
                <h1 className="text-center mb-4">MERN Authentication</h1>
                <p className="text-center mb-4">
                  This is a boilerplates for MERN authentication that stores a JWT in an HTTP-Only cookie. It also Redux ToolKit and the React Bosststrap library
                </p>
                <div className="d-flex">
                  <LinkContainer to='/login'>
                    <Button variant='primary' className='me-3'>
                      Sign In
                    </Button>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Button variant='second' className='me-3'>
                      Sign Up
                    </Button>
                  </LinkContainer>
                </div>
              </>
            )
          }
        </Card>
      </Container>
    </div>
  );
};

export default Hero
