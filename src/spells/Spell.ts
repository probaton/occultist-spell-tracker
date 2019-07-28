import uuid from "../helpers/uuid";
import { SpellState } from "../spells/SpellState";

export default class Spell {
    id: string;
    state: SpellState;
    name: string;
    trigger: string;
    target: string;
    attack: string;
    effect: string;
    miss: string;
    recharge: number;
    retainFocus: number;
    level: number;

    constructor(
        name: string,
        trigger: string,
        target: string,
        attack: string,
        effect: string,
        miss: string,
        recharge: number,
        retainFocus: number,
        level: number,
    ) {
        this.id = uuid();
        this.state = "inactive";
        this.name = name;
        this.trigger = trigger;
        this.target = target;
        this.attack = attack;
        this.effect = effect;
        this.miss = miss;
        this.recharge = recharge;
        this.retainFocus = retainFocus;
        this.level = level;
    }
}
