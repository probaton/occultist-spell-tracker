import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Home from "./Home";

interface IAppState {
    view: "loading" | "home";
}

export default class App extends React.Component<any, IAppState> {
    constructor(props: any) {
        super(props);
        this.state = { view: "home" };
    }

    render() {
        return (
            <View style={styles.body}>
                {this.renderContent()}
            </View>
        );
    }

    private renderContent() {
        switch (this.state.view) {
            case "loading": {
                return this.renderLoading();
            }
            case "home": {
                return <Home/>;
            }
        }
    }

    private renderLoading = () => {
        return (
            <View
                style={styles.container}
            >
                <Text>Loading...</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: "#FFFFFF",
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
