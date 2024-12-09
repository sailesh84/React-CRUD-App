import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/slice/userDetailsSlice";

const EditFrm = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data, isLoading } = useSelector((state) => state.app);
    const [updateData, setUpdatedData] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (id && data) {                                                                                                                                         
            const singleUser = data.filter((elem) => elem.id === id);
            setUpdatedData(singleUser[0]);
        }
    }, []);

    const getUserData = (e) => {
        //getting all the form values one-by-one
        setUpdatedData({ ...updateData, [e.target.name]: e.target.value });
    }

    //dispatching form values in "updateUser" reducer                                                                                                                              " reducer
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(updateData));
        // localStorage.setItem("lists", JSON.stringify(user));
        navigate("/read");
    }

    return (
        <div className="my-5">
            <h2>Edit the data</h2>
            <form className="w-50 mx-auto my-4" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" name="name" className="form-control" value={updateData && updateData.name} onChange={getUserData} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" value={updateData && updateData.email} onChange={getUserData} />
                </div>
                <div className="mb-3">
                    <label className="form-label" >Age</label>
                    <input type="text" className="form-control" name="age" value={updateData && updateData.age} onChange={getUserData} />
                </div>
                <div className="mb-3">
                    <input className="form-check-input" type="radio" name="gender" value="Male" checked={updateData && updateData.gender === "Male"} onChange={getUserData} />
                    <label className="form-check-label ms-2">
                        Male
                    </label>
                </div>
                <div className="mb-3">
                    <input className="form-check-input" type="radio" name="gender" value="Female" checked={updateData && updateData.gender === "Female"} onChange={getUserData} />
                    <label className="form-check-label ms-2">
                        Female
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    )
}

export default EditFrm;