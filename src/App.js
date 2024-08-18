
import { useEffect, useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap"
import NavigationBar from "./components/NavigationBar";
import "./App.css";
import ecgWave from "./assets/ecg.webp"
import ecgIcon from "./assets/heart_icon.png"
import heartIcon from "./assets/heart_icon.png"
import spo2Icon from "./assets/spo2.png"
import Footer from "./components/Footer";
import FormComponent from "./components/FormComponent";
// import Display from "./components/Display";

import ChartComponent from "./components/ChartComponent";
// import Display from "./components/Display";
const api_url = "http://localhost:8000/api/v1/sens";

function App() {
  const [patientdata, setPatientData] = useState([]);
  const [singlePatient, setSinglePatient] = useState([]);
  const [graphSingle, setGraphSingle] = useState([]);
  useEffect(() => {
    fetch(`${api_url}`)
      .then((response) => {

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {

        setPatientData(responseData.data);
        console.log("hello", responseData)

      })
      .catch((error) => {
        console.error('Error fetching data:', error);


      });


  }, [])
  const handleclick = (id) => {
    // console.log(val);
    const queryParams = {
      "id": id
    };

    const queryString = new URLSearchParams(queryParams).toString();
    fetch(`${api_url}/single?${queryString}`)
      .then((response) => {

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData)
        setSinglePatient(responseData.data)
        var datapoint = [];

        for (let i = 1; i <= 200; i++) {
          datapoint.push({ x: i, y: responseData.data.ecg[i - 1] });
        }
        setGraphSingle(datapoint);

      })
      .catch((error) => {
        console.error('Error fetching data:', error);


      });
  };


  return (
    <><NavigationBar />
      <Container className="pt-2 wrapper" >
        <Row className="mt-5 ">
          <Col lg="6" md="6" className="align-self-center">
            <div className="hero">
              <h1>
                Welcome to PulseGuard
              </h1>
              <p style={{textAlign:"justify"}}>Welcome to our advanced health monitoring site, where we provide you with real-time insights into your well-being. With our state-of-the-art tools, you can track vital signs like SpO2, heart rate, and ECG with precision and ease. Stay informed about your health, monitor changes, and make informed decisions to lead a healthier, happier life. Our comprehensive monitoring solutions empower you to take control of your health, ensuring peace of mind and well-being every step of the way.</p>
            </div>
          </Col>
          <Col className="ecg" md="6">

            <img src={ecgWave} alt="ecgwave" />
          </Col>

        </Row>
        <Row className="justify-content-center mt-5">
          <Col lg="4" md="6" sm="4" xs="10"><div className="box shadow-sm mb-4">
            <span><img className="icon" src={heartIcon} alt="heartbeat" /></span>
            <h3>Heart Rate </h3>
            <p>Heart rate (HR) is a fundamental measure of the number of heartbeats per minute.A normal resting heart rate for adults ranges between 60 and 100 bpm.Monitoring HR is essential for optimizing exercise and can provide insights into overall health</p>
          </div></Col>
          <Col lg="4" md="6" sm="4" xs="10"><div className="box shadow-sm mb-4">
            <span><img className="icon" src={spo2Icon} alt="spo2" /></span>
            <h3>Spo2 measurement </h3>
            <p>Peripheral capillary oxygen saturation, is a measure of the oxygen saturation level in the blood. It is a critical vital sign used to assess the efficiency of oxygen delivery to the body's tissues and organs. It remains between 95% and 100%</p>
          </div></Col>
          <Col lg="4" md="6" sm="4" xs="10" ><div className="box shadow-sm mb-4">
            <span><img className="icon" src={ecgIcon} alt="ecg" /></span>
            <h3>Electrocardiogram </h3>
            <p>Electrocardiogram (ECG) is a diagnostic medical test that records the electrical activity of the heart over a period of time. It provides valuable information about the heart's rhythm, rate, and electrical conduction</p>
          </div></Col>

        </Row>
        <Row className="justify-content-center">
          <Col xs="11"  > <FormComponent /></Col>
        </Row>

        {/* <Row className="justify-content-center">
          <Col className="mb-5"><ChartComponent /></Col>
        </Row> */}

        <Row>
          <h3>All Records</h3>
          {patientdata.map((item, key) => (
            < Alert variant="primary" key={key} >
              <span>{item.name}</span>
              <span>  timestamps: {new Date(item.createdAt).toLocaleString()}</span>
              <span style={{
                marginLeft: "20px", cursor: "pointer"
              }} onClick={() => handleclick(item._id)} > See</span>
            </Alert>
          ))}
        </Row>
        <Row>
         
          <ChartComponent datapoints={graphSingle} patient={singlePatient} />
        </Row>

      </Container >
      <Footer />
    </>
  );
}

export default App;
