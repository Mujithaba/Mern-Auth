import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';

import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useLogoutMutation } from '../slices/userApiSlice';
import { logout } from '../slices/authSlice';
import {adminLogout} from '../slices/authAdminSlice'
import { useAdminLogoutMutation } from '../slices/adminApiSlice';


const Header = () => {

    const { userInfo } = useSelector((state) => state.auth);

    const {adminInfo} = useSelector((state)=>state.adminAuth)

    

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();
    const [adminLogoutApiCall] = useAdminLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    // logoutAdmin handler
    const logoutAdminHandler = async () => {
        try {
            await adminLogoutApiCall().unwrap();
            dispatch(adminLogout());
            navigate('/admin');
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect >
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand >MERN Auth</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav' >
                        <Nav className="ms-auto">
                            {userInfo ? (
                                <>
                                    <NavDropdown title={userInfo.name} id='username'>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item>  Profile </NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            ) : ( 
                                <>
                                    {adminInfo ? (
                                      <button style={{color: 'white',background: 'black'}} onClick={logoutAdminHandler} >Logout</button>
                                 
                                    ) : null
                                    // (
                                    //     <>
                                    //         {/* <LinkContainer to='/login'>
                                    //             <Nav.Link >
                                    //                 <FaSignInAlt />Sign In
                                    //             </Nav.Link>
                                    //         </LinkContainer>
                                    //         <LinkContainer to='/register'>
                                    //             <Nav.Link >
                                    //                 <FaSignOutAlt />Sign Up
                                    //             </Nav.Link>
                                    //         </LinkContainer> */}
                                            
                                            
                                    //     </>
                                    // )
                                    }

                                </>
                            )}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;