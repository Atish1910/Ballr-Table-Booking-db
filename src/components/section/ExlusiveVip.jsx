import { useState } from "react";
import { useForm } from "react-hook-form";
import { data } from "react-router-dom";

function ExlusiveVip(){
    const [guestData, setGuestData] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: {errors, isSubmitting},
    } = useForm();

    // handle Form Submitton
    async function GuestForm(data){
        // while we submitting form for 2sec button is change from submit to please wait because of promise
        await new Promise((res) => setTimeout(res, 2000));
    
        // print data in cosnole window
        console.log("You just submitted form", data);

         // Store form data in local storage
         localStorage.setItem("vipGuestData", JSON.stringify(data));

        // after form submission form will get auto clear
        reset();

       
      }

    return(
        <>
            <section className="py-5 ">
                <div className="container border py-3">
                    
                    {/* Modal Button */}
                    <div className="row text-center">
                        <h1 className="">02 - Exlusive VIP Section</h1>
                    </div>
                    <div className="row">
                        <div className="col-3 text-center border py-2">
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exlusiveVip">T1</button>
                        </div>
                    </div>

                    {/* Modal */}
                    <div className="row">
                        <div className="modal fade" id="exlusiveVip" tabIndex="-1" aria-labelledby="exlusiveVipLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exlusiveVipLabel">Exlusive VIP Section</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row justify-content-center">
                                    <div className="col-lg-12 border py-3 rounded-3">
                                        <form onSubmit={handleSubmit(GuestForm)}>
                                            <input type="text" className={`form-control mb-3 ${errors.guestName ? "input-errors" : ""}`}placeholder="Enter Guest Name"
                                            {
                                                ...register("guestName",
                                                    {
                                                        required: true,
                                                    }
                                                )
                                            }
                                            />
                                            <input type="number"className = {` form-control mb-3 ${errors.guestQuantity ? "input-errors" : ""} `} placeholder="Enter Number Of Guest" 
                                            {
                                                ...register("guestQuantity",
                                                    {
                                                        required: true
                                                    }
                                                )
                                            }
                                            />
                                            <div className="text-center">
                                            <button className="btn btn-success mt-4" type="submit" disabled={isSubmitting}>{isSubmitting ? "please wait" : "submit"}</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="row mt-5 py-3 border">
                        <table className="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th>Sr No</th>
                                    <th>PR Name</th>
                                    <th>Guest Name</th>
                                    <th>Guest Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Akshay Kamble</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}
export default ExlusiveVip; 