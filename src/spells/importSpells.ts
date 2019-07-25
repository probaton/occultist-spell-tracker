import Spell from "./Spell";

export async function importSpells(): Promise<Spell[]> {
    const spellResponse: any = await fetch("https://script.google.com/macros/s/AKfycbycYP9Id5vTq8yr8qLs5llMDGFUACo365xo2zqYoBG8kdBRGUI/exec");
    const rawSpells: any = await spellResponse.json();
    return rawSpells.map((rs: any) => new Spell(rs.name, rs.trigger, rs.effect, rs.retainFocus, rs.recharge, rs.level));
}
