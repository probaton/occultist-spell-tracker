import React from "react";
import { Animated, PanResponder, StyleSheet, Text } from "react-native";

import Spell from "../spells/Spell";
import { SpellState } from "../spells/SpellState";
import SpellStore from "../store/SpellStore";

interface IProps {
    spell: Spell;
    updateSpells: (updatedSpells: Spell[]) => void;
}

export default class ListItem extends React.Component<IProps> {
    swipeResponder: any;

    constructor(props: IProps) {
        super(props);
        this.swipeResponder = PanResponder.create({
            onStartShouldSetPanResponder: (event, gestureState) => false,
            onMoveShouldSetPanResponder: (event, gestureState) => true,
            onPanResponderTerminationRequest: (event, gestureState) => false,
            onPanResponderRelease: (event, gestureState) => {
                if (gestureState.dx > 0) {
                    this.swipeRight(this.props.spell);
                }
                if (gestureState.dx < 0) {
                    this.swipeLeft(this.props.spell);
                }
            },
        });
    }

    render() {
        return (
                <Animated.View style={styles.container}{...this.swipeResponder.panHandlers}>
                    <Text style={styles.caption}>{this.props.spell.name}</Text>
                </Animated.View>
        );
    }

    private swipeRight = async (spell: Spell) => {
        spell.state = this.nextState(spell.state);
        this.props.updateSpells(await SpellStore.update(spell));
    }

    private swipeLeft = async (spell: Spell) => {
        spell.state = this.previousState(spell.state);
        this.props.updateSpells(await SpellStore.update(spell));
    }

    private nextState(spellState: SpellState): SpellState {
        switch (spellState) {
            case "active": return "recharge";
            case "recharge": return "inactive";
            case "inactive": return "active";
        }
    }

    private previousState(spellState: SpellState): SpellState {
        switch (spellState) {
            case "active": return "inactive";
            case "recharge": return "active";
            case "inactive": return "recharge";
        }
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#edecee",
        borderRadius: 5,
        elevation: 2,
        marginTop: 8,
        marginLeft: 8,
        marginRight: 8,
    },
    caption: {
        marginLeft: 16,
        fontWeight: "bold",
        fontSize: 32,
        color: "#6e6976ff",
    },
});
