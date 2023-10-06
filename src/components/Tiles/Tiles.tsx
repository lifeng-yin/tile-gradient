import { Color } from '../../types/types'

const Tiles = ({ gradients, tileWidth, tileHeight }: { gradients: Color[][], tileWidth: number, tileHeight: number }) => {
  return (
    <div>
    { gradients.map((row => (
      <div className="flex">
        { row.map(color => (
          <div
            style={{
                width: tileWidth,
                height: tileHeight,
                backgroundColor: `rgba(${color.join(', ')})`
             }}></div>
        )) }
      </div>
    ))) }
    </div>
  )
}

export default Tiles