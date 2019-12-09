import options from './options.js'

//создаем юнита
export default class Creep {
    constructor(opt) {
        this.waypoints = options.waypoints
        this.ctx = opt.ctx

        this.x = opt.x
        this.y = opt.y
        this.radius = opt.radius
        this.color = opt.color

        this.speed = opt.speed / 5

        this.Wp = {
            x: this.waypoints[0].x,
            y: this.waypoints[0].y
        }

        this.index = 0

    }

    draw = () => {

        this.ctx.save();

        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)

        this.ctx.fillStyle = this.color
        this.ctx.fill()

        this.ctx.restore()
    }

    step = () => {
        //останавливаем enemy
        if(!this.waypoints[this.index]){
            console.log('stop')
            return false
        }
        
        if(this.nextWp()){
            this.index++
            
            this.Wp = {
                x: this.waypoints[this.index].x,
                y: this.waypoints[this.index].y
            
            }
        } else {
            this.nextWp()
        }

        return true
    }

    nextWp = () => {

        let distX = this.Wp.x - this.x
        let distY = this.Wp.y - this.y

        let angle = Math.atan2(distY, distX);

        this.x += this.speed * Math.cos(angle)
        this.y += this.speed * Math.sin(angle)

        return (distX < 0 ? -distX : distX) + (distY < 0 ? -distY : distY) < 2
    }
}