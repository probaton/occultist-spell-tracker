import React from "react";
import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import TouchButton from "./controls/TouchButton";
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
            <View
                style={styles.container}
            >
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
                    <View style={styles.buttonBar}>
                        <TouchButton
                            onPress={close}
                            caption="OK"
                            buttonStyle={styles.button}
                            captionStyle={styles.buttonText}
                        />
                        {this.renderSubmitButton()}
                    </View>
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
                <TouchButton
                    onPress={onSubmit}
                    caption="SUBMIT"
                    buttonStyle={styles.button}
                    captionStyle={styles.buttonText}
                />
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    padding: {
        flex: 1,
        padding: 24,
    },
    body: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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
    buttonBar: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        maxHeight: 52,
        paddingTop: 8,
        paddingBottom: 8,
    },
    button: {
        margin: 5,
        minWidth: 64,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 24,
        textAlign: "center",
        padding: 12,
    },
});
