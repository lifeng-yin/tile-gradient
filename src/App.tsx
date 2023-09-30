import { useWindowSize } from '@react-hook/window-size/throttled'
import './App.css'

function App() {

  const range = (len: number) => Array(len).fill(0).map((_, i) => i)

  const [screenWidth, screenHeight] = useWindowSize()

  const tileSize = 120

  const totalRows = Math.round(screenHeight / tileSize)
  const totalCols = Math.round(screenWidth / tileSize)
  
  const tileHeight = screenHeight / totalRows
  const tileWidth = screenWidth / totalCols

  type Color = [number, number, number, number]
  const gradients: Color[][] = []

  const topLeft: Color = [232, 150, 120, 1];
  const topRight: Color = [20, 100, 180, 1]
  const bottomLeft: Color = [219, 239, 106, 1]
  const bottomRight: Color = [0, 205, 210, 1]

  const findIncrements = (firstColor: Color, secondColor: Color, numTiles: number) => {
    return range(4).map(index => (secondColor[index] - firstColor[index]) / (numTiles - 1))
  }

  const leftIncrements = findIncrements(topLeft, bottomLeft, totalRows)
  const rightIncrements = findIncrements(topRight, bottomRight, totalRows)
  

  range(totalRows).forEach(rowNum => {
    const firstColor = leftIncrements.map((increment, index) => topLeft[index] + increment * rowNum) as Color
    const lastColor = rightIncrements.map((increment, index) => topRight[index] + increment * rowNum) as Color

    const colIncrements = findIncrements(firstColor, lastColor, totalCols)

    gradients.push(range(totalCols).map(colNum => {
      return colIncrements.map((increment, index) => firstColor[index] + increment * colNum) as Color
    }))
  })

  

  return (<main>
    { gradients.map(row => (
      <div className="flex">
        { row.map(color => (
          <div style={{
            width: tileWidth,
            height: tileHeight,
            backgroundColor: `rgba(${color.join(', ')})`
          }}></div>
        )) }
      </div>
    ))}
  </main>)
}

export default App
