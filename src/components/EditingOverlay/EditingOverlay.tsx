import { RgbaColorPicker, RgbaColor } from "react-colorful"
import { convertColorToRgba } from "../../utils/colors"
import { Color } from "../../types/types"
import { Dispatch, SetStateAction } from "react"

const EditingOverlay = (
    { colors, setColors }:
    { colors: Color[], setColors: Dispatch<SetStateAction<Color[]>>
}) => {
  return (
    <div>
        <RgbaColorPicker
            className='absolute bottom-56 h-1/6'
            color={convertColorToRgba(colors[0])}
            onChange={(color: RgbaColor) => {
                setColors([Object.values(color) as Color, ...colors.slice(1)])
            }}
        />
  </div>
  )
}

export default EditingOverlay