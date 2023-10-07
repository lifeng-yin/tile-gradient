import { IconColorPicker, IconColorPickerOff, IconDice5, IconBrandGithub } from "@tabler/icons-react"
import { Dispatch, SetStateAction } from "react"
import { Color } from "../../types/types"
import { generateRandomColors } from "../../utils/colors"

const Toolbar = ({
    isCursorIdle,
    isEditing,
    setIsEditing,
    setColors
}: {
    isCursorIdle: boolean,
    isEditing: boolean,
    setIsEditing: Dispatch<SetStateAction<boolean>>,
    setColors: Dispatch<SetStateAction<Color[]>>
}) => {
  return (
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
          onClick={() => setColors(generateRandomColors())}
        />
        <a href="https://github.com/lifeng-yin/tile-gradient" target='_blank' rel='noopener noreferrer'>
          <IconBrandGithub
            size={24}
            className='opacity-70 hover:opacity-90 transition-opacity'
          />
        </a> 
    </div>
  )
}

export default Toolbar