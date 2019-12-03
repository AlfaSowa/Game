import ctx from './canvas'

//создаем базовую модель башни
class Tower {
    constructor(name, damage, attackspeed, ...debufs) {
        this.name = name,
        this.damage = damage,
        this.attackspeed = attackspeed,
        this.debuffs = [...debufs]
    }

    getDebuffs() {
        console.log(`${this.name} использует дебафф${this.debuffs.length > 1 ? 'ы' : ''} ${[...this.debuffs]}`)
    }
}


//рисуем башню
function drawTower() {
    ctx.beginPath()
    ctx.fillStyle = "green"
    ctx.arc(350, 350, 25, 0, 2 * Math.PI)
    ctx.fill()
}

drawTower()

//создание башен
let towers = [
    new Tower('SlowTower', 35, 100, ['МАЗАФАКАЩИТ', 'ПЕРДУЛИО'])
]
export default towers





