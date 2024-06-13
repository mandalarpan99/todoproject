import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import {Row, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from "../store/auth"
import { useNavigate, Navigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
export const User = ()=>{
    const {user, token} = useAuth();
    const [custid, setcustid] = useState("");
    const [title, settitle] = useState("")
    const [post, setpost] = useState('')
    const [file, setFile] = useState("");
    // const [postData, setpostData] = useState({
    //     custid: "",
    //     title:"",
    //     post:"",
    // })
    
    const [userData, setuserData] = useState(true);
    if(user && userData){
        // setpostData({
        //     custid: user._id,
        //     title:"",
        //     post:""
        // })
        setcustid(user._id)
        setuserData(false);
    }
    const navigate = useNavigate();
    console.log(user._id);
    //console.log(token);
    const userName = user.name;
    const formHandler = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setpostData({
            ...postData,
            [name]:value,
            
        })
    }

    const afterPost = ()=>{
        setpostData({
            title:"",
            post:""
        });
        setFile("");
        navigate('/post');
        setuserData(true)
    }
    
    // const formSubmit = async (e)=>{
    //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.append('postData', postData);
    //     formData.append('file', file);
    //     console.log(formData);
    //     const response = await fetch("http://localhost:5000/api/auth/userpost",{
    //         method:"POST",
    //         headers: {
    //             "Content-Type": "multipart/form-data"
    //         },
    //         body: formData

    //     });
    //     console.log(response)
    //     const res_data = await response.json();
    //     console.log(response.ok)
    //     console.log(res_data.message)
    //     if(response.ok){
    //         console.log(res_data);
    //         toast.success("Data insert successful");
    //         setpostData({
    //            title:"",
    //            post:""
    //         })
    //         navigate('/user');
    //         setuserData(true);

    //     }else{
    //         toast.error(res_data.extraDetails);
    //         setpostData({
    //             title:"",
    //             post:""
    //          })
    //     }
    // }

    const formSubmit = async (event)=> {
        event.preventDefault();
        const formData = new FormData();
        formData.append('custid', custid);
        formData.append('title', title);
        formData.append('post', post);
        formData.append('file', file);
        console.log(custid, file)
        const url = 'http://localhost:5000/api/auth/userpost';
        // const config = {
        //     headers: {
        //       'Content-Type': 'multipart/form-data',
        //     },
        //   };
        try {
            
              const result = await axios.post(url, formData);
              console.log(result.data);
              if(result.data == "OK"){
                setFile("");
                navigate('/post');
              }
              
        } catch (error) {
            console.log(error.response.data);
            
        }
        
    }
    if(!token){
        toast.error("You are not login");
        console.log("You are not login");
        return <Navigate to='/'/>
    
        
    }else{
        return <>
            <Container>
            <h1>Welcome, {userName}</h1>
            <h3>Store your expression</h3>
            <Row>
                <Col xl={6} md={6} xs={6}>
                <Form onSubmit={formSubmit} encType="multipart/form-data">
                {/* <Form.Control type="hidden"  name='custid' value={postData.custid}/> */}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Title</Form.Label>
                            {/* <Form.Control type="text" placeholder="Enter a title" name='custid' autoComplete='off' 
                            onChange={formHandler} value={postData.custid}/> */}
                            <Form.Control type="text" placeholder="Enter a title" name='title' autoComplete='off' 
                            onChange={(e)=>settitle(e.target.value)} accept="image/*"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Select an image</Form.Label>
                            <Form.Control type="file" placeholder="Select a image" name='file' 
                            onChange={(e)=>setFile(e.target.files[0])} />
                        </Form.Group>
                        <FloatingLabel controlId="floatingTextarea2" label="Your thought" className='mb-3'>
                            <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '100px' }}
                            name='post'
                            onChange={(e)=>setpost(e.target.value)}
                            
                            />
                        </FloatingLabel>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        </Form>             
                </Col>
            </Row>
                  
            </Container>
    </>
    }
    
    
}