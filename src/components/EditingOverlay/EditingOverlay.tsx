import { RgbaColorPicker, RgbaColor } from "react-colorful"
import { convertColorToRgba } from "../../utils/colors"
import { Color } from "../../types/types"
import { Dispatch, SetStateAction } from "react"
import { range } from "../../utils/misc"

const ColorPicker = (
    { colors, setColors, index }:
    { colors: Color[], setColors: Dispatch<SetStateAction<Color[]>>, index: number }
) => <RgbaColorPicker
        className=''
        color={convertColorToRgba(colors[index])}
        onChange={(newColor: RgbaColor) => {
            setColors(colors.map((color, i) => {
                if (i === index) return Object.values(newColor) as Color
                else return color
            }))
        }}
    />

const EditingOverlay = (
    { colors, setColors }:
    { colors: Color[], setColors: Dispatch<SetStateAction<Color[]>>
}) => {
  return (
    <div className="flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-8 w-[32rem] flex-wrap items-center justify-center">
        { range(4).map(index => <ColorPicker
            colors={colors}
            setColors={setColors}
            index={index}
        />)}
        
    </div>
  )
}

export default EditingOverlay