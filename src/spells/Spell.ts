import uuid from "../helpers/uuid";
import { SpellState } from "../spells/SpellState";

export default class Spell {
    id: string;
    state: SpellState;
    name: string;
    trigger: string;
    effect: string;
    retainFocus: number;
    recharge: number;
    level: number;

    constructor(
        name: string,
        trigger: string,
        effect: string,
        retainFocus: number,
        recharge: number,
        level: number,
    ) {
        this.id = uuid();
        this.state = "inactive";
        this.name = name;
        this.trigger = trigger;
        this.effect = effect;
        this.retainFocus = retainFocus;
        this.recharge = recharge;
        this.level = level;
    }
}
