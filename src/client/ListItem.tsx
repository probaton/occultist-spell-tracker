import React from "react";
import { Animated, PanResponder, StyleSheet, TouchableOpacity, View } from "react-native";

import Spell from "../spells/Spell";
import { SpellState } from "../spells/SpellState";
import SpellStore from "../store/SpellStore";

interface IProps {
    spell: Spell;
    updateSpells: (updatedSpells: Spell[]) => void;
    renderContent: (spell: Spell) => React.ReactNode;
    openSpellView: (spell: Spell) => void;
}

interface IState {
    position: Animated.ValueXY;
}

export default class ListItem extends React.Component<IProps, IState> {
    swipeResponder: any;

    constructor(props: IProps) {
        super(props);

        const position = new Animated.ValueXY();
        this.swipeResponder = PanResponder.create({
            onStartShouldSetPanResponder: (event, gestureState) => false,
            onMoveShouldSetPanResponder: (event, gestureState) => true,
            onPanResponderTerminationRequest: (event, gestureState) => false,
            onPanResponderMove: (event, gestureState) => {
                if (gestureState.dx > 35) {
                    position.setValue({x: gestureState.dx, y: 0});
                }
            },
            onPanResponderRelease: (event, gestureState) => {
                if (gestureState.dx > 120 ) {
                    this.swipeRight(this.props.spell);
                } else {
                    Animated.timing(this.state.position, {
                        toValue: {x: 0, y: 0},
                        duration: 150,
                    }).start();
                }
            },
        });
        this.state = { position };
    }

    render() {
        return (
            <View style={styles.container}>
                <Animated.View style={[this.state.position.getLayout()]}{...this.swipeResponder.panHandlers}>
                    <View style={styles.absoluteCell}/>
                    <View style={styles.body}>
                        <TouchableOpacity onPress={this.openSpellView}>
                            {this.props.renderContent(this.props.spell)}
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
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
        marginLeft: -100,
        borderColor: "#DDDDDD",
        borderBottomWidth: 1,
    },
    absoluteCell: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        width: 100,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    body: {
        marginLeft: 100,
        backgroundColor: "#FFFFFF",
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 6,
        paddingBottom: 6,
    },
});
