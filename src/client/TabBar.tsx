import React from "react";
import { Button, StyleSheet, View } from "react-native";
import { ActiveTab } from "./ActiveTab";
import Tab from "./Tab";

interface IProps {
    onTabPress: (selectedTab: ActiveTab) => void;
}

interface IState {
    activeTab: ActiveTab;
}

export default class TabBar extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { activeTab: "active" };
    }

    render() {
        return (
            <View style={styles.container}>
                <Tab caption="Active" tabName="active" activeTab={this.state.activeTab} onPress={this.onTabPress}/>
                <Tab caption="Recharge" tabName="recharge" activeTab={this.state.activeTab} onPress={this.onTabPress}/>
                <Tab caption="Inactive" tabName="inactive" activeTab={this.state.activeTab} onPress={this.onTabPress}/>
            </View>
        );
    }

    private onTabPress = (tab: ActiveTab) => {
        this.props.onTabPress(tab);
        this.setState({ activeTab: tab });
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingTop: 24,
    },
});
