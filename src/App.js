import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { run } from "./utils/generation";
import Histogram from "./components/Histo";

function App() {
  const [Histograms, setHistograms] = useState(
    []
  );
  const [n, setN] = useState(1000);
  const [epsilon, setEpsilon] = useState(1);
  const [runs, setRuns] = useState(1000);
  const [ratio, setRatio] = useState(0.9);
  const [bins, setBins] = useState(25);

  const handleGenerate = () => {
    let dataURL = run(n, runs, ratio, epsilon);
    setHistograms(dataURL);
  };

  return (
    <div className="App" style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Privacy Workshop</h1>
      
      {/* Horizontal images */}
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        overflowX: "auto", 
        padding: "10px", 
        margin: "0 auto" 
      }}>
        <Histogram data={Histograms} bins={bins}/>
      </div>
      
      {/* Sliders Container */}
      <div style={{         
        display: "flex", 
        justifyContent: "center",
        overflowX: "auto", 
        padding: "10px", 
        maxWidth: "600px",
        margin: "0px auto" 
      }}>
          <div style={{         
            justifyContent: "left",
            padding: "10px", 
            maxWidth: "600px",
            margin: "0px auto" 
          }}>
              
            <div style={{ margin: "1px 0", textAlign: "center" }}>
              <Form.Label>N: {n}</Form.Label>
              <Form.Range min={100} max={10000} step={100} value={n} onChange={(e) => setN(e.target.value)} />
            </div>
            
            <div style={{ margin: "1px 0", textAlign: "center" }}>
              <Form.Label>Epsilon: {epsilon}</Form.Label>
              <Form.Range min={0.01} max={10} step={0.01} value={epsilon} onChange={(e) => setEpsilon(e.target.value)} />
            </div>
            
            <div style={{ margin: "1px 0", textAlign: "center" }}>
              <Form.Label>Number of Runs: {runs}</Form.Label>
              <Form.Range min={100} max={10000} step={100} value={runs} onChange={(e) => setRuns(e.target.value)} />
            </div>
          </div>

          <div style={{         
            justifyContent: "right",
            padding: "10px", 
            maxWidth: "600px",
            margin: "2px auto" 
          }}>

            <div style={{ margin: "1px 0", textAlign: "center" }}>
              <Form.Label>Ratio of data: {ratio}</Form.Label>
              <Form.Range min={0} max={1} step={0.1} value={ratio} onChange={(e) => setRatio(e.target.value)} />
            </div>

            <div style={{ margin: "1px 0", textAlign: "center" }}>
              <Form.Label>Number of Bins: {bins}</Form.Label>
              <Form.Range min={10} max={100} step={1} value={bins} onChange={(e) => setBins(e.target.value)} />
            </div>

          </div>

      </div>
      
      {/* Button */}
      <div style={{ textAlign: "center", margin: "2px 0" }}>
        <Button onClick={handleGenerate}>Generate</Button>
      </div>
    </div>
  );
}

export default App;