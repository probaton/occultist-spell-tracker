import React from "react";

import Spell from "../spells/Spell";

interface IProps {
    items: Spell[];
    renderItem: (item: Spell) => any;
}

export default class List extends React.Component<IProps> {
    render() {
        return (
            <>
                {this.renderItems()}
            </>
        );
    }

    private renderItems() {
        return this.props.items.map(item => this.props.renderItem(item));
    }
}
