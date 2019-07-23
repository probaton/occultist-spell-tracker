import React from "react";
import { Button, StyleSheet, View } from "react-native";


import ListItem from "./ListItem";
import { SpellDialog } from "./SpellDialog";

import { Spell } from "../spells/Spell";
import SpellStore from "../store/SpellStore";

interface IState {
    viewState: "createSpell" | undefined;
}

export default class Home extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = { viewState: undefined };
    }

    render() {
        return (
            <>
                <View style={styles.topBar}>
                    <Button title="New" onPress={() => this.setState({ viewState: "createSpell" })}/>
                </View>
                {this.renderContent()}
            </>
        );
    }

    private renderContent() {
        switch (this.state.viewState) {
            case ("createSpell"): return <SpellDialog close={this.closeDialogs}/>;
            default: return this.renderButtons();
        }
    }

    private renderButtons() {
        return (
            <>
                <ListItem spell={new Spell("fireball", "when I happen", "what happens", 5, 1, 1)}/>
                <ListItem spell={new Spell("magic missile", "when I happen", "what happens", 5, 1, 1)}/>
            </>
        );
    }

    private closeDialogs = () => {
        this.setState({ viewState: undefined });
    }
}

const styles = StyleSheet.create({
    topBar: {
        backgroundColor: "#4f8973ff",
        maxHeight: 100,
        flex: 1,
    },
});
