import React from "react";
import { useSelector } from "react-redux";
import "./Modal.css";

const Modal = ({ id, showPopup, setShowPopup }) => {
    const allUsers = useSelector((state) => state.app.data);
    const singleUser = allUsers.filter((elem) => elem.id === id);

    return (
        <div className="modalBackground">
            <div className="card modalContainer">
                <div className="card-header">
                    <h4>{singleUser[0].name}</h4>
                </div>
                <div className="card-body">
                    <p>{singleUser[0].email}</p>
                    <p>{singleUser[0].gender} - {singleUser[0].age}</p>
                </div>
                <div className="card-footer">
                    <button class="btn btn-secondary" onClick={() => setShowPopup(false)}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;