import { useWindowSize } from '@react-hook/window-size/throttled'
import './App.css'
import { useEffect, useState } from 'react'
import { IconX } from '@tabler/icons-react'
import useCursorMovement from './hooks/useCursorMovement'
import { Color } from './types/types'
import Tiles from './components/Tiles/Tiles'
import Toolbar from './components/Toolbar/Toolbar'
import { calculateTileColors, generateRandomColors } from './utils/colors'
import EditingOverlay from './components/EditingOverlay/EditingOverlay'
 
function App() {

  const [screenWidth, screenHeight] = useWindowSize()
  const [isCursorIdle] = useCursorMovement()
  const [isEditing, setIsEditing] = useState(false)

  const tileSize = 30
  const totalRows = Math.round(screenHeight / tileSize)
  const totalCols = Math.round(screenWidth / tileSize)
  const tileHeight = screenHeight / totalRows
  const tileWidth = screenWidth / totalCols

  
  const [colors, setColors] = useState<Color[]>([
    [232, 150, 120, 1],
    [20, 100, 180, 1],
    [219, 239, 106, 1],
    [0, 205, 210, 1]
  ])
  const tileColors = calculateTileColors(colors, totalRows, totalCols)

  useEffect(() => {
    document.documentElement.style.cursor = isCursorIdle && !isEditing ? 'none' : 'auto'
    return () => {
      document.documentElement.style.cursor = 'auto'
    }
  }, [isCursorIdle])

  useEffect(() => {
    const keyPressListener = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        setColors(generateRandomColors())
      }
    }
    document.addEventListener('keypress', keyPressListener)
    return () => { document.removeEventListener('keypress', keyPressListener)}
  })


  return (<main>
    <Tiles
      gradients={tileColors}
      tileWidth={tileWidth}
      tileHeight={tileHeight}
    />
    <Toolbar
      isCursorIdle={isCursorIdle}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      setColors={setColors}
    />
    {isEditing && 
      <EditingOverlay
        colors={colors}
        setColors={setColors}
      >
        <IconX
          size={20}
          className="absolute top-2 right-2 stroke-gray-700 hover:stroke-gray-900"
          onClick={() => setIsEditing(false)}
        />
      </EditingOverlay>
    }
    
  </main>)
}

export default App
