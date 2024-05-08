import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
    useGetUsersDataMutation,
    useDeleteUserMutation,
    useUpdateUserAdminMutation,
    useAddNewUserMutation
} from '../slices/adminApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Form, InputGroup, Modal, FormControl, Container, Row, Col } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';


const DashboardScreen = () => {



    const [users, setUsers] = useState([]);
    const [findedUsers, setFindedUsers] = useState([]);
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        profilePhoto: null,
    })
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [editUserId, setEditUserId] = useState(null);
    const [editUserData, setEditUserData] = useState({
        name: '',
        email: '',
        password: '',
        profilePhoto: null,
    });



    const [getUsersDataAll] = useGetUsersDataMutation();
    const [deleteUser] = useDeleteUserMutation();
    const [updateUserDetails] = useUpdateUserAdminMutation();
    const [addUser] = useAddNewUserMutation();

    const navigate = useNavigate();

    async function fetchUser() {
        try {
            const res = await getUsersDataAll().unwrap('');
            setUsers(res.users);
        } catch (error) {

            toast.error('Failed to fetch user data.');
        }
    }

    useEffect(() => {
        fetchUser();
    }, [getUsersDataAll, navigate]);

    useEffect(() => {
        setFindedUsers(users)
    }, [users]);


    // delete user
    const handleDeleteUser = async (userId) => {
        setUserIdToDelete(userId);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteUser(userIdToDelete).unwrap();
            console.log(userIdToDelete, "dlt");
            setUsers(users.filter((user) => user._id !== userIdToDelete));
            setShowDeleteModal(false);
            toast.success('User deleted successfully.');
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Failed to delete user. Please try again.');
        }
    };

    const handleCloseModal = () => {
        setShowDeleteModal(false);
        setShowAddUserModal(false);
        setShowEditUserModal(false);
        setFormData({
            name: '',
            email: '',
            password: '',
            profilePhoto: null,
        });

    };



    const handleFormChange = (e) => {
        if (e.target.name === 'profilePhoto') {
            setFormData({
                ...formData,
                [e.target.name]: e.target.files[0]
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    }


    const handleAddUser = () => {
        setShowAddUserModal(true);
    };


    const handleAddUserSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataObj = new FormData();
            formDataObj.append('name', formData.name);
            formDataObj.append('email', formData.email);
            formDataObj.append('password', formData.password)
            formDataObj.append('profilePhoto', formData.profilePhoto)
            console.log(formData)
            await addUser(formDataObj).unwrap();
            setShowAddUserModal(false);
            fetchUser();
            toast.success("User added successfully");

        } catch (error) {
            console.log('Error adding user:', error)
            toast.error('Failed to add user.Please try again');
        }
    }
    const handleEditUser = (userId) => {
        const userToEdit = users.find((user) => user._id === userId);
        if (userToEdit) {
            setEditUserId(userId);
            setEditUserData({
                name: userToEdit.name,
                email: userToEdit.email,
                password: '',
                profilePhoto: null, // You may set the profile photo here if needed
            });
            setShowEditUserModal(true);
        }
    };

    const handleEditFormChange = (e) => {
        setEditUserData({
            ...editUserData,
            [e.target.name]: e.target.value,
        });
    };
    const handleEditUserSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUserDetails({
                userId: editUserId,
                updatedData: editUserData,
            }).unwrap();
            setShowEditUserModal(false);
            fetchUser();
            toast.success('User details updated successfully.');
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Failed to update user details. Please try again.');
        }
    };


    const handleSearchInputChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
      
        setFindedUsers(
          users.filter((user) =>
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query)
          )
        );
      }


    return (
        <>
         <h1 className="text-center mt-4 mb-4">Dashboard</h1>



        <div className='d-flex justify-content-center'>
      <InputGroup className="" style={{width:'500px'}}>
          <FormControl
            placeholder="Search by name or email"
            aria-label="Search by name"
            aria-describedby="basic-addon2"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <Button variant="secondary" id="button-addon2">
            Search
          </Button>
        </InputGroup>

      </div>
            <div className="d-flex justify-content-end mb-3">

                <button
                    type="button"
                    className="btn btn-dark"
                    onClick={handleAddUser}
                >
                    Add New User
                </button>
            </div>

{/* User details */}
            <div className="row">
    {findedUsers.map((user) => (
        <div className="col-md-6 mb-4" key={user.id}>
            <div className="card shadow">
                <div className="card-body d-flex align-items-center">

                    <div>
                        
                        <h5 className="card-title">
                        <img
                                    src={`http://localhost:8000/images/${user.profilePhoto}`}
                                    alt=""
                                    className="rounded-circle me-3"
                                    style={{ width: '50px', height: '50px' }}
                                />
                            {user.name}</h5>
                        <p className="card-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {user.email}</p>
                    </div>
                    <div className="ms-auto">
                        <button
                            type="button"
                            className="btn btn-hoVor me-2"
                            onClick={() => handleDeleteUser(user._id)}
                        >
                                 <MdDelete /> 
                        </button>
                        <button
                            type="button"
                            className="btn"
                            onClick={() => handleEditUser(user._id)}
                        >
                             <FaEdit /> 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ))}
</div>

            {/* <table className="table table-striped">
                <thead>
                    <tr >
                        <th >Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {findedUsers.map((user) => (
                        <tr key={user.id}>
                            <td>
                                <img
                                    src={`http://localhost:8000/images/${user.profilePhoto}`}
                                    alt=""
                                    className="rounded-circle me-3"
                                    style={{ width: '50px', height: '50px' }}
                                />{user.name}
                            </td>

                            <td>{user.email}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-danger me-2 "
                                    onClick={() => handleDeleteUser(user._id)}
                                >
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary "
                                    onClick={() => handleEditUser(user._id)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}

            {/* Modal for confirming user deletion */}
            <Modal show={showDeleteModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this user?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for add a new User */}
            <Modal show={showAddUserModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddUserSubmit}>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                name="name"
                                value={formData.name}
                                onChange={handleFormChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={formData.email}
                                onChange={handleFormChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                name="password"
                                value={formData.password}
                                onChange={handleFormChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formProfilePhoto">
                            <Form.Label>Profile Photo</Form.Label>
                            <Form.Control
                                type="file"
                                name="profilePhoto"
                                onChange={handleFormChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Add User
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit user */}
            <Modal show={showEditUserModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEditUserSubmit}>
                        <Form.Group className="mb-3" controlId="editFormName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                name="name"
                                value={editUserData.name}
                                onChange={handleEditFormChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="editFormEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={editUserData.email}
                                onChange={handleEditFormChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="editFormPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter new password"
                                name="password"
                                value={editUserData.password}
                                onChange={handleEditFormChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DashboardScreen
