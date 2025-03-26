import React, { useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router";




axios.defaults.baseURL="http://localhost:5000/"

function Create() {

    const navigate =useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        emailId: "",
        phoneNumber: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit =  async (e) => {
        e.preventDefault(); // ✅ Corrected typo here
        const data = await axios.post("/create",formData)
        console.log(data);
        navigate('/read')

        
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-96 bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl  font-bold text-center text-red-700">
                    Student Application Form
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded "
                    />

                    <label htmlFor="age">Age</label>
                    <input
                        type="number"
                        name="age"
                        id="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded"
                    />

                    <label htmlFor="emailId">Email ID</label>
                    <input
                        type="email"
                        name="emailId"
                        id="emailId"
                        value={formData.emailId}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded"
                    />

                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded"
                    />

                    <button
                        type="submit"
                        className="py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Create;
