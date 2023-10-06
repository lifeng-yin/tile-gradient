import { useWindowSize } from '@react-hook/window-size/throttled'
import { IconBrandGithub, IconColorPicker, IconColorPickerOff, IconDice5, IconX } from '@tabler/icons-react'
import './App.css'
import { useEffect, useState } from 'react'
import useCursorMovement from './hooks/useCursorMovement'
import { range } from './utils/misc'
import { RgbaColor, RgbaColorPicker } from 'react-colorful'
import { Color } from './types/types'
import Tiles from './components/Tiles/Tiles'
import Toolbar from './components/Toolbar/Toolbar'
import { calculateTileColors } from './utils/colors'
import EditingOverlay from './components/EditingOverlay/EditingOverlay'
 
function App() {

  const [screenWidth, screenHeight] = useWindowSize()
  const [isCursorIdle] = useCursorMovement()
  const [isEditing, setIsEditing] = useState(false)

  const tileSize = 120
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
    />
    {isEditing && <EditingOverlay
      colors={colors}
      setColors={setColors}
    />}
    
  </main>)
}

export default App
