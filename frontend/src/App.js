import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import ImageUpload from './components/ImageUpload';
import { Container, Row, Col } from 'react-bootstrap'; 
import PredictionProvider from './providers/PredictionProvider';
import ResultsDisplay from './components/ShowResult';

function App() {
  return (
    <div>
      <PredictionProvider>
        <Container>
          <Row className="mb-4">
            <Col style={{textAlign:'center'}}>
              <h1>Pathogen Classification App</h1>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <ImageUpload />
            </Col>
            <Col md={6}>
              <ResultsDisplay/>
            </Col>
          </Row>
        </Container>
      </PredictionProvider>
    </div>
  );
}

export default App;

