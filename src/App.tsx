import { useWindowSize } from '@react-hook/window-size/throttled'
import { IconBrandGithub, IconColorPicker, IconColorPickerOff, IconDice5, IconX } from '@tabler/icons-react'
import './App.css'
import { useEffect, useState } from 'react'
import useCursorMovement from './hooks/useCursorMovement'
import { range } from './utils/misc'
import { RgbaColor, RgbaColorPicker } from 'react-colorful'
 
function App() {

  const [screenWidth, screenHeight] = useWindowSize()
  const [isCursorIdle] = useCursorMovement()
  const [isEditing, setIsEditing] = useState(false)

  const tileSize = 120
  const totalRows = Math.round(screenHeight / tileSize)
  const totalCols = Math.round(screenWidth / tileSize)
  const tileHeight = screenHeight / totalRows
  const tileWidth = screenWidth / totalCols

  type Color = [number, number, number, number]
  const gradients: Color[][] = []
  const [colors, setColors] = useState<Color[]>([
    [232, 150, 120, 1],
    [20, 100, 180, 1],
    [219, 239, 106, 1],
    [0, 205, 210, 1]
  ])

  const convertColorToRgba = (color: Color) => ({
    'r': color[0],
    'g': color[1],
    'b': color[2],
    'a': color[3]
  } as RgbaColor)

  const findIncrements = (firstColor: Color, secondColor: Color, numTiles: number) => {
    return range(4).map(index => (secondColor[index] - firstColor[index]) / (numTiles - 1))
  }

  const leftIncrements = findIncrements(colors[0], colors[2], totalRows)
  const rightIncrements = findIncrements(colors[1], colors[3], totalRows)
  
  range(totalRows).forEach(rowNum => {
    const firstColor = leftIncrements.map((increment, index) => colors[0][index] + increment * rowNum) as Color
    const lastColor = rightIncrements.map((increment, index) => colors[1][index] + increment * rowNum) as Color

    const colIncrements = findIncrements(firstColor, lastColor, totalCols)

    gradients.push(range(totalCols).map(colNum => {
      return colIncrements.map((increment, index) => firstColor[index] + increment * colNum) as Color
    }))
  })

  useEffect(() => {
    document.documentElement.style.cursor = isCursorIdle && !isEditing ? 'none' : 'auto'
    return () => {
      document.documentElement.style.cursor = 'auto'
    }
  }, [isCursorIdle])


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
    <div
        className="absolute bottom-4 right-4 rounded-full bg-white flex items-center px-4 py-2 gap-2 transition-opacity shadow"
        style={{
          opacity: isCursorIdle ? '0' : ''
        }}
        >
        {isEditing
        ? <IconColorPickerOff
            size={24}
            className='opacity-70 hover:opacity-90 transition-opacity'
            onClick={() => setIsEditing(false)}
          />
        : <IconColorPicker
            size={24}
            className='opacity-70 hover:opacity-90 transition-opacity'
            onClick={() => setIsEditing(true)}
          />
        }
        <IconDice5
          size={24}
          className='opacity-70 hover:opacity-90 transition-opacity'
        />
        <a href="https://github.com/lifeng-yin/tile-gradient" target='_blank' rel='noopener noreferrer'>
          <IconBrandGithub
            size={24}
            className='opacity-70 hover:opacity-90 transition-opacity'
          />
        </a> 
    </div>
    <RgbaColorPicker
      className='absolute bottom-56'
      color={convertColorToRgba(colors[0])}
      onChange={(color: RgbaColor) => {
        console.log(color)
        setColors([Object.values(color) as Color, ...colors.slice(1)])
      }}
      style={{
        display: isEditing ? 'block' : 'none'
      }}
    />
    
  </main>)
}

export default App
