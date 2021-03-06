import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";

import { SpellState } from "../spells/SpellState";

interface IProps {
    caption: string;
    tabName: SpellState;
    activeTab: SpellState;
    onPress: (tab: SpellState) => void;
}

export default class Tab extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
        this.state = { activeTab: "active" };
    }

    render() {
        const { caption, activeTab, tabName } = this.props;

        return (
            <TouchableOpacity onPress={this.onPress} style={tabName === activeTab ? styles.activeTab : styles.passiveTab}>
                <Text style={styles.caption}>{caption}</Text>
            </TouchableOpacity>
        );
    }

    private onPress = () => {
        const { tabName, onPress } = this.props;
        onPress(tabName);
    }
}

const styles = StyleSheet.create({
    activeTab: {
        width: Dimensions.get("window").width / 100 * 30,
        alignItems: "center",
        backgroundColor: "#7A0002",
        paddingTop: 42,
        padding: 8,
    },
    passiveTab: {
        width: Dimensions.get("window").width / 100 * 30,
        alignItems: "center",
        paddingTop: 42,
        padding: 8,
    },
    caption: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
});
