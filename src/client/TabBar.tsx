import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import Tab from "./Tab";

import { SpellState } from "../spells/SpellState";

interface IProps {
    onTabPress: (selectedTab: SpellState) => void;
    onAddPress: () => void;
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
                <TouchableOpacity onPress={this.props.onAddPress}>
                    <Image
                        style={styles.plus}
                        source={require("./images/Add.png")}
                        resizeMode="contain"
                        resizeMethod="scale"
                    />
                </TouchableOpacity>
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
        backgroundColor: "#C70909",
    },
    plus: {
        width: 32,
    },
});
