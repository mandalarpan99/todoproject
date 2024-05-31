import Container from 'react-bootstrap/Container';
import {Row, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {useAuth} from '../store/auth';
import {useNavigate} from "react-router-dom";
export const Login = ()=>{
    const [loginData, setLoginData] = useState({
        email:"",
        password:"",
    });

    const formHandler = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setLoginData({
            ...loginData,
            [name]:value,
        })
    }
    const {storeTokenInLS} = useAuth();
    const navigate = useNavigate();
    const formSubmit = async (e)=>{
        e.preventDefault();
        console.log(e)
        const response = await fetch("http://localhost:5000/api/auth/",{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)

        });
        const res_data = await response.json();
        //console.log(response.ok)
        //console.log(res_data.message)
        if(response.ok){
            console.log(res_data);
            storeTokenInLS(res_data.token);
            toast.success("Login successful");
            setLoginData({
                email:"",
                password:""
            })
            navigate('/user')

        }else{
            toast.error(res_data.extraDetails);
            setLoginData({
                email:"",
                password:""
            })
        }
    }
    //console.log(loginData)
    return <>
        <section id='contact-page'>
            <Container>
            <Row>
                <Col xl={6} md={6} xs={4}>
                    <div className="contact-img">
                    <img src='/images/contact-img.png' alt='Login image' width='400' />
                    </div>
                </Col>
                <Col xl={6} md={6} xs={4}>
                    <div className="contact-form mt-5">
                    <Form onSubmit={formSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name='email' onChange={formHandler} value={loginData.email}/>
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name='password' onChange={formHandler} value={loginData.password}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
            </Container>
        </section>
    </>
}