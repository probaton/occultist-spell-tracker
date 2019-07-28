import React from "react";
import { StyleSheet, Text, View } from "react-native";

import List from "./List";
import ListItem from "./ListItem";
import SpellDialog from "./SpellDialog";
import TabBar from "./TabBar";

import Spell from "../spells/Spell";
import { SpellState } from "../spells/SpellState";
import SpellStore from "../store/SpellStore";

interface IState {
    viewState: "createSpell" | undefined;
    spells: Spell[];
    loading: boolean;
    activeTab: SpellState;
}

export default class Home extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            loading: true,
            viewState: undefined,
            spells: [],
            activeTab: "active",
        };
    }

    async componentDidMount() {
        this.refreshSpells();
    }

    render() {
        switch (this.state.viewState) {
            case ("createSpell"): return <SpellDialog onSubmit={this.refreshSpells} close={this.closeDialogs}/>;
            default: return this.renderContent();
        }
    }

    private renderContent() {
        return (
            <>
                <TabBar onTabPress={this.selectTab} onAddPress={() => this.setState({ viewState: "createSpell" })}/>
                {this.state.loading ? null : this.renderList()}
            </>
        );
    }

    private renderList() {
        switch (this.state.activeTab) {
            case ("active"): return <List items={this.filterSpellsByState("active")} renderItem={this.renderItem(this.activeItemContent)}/>;
            case ("recharge"): return <List items={this.filterSpellsByState("recharge")} renderItem={this.renderItem(this.rechargeItemContent)}/>;
            case ("inactive"): return <List items={this.filterSpellsByState("inactive")} renderItem={this.renderItem(this.inactiveItemContent)}/>;
        }
    }

    private renderItem(itemContent: (spell: Spell) => void) {
        return (item: Spell) => {
            return (
                <ListItem
                    spell={item}
                    updateSpells={(updatedSpells) => this.setState({ spells: updatedSpells })}
                    renderContent={itemContent}
                />
            );
        };
    }

    private activeItemContent = (spell: Spell) => {
        return (
            <>
                <View style={styles.titleBar}>
                    <Text style={styles.title}>{spell.name}</Text>
                    <View style={styles.rechargeContainer}>
                        <Text style={styles.recharge}>{this.rechargeText(spell)}</Text>
                    </View>
                </View>
                <Text style={styles.bodyText}>{spell.trigger}</Text>
            </>
        );
    }

    private rechargeItemContent = (spell: Spell) => {
        return (
                <View style={styles.titleBar}>
                    <Text style={styles.title}>{spell.name}</Text>
                    <View style={styles.rechargeContainer}>
                        <Text style={styles.recharge}>{this.rechargeText(spell)}</Text>
                    </View>
                </View>
        );
    }

    private inactiveItemContent = (spell: Spell) => {
        return (
            <>
                <Text style={styles.title}>{spell.name}</Text>
                <Text style={styles.bodyText}>{spell.effect}</Text>
            </>
        );
    }

    private closeDialogs = () => {
        this.setState({ viewState: undefined });
    }

    private selectTab = (tab: SpellState) => {
        this.setState({ activeTab: tab });
    }

    private refreshSpells = async () => {
        this.setState({ loading: true });
        this.setState({ loading: false, spells: await SpellStore.get() });
    }

    private filterSpellsByState(state: SpellState): Spell[] {
        return this.state.spells.filter(spell => spell.state === state);
    }

    private rechargeText(spell: Spell): string {
        return spell.recharge === 0 ? "At will" : spell.recharge + "+";
    }
}

const styles = StyleSheet.create({
    titleBar: {
        flexDirection: "row",
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#000000",
    },
    recharge: {
        textAlign: "right",
        justifyContent: "flex-end",
        fontSize: 16,
    },
    bodyText: {

    },
    rechargeContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-end",
    },
});
