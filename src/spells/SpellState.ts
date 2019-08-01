export type SpellState = "active" | "recharge" | "inactive";

export function nextSpellState(spellState: SpellState): SpellState {
    switch (spellState) {
        case "active": return "recharge";
        case "recharge": return "inactive";
        case "inactive": return "active";
    }
}

export function previousSpellState(spellState: SpellState): SpellState {
    switch (spellState) {
        case "active": return "inactive";
        case "recharge": return "active";
        case "inactive": return "recharge";
    }
}
