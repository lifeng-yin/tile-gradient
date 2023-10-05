import { useEffect, useState } from "react"

const useCursorMovement = () => {
    const [isCursorIdle, setIsCursorIdle] = useState(false)

    const IDLE_INTERVAL = 1000

    useEffect(() => {
        let idleTimeout: number;
        const updateIsCursorIdle = () => {
            setIsCursorIdle(false)
            clearTimeout(idleTimeout)
            idleTimeout = setTimeout(() => setIsCursorIdle(true), IDLE_INTERVAL)
        }
        document.addEventListener('mousemove', updateIsCursorIdle)

        return () => {
            document.removeEventListener('mousemove', updateIsCursorIdle)
            clearTimeout(idleTimeout)
        }
    })

    return [isCursorIdle]
}

export default useCursorMovement