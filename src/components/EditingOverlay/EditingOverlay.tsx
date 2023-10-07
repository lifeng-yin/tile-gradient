import { ReactNode } from "react"
import { RgbaColorPicker, RgbaColor } from "react-colorful"
import { convertColorToRgba } from "../../utils/colors"
import { Color } from "../../types/types"
import { Dispatch, SetStateAction } from "react"
import { range } from "../../utils/misc"

const ColorPicker = (
    { colors, setColors, index }:
    { colors: Color[], setColors: Dispatch<SetStateAction<Color[]>>, index: number }
) => <RgbaColorPicker
        className="shadow rounded-[10px]"
        color={convertColorToRgba(colors[index])}
        onChange={(newColor: RgbaColor) => {
            setColors(colors.map((color, i) => {
                if (i === index) return Object.values(newColor) as Color
                else return color
            }))
        }}
    />

const EditingOverlay = (
    { colors, setColors, children }:
    { colors: Color[], setColors: Dispatch<SetStateAction<Color[]>>, children: ReactNode }
) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-wrap justify-center items-center gap-7 w-[32rem] py-8 bg-white/30 rounded-lg shadow backdrop-blur-[2px]">
        { range(4).map(index => <ColorPicker
            colors={colors}
            setColors={setColors}
            index={index}
        />)}
        { children }
    </div>
  )
}

export default EditingOverlay