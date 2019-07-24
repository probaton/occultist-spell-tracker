import React from "react";
import { Button, StyleSheet, View } from "react-native";

import ListItem from "./ListItem";
import { SpellDialog } from "./SpellDialog";

import Spell from "../spells/Spell";
import SpellStore from "../store/SpellStore";

interface IState {
    viewState: "createSpell" | undefined;
    spells: Spell[];
}

export default class Home extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            viewState: undefined,
            spells: [],
        };
    }

    async componentDidMount() {
        this.setState({ spells: await SpellStore.get() });
    }

    render() {
        switch (this.state.viewState) {
            case ("createSpell"): return <SpellDialog close={this.closeDialogs}/>;
            default: return this.renderContent();
        }
    }

    private renderContent() {
        return (
            <>
                <View style={styles.topBar}>
                    <Button title="New" onPress={() => this.setState({ viewState: "createSpell" })}/>
                    <Button title="List" onPress={async () => console.log(">>> spells", await SpellStore.get())}/>
                    <Button title="Clear" onPress={() => SpellStore.clear()}/>
                </View>
                {this.renderItems()}
            </>
        );
    }

    private renderItems() {
        return this.state.spells.map(spell => <ListItem key={spell.id} spell={spell}/>);
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
