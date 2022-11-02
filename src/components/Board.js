import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import ACTIONS from '../Actions';
import styles from '../css/Codeboard.module.css'

const Board = ({ socket, roomId }) => {
  const [tool, setTool] = useState('pen');
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);

  useEffect(() => {
    if(socket) {
      socket.on(ACTIONS.BOARD_CHANGE, ({slines}) => {
        if(slines !== undefined) {
          setLines(slines);
        }
      })
    }
  }, [])

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();

    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    if(socket === null || socket === undefined)
      return;

    socket.emit(ACTIONS.BOARD_CHANGE, {
      roomId,
      lines,
    })
  };

  const cleanBoard = () => {
    setLines([]);
  }

  return (
    <div className={styles.board} style={{width: '41%'}}>
      <div className={styles.pin} style={{ top: '0.6rem', left: '0.6rem'}}></div>
      <div className={styles.pin} style={{ top: '0.6rem', right: '0.6rem'}}></div>
      <div className={styles.pin} style={{ bottom: '0.6rem', left: '0.6rem'}}></div>
      <div className={styles.pin} style={{ bottom: '0.6rem', right: '0.6rem'}}></div>

      <div className={styles.toolbar}>
        <select
          value={tool}
          onChange={(e) => {
            setTool(e.target.value);
          }}
          className={styles.tools}
        >
          <option value="pen">Pen</option>
          <option value="eraser">Eraser</option>
        </select>
        <button className={styles.clear} onClick={() => cleanBoard()}>Clear</button>
      </div>

      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        className={styles.board}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#FF4C29"
              strokeWidth={line.tool === "eraser" ? 15: 5}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Board