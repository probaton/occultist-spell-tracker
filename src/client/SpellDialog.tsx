import React from "react";
import { Alert, Button, TextInput } from "react-native";

import Input from "./controls/Input";
import Interaction from "./Interaction";

import { importSpells } from "../spells/importSpells";
import Spell from "../spells/Spell";
import SpellStore from "../store/SpellStore";

interface IProps {
    onSubmit?: () => void;
    close: () => void;
}

interface IState {
    nameInput: string;
    nameValidation?: string;
    triggerInput: string;
    targetInput: string;
    attackInput: string;
    effectInput: string;
    missInput: string;
    rechargeInput: string;
    rechargeValidation?: string;
    retainFocusInput: string;
    retainFocusValidation?: string;
    levelInput: string;
    levelValidation?: string;
}

export default class SpellDialog extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            nameInput: "",
            triggerInput: "",
            targetInput: "",
            attackInput: "",
            effectInput: "",
            missInput: "",
            rechargeInput: "",
            retainFocusInput: "",
            levelInput: "",
        };
    }

    render() {
        const triggerInputRef = React.createRef<TextInput>();
        const targetInputRef = React.createRef<TextInput>();
        const attackInputRef = React.createRef<TextInput>();
        const effectInputRef = React.createRef<TextInput>();
        const missInputRef = React.createRef<TextInput>();
        const rechargeInputRef = React.createRef<TextInput>();
        const retainFocusInputRef = React.createRef<TextInput>();
        const levelInputRef = React.createRef<TextInput>();

        return (
            <Interaction
                dialogTitle="Edit spell"
                onSubmit={this.submitSpell}
                close={this.props.close}
            >
                <Button title="Import" onPress={this.importSpells}/>
                <Input
                    placeholder="Spell name"
                    onChangeText={nameInput => this.setState({ nameInput })}
                    validationMessage={this.state.nameValidation}
                    nextFocus={triggerInputRef}
                />
                <Input
                    placeholder="Trigger"
                    onChangeText={triggerInput => this.setState({ triggerInput })}
                    inputRef={triggerInputRef}
                    nextFocus={targetInputRef}
                />
                <Input
                    placeholder="Target"
                    onChangeText={targetInput => this.setState({ targetInput })}
                    inputRef={targetInputRef}
                    nextFocus={attackInputRef}
                />
                <Input
                    placeholder="Attack"
                    onChangeText={attackInput => this.setState({ attackInput })}
                    inputRef={attackInputRef}
                    nextFocus={effectInputRef}
                />
                <Input
                    placeholder="Effect"
                    onChangeText={effectInput => this.setState({ effectInput })}
                    inputRef={effectInputRef}
                    nextFocus={missInputRef}
                />
                <Input
                    placeholder="Miss"
                    onChangeText={missInput => this.setState({ missInput })}
                    inputRef={missInputRef}
                    nextFocus={rechargeInputRef}
                />
                <Input
                    placeholder="Recharge"
                    onChangeText={rechargeInput => this.setState({ rechargeInput })}
                    validationMessage={this.state.rechargeValidation}
                    inputRef={rechargeInputRef}
                    nextFocus={retainFocusInputRef}
                />
                <Input
                    placeholder="Retain focus"
                    onChangeText={retainFocusInput => this.setState({ retainFocusInput })}
                    validationMessage={this.state.retainFocusValidation}
                    inputRef={retainFocusInputRef}
                    nextFocus={levelInputRef}
                />
                <Input
                    placeholder="Spell level"
                    onChangeText={levelInput => this.setState({ levelInput })}
                    validationMessage={this.state.levelValidation}
                    inputRef={levelInputRef}
                    onSubmitEditing={this.submitSpell}
                />
            </Interaction>
        );
    }

    private importSpells = async () => {
        await SpellStore.set(await importSpells());
        Alert.alert("Info", "Import successful");
        this.props.close();
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
            const { triggerInput, targetInput, attackInput, effectInput, missInput } = this.state;
            await SpellStore.add(new Spell(name, triggerInput, targetInput, attackInput, effectInput, missInput, recharge!, retainFocus!, level!));
            if (this.props.onSubmit) {
                this.props.onSubmit();
            }
            this.props.close();
        }
    }

    private parseInt(input: string): number | undefined {
        const numberValue = +input;
        return (Number.isInteger(numberValue) || numberValue < 1) ? numberValue : undefined;
    }
}
