import React from "react";
import { ActivityIndicator, Button, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import XButton from "./images/XButton";

interface IProps {
    dialogTitle: string;
    close: () => void;
    onSubmit?: () => void;
    loading?: boolean;
}

export default class Interaction extends React.Component<IProps> {
    render() {
        const { dialogTitle, close, loading, children } = this.props;
        return (
            <View>
                <View style={styles.titleBar}>
                    <Text style={styles.title}>{dialogTitle}</Text>
                    <View style={styles.xButton}>
                        <TouchableOpacity onPress={close}>
                                <XButton/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.padding}>
                    <View style={styles.body}>
                        {loading
                            ? this.renderLoadingSpinner()
                            : children                        }
                    </View>
                    <View style={styles.button}>
                        <Button onPress={close} title="OK" color="#7A0002"/>
                    </View>
                    {this.renderSubmitButton()}
                </View>
            </View>
        );
    }

    private renderLoadingSpinner() {
        return (
            <ActivityIndicator
                size={Dimensions.get("window").width / 4}
                color="#2D7F83"
                style={styles.spinner}
            />
        );
    }

    private renderSubmitButton() {
        const { onSubmit, loading } = this.props;
        if (loading || !onSubmit) {
            return null;
        } else {
            return (
                <View style={styles.button}>
                    <Button onPress={onSubmit} title="SUBMIT" color="#7A0002"/>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    padding: {
        paddingRight: 16,
        paddingLeft: 16,
        paddingTop: 8,
    },
    body: {
    },
    titleBar: {
        paddingTop: 24,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#C70909",
        paddingBottom: 8,
    },
    title: {
        fontWeight: "bold",
        fontSize: 24,
        color: "#FFFFFF",
    },
    xButton: {
        position: "absolute",
        right: 12,
        paddingTop: 16,
    },
    spinner: {
        marginTop: 15,
    },
    button: {
        paddingTop: 6,
    },
    buttonText: {
        fontSize: 24,
        textAlign: "center",
        padding: 12,
    },
});
