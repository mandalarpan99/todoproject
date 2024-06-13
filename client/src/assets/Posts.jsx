import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../store/auth"
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {toast} from 'react-toastify';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
export const Posts = ()=>{
    const {user, token, authorizatioToken} = useAuth();
    const [userPost, setUserpost] = useState([]);
    const useName = user.name;

    const getAlluserspost = async()=>{
        try {
            const response = await fetch("http://localhost:5000/api/auth/viewuserpost",
                {
                    method:"GET",
                    headers:{
                        Authorization: authorizatioToken,
                    }
                }
            )
            const data = await response.json();
            setUserpost(data);
            //console.log(`User post ${data}`)
        } catch (error) {
            console.log(error);
        }
    };
    const deleteUserpost = async (id)=>{
        console.log(id)
        try {
            const response = await fetch(`http://localhost:5000/api/auth/user/delete/${id}`,
                {
                    method:"DELETE",
                    headers:{
                        Authorization: authorizatioToken,
                    }
                }
            )
            const data = response.json();
            console.log(`After delete ${data}`)
            if(response.ok){
                getAlluserspost();
                toast.error("Post deleted successfully")
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getAlluserspost();
    },[])
    const showImage = (img)=>{
        // window.open(`http://localhost:5000/uploads/${img}`)
        let newWindow = open(`http://localhost:5000/uploads/${img}`, 'example', 'width=500,height=500')
        newWindow.focus();

        newWindow.onload = function() {
        let html = `<div style="font-size:30px">Welcome!</div>`;
        newWindow.document.body.insertAdjacentHTML('afterbegin', html);
};
    }
    if(!token){
        toast.error("You are not login");
        console.log("You are not login");
        return <Navigate to='/'/>
    }else{
        return <>
        <Container>
            <h1>Hello, {useName}</h1>
            <h3>All these are your thoughts</h3>
            <Table striped bordered hover>
      <thead>
        <tr>
          <th>No</th>
          <th>Title</th>
          <th>Image</th>
          <th>Your thought</th>
          <th>Date</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
      {
            userPost.map((curElm, index)=>{
                const {title,file, post, date} = curElm;
                const imgURL = `http://localhost:5000/uploads/${file}`;
                console.log(imgURL)
                return <>
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{title}</td>
                        <td><Button variant="danger" type="submit" onClick={()=>showImage(file)}>
                        Show image
                        </Button></td>
                        {/* <td><img src="imgURL"/>{file}</td> */}
                        <td>{post}</td>
                        <td>{date}</td>
                        <td>
                        <Link className="btn btn-warning" to={`/update/${curElm._id}`}><GrUpdate /></Link>
                        
                        </td>
                        <td><Button variant="danger" type="submit" onClick={()=>deleteUserpost(curElm._id)}>
                        <AiTwotoneDelete />
                        </Button></td>
                        
                        </tr>
                </>
            })
        }
      </tbody>
    </Table>
        </Container>
    </>
    }
    
}