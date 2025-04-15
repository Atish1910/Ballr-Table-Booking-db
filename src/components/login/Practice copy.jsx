import axios from 'axios';
import React, { use, useState } from 'react';

const Practice = () => {

    //////Get Api Call /////////////////////
    const [userData, setUserData] = useState([]);
    const getUsers = async () =>{
        try {
            const res = await axios.get("https://projectapi.gerasim.in/api/BudgetPlanner/GetAllUsers");
            setUserData(res.data.data);
            
        } catch (error) {
            alert(error);
        }
    }

    //////Post Api Call /////////////////////
    const [userObj, setUserObj] = useState({
        "userId": 0,
        "userName": "",
        "emailId": "",
        "fullName": "",
        "role": "",
        "createdDate": new Date(),
        "password": "",
        "projectName": "",
        "refreshToken": "",
        "refreshTokenExpiryTime": new Date()
    });

    const updateFormValue = (event, key) =>{
        setUserObj(oldObj =>({...oldObj, [key]: event.target.value}));
    } 
    const saveNewUser = async () =>{
        const res = await axios.post("https://projectapi.gerasim.in/api/BudgetPlanner/AddNewUser", userObj);
        setUserObj(res.data.data);
        if(res.data.result){
            alert("New User Created");
            getUsers();
        }
        else{
            alert(res.data.message);
        }
    } 

    ///Edit Data/////////////////////////////////////////////////////////////
    const updateInfo = (data) =>{
            setUserObj(data)
    }

    const updateFormInfo = async () =>{
        const res = await axios.post("https://projectapi.gerasim.in/api/BudgetPlanner/UpdateUser", userObj);
        setUserObj(res.data.data);
        if(res.data.result){
            alert("User Data Updated");
            getUsers();
        }
        else{
            alert(res.data.message);
        }
    } 

    ///Delete Data/////////////////////////////////////////////////////////////
    const deleteUser = async (id) =>{
        const isDelete = window.confirm("Are You Sure You Want To Delete?");

        if(isDelete){
            const res = await axios.delete("https://projectapi.gerasim.in/api/BudgetPlanner/DeleteUserByUserId?userId="+id);
            // setUserObj(res.data.data);
            if(res.data.result){
                alert("Data Delete");
                getUsers();
            }
            else{
                alert(res.data.message);
            }
        }
    } 


    return (
        <section>
    <div className="container border mt-5">
        <div className="row p-5">
            <h1 className='mb-4'>Practice :  Call GET & Post</h1>
            <div class="col-lg-4 border ps-4">
                <div className="row text-center py-4">
                            <h5 className="">Create Users</h5>
                    </div>
                    <div class="row text-center">
                        <div class="col-lg-6 mb-3 ">
                            <input type="text" value={userObj.userName}  className="form-control" onChange={(event) => updateFormValue(event, "userName")} placeholder="User Name"/>
                        </div>
                        <div class="col-lg-6 mb-3 ">
                            <input type="email" value={userObj.emailId} onChange={(event) => updateFormValue(event, "emailId")}  className="form-control" placeholder="Email"/>
                        </div>
                        <div class="col-lg-6 mb-3 ">
                            <input type="text" value={userObj.fullName} onChange={(event) => updateFormValue(event, "fullName")}  className="form-control" placeholder="Full Name"/>
                        </div>
                    <div class="col-lg-6 mb-3 ">
                        <input type="password"  value={userObj.password} onChange={(event) => updateFormValue(event, "password")}  className="form-control" placeholder="Password"/>
                    </div>
                        <div class="col-lg-6 mb-3 ">
                            <input type="text" value={userObj.role} onChange={(event) => updateFormValue(event, "role")}  className="form-control" placeholder="Roll"/>
                        </div>
                        {
                            userObj.userId == 0 && <button class="btn btn-success" onClick={saveNewUser}>Submit</button>
                        }
                        {
                            userObj.userId != 0 && <button class="btn btn-warning" onClick={updateFormInfo}>Update </button>
                        }
                        
                    </div>
                </div>
            <div className="col-lg-8 ps-5">
                <div className="row py-3 mb-2  border border-dark">
                    <div className="col-lg-6 text-start">
                        <h5 className="">Get Users</h5>
                        
                    </div>
                    <div className="col-lg-6 text-end">
                        <button className="btn btn-primary" onClick={getUsers}>Load Users</button>
                    </div>
                </div>
                <div className="row">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>UserName</th>
                                <th>Email</th>
                                <th>Full Name</th>
                                <th>Role</th>
                                <th>Project Name</th>
                                <th>Update Info</th>
                            </tr>
                        </thead>
                        <tbody>
                                {
                                    userData.map((user, index) =>{
                                        return(
                                            <tr>
                                                <td>{index+1}</td>
                                                <td>{user.userName}</td>
                                                <td>{user.emailId}</td>
                                                <td>{user.fullName}</td>
                                                <td>{user.role}</td>
                                                <td>{user.projectName}</td>
                                                <td>
                                                    <button className='btn btn-warning' onClick={() => updateInfo(user)}>Edit</button>
                                                    <button className='btn btn-danger' onClick={() => deleteUser(user.userId)}>Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                        </tbody>
                    </table>
                </div>
            </div>
           
            </div>
    </div>
</section>
    );
};

export default Practice;