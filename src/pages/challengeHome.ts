import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement } from 'lit/decorators.js';
import TargetSystem from '../target-system';

@customElement('challenge-home')
export default class ChallengeHome extends LitElement{

    static override get styles(): CSSResult {
        return css`
            :host {
                width: 100%;
                display: flex;
                justify-content: center;
                margin-top: 6rem; /* para não ficar atrás do top bar */
            }

            .main {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1.5rem;
                padding: 2rem;
                border-radius: 16px;
                background: rgba(19, 19, 20, 0.6);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.05);
            }

            button {
                width: 260px;
                padding: 0.9rem 1.2rem;
                font-size: 20px;
                font-weight: bold;
                border-radius: 10px;
                border: none;
                cursor: pointer;
                background: var(--bg-card);
                color: #fff;
                transition: transform 0.2s ease, box-shadow 0.3s ease;
            }

            button:hover {
                transform: translateY(-3px);
                box-shadow: 0px 0px 12px var(--color-neon-pink-light);
            }

            button:active {
                transform: scale(0.97);
                box-shadow: 0px 0px 6px var(--color-neon-cyan);
            }

            @media (max-width: 480px) {
                button {
                    width: 200px;
                    font-size: 18px;
                }
            }
        `;
    }


    protected override render(): TemplateResult{
        return html`
            <div class="main">
                <button @click=${() => {TargetSystem.instance.goToPage("/chellangeOne")}}>Desafio 1</button>
                <button @click=${() => {TargetSystem.instance.goToPage("/chellangeTwo")}}>Desafio 2</button>
                <button @click=${() => {TargetSystem.instance.goToPage("/chellangeThree")}}>Desafio 3</button>
            </div>
        `;
    }

}

declare global{
    interface HTMLElementTagNameMap{
        'challenge-home': ChallengeHome
    }
}