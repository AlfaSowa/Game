import { Mage } from "./mage/mage";
import { Warrior } from "./warrior/warrior";

export class HeroFactory {
    static heroes = {
        mage: Mage,
        warrior: Warrior,
    };

    constructor(opt) {
        this.opt = opt;
    }

    createHero = (name) => {
        const GetHero = HeroFactory.heroes[name];
        const hero = new GetHero(this.opt);
        console.log(hero);

        return hero;
    };
}
