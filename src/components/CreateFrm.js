import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../redux/slice/userDetailsSlice";

const CreateFrm = () => {
    //initializing state values for user form
    const [user, setUser] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getUserData = (e) => {
        //getting all the form values one-by-one
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    //dispatching form values in "createUser" reducer
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createUser(user));
        navigate("/read");
    }

    return (
        <div className="my-5">
            <h2>Fill the data</h2>
            <form className="w-50 mx-auto my-4" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" name="name" className="form-control" onChange={getUserData} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" onChange={getUserData} />
                </div>
                <div className="mb-3">
                    <label className="form-label" >Age</label>
                    <input type="text" className="form-control" name="age" onChange={getUserData} />
                </div>
                <div className="mb-3">
                    <input className="form-check-input" type="radio" name="gender" value="Male" onChange={getUserData} />
                    <label className="form-check-label ms-2">
                        Male
                    </label>
                </div>
                <div className="mb-3">
                    <input className="form-check-input" type="radio" name="gender" value="Female" onChange={getUserData} />
                    <label className="form-check-label ms-2">
                        Female
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CreateFrm;