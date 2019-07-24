import React from "react";
import { StyleSheet } from "react-native";

import { ActiveTab } from "./ActiveTab";
import ListItem from "./ListItem";
import { SpellDialog } from "./SpellDialog";

import Spell from "../spells/Spell";
import SpellStore from "../store/SpellStore";
import TabBar from "./TabBar";

interface IState {
    viewState: "createSpell" | undefined;
    spells: Spell[];
    loading: boolean;
    activeTab: ActiveTab;
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
                <TabBar onTabPress={this.selectTab}/>
                {this.props.loading ? null : this.renderItems()}
            </>
        );
    }

    private renderItems() {
        return this.state.spells.map(spell => <ListItem key={spell.id} spell={spell}/>);
    }

    private closeDialogs = () => {
        this.setState({ viewState: undefined });
    }

    private selectTab = (tab: ActiveTab) => {
        this.setState({ activeTab: tab });
    }

    private refreshSpells = async () => {
        this.setState({ loading: true });
        this.setState({ loading: false, spells: await SpellStore.get() });
    }
}
