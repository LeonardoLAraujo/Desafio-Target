import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('challenge-dialog-modal')
export default class ChallengeDialogModal extends LitElement{

    static override get styles(): CSSResult{
        return css`
            :host{
                display: flex;
                flex-direction: column;
                position: relative;
                max-width: 530px;
                padding: 2rem;
                border-radius: 1rem;
                transform: scale(0.9);
                transition: transform 0.3s ease;
                box-sizing: border-box;
                background: rgba(27, 27, 46, 0.7);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                flex: 1;
            }
        `;
    }

    protected override render(): TemplateResult{
        return html`
            <slot></slot>
        `;
    }
}

declare global{
   interface HTMLElementTagNameMap{
        'challenge-dialog-modal': ChallengeDialogModal
   }
}