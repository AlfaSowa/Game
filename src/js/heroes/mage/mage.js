import { BaseHeroClass } from "../base/baseHeroClass";
import { Blast } from "./spells/blast";

export class Mage extends BaseHeroClass {
    radius = 30;
    color = "blue";
    typeAttack = "range";

    blastes = [];
    constructor(opt) {
        super(opt);
    }

    createAoeSpellRange = (radius) => {
        this.aoeRadius = radius;
        this.aoeRangeCheck = !this.aoeRangeCheck;
        if (this.aoeRangeCheck) {
            this.canvas.style.cursor = "none";
        } else {
            this.canvas.style.cursor = "auto";
        }
    };

    blast = () => {
        this.isUseSpell = true;
        this.blastes.push(new Blast(this.ctx, this.mouse));
    };

    useSpell = (e) => {
        switch (e.keyCode) {
            case 87:
                super.baseAttack();
                break;
            case 69:
                this.blast();
                break;
        }
    };

    drawSpells = () => {
        if (this.blastes && this.blastes.length > 0) {
            this.blastes.forEach((item) => {
                item.draw();
                if (item.finish) {
                    this.blastes = this.blastes.filter((blast) => !blast.finish);
                }
            });
        }
    };

    draw(obj) {
        super.draw(obj);
        this.drawSpells();
    }
}
