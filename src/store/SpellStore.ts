import Spell from "../spells/Spell";
import StoreItem from "./StoreItem";

export default abstract class SpellStore {
    static async get(): Promise<Spell[]> {
        const spellsString = await this.store().get();
        return spellsString ? JSON.parse(spellsString) as Spell[] : [];
    }

    static async add(spell: Spell): Promise<void> {
        const spells = await this.get();
        if (!spells) {
            this.set([spell]);
        } else {
            spells.push(spell);
            this.set(spells);
        }
    }

    static async update(spell: Spell): Promise<Spell[]> {
        const spells = await this.get();
        const spellIndex = spells.findIndex(s => s.id === spell.id);
        if (spellIndex === -1) {
            throw new Error("Spell does not exist");
        }
        spells[spellIndex] = spell;
        await this.set(spells);
        return spells;
    }

    static async remove(name: string): Promise<void> {
        const spells = await this.get();
        this.set(spells.filter(o => o.name !== name));
    }

    static set(spells: Spell[]): void {
        this.store().set(JSON.stringify(spells));
    }

    private static store(): StoreItem {
        return new StoreItem("spells");
    }

    static async clear() {
        this.store().clear();
    }
}

