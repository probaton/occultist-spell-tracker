import React from "react";
import { Text } from "react-native";

import Interaction from "./Interaction";

import Spell from "../spells/Spell";

interface IProps {
    spell: Spell;
    close: () => void;
}

export default class SpellView extends React.Component<IProps> {
    render() {
        const { spell, close } = this.props;
        return (
            <Interaction
                dialogTitle={spell.name}
                close={close}
            >
                <Text>{spell.effect}</Text>
            </Interaction>
        );
    }
}
