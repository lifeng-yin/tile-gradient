import { RgbaColor } from "react-colorful"
import { Color } from "../types/types"
import { range } from "./misc"

const findGradientIncrements = (firstColor: Color, secondColor: Color, numTiles: number) => {
    return range(4).map(index => (secondColor[index] - firstColor[index]) / (numTiles - 1))
}

export const calculateTileColors = (colors: Color[], totalRows: number, totalCols: number) => {
    const leftIncrements = findGradientIncrements(colors[0], colors[2], totalRows)
    const rightIncrements = findGradientIncrements(colors[1], colors[3], totalRows)
      
    return range(totalRows).map(rowNum => {
        const firstColor = leftIncrements.map((increment, index) => colors[0][index] + increment * rowNum) as Color
        const lastColor = rightIncrements.map((increment, index) => colors[1][index] + increment * rowNum) as Color
    
        const colIncrements = findGradientIncrements(firstColor, lastColor, totalCols)
    
        return range(totalCols).map(colNum => {
          return colIncrements.map((increment, index) => firstColor[index] + increment * colNum) as Color
        })
    })
}

export const convertColorToRgba = (color: Color): RgbaColor => ({
    'r': color[0],
    'g': color[1],
    'b': color[2],
    'a': color[3]
})

export const generateRandomColors = (): Color[] => {
    return range(4).map(_ => range(4).map(j => {
        if (j === 3) return 1
        else return Math.floor(Math.random() * 255)
    }) as Color)
}