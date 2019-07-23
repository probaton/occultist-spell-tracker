import React from "react";
import { StyleSheet, View } from "react-native";

import Input from "./controls/Input";
import Interaction from "./Interaction";

import { Spell } from "../spells/Spell";
import SpellStore from "../store/SpellStore";

interface IProps {
    close: () => void;
}

interface IState {
    nameInput: string;
    nameValidation?: string;
    triggerInput: string;
    effectInput: string;
    rechargeInput: string;
    rechargeValidation?: string;
    retainFocusInput: string;
    retainFocusValidation?: string;
    levelInput: string;
    levelValidation?: string;
}

export class SpellDialog extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            nameInput: "",
            triggerInput: "",
            effectInput: "",
            rechargeInput: "",
            retainFocusInput: "",
            levelInput: "",
        };
    }

    render() {
        return (
            <Interaction
                dialogTitle="Edit spell"
                onSubmit={this.submitSpell}
                close={this.props.close}
            >
                <Input
                    placeholder="Spell name"
                    onChangeText={nameInput => this.setState({ nameInput })}
                    validationMessage={this.state.nameValidation}
                />
                <Input
                    placeholder="Trigger"
                    onChangeText={triggerInput => this.setState({ triggerInput })}
                />
                <Input
                    placeholder="Effect"
                    onChangeText={effectInput => this.setState({ effectInput })}
                />
                <Input
                    placeholder="Recharge"
                    onChangeText={rechargeInput => this.setState({ rechargeInput })}
                    validationMessage={this.state.rechargeValidation}
                />
                <Input
                    placeholder="Retain focus"
                    onChangeText={retainFocusInput => this.setState({ retainFocusInput })}
                    validationMessage={this.state.retainFocusValidation}
                />
                <Input
                    placeholder="Spell level"
                    onChangeText={levelInput => this.setState({ levelInput })}
                    validationMessage={this.state.levelValidation}
                />
            </Interaction>
        );
    }

    private submitSpell = async () => {
        const validationState: any = {};

        const name = this.state.nameInput.trim();
        validationState.nameValidation = name === "" ? "Name cannot be empty" : undefined;

        const recharge = this.parseInt(this.state.rechargeInput);
        if (!recharge) {
            validationState.rechargeValidation = "Invalid number";
        }

        const retainFocus = this.parseInt(this.state.retainFocusInput);
        if (!retainFocus) {
            validationState.retainFocusValidation = "Invalid number";
        }

        const level = this.parseInt(this.state.levelInput);
        if (!level) {
            validationState.retainFocusValidation = "Invalid number";
        }

        this.setState(validationState);
        if (!Object.keys(validationState).some(key => validationState[key] !== undefined)) {
            SpellStore.add(new Spell(name, this.state.triggerInput, this.state.effectInput, recharge!, retainFocus!, level!));
            this.props.close();
        }
    }

    private parseInt(input: string): number | undefined {
        const numberValue = +input;
        return (Number.isInteger(numberValue) || numberValue < 1) ? numberValue : undefined;
    }
}

const styles = StyleSheet.create({
    gearTypeToggle: {
        margin: 8,
        flexDirection: "row",
        borderColor: "#009688",
        borderRadius: 5,
        borderWidth: 2,
    },
    activeToggle: {
        minWidth: 64,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#009688",
    },
    passiveToggle: {
        minWidth: 64,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F9F9F9",
    },
    activeToggleText: {
        fontSize: 18,
        textAlign: "center",
        color: "#F9F9F9",
        padding: 12,
    },
    passiveToggleText: {
        fontSize: 18,
        textAlign: "center",
        color: "#009688",
        padding: 12,
    },
});
