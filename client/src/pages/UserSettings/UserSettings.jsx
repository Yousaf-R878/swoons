import React, { useState } from "react";
import NavbarExplore from "../../components/Navbar/NavbarExplore";
import { useParams } from "react-router-dom";
import axios from "axios";

const fakeUser = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "1212qwer",
};

const UserSettings = () => {
    const { id } = useParams();
    const [user, setUser] = useState(fakeUser);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(
                `http://localhost:3000/user/${id}`,
                user
            );
            console.log("User updated:", response.data);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <>
            <NavbarExplore />

            <div className="container mx-auto p-4">
                <form onSubmit={handleSubmit}>
                    <label>First Name</label>
                    <input
                        name="firstName"
                        value={user.firstName}
                        onChange={handleInputChange}
                    />

                    <label>Last Name</label>
                    <input
                        name="lastName"
                        value={user.lastName}
                        onChange={handleInputChange}
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleInputChange}
                    />

                    <button type="submit">Update Settings</button>
                </form>
            </div>
        </>
    );
};

export default UserSettings;
