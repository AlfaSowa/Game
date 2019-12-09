import Creep from './creep'
import towers from './towers'
import Map from './map'
import options from './options'

const WIDTH = 700
const HEIGHT = 700

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class Game {

    constructor() {
        canvas.width = WIDTH
        canvas.height = HEIGHT
        this.enemies = []
        this.map = false
    }

    init = () => {

        //инциализируем объекты
        //карта
        this.map = new Map({
            ctx: ctx, 
            width: WIDTH,
            height: HEIGHT,
            color: '#fff',
        })
        
        //враги
        const creep = new Creep({
            ctx: ctx,
            x: 100,
            y: 0,
            color: 'red',
            radius: 15,
            speed: 10
        })
        this.enemies.push(creep)
        
        //отрисовываем объекты
        this.map.draw()
        this.enemies.forEach(creep => {
            creep.draw()
        })


        requestAnimationFrame(this.draw)
    }
    
    draw = () => {
        //обновляем объекты
        //карта
        this.map.draw()

        //враги
        this.enemies.forEach(creep => {
            //движение врагов
            creep.step()
            creep.draw()
        })

        requestAnimationFrame(this.draw)
    }
}

window.onload = new Game().init()