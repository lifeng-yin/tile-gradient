export const range = (len: number) => Array(len).fill(0).map((_, i) => i)

export const debounce = (func: Function, duration: number) => {
    let timeout: number;
    return (...args: any[]) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => func.apply(this, args), duration)
    }
}