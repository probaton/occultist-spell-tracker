import React from "react";
import { Animated, PanResponder, StyleSheet, TouchableOpacity, View } from "react-native";

import Spell from "../spells/Spell";
import { nextSpellState, previousSpellState } from "../spells/SpellState";
import SpellStore from "../store/SpellStore";
import Swipeable from "./Swipeable";

interface IProps {
    spell: Spell;
    updateSpells: (updatedSpells: Spell[]) => void;
    renderContent: (spell: Spell) => React.ReactNode;
    openSpellView: (spell: Spell) => void;
}

interface IState {
    isSwiping: boolean;
}

export default class ListItem extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { isSwiping: false };
    }

    render() {
        return (
            <Swipeable
                style={this.state.isSwiping ? styles.swipingContainer : styles.staticContainer}
                swipeLeft={this.swipeLeft}
                swipeRight={this.swipeRight}
                onSwipeStart={() => this.setState({ isSwiping: true })}
                onSwipeEnd={() => this.setState({ isSwiping: false })}
            >
                <TouchableOpacity style={styles.body} onPress={this.openSpellView}>
                    {this.props.renderContent(this.props.spell)}
                </TouchableOpacity>
            </Swipeable>
        );
    }

    private swipeRight = async () => {
        this.props.spell.state = nextSpellState(this.props.spell.state);
        this.props.updateSpells(await SpellStore.update(this.props.spell));
    }

    private swipeLeft = async () => {
        this.props.spell.state = previousSpellState(this.props.spell.state);
        this.props.updateSpells(await SpellStore.update(this.props.spell));
    }

    private openSpellView = () => {
        this.props.openSpellView(this.props.spell);
    }
}

const styles = StyleSheet.create({
    staticContainer: {
        borderColor: "#DDDDDD",
        borderBottomWidth: 1,
    },
    swipingContainer: {
        opacity: 0.2,
        borderColor: "#DDDDDD",
        borderBottomWidth: 1,
    },
    body: {
        backgroundColor: "#FFFFFF",
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 6,
        paddingBottom: 6,
    },
});
