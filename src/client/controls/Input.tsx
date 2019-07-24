import React, { RefObject } from "react";
import { Dimensions, KeyboardTypeOptions, ReturnKeyTypeOptions, StyleSheet, Text, TextInput } from "react-native";

interface IProps {
    onChangeText: (input: string) => void;
    keyboardType?: KeyboardTypeOptions;
    autoFocus?: boolean;
    dark?: boolean;
    placeholder?: string;
    onSubmitEditing?: () => void;
    inputRef?: React.RefObject<TextInput>;
    stayOpenOnSubmit?: boolean;
    validationMessage?: string;
    nextFocus?: RefObject<TextInput>;
}

interface IState {
    hasBlurred: boolean;
}

export default class Input extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { hasBlurred: false };
    }

    render() {
        const { onChangeText, autoFocus, keyboardType, placeholder, dark, inputRef, onSubmitEditing, nextFocus, stayOpenOnSubmit } = this.props;
        const returnKeyType = nextFocus ? "next" : onSubmitEditing ? "done" : "default";

        return (
            <>
                <TextInput
                    style={dark ? styles.dark : styles.light}
                    onChangeText={onChangeText}
                    autoFocus={autoFocus}
                    keyboardType={keyboardType}
                    placeholder={placeholder}
                    onSubmitEditing={this.onSubmitEditing}
                    ref={inputRef}
                    returnKeyType={returnKeyType || "default"}
                    blurOnSubmit={!stayOpenOnSubmit}
                    onEndEditing={() => this.setState({ hasBlurred: true })}
                />
                {this.renderValidationMessage()}
            </>
        );
    }

    private renderValidationMessage() {
        if (this.state.hasBlurred && this.props.validationMessage) {
            return <Text style={styles.validationMessage}>{this.props.validationMessage}</Text>;
        } else {
            return null;
        }
    }

    private onSubmitEditing = () => {
        const { nextFocus: focusNext, onSubmitEditing } = this.props;
        if (focusNext && focusNext.current) {
            focusNext.current.focus();
        }
        if (onSubmitEditing) {
            onSubmitEditing();
        }
    }
}

const styles = StyleSheet.create({
    light: {
        textAlign: "left",
        fontSize: 16,
        color: "rgba(0,0,0,0.54)",
        marginTop: 8,
        borderBottomWidth: 2,
        borderColor: "#009688",
        minWidth: Dimensions.get("window").width - 100,
    },
    dark: {
        textAlign: "left",
        fontSize: 16,
        color: "#F9F9F9",
        marginTop: 8,
        borderBottomWidth: 2,
        borderColor: "#F9F9F9",
        minWidth: Dimensions.get("window").width - 100,
    },
    validationMessage: {
        color: "#FF0000",
    },
});
