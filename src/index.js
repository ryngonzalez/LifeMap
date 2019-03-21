import React from "react";
import ReactDOM from "react-dom";
import LifeGrid from "./Grid";
import { useState, useRef } from "react";
import styled from "styled-components";
import { DateTime, Duration, Interval } from "luxon";

import "./styles.css";

const CURRENT_AGE = 26.2;

const AppContainer = styled.div`
  margin: 0 auto;
  max-width: 960px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0 0;
`;

const Button = styled.button`
  -webkit-appearance: none;
  appearance: none;
  outline: none;
  background: black;
  color: white;
  text-transform: uppercase;
  font-weight: 800;
  border: none;
  min-height: 40px;
  min-width: 40px;
  padding: 8px 12px;
  font-size: ${props => (props.zoom ? 18 : 14)}px;
  margin-right: ${props => (props.zoom ? 8 : 0)}px;
  border-radius: 32px;
  line-height: 0;
`;

const Input = styled.input`
  -webkit-appearance: none;
  appearance: none;
  outline: none;
  background: white;
  border: 2px solid black;
  text-transform: uppercase;
  font-weight: 800;
  min-height: 40px;
  min-width: 40px;
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 32px;
  margin-right: 16px;
`;

const GridContainer = styled.div`
  position: relative;
  margin-top: 24px;
  margin-left: -24px;
  padding: 16px 0 0 16px;
  &::before,
  &::after {
    position: absolute;
    text-transform: uppercase;

    font-size: 14px;
    font-weight: 800;
  }
  &::before {
    content: "Week";
    display: block;
    top: 0;
    left: 40px;
  }
  &::after {
    content: "Age";
    display: block;
    top: 32px;
    left: -16px;
    transform-origin: right center;
    transform: rotate(-90deg);
  }
`;

const DATE_FORMAT = "yyyy-MM-dd";

function App() {
  const [zoom, setZoom] = useState(1);
  const [birthDate, setBirthDate] = useState(
    DateTime.fromFormat("1992-12-20", DATE_FORMAT)
  );
  const [birthDateString, setBirthDateString] = useState(
    birthDate.toFormat(DATE_FORMAT)
  );
  const onChange = e => setBirthDateString(e.target.value);
  const setBDay = () => {
    console.log(birthDateString);
    setBirthDate(DateTime.fromFormat(birthDateString, DATE_FORMAT));
  };
  console.log(birthDate.toFormat(DATE_FORMAT));
  const age = -1 * birthDate.diffNow("years", {}).as("years");
  const incrementZoom = () => setZoom(zoom + 0.2);
  const decrementZoom = () => setZoom(zoom - 0.2);
  return (
    <AppContainer>
      <h1>Your Life In Weeks</h1>
      <Controls>
        <div>
          <Button zoom onClick={incrementZoom}>
            +
          </Button>
          <Button zoom onClick={decrementZoom}>
            -
          </Button>
          <span>Zoom: {zoom.toFixed(1)}×</span>
        </div>
        <div>
          <span style={{ marginRight: 16 }}>Age: {age.toFixed(1)}</span>
          <Input
            type="date"
            onChange={onChange}
            value={birthDateString}
            placeholder="mm/dd/YYYY"
            required
            pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}"
          />
          <Button onClick={setBDay}>Save</Button>
        </div>
      </Controls>
      <div>
        <GridContainer
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top center",
            transition: "all 0.3s ease-in-out",
            willChange: "transform"
          }}
        >
          <LifeGrid currentAge={age} />
        </GridContainer>
      </div>
    </AppContainer>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
