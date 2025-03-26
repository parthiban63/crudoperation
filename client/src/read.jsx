import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function Read() {
    const [users, setUsers] = useState([]);
    const [popup, setPopup] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // Fetch user list
    const getDataList = async () => {
        try {
            const response = await axios.get('/read');
            console.log(response.data);
            setUsers(response.data.data || []); // Ensure data is an array
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    // Delete user
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                const response = await axios.delete(`/delete/${id}`);
                alert(response.data.message);
                getDataList();
            } catch (error) {
                console.error("Error deleting user", error);
            }
        }
    };

    // Open edit modal
    const handleEdit = (user) => {
        setSelectedUser(user);
        setPopup(true);
    };

    // Handle form changes inside the modal
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    // Update user
    const handleUpdate = async () => {
        try {
            const response = await axios.put(`/update/:id${selectedUser._id}`, selectedUser);
            alert(response.data.message);
            setPopup(false);
            getDataList();
        } catch (error) {
            console.error("Error updating user", error);
        }
    };

    useEffect(() => {
        getDataList();
    }, []);

    return (
        <div>
            <div className=" items-center flex  justify-center py-4">
                <h1 className="text-2xl items-center font-bold">User List</h1>
            </div>

            <div className='w-full h-full flex justify-center items-center'>
                <table className="  items-center rounded-b-full border-gray-400  ">
                    <thead className="border-gray-400">
                        <tr className="border-1">
                            <th className="px-4 py-2">SH.No</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Age</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Phone Number</th>
                            <th className="px-4 gap-px py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user,index) => (
                                <tr key={user._id}>
                                    <td className="px-4 py-2">{index+1}</td>
                                    <td className="px-4 py-2">{user.name}</td>
                                    <td className="px-4 py-2">{user.age}</td>
                                    <td className="px-4 py-2">{user.emailId}</td>
                                    <td className="px-4 py-2">{user.phoneNumber}</td>
                                    <td className="px-4 py-2 gap-px flex">
                                        <button className="text-blue-500 p-2 rounded " onClick={() => handleEdit(user)}>
                                            <FaEdit className='mr-2 size-max' />
                                        </button>
                                        <button className="text-red-500 p-2  rounded" onClick={() => handleDelete(user._id)}>
                                            <MdDelete className='mr-2 size-min' />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Popup */}
            {popup && selectedUser && (
                <div className="fixed inset-0 bg-gray-100  bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Update User</h2>
                        <form className="flex flex-col gap-4">
                            <label>Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                value={selectedUser.name} 
                                onChange={handleChange} 
                                className="border p-2 rounded" 
                            />

                            <label>Age</label>
                            <input 
                                type="number" 
                                name="age" 
                                value={selectedUser.age} 
                                onChange={handleChange} 
                                className="border p-2 rounded" 
                            />

                            <label>Email</label>
                            <input 
                                type="email" 
                                name="emailId" 
                                value={selectedUser.emailId} 
                                onChange={handleChange} 
                                className="border p-2 rounded" 
                            />

                            <label>Phone Number</label>
                            <input 
                                type="tel" 
                                name="phoneNumber" 
                                value={selectedUser.phoneNumber} 
                                onChange={handleChange} 
                                className="border p-2 rounded" 
                            />

                            <div className="flex justify-between">
                                <button type="button" onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded">Update</button>
                                <button type="button" onClick={() => setPopup(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Read;
