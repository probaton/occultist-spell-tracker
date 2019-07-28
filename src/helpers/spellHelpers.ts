import Spell from "../spells/Spell";

export function generateRechargeText(spell: Spell) {
    return spell.recharge === 0 ? "At will" : spell.recharge + "+";
}
