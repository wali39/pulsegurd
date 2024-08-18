import React from 'react'
import NavigationBar from './components/NavigationBar'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'

const VisulaGraph = () => {
  return (
    <div>
      <NavigationBar />
      <Container style={{minHeight:"90vh"}}>
        
      </Container>
      <Footer />
    </div>
  )
}

export default VisulaGraph;
