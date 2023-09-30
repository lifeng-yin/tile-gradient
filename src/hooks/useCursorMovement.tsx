import { useState } from "react"

const useCursorMovement = () => {
    const [isCursorIdle, setIsCursorIdle] = useState(false)

    const IDLE_INTERVAL = 500

    let idleTimeout: number;
    document.addEventListener('mousemove', () => {
        setIsCursorIdle(false)
        clearTimeout(idleTimeout)
        setTimeout(() => setIsCursorIdle(true), IDLE_INTERVAL)
    })

    return isCursorIdle
}

export default useCursorMovement