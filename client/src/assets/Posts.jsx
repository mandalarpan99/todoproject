import { Navigate } from "react-router-dom";
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
          <th>Your thought</th>
          <th>Date</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
      {
            userPost.map((curElm, index)=>{
                const {title, post, date} = curElm;
                return <>
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{title}</td>
                        <td>{post}</td>
                        <td>{date}</td>
                        <td><Button variant="warning" type="submit" >
                        <GrUpdate />
                        </Button></td>
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