import React from "react";
import { Animated, PanResponder, StyleSheet, TouchableOpacity, View } from "react-native";

import Spell from "../spells/Spell";
import { nextSpellState, previousSpellState } from "../spells/SpellState";
import SpellStore from "../store/SpellStore";

interface IProps {
    spell: Spell;
    updateSpells: (updatedSpells: Spell[]) => void;
    renderContent: (spell: Spell) => React.ReactNode;
    openSpellView: (spell: Spell) => void;
}

interface IState {
    isSwiping: boolean;
    position: Animated.ValueXY;
}

export default class ListItem extends React.Component<IProps, IState> {
    swipeResponder: any;

    constructor(props: IProps) {
        super(props);

        const position = new Animated.ValueXY();
        this.swipeResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderTerminationRequest: () => false,
            onPanResponderMove: (event, gestureState) => {
                this.setState({ isSwiping: true });
                if (gestureState.dx > 35 || gestureState.dx < -35) {
                    position.setValue({x: gestureState.dx, y: 0});
                }
            },
            onPanResponderRelease: (event, gestureState) => {
                if (gestureState.dx > 120 ) {
                    this.swipeRight(this.props.spell);
                } else if (gestureState.dx < -120) {
                    this.swipeLeft(this.props.spell);
                } else {
                    Animated.timing(this.state.position, {
                        toValue: {x: 0, y: 0},
                        duration: 150,
                    }).start();
                }
                this.setState({ isSwiping: false });
            },
        });
        this.state = { position, isSwiping: false };
    }

    render() {
        return (
            <View style={this.state.isSwiping ? styles.swipingContainer : styles.staticContainer}>
                <Animated.View
                    style={[this.state.position.getLayout()]}
                    {...this.swipeResponder.panHandlers}
                >
                    <TouchableOpacity style={styles.body} onPress={this.openSpellView}>
                        {this.props.renderContent(this.props.spell)}
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    }

    private swipeRight = async (spell: Spell) => {
        spell.state = nextSpellState(spell.state);
        this.props.updateSpells(await SpellStore.update(spell));
    }

    private swipeLeft = async (spell: Spell) => {
        spell.state = previousSpellState(spell.state);
        this.props.updateSpells(await SpellStore.update(spell));
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
