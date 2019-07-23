import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { Spell } from "../spells/Spell";

interface IProps {
    spell: Spell;
}

export default class ListItem extends React.Component<IProps> {
    render() {
        return (
            <TouchableOpacity style={styles.container}>
                <Text style={styles.caption}>{this.props.spell.name}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#edecee",
        borderRadius: 5,
        elevation: 2,
        marginTop: 8,
        marginLeft: 8,
        marginRight: 8,
    },
    caption: {
        marginLeft: 16,
        fontWeight: "bold",
        fontSize: 32,
        color: "#6e6976ff",
    },
});
