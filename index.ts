const w : number = window.innerWidth 
const h : number = window.innerHeight
const parts : number = 5
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

class DrawingUtil {

    static drawLine(context : CanvasRenderingContext2D, x1 : number, y1 : number, x2 : number, y2 : number) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
    }

    static drawRotFromTopToCenter(context : CanvasRenderingContext2D, scale : number) {
        const sf : number = ScaleUtil.sinify(scale)
        const sf1 : number = ScaleUtil.divideScale(sf, 0, parts)
        const sf2 : number = ScaleUtil.divideScale(sf, 1, parts)
        const sf3 : number = ScaleUtil.divideScale(sf, 2, parts)
        const sf4 : number = ScaleUtil.divideScale(sf, 1, parts)
        const size : number = Math.min(w, h) / sizeFactor 
        const y : number = -(h / 2 - size) * (1 - sf2)
        const x : number = -0.4 * w + (-size + 0.4 * w) * sf4 
        context.save()
        context.translate(w / 2, h / 2)
        for (var j = 0; j < 2; j++) {
            context.save()
            context.scale(1 - 2 * j, 1)
            context.translate(x, y)
            context.rotate(Math.PI / 2 * sf3)
            DrawingUtil.drawLine(context, 0, -size, 0, -size + size * sf1)
            context.restore()
        }
        context.restore()
    }

    static drawRFTCNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor 
        context.strokeStyle = colors[i]
        DrawingUtil.drawRotFromTopToCenter(context, scale)
    }
}

class Stage {

    canvas : HTMLCanvasElement = document.createElement('canvas')
    context : CanvasRenderingContext2D 

    initCanvas() {
        this.canvas.width = w  
        this.canvas.height = h
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }

    render() {
        this.context.fillStyle = backColor 
        this.context.fillRect(0, 0, w, h)
    }

    handleTap() {
        this.canvas.onmousedown = () => {

        }
    }

    static init() {
        const stage : Stage = new Stage()
        stage.initCanvas()
        stage.render()
        stage.handleTap()
    }
}