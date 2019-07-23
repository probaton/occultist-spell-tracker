import React from "react";

import Spell from "./Spell";

interface IHomeState {
    viewState?: HomeViewState;
}

type HomeViewState = "active" | "recharging" | "inactive";

export default class Home extends React.Component<any, IHomeState> {
    constructor(props: any) {
        super(props);
        this.state = { viewState: undefined };
    }

    render() {
        return (
            <>
                {this.renderContent()}
            </>
        );
    }

    private renderContent() {
        switch (this.state.viewState) {
            case undefined: return this.renderButtons();
        }
    }

    private renderButtons() {
        return (
            <>
                <Spell caption="Cookies"/>
                <Spell caption="Grenades"/>
            </>
        );
    }
}
