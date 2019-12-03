class Hero {
    constructor(name) {
        this.name = name
    }
}

let hero = new Hero('Pedro')

let heroElem = document.createElement('div')
heroElem.className = 'hero'

let heroName = document.createElement('div')
heroName.className = 'hero__name'
heroName.innerText = hero.name
heroElem.append(heroName)

let gameFild = document.querySelector('.game')
gameFild.append(heroElem)