import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import "./FormComponent.css"
const api_url = 'https://telehealthapi-production.up.railway.app/api/v1/user';
const FormComponent = () => {
  const [startButtonStatus, setStartButtonStatus] = useState(true);
  const [alertMsg, setAlertMsg] = useState("Submitted");
  const [variant, setVariant] = useState("success");
  const [validated, setValidated] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
  });
  const [alertStatus, setAlertStatus] = useState();
  const handleStart = (e) => {
    axios.post("https://telehealthapi-production.up.railway.app/api/v1/status", { "status": true }).then(res => {
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    })
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {

      e.stopPropagation();
    }
    e.preventDefault();
    setValidated(true);


    if (formData.name && formData.age) {
      axios.post(api_url, formData).then((res) => {

        if (res && res.data.status === 200) {
          setStartButtonStatus(false);
          setValidated(false);
          setFormData({
            name: "",
            age: "",
          });

          setAlertStatus(true);
          setVariant("success");
          setAlertMsg("Submitted");

          setTimeout(() => {
            setAlertStatus(false);
          }, 3000);



        }
      }).catch(err => {
        setAlertStatus(true);
        setTimeout(() => {
          setAlertStatus(false);
        }, 3000);

        setVariant("danger");
        setAlertMsg("Server Error");
      })
    }
    else {
      setAlertStatus(true);
      setVariant("danger");
      setAlertMsg("Name and age required");
      setTimeout(() => {
        setAlertStatus(false);
      }, 3000);

    }

  };

  return (
    <Row className='justify-content-center mt-5 mb-5 '>
      <Col className="formBg rounded p-5 shadow" lg={6}>
        <Form noValidate validated={validated} onSubmit={handleSubmit} name='userdata' >
          {alertStatus && <Alert variant={variant} dismissible className='mt-2'>
            {alertMsg}
          </Alert>}
          <h3 className='text-center mb-2'>Patient </h3>
          <Form.Group controlId="name" className='mb-3 mt-2' >

            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              placeholder='enter your name'
              value={formData.name}
              onChange={handleChange}
            />
            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          </Form.Group>

          <Form.Group controlId="age" className='mb-3'>
            <Form.Label>Age</Form.Label>
            <Form.Control
              required
              type="number"
              name="age"

              placeholder="enter your age"
              value={formData.age}
              onChange={handleChange}
            />
            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}


          </Form.Group>


          <Button variant="primary" type="submit">
            Submit
          </Button>

        </Form>
        <Button variant="success" disabled={startButtonStatus} className="my-5  " onClick={() => handleStart()} >
          Start data receiving
        </Button>
      </Col>
    </Row>
  );
};

export default FormComponent;
