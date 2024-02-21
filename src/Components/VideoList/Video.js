import React from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../GlobalStyle.css"
function Video({ item }) {

    const handleApprovePost = async (item) => {
        const data = {
            postId: item._id,
            uid: item.postOwnerId
        }

        if (item.permission === false) {
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
        } else {
            try {
                await axios.post("http://ec2-13-201-86-102.ap-south-1.compute.amazonaws.com:8000/admin/set-unapproved", data).then((response) => {
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
        }

    }


    const handleRemovePost = async (item) => {
        const data = {
            postId: item._id
        }
        try {
            await axios.post("http://ec2-13-201-86-102.ap-south-1.compute.amazonaws.com:8000/delete-post", data).then((response) => {
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

    return (
        <div className='video'>
            <video controls className='video_player' loop src={`https://d1fct0pxsc9git.cloudfront.net/public/${item._id}.mp4`}></video>
            <div className="post-details">
                <h2>Post Details</h2>
                <div className="post-div">
                    <p><b>Post ID :</b> {item._id}</p>
                    <p><b>Post Owner :</b> {item.postOwnerName}</p>
                    <p><b>Post Owner ID :</b> {item.postOwnerId}</p>
                    <p><b>Time :</b> {item.time}</p>
                    <p><b>Video Width :</b> {item.videoData.width}</p>
                    <p><b>Video Height :</b> {item.videoData.height}</p>
                    <p><b>Permission :</b> {item.permission ? "approved" : "noy approved"}</p>
                </div>
                <h2>Post Location Details</h2>
                <div className="post-div">
                    <p><b>Timestamp :</b> {item.currentLocation ? item.currentLocation.timestamp : ""}</p>
                    <p><b>Altitude :</b> {item.currentLocation && item.currentLocation.coords && item.currentLocation.coords.altitude ? item.currentLocation.coords.altitude : ""}</p>
                    <p><b>Heading :</b> {item.currentLocation && item.currentLocation.coords && item.currentLocation.coords.heading ? item.currentLocation.coords.heading : ""}</p>
                    <p><b>AltitudeAccuracy :</b> {item.currentLocation && item.currentLocation.coords && item.currentLocation.coords.altitudeAccuracy ? item.currentLocation.coords.altitudeAccuracy : ""}</p>
                    <p><b>Latitude :</b> {item.currentLocation && item.currentLocation.coords && item.currentLocation.coords.latitude ? item.currentLocation.coords.latitude : ""}</p>
                    <p><b>Speed :</b> {item.currentLocation && item.currentLocation.coords && item.currentLocation.coords.speed ? item.currentLocation.coords.speed : ""}</p>
                    <p><b>Longitude :</b> {item.currentLocation && item.currentLocation.coords && item.currentLocation.coords.longitude ? item.currentLocation.coords.longitude : ""}</p>
                    <p><b>Accuracy :</b> {item.currentLocation && item.currentLocation.coords && item.currentLocation.coords.accuracy ? item.currentLocation.coords.accuracy : ""}</p>
                </div>
                <button className='approve-btn' onClick={() => handleApprovePost(item)}>{item.permission ? "Unapprove" : "Approve"}</button>
                <button className='remove-btn' onClick={() => handleRemovePost(item)}>Remove</button>
            </div>
            <ToastContainer position="top-right" />
        </div>
    )
}

export default Video
