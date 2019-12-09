import options from './options.js'

//создаем карту
export default class Map {
    constructor(opt) {
        this.waypoints = options.waypoints
        this.ctx = opt.ctx
        this.width = opt.width
        this.height = opt.height
        this.color = opt.color
    }

    draw = () => {
        this.ctx.save()

        this.ctx.fillStyle = this.color
        this.ctx.fill()
        
        //очищаем canvas
        this.ctx.fillRect(0, 0, this.width, this.height)

        //отрисовываем canvas
        this.ctx.strokeStyle = 'rgb(170, 170, 170)'
        this.ctx.lineWidth = 50


        //отрисовываем путь
        this.path()
        
        this.ctx.restore()

    }

    path = () => {
        this.ctx.beginPath()

        this.ctx.moveTo(
            this.waypoints[0].x,
            this.waypoints[0].y
        )

        for (let i = 1; i < this.waypoints.length; i++) {
            this.ctx.lineTo(this.waypoints[i].x, this.waypoints[i].y)
        }

        this.ctx.stroke()
    }
}