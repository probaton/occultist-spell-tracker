import React from "react";

import { Animated, FlatList, ListRenderItemInfo, PanResponder, StyleSheet, Text, View } from "react-native";

import Spell from "../spells/Spell";
import Swipeable from "./Swipeable";

interface IProps {
    items: Spell[];
    renderItem: (item: Spell) => any;
    swipeRight: () => void;
    swipeLeft: () => void;
}

interface IState {
    position: Animated.ValueXY;
}

export default class List extends React.Component<IProps, IState> {
    render() {
        return (
            <Swipeable
                style={styles.container}
                swipeRight={this.props.swipeRight}
                swipeLeft={this.props.swipeLeft}
                snapBackOnSuccess={true}
            >
                {this.props.items.length === 0 ? this.renderEmptyMessage() : this.renderList()}
            </Swipeable>
        );
    }

    private renderEmptyMessage() {
        return (
            <View style={styles.emptyListMessage}>
                <Text>You have no spells in this category</Text>
            </View>
        );
    }

    private renderList() {
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
    container: {
        flex: 1,
    },
    swipeView: {
        flex: 1,
    },
    emptyListMessage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
});
