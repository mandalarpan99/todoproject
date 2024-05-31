import Container from 'react-bootstrap/Container';
import {Row, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {toast} from "react-toastify";
export const Registration = ()=>{
    const [registerData, setregisterData] = useState({
        name:"",
        email:"",
        phone:"",
        password:"",
    });
    const navigate = useNavigate();
    const formHandler = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setregisterData({
            ...registerData,
            [name]:value,
        });

    }
    const formSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/register",
            {
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(registerData)
            }
        )
        console.log(response);
        const res_data = await response.json();
        //console.log(res_data.message)
        if(response.ok){
            toast.success("Registration successful");
            setregisterData({name:"", email:"", phone:"", password:"",});
            navigate('/registration');
        }else{
            toast.error(res_data.extraDetails);
        }
    }
    //console.log(registerData)
    return <>
        <section id='register-page'>
            <Container>
            <Row>
                <Col xl={6} md={6} xs={4}>
                    <div className="register-img">
                    <img src='/images/register-img.png' alt='Login image' width='400' />
                    </div>
                </Col>
                <Col xl={6} md={6} xs={4}>
                    <div className="register-form mt-5">
                    <Form onSubmit={formSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your name" name='name' onChange={formHandler} value={registerData.name} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name='email' onChange={formHandler} value={registerData.email}/>
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control type="number" placeholder="Enter phone number" name='phone' onChange={formHandler} value={registerData.phone}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name='password' onChange={formHandler} value={registerData.password}/>
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