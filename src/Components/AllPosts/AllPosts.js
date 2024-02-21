import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../table.css"
import Modal from 'react-modal';

function AllPosts({ dashboardData }) {

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [reasons, setReasons] = React.useState('');
    const [items, setItems] = React.useState({});

    useEffect(()=> {
        console.log(dashboardData, "DDDDDDDDDDDDDDDDDDDd")
    },[])

    function openModal() {
        setIsOpen(true);
      }
    
      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
      }
    
      function closeModal() {
        setIsOpen(false);
      }

    const handleApprovePost = async (item) => {

        console.log(item ,"IIIIIIIIIIIIIIIIIIIIII")

        const data = {
            postId: item._id,
            uid: item.postOwnerId
        }

        console.log(data, "DDDDDDDDDDDDDDDDDDDDd")

        // if (item.permission === false) {
            try {
                await axios.post("http://ec2-13-201-86-102.ap-south-1.compute.amazonaws.com:8000/admin/set-approved", data).then((response) => {
                    console.log(response)
                    if (response.data.status === 'success') {
                        // toast.success(response.data.message);
                        window.location.reload()
                        return null;
                    } else {
                        toast.error(response.data.message);
                        return null;
                    }
                })
            } catch (error) {
                toast.error("Something went wrong");
                console.log(error)
                return null;
            }
        // } else {
        //     try {
        //         await axios.post("http://ec2-13-201-86-102.ap-south-1.compute.amazonaws.com:8000/admin/set-unapproved", data).then((response) => {
        //             console.log(response)
        //             if (response.data.status === 'success') {
        //                 // toast.success(response.data.message);
        //                 window.location.reload()
        //                 return null;
        //             } else {
        //                 toast.error(response.data.message);
        //                 return null;
        //             }
        //         })
        //     } catch (error) {
        //         toast.error("Something went wrong");
        //         console.log(error)
        //         return null;
        //     }
        // }
    }

    const notApprove = async() => {

        if(reasons=='')
        {
            // toast.error("Please Enter the Reason !!!");
            myFunction();
        }
        else
        {

            const data = {
                postId: items._id,
                uid: items.postOwnerId,
                reason: reasons
            }

            try {
                await axios.post("http://ec2-13-201-86-102.ap-south-1.compute.amazonaws.com:8000/admin/set-unapproved", data).then((response) => {
                    console.log(response)
                    if (response.data.status === 'success') {
                        window.location.reload();
                        closeModal();
                        return null;
                    } else {
                        toast.error(response.data.message);
                        closeModal();
                        return null;
                    }
                })
            } catch (error) {
                toast.error("Something went wrong");
                console.log(error)
                return null;
            }
        }
    }

    const handleRemovePost = async (item) => {
        const data = {
            postId: item._id
        }
        try {
            await axios.post("http://ec2-13-201-86-102.ap-south-1.compute.amazonaws.com:8000/admin/delete-post", data).then((response) => {
            if(response.data.status === 'success'){
                window.location.reload()
                // toast.success(response.data.message);
                return null;
            }else{
                toast.success(response.data.message);
            }
            })
        } catch (error) {

        }
    }

    const handleChange = (val) => {
        console.log(val.target.value, "UUUUUUUUUUUUUUU")
        setReasons(val.target.value);
    }

    function myFunction() {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }

    return (
        <div className='table-main'>
            <div className="allpost-table">
                <table>
                    <tr>
                        <th>Sl No.</th>
                        <th>Post ID</th>
                        <th>Owner Name</th>
                        <th>Time</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Status</th>
                    </tr>
                    {dashboardData && dashboardData.allPosts.length > 0 ?
                        dashboardData.allPosts.map((item, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item._id}</td>
                                <td>{item.postOwnerName}</td>
                                <td>{item.time}</td>
                                <td>{item.currentLocation && item.currentLocation.coords && item.currentLocation.coords.latitude ? item.currentLocation.coords.latitude: ""}</td>
                                <td>{item.currentLocation && item.currentLocation.coords && item.currentLocation.coords.longitude ? item.currentLocation.coords.longitude: ""}</td>
                                <td>{item.permission ? "approved" : "not approved"}</td>
                                <td>{item.permission ? <button onClick={()=>{openModal(); setItems(item)}}>Unapprove</button> : <button onClick={()=>handleApprovePost(item)}>Approve</button>}</td>
                                <td><button onClick={()=>handleRemovePost(item)}>Remove</button></td>
                            </tr>
                        ))
                        : ""}
                </table>
            </div>

            <div id="snackbar">Please Enter the Reason for Unapproval..</div>

            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                // style={customStyles}
                // contentLabel="Example Modal"
                style={{
                    
                    overlay: {
                        width: "50%",
                        height: "50%",
                        marginLeft: "25%",
                        marginTop: "10%",
                        justifyContent: 'center', 
                        alignItems: 'center',
                        display: 'flex',
                        padding: 0
                    },
                    content: {
                        justifyContent: 'center', 
                        alignItems: 'center',
                        alignSelf: 'center'
                    }
                }}
                >
                <div>
                    <label style={{display:'block', textAlign:'center', fontSize: '20px', fontWeight: "900"}}>Reason for Unapprove</label><br/>
                    <input type='text' onChange={(e) => {handleChange(e)}} className='tet' style={{height: '5vh', width: '20vw', borderColor: 'black', borderStyle:'solid', borderWidth: '1px', borderRadius: 10, marginTop: '20px', marginBottom: '20px', fontSize: 20, marginLeft: "10vw"}}></input><br/>
                    <button onClick={()=>{closeModal()}} style={{height: '6vh', width: '12vw',  borderColor: 'black', borderStyle:'solid', borderWidth: '1px', borderRadius: 10, marginLeft: '6vw', marginRight: '4vw'}}>Cancel</button>
                    <button onClick={()=>{notApprove()}} style={{height: '6vh', width: '12vw',  borderColor: 'black', borderStyle:'solid', borderWidth: '1px', borderRadius: 10, background: 'red', color:'white'}}>Submit</button>
                </div>
            </Modal>

        </div>
    )
}

export default AllPosts
