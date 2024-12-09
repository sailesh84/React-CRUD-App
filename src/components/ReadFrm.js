import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, showAllUser } from "../redux/slice/userDetailsSlice";
import Modal from "./Modal";


const ReadFrm = () => {
    const dispatch = useDispatch();
    const { data, isLoading, searchData } = useSelector((state) => state.app);
    const [id, setId] = useState();
    const [showPopup, setShowPopup] = useState(false);
    const [filterByGender, setFilterByGender] = useState("");

    useEffect(() => {
        //dispatching user values in "showAllUser" reducer
        dispatch(showAllUser());
    }, []);

    if (isLoading) {
        return (
            <h2>Loading...</h2>
        )
    }

    return (
        <div className="my-5">
            {showPopup && <Modal id={id} showPopup={showPopup} setShowPopup={setShowPopup} />}
            <h1>Read Form</h1>

            <input className="form-check-input" name="gender" type="radio" checked={filterByGender === ""} onChange={(e) => setFilterByGender("")} />
            <label className="form-check-label ms-2 me-3">All</label>
            <input className="form-check-input" name="gender" value="Male" type="radio" checked={filterByGender === "Male"} onChange={(e) => setFilterByGender(e.target.value)} />
            <label className="form-check-label ms-2 me-3">Male</label>
            <input className="form-check-input" name="gender" value="Female" type="radio" checked={filterByGender === "Female"} onChange={(e) => setFilterByGender(e.target.value)} />
            <label className="form-check-label ms-2 me-3">Female</label>


            {data &&
                data.filter((elem) => {
                    if (searchData.length === 0) {
                        return elem;
                    } else {
                        return elem.name.toLowerCase().includes(searchData.toLowerCase());
                    }
                })
                .filter((elem) => {
                    if (filterByGender === "Male") {
                        return elem.gender === filterByGender;
                    } else if (filterByGender === "Female") {
                        return elem.gender === filterByGender;
                    } else {
                        return elem;
                    }
                })
                .map((element) => (
                    <div className="card w-50 mx-auto my-4" key={element.id}>
                        <div className="card-body">
                            <h5 className="card-title">{element.name}</h5>
                            <p className="card-text">{element.email}</p>
                            <button className="btn btn-primary" onClick={() => [setId(element.id), setShowPopup(true)]}>View</button>
                            <Link to={`/edit/${element.id}`} className="btn btn-primary ms-2">Edit</Link>
                            <button className="btn btn-primary ms-2" onClick={() => dispatch(deleteUser(element.id))}>Delete</button>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default ReadFrm;