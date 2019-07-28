import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Interaction from "./Interaction";

import { generateRechargeText } from "../helpers/spellHelpers";
import Spell from "../spells/Spell";

interface IProps {
    spell: Spell;
    close: () => void;
}

export default class SpellView extends React.Component<IProps> {
    render() {
        const { spell, close } = this.props;
        return (
            <Interaction
                dialogTitle={spell.name}
                close={close}
            >
                <Text style={styles.label}>Trigger</Text>
                <Text>{spell.trigger}</Text>
                <Text style={styles.label}>Target</Text>
                <Text>{spell.target}</Text>
                <Text style={styles.label}>Attack</Text>
                <Text>{spell.attack}</Text>

                <Text style={styles.divider}>___________________________</Text>

                <Text style={styles.label}>Effect</Text>
                <Text>{spell.effect}</Text>
                <Text style={styles.label}>Miss</Text>
                <Text>{spell.miss}</Text>

                <Text style={styles.divider}>___________________________</Text>

                <View style={styles.statBar}>
                    <View style={styles.stat}>
                        <Text style={styles.label}>Recharge</Text>
                        <Text>{generateRechargeText(spell)}</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.label}>Retain Focus</Text>
                        <Text>{spell.retainFocus}</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.label}>Spell Level</Text>
                        <Text>{spell.level}</Text>
                    </View>
                </View>
            </Interaction>
        );
    }
}

const styles = StyleSheet.create({
    label: {
        fontWeight: "bold",
        marginTop: 4,
    },
    divider: {
        color: "#DDDDDD",
        textAlign: "center",
        marginBottom: 12,
        fontWeight: "normal",
    },
    statBar: {
        flexDirection: "row",
    },
    stat: {
        flex: 1,
        alignItems: "center",
    },
});
