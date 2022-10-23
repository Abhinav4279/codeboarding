import { useRef, useState } from 'react';
import { Stage, Layer, Line, Text, Circle } from 'react-konva';

const Board = () => {
  const [tool, setTool] = useState('pen');
  const [lines, setLines] = useState([]);
  const [circles, setCircles] = useState([]);
  const isDrawing = useRef(false);

  const getDist = (x1, y1, x2, y2) => {
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();

    if (tool === "pen" || tool === "eraser")
      setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    if (tool === "circle")
      setCircles([...circles, { tool, x: pos.x, y: pos.y, r: 0 }]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    if (tool === "pen" || tool === "eraser") {
      let lastLine = lines[lines.length - 1];
      // add point
      lastLine.points = lastLine.points.concat([point.x, point.y]);

      // replace last
      lines.splice(lines.length - 1, 1, lastLine);
      setLines(lines.concat());
    } 
    if (tool === "circle") {
      let lastCircle = circles[circles.length - 1];
      // add point
      lastCircle.r = getDist(lastCircle.x, lastCircle.y, point.x, point.y);

      // replace last
      circles.splice(circles.length - 1, 1, lastCircle);
      setCircles(circles.concat());
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          <Text text="Just start drawing" x={5} y={30} />
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}
          {circles.map((circle, i) => (
            <Circle
              key={i}
              x={circle.x}
              y={circle.y}
              radius={circle.r}
              stroke="#df4b26"
              strokeWidth={5}
            />
          ))}
        </Layer>
      </Stage>
      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="pen">Pen</option>
        <option value="circle">Circle</option>
        <option value="eraser">Eraser</option>
      </select>
    </div>
  );
};

export default Board