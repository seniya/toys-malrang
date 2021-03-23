import '../assets/home.scss'

// eslint-disable-next-line no-use-before-define
import React, { useState, useRef } from 'react'
import { Stage, Layer, Line } from 'react-konva'
import { KonvaEventObject } from 'konva/types/Node'

type TLine = {
  tool: string
  lineColor: string
  thickness: number
  points: number[]
}
type TLines = TLine[]

function Home () {
  const tool = 'pen'
  const [lines, setLines] = useState<TLines>([])
  const isDrawing = useRef(false)

  const [lineColor, setLineColor] = useState('#1abc9c')
  const [thickness, setThickness] = useState(5)

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage()
    if (stage) {
      isDrawing.current = true
      const pos = stage.getPointerPosition() || null
      if (pos) {
        setLines([...lines, { tool, lineColor, thickness, points: [pos.x, pos.y] }])
      }
    }
  }

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return
    }
    const stage = e.target.getStage()
    if (stage) {
      const point = stage.getPointerPosition()
      const lastLine = lines[lines.length - 1]
      // add point
      if (lastLine && point) {
        if (lastLine.points) {
          lastLine.points = lastLine.points.concat([point.x, point.y])
        }
      }
      // replace last
      lines.splice(lines.length - 1, 1, lastLine)
      setLines(lines.concat())
    }
  }

  const handleMouseUp = () => {
    isDrawing.current = false
  }

  const onClickChangeColor = (e: React.MouseEvent<HTMLElement>) => {
    setLineColor(e.currentTarget.dataset.color || '#1abc9c')
  }

  const onClickChangeThickness = (e: React.MouseEvent<HTMLElement>) => {
    setThickness(Number(e.currentTarget.dataset.thickness) || 5)
  }

  const onClickStageClear = () => {
    console.log('onClickStageClear')
    setLines([])
  }

  return (
    <>
      <div className="bg-img"></div>

      <Stage
        width={700}
        height={500}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="canvas"
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.lineColor}
              strokeWidth={line.thickness}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </Stage>

      <nav className="tools-bar">
      <div className="button button-clear" data-clear onClick={onClickStageClear}></div>
      </nav>

      <nav className="thickness-bar">
        <div className={ thickness === 3 ? 'thickness active' : 'thickness' } data-thickness="3" onClick={onClickChangeThickness}></div>
        <div className={ thickness === 5 ? 'thickness active' : 'thickness' } data-thickness="5" onClick={onClickChangeThickness}></div>
        <div className={ thickness === 8 ? 'thickness active' : 'thickness' } data-thickness="8" onClick={onClickChangeThickness}></div>
        <div className={ thickness === 15 ? 'thickness active' : 'thickness' } data-thickness="15" onClick={onClickChangeThickness}></div>
        <div className={ thickness === 30 ? 'thickness active' : 'thickness' } data-thickness="30" onClick={onClickChangeThickness}></div>
      </nav>

      <nav className="color-bar">
        <div className={ lineColor === '#9b59b6' ? 'color active' : 'color' } data-color="#9b59b6" onClick={onClickChangeColor}></div>
        <div className={ lineColor === '#3498db' ? 'color active' : 'color' } data-color="#3498db" onClick={onClickChangeColor}></div>
        <div className={ lineColor === '#2ecc71' ? 'color active' : 'color' } data-color="#2ecc71" onClick={onClickChangeColor}></div>
        <div className={ lineColor === '#1abc9c' ? 'color active' : 'color' } data-color="#1abc9c" onClick={onClickChangeColor}></div>
        <div className={ lineColor === '#f1c40f' ? 'color active' : 'color' } data-color="#f1c40f" onClick={onClickChangeColor}></div>
        <div className={ lineColor === '#e67e22' ? 'color active' : 'color' } data-color="#e67e22" onClick={onClickChangeColor}></div>
        <div className={ lineColor === '#E73C61' ? 'color active' : 'color' } data-color="#E73C61" onClick={onClickChangeColor}></div>
      </nav>
    </>
  )
}

export default Home
