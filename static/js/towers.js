import options from './options.js'

//создаем юнитов
let towers = {
    list: [],
    create: function(x,y,r,color){
        let tower ={
            x: x,
            y: y,
            r: r,
            color: color,
            draw: function(){
                options.drawUnits(this.x, this.y, this.r, this.color)
            }
        }
        this.list.push(tower)
        return tower
    },
}
export default towers