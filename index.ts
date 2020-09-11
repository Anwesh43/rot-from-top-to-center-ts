const w : number = window.innerWidth 
const h : number = window.innerHeight
const parts : number = 4  
const scGap : number = 0.02 / parts 
const delay : number = 20
const strokeFactor : number = 90 
const sizeFactor : number = 5.6 
const colors : Array<string> = [
    "#F44336",
    "#4CAF50",
    "#03A9F4",
    "#3F51B5",
    "#FF5722"
]
const backColor : string = "#BDBDBD"

class ScaleUtil {

    static sinify(scale : number) {
        return Math.sin(scale * Math.PI)
    }

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n 
    }
}