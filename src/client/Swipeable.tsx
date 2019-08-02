import React from "react";
import { Animated, GestureResponderEvent, PanResponder, PanResponderGestureState, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface IProps {
    style?: StyleProp<ViewStyle>;
    swipeRight?: () => void;
    swipeLeft?: () => void;
    onSwipeStart?: () => void;
    onSwipeEnd?: () => void;
}

interface IState {
    position: Animated.ValueXY;
}

export default class Swipeable extends React.Component<IProps, IState> {
    private swipeResponder: any;

    constructor(props: IProps) {
        super(props);

        this.swipeResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderTerminationRequest: () => false,
            onPanResponderMove: this.onSwipe,
            onPanResponderRelease: this.onSwipeRelease,
        });
        this.state = { position: new Animated.ValueXY() };
    }

    render() {
        return (
            <View style={this.props.style}>
                <Animated.View
                    style={[this.state.position.getLayout(), styles.swipeView]}
                    {...this.swipeResponder.panHandlers}
                >
                    {this.props.children}
                </Animated.View>
            </View>
        );
    }

    private onSwipe = (event: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        if (this.props.onSwipeStart) {
            this.props.onSwipeStart();
        }
        if (gestureState.dx > 35 || gestureState.dx < -35) {
            this.state.position.setValue({x: gestureState.dx, y: 0});
        }
    }

    private onSwipeRelease = (event: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        if (gestureState.dx > 120 && this.props.swipeRight) {
            this.props.swipeRight();
        } else if (gestureState.dx < -120 && this.props.swipeLeft) {
            this.props.swipeLeft();
        } else {
            Animated.timing(this.state.position, {
                toValue: {x: 0, y: 0},
                duration: 150,
            }).start();
        }
        if (this.props.onSwipeEnd) {
            this.props.onSwipeEnd();
        }
    }
}

const styles = StyleSheet.create({
    swipeView: {
        flex: 1,
    },
});
