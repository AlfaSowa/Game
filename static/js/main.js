let game = {
    canvas: false,
    ctx: false,
    init: function() {
        this.canvas = document.getElementById('canvas')
        this.ctx = this.canvas.getContext('2d')

        game.enemies.create(10)
        game.towers.create(350, 350)

        setInterval(game.update, 1000/30)

        window.requestAnimationFrame(game.draw)
    },

    update: function() {
        game.mapEntitles.update()
    },

    draw: function() {
        game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height)

        game.map.draw()

        game.mapEntitles.draw()

        window.requestAnimationFrame(game.draw)
    },

    drawUnits: function(x,y,r,color) {
        game.ctx.beginPath()
        game.ctx.arc(x, y, r, 0, 2 * Math.PI)
        game.ctx.fillStyle = color
        game.ctx.fill()
    }
}

//создаем карту
game.map = {
    waypoints: [
        {x: 100, y: 0},
        {x: 100, y: 200},
        {x: 600, y: 200},
        {x: 600, y: 600},
        {x: 450, y: 600},
        {x: 450, y: 300},
        {x: 100, y: 300},
        {x: 100, y: 500},
        {x: 250, y: 500},
    ],
    draw: function() {
        game.ctx.fillStyle = '#fff'
        game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height)

        game.ctx.save()
        game.ctx.beginPath()
        game.ctx.strokeStyle = 'rgb(170, 170, 170)'
        game.ctx.lineWidth = 60

        game.ctx.moveTo(
            game.map.waypoints[0].x,
            game.map.waypoints[0].y
        )

        for (let i = 1; i < game.map.waypoints.length; i++) {
            game.ctx.lineTo(game.map.waypoints[i].x, game.map.waypoints[i].y)
        }

        game.ctx.stroke()
        game.ctx.restore()
    }
}

//создаем товера
game.towers = {
    create: function(x,y) {
        let entity = game.mapEntitles.create(x,y,25,'green')
        entity.type = 'tower'
        entity.update = function(){}
        return entity
    }
}

//создаем юнитов
game.enemies = {
    create: function(level) {
        let entity = game.mapEntitles.create(0,0,level,'red')
        entity.type = 'enemy'
        entity.speed = 5
        entity.level = level
        entity.velocity = {x:entity.speed, y:entity.speed}
        entity.waypoint = false
        entity.waypointIndex = 0
        entity.update = function() {

            if (this.waypointReached()) {
                if(!this.nextWaypoint()){
                    return this.exit()
                }
            } else {
                this.x += entity.velocity.x
                this.y += entity.velocity.y
            }

        }

        entity.waypointReached = function() {
            return (
                (this.velocity.x > 0 && this.x >= this.waypoint.x)
            ||  (this.velocity.x < 0 && this.x <= this.waypoint.x)    
            ||  (this.velocity.y > 0 && this.y >= this.waypoint.y)    
            ||  (this.velocity.y < 0 && this.y <= this.waypoint.y)    
            )
        }

        entity.nextWaypoint = function() {

            if(!this.waypoint.x) {
                this.waypoint = Object.assign({}, game.map.waypoints[entity.waypointIndex])
                this.x = this.waypoint.x
                this.y = this.waypoint.y
            }

            let oldX = this.waypoint.x
            let oldY = this.waypoint.y

            this.waypointIndex++

            if(!game.map.waypoints[this.waypointIndex]) {
                return false
            }

            this.waypoint = Object.assign({}, game.map.waypoints[this.waypointIndex])

            if(oldX == this.waypoint.x) {
                this.velocity.x = 0
            } else {
                this.velocity.x = (this.x < this.waypoint.x ? entity.speed : -entity.speed)
            }

            if(oldY == this.waypoint.y){
                this.velocity.y = 0
            } else {
                this.velocity.y = (this.y < this.waypoint.y ? entity.speed : -entity.speed)
            }

            return true
        }

        entity.exit = function() {
            console.log('ты проиграл неудачник!!!')
        }

        entity.nextWaypoint()
        
        return entity
    }
}

//модель создания юнитов
game.mapEntitles = {
    list: {},
    idCounter: 0,
    init: function(){},
    create: function(x,y,r,color){
        let entity ={
            id: ++this.idCounter,
            x: x,
            y: y,
            r: r,
            color: color,
            update: function(){
                this.x++
                this.y++
            },
            draw: function(){
                game.drawUnits(this.x, this.y, this.r, this.color)
            },
        }
        this.list[entity.id] = entity
        return entity
    },
    update: function(){
        for (let i in this.list) {
            this.list[i].update()
        }
    },
    draw: function(){
        for (let i in this.list) {
            this.list[i].draw()
        }
    },
}

window.onload = game.init()



