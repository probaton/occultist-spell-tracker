import React from "react";

import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from "react-native";

import Spell from "../spells/Spell";

interface IProps {
    items: Spell[];
    renderItem: (item: Spell) => any;
}

export default class List extends React.Component<IProps> {
    render() {
        const items = this.props.items;
        if (items.length === 0) {
            return (
                <View style={styles.emptyListMessage}>
                    <Text>You have no spells in this category</Text>
                </View>
            );
        }
        return (
            <FlatList
                keyExtractor={item => item.id}
                data={this.props.items}
                renderItem={this.renderItem}
            />
        );
    }

    private renderItem = (info: ListRenderItemInfo<Spell>) => {
        return this.props.renderItem(info.item);
    }
}

const styles = StyleSheet.create({
    emptyListMessage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
