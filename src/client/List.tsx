import React from "react";

import { Animated, FlatList, ListRenderItemInfo, PanResponder, StyleSheet, Text, View } from "react-native";

import Spell from "../spells/Spell";

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
    private swipeResponder: any;
    constructor(props: IProps) {
        super(props);

        const position = new Animated.ValueXY();
        this.swipeResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderTerminationRequest: () => false,
            onPanResponderMove: (event, gestureState) => {
                if (gestureState.dx > 35 || gestureState.dx < -35) {
                    position.setValue({x: gestureState.dx, y: 0});
                }
            },
            onPanResponderRelease: (event, gestureState) => {
                if (gestureState.dx > 120 ) {
                    this.props.swipeRight();
                    this.state.position.setValue({ x: 0, y: 0 });
                } else if (gestureState.dx < -120) {
                    this.props.swipeLeft();
                    this.state.position.setValue({ x: 0, y: 0 });
                } else {
                    Animated.timing(this.state.position, {
                        toValue: {x: 0, y: 0},
                        duration: 150,
                    }).start();
                }
            },
        });
        this.state = { position };
    }

    render() {
        return (
            <View style={styles.container}>
                <Animated.View
                    style={[this.state.position.getLayout(), styles.swipeView]}
                    {...this.swipeResponder.panHandlers}
                >
                    {this.props.items.length === 0 ? this.renderEmptyMessage() : this.renderList()}
                </Animated.View>
            </View>
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
    },
});
