import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, query } from 'lit/decorators.js';
import "./pages/challengeOne";
import "./components/challenge-loading";
import ChallengeLoading from './components/challenge-loading';
import "./pages/challengeTwo";
import "./pages/challengeThree";
import { Routes } from '@lit-labs/router';
import "./components/challenge-menu";
import "./pages/challengeHome";

@customElement('target-system')
export default class TargetSystem extends LitElement{

    static override get styles(): CSSResult{
        return css`
            challenge-menu{
                margin-bottom: 61px;
            }
        `;
    }

    static instance: TargetSystem;

    private _routes = new Routes(this, [
        {path: '/', render: () => html`<challenge-home></challenge-home>`},
        {path: '/chellangeOne', render: () => html`<challenge-one></challenge-one>`},
        {path: '/chellangeTwo', render: () => html`<challenge-two></challenge-two>`},
        {path: '/chellangeThree', render: () => html`<challenge-three></challenge-three>`},
    ]);

    @query("challenge-loading")
    challengeLoading!: ChallengeLoading;

    override async connectedCallback(): Promise<void> {
        super.connectedCallback();

        TargetSystem.instance = this;
    }   
    
    public goToPage(source: string){
        this._routes.goto(source);
    }

    protected override render(): TemplateResult{
        return html`
            <challenge-menu></challenge-menu>
            ${this._routes.outlet()}
            <challenge-loading></challenge-loading>
        `;
    }

}

declare global{
    interface HTMLElementTagNameMap{
        'target-system': TargetSystem
    }
}