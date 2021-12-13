import React, { useState,useEffect} from "react";
import axios from "axios";
import {Table} from "react-bootstrap";

const defaultValues = {
  title:"",
  album:"",
  publishingyear:"",
  artist:"",
  ipfsHash:"",
  publicHash:"",
};

function User () {
    const [users, setUsers] = useState([defaultValues]);
    const [singleUser, setSingleUser] = useState([defaultValues]);

    useEffect (function () {
        axios.get().then((response) => setUsers(response.data)).then((error) => console.log(error));
    }, []);

    const onddlChange = (e) => {
        axios.get().then((response) => setSingleUser(response.data)).then((error) => console.log(error));
    }

    return(
        <div>
            <select className="form-control col-md-3" onChange={onddlChange}>
                <option value="0"> --Select Musician--</option>
                {users.map((user) => (
                    <option key={user.publicHash} value={user.publicHash}>
                    {user.ipfsHash}
                    </option>
                ))}
            </select>
            <br />
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <td>Title</td>
                        <td>Album</td>
                        <td>Publishing Year</td>
                        <td>Artist</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{singleUser.title}</td>
                        <td>{singleUser.album}</td>
                        <td>{singleUser.publishingyear}</td>
                        <td>{singleUser.artist}</td>

                    </tr>
                </tbody>
            </Table>
        </div>
    )
};
export default User;