import axios from "axios";
import React, { useState } from "react";

const GetPostApi = () =>{

    /// get API call Code Start
    const [userData, setUserData] = useState([]);
    const getUserData = async () =>{
        try {
            const apiCall = await axios.get("https://projectapi.gerasim.in/api/BudgetPlanner/GetAllUsers");
            setUserData(apiCall.data.data);
            
        } catch (error) {
            alert("Failed to featch Data From API", error);
        }
    }
    /// get API call Code End

    // Post API Call Start
    const [userObj, setUserObj] = useState(
        {
            "name":"",
            "email":"",
            "password":"",
            "accountType":"",
            "contactNumber": 0,
            "otp":""
        }
    );
    const updateFormValue = (event, key) =>{
        setUserObj(oldObj => ({...oldObj ,[key]: event.target.value}))
    }
    const saveNewUser = async  () =>{
        
        const createUserApiCall = await axios.post("https://ballr-wpc0.onrender.com/api/v1/sendotp", userObj);
        setUserObj(createUserApiCall.data.data);

        if(createUserApiCall.data.result){
            alert("Create a New user");
            getUserData();
        }
        else{
            alert(createUserApiCall.data.message);
        }
    }


    return(
        
    <section>
    <div className="container border mt-5">
        <div className="row p-5">
            <h1 className="mb-4">GetPostApi : API Call GET & Post</h1>
            <div className="col-lg-8 border pe-5">
                <div className="row border py-3 mb-4">
                    <div className="col-lg-6 text-start">
                        <h5 className="text-dark">Get Users</h5>
                        
                    </div>
                    <div className="col-lg-6 text-end">
                        <button className="btn btn-primary" onClick={getUserData}>Load Users</button>
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
                                <th>Project Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userData.map((user) =>{
                                    return(
                                        <tr>
                                            <td>{user.userId}</td>
                                            <td>{user.userName}</td>
                                            <td>{user.emailId}</td>
                                            <td>{user.fullName}</td>
                                            <td>{user.role}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-lg-4 border">
            <div className="row text-center py-3">
                        <h5 className="text-white">Create Users</h5>
                </div>
                <div class="row py-4">
                    <div class="col-lg-6 mb-3">
                        <input type="text" className="form-control"  onChange={(event) => updateFormValue(event, "username")} placeholder="User Name"/>
                    </div>
                    <div class="col-lg-6 mb-3">
                        <input type="email" className="form-control"  onChange={(event) => updateFormValue(event, "emailId")} placeholder="Email"/>
                    </div>
                    <div class="col-lg-6 mb-3">
                        <input type="text" className="form-control"  onChange={(event) => updateFormValue(event, "fullName")} placeholder="Full Name"/>
                    </div>
                    <div class="col-lg-6 mb-3">
                        <input type="text" className="form-control"  onChange={(event) => updateFormValue(event, "role")} placeholder="Roll"/>
                    </div>
                    <div class="col-lg-6 mb-3">
                        <input type="password" className="form-control"  onChange={(event) => updateFormValue(event, "password")} placeholder="Password"/>
                    </div>
                    <div class="col-lg-6 mb-3">
                        <input type="text" className="form-control"  onChange={(event) => updateFormValue(event, "projectName")} placeholder="Project Name"/>
                    </div>
                    <div className="text-center">
                    <button class="btn btn-warning" onClick={saveNewUser}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
    )
}

export default GetPostApi;