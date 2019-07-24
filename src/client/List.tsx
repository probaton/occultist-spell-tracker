import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Spell from "../spells/Spell";

interface IProps {
    items: Spell[];
    renderItem: (item: Spell) => any;
}

export default class List extends React.Component<IProps> {
    render() {
        return (
            <>
                {this.renderItems()}
            </>
        );
    }

    private renderItems() {
        const items = this.props.items;
        if (items.length === 0) {
            return (
                <View style={styles.emptyListMessage}>
                    <Text>You have no spells in this category</Text>
                </View>
            );
        }
        return items.map(item => this.props.renderItem(item));
    }
}

const styles = StyleSheet.create({
    emptyListMessage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
