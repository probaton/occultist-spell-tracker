import uuid from "../helpers/uuid";

export default class Spell {
    id: string;
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
        this.name = name;
        this.trigger = trigger;
        this.effect = effect;
        this.retainFocus = retainFocus;
        this.recharge = recharge;
        this.level = level;
    }
}
