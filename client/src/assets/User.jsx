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
export const User = ()=>{
    const {user, token} = useAuth();
    const [postData, setpostData] = useState({
        custid: "",
        title:"",
        post:""
    })
    const [userData, setuserData] = useState(true);
    if(userData && user){
        setpostData({
            custid: user._id,
            title:"",
            post:"",
        })
        setuserData(false);
    }
    const navigate = useNavigate();
    //console.log(user._id);
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
    
    const formSubmit = async (e)=>{
        e.preventDefault();
        console.log(postData);
        const response = await fetch("http://localhost:5000/api/auth/userpost",{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)

        });
        const res_data = await response.json();
        //console.log(response.ok)
        //console.log(res_data.message)
        if(response.ok){
            console.log(res_data);
            toast.success("Data insert successful");
            setpostData({
               title:"",
               post:""
            })
            navigate('/user');
            setuserData(true);

        }else{
            toast.error(res_data.extraDetails);
            setpostData({
                title:"",
                post:""
             })
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
                <Form onSubmit={formSubmit}>
                {/* <Form.Control type="hidden"  name='custid' value={postData.custid}/> */}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Title</Form.Label>
                            {/* <Form.Control type="text" placeholder="Enter a title" name='custid' autoComplete='off' 
                            onChange={formHandler} value={postData.custid}/> */}
                            <Form.Control type="text" placeholder="Enter a title" name='title' autoComplete='off' 
                            onChange={formHandler} value={postData.title}/>
                        </Form.Group>
                        <FloatingLabel controlId="floatingTextarea2" label="Your thought" className='mb-3'>
                            <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '100px' }}
                            name='post'
                            onChange={formHandler}
                            value={postData.post}
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