import React from "react";
import { StyleSheet, View } from "react-native";

import { SpellState } from "../spells/SpellState";
import Tab from "./Tab";

interface IProps {
    onTabPress: (selectedTab: SpellState) => void;
}

interface IState {
    activeTab: SpellState;
}

export default class TabBar extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { activeTab: "active" };
    }

    render() {
        return (
            <View style={styles.container}>
                <Tab caption="Active" tabName="active" activeTab={this.state.activeTab} onPress={this.onTabPress}/>
                <Tab caption="Recharge" tabName="recharge" activeTab={this.state.activeTab} onPress={this.onTabPress}/>
                <Tab caption="Inactive" tabName="inactive" activeTab={this.state.activeTab} onPress={this.onTabPress}/>
            </View>
        );
    }

    private onTabPress = (tab: SpellState) => {
        this.props.onTabPress(tab);
        this.setState({ activeTab: tab });
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingTop: 24,
    },
});
