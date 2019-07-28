import React from "react";
import { Animated, PanResponder, StyleSheet, TouchableOpacity } from "react-native";

import Spell from "../spells/Spell";
import { SpellState } from "../spells/SpellState";
import SpellStore from "../store/SpellStore";

interface IProps {
    spell: Spell;
    updateSpells: (updatedSpells: Spell[]) => void;
    renderContent: (spell: Spell) => React.ReactNode;
    openSpellView: (spell: Spell) => void;
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
                if (gestureState.dx > 100) {
                    this.swipeRight(this.props.spell);
                }
                if (gestureState.dx < -100) {
                    this.swipeLeft(this.props.spell);
                }
            },
        });
    }

    render() {
        return (
                <Animated.View style={styles.container}{...this.swipeResponder.panHandlers}>
                    <TouchableOpacity onPress={this.openSpellView}>
                        {this.props.renderContent(this.props.spell)}
                    </TouchableOpacity>
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

    private openSpellView = () => {
        this.props.openSpellView(this.props.spell);
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        borderColor: "#DDDDDD",
        borderBottomWidth: 1,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 6,
        paddingBottom: 6,
    },
});
