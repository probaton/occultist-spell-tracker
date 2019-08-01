import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import Tab from "./Tab";

import { SpellState } from "../spells/SpellState";

interface IProps {
    onTabPress: (selectedTab: SpellState) => void;
    onAddPress: () => void;
    activeTab: SpellState;
}

export default class TabBar extends React.Component<IProps> {
    render() {
        return (
            <View style={styles.container}>
                <Tab caption="Active" tabName="active" activeTab={this.props.activeTab} onPress={this.props.onTabPress}/>
                <Tab caption="Recharge" tabName="recharge" activeTab={this.props.activeTab} onPress={this.props.onTabPress}/>
                <Tab caption="Inactive" tabName="inactive" activeTab={this.props.activeTab} onPress={this.props.onTabPress}/>
                <TouchableOpacity style={styles.plusButton} onPress={this.props.onAddPress}>
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
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#C70909",
    },
    plusButton: {
        paddingTop: 34,
        flex: 1,
        alignItems: "center",
        marginTop: -6,
    },
    plus: {
        width: 32,
    },
});
