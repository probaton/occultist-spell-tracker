import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface IProps {
    caption: string;
}

export default class Spell extends React.Component<IProps> {
    render() {
        return (
            <TouchableOpacity style={styles.container}>
                <Text style={styles.caption}>{this.props.caption}</Text>
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
