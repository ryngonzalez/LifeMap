import React from "react";
import { VariableSizeGrid as Grid } from "react-window";
import styled from "styled-components";

// These item sizes are arbitrary.
// Yours should be based on the content of the item.
const columnWidths = new Array(52).fill(true).map(() => 18);
const rowHeights = new Array(90).fill(true).map(() => 18);

const CellContainer = styled.div`
  & > * {
    transition: all 0.3s ease-in-out;
    transform: scale(${props => props.zoom});
  }
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dot = styled.div`
  user-select: none;
  border-radius: 100%;
  height: 14px;
  width: 14px;
  background: ${props => (props.on ? "black" : "white")};
  border: 1px solid black;
  font-size: 4px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: -0.5px;
  transition: all 0.15s ease-in-out;
  text-align: center;
  cursor: pointer;

  &:hover {
    transform: scale(5);
    z-index: 1000;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.2);
    border: 1px solid ${props => (props.on ? "white" : "black")};
    color: ${props => (props.on ? "white" : "black")};
  }
`;

const Label = styled.label`
  font-size: 10px;
  font-weight: 300;
`;

const Cell = (zoom, weeks) => ({ columnIndex, rowIndex, style }) => {
  const zoomedStyle = { ...style };
  let content;
  if (rowIndex > 0 && columnIndex > 0) {
    const dotIndex = (rowIndex - 1) * 52 + columnIndex;
    content = <Dot on={dotIndex <= weeks - 52}>{dotIndex}</Dot>;
  }
  if (rowIndex === 0 && columnIndex === 0) content = <div style={style} />;
  if (rowIndex === 0) {
    content = <Label>{columnIndex}</Label>;
  }
  if (columnIndex === 0) {
    content = <Label>{rowIndex}</Label>;
  }
  return (
    <CellContainer style={style} zoom={zoom}>
      {content}
    </CellContainer>
  );
};

const LifeGrid = React.forwardRef(({ zoom = 1, currentAge }, ref) => (
  <Grid
    ref={ref}
    columnCount={53}
    columnWidth={index => {
      if (index === 0) return 24;
      return columnWidths[index - 1] / (1 / zoom);
    }}
    height={window.innerHeight}
    rowCount={91}
    rowHeight={index => {
      if (index === 0) return 24;
      return rowHeights[index - 1] / (1 / zoom);
    }}
    width={960}
  >
    {Cell(zoom, currentAge * 52)}
  </Grid>
));

export default LifeGrid;
