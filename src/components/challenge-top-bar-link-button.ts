import { IconTypes } from 'ecv-component';
import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('challenge-top-bar-link-button')
export default class ChallengeTopBarLinkButton extends LitElement{

    static override get styles(): CSSResult{
        return css`
            div{
                cursor: pointer;
                font-size: 16px;
                transition: color 0.3s ease-in-out;
                display: flex;
                align-items: center;
                gap: 1px;
            }

            div:hover{
                color: var(--color-neon-pink-light);
            }
        `;
    }

    @property({ type: String })
    label: string = '';

    @property({ attribute: false })
    icon!: IconTypes;

    @property({ type: Boolean })
    isActive: boolean = false;

    protected override render(): TemplateResult{
        return html`
            <style>
                div{
                    color: ${this.isActive ? 'var(--color-neon-pink-light)' : "var(--text-muted)"};
                }
            </style>
            <div>
                ${this.label}
                ${this.icon ? html`<ecv-icon .icon=${this.icon}></ecv-icon>` : ""}
            </div>
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'challenge-top-bar-link-button': ChallengeTopBarLinkButton
   }
}