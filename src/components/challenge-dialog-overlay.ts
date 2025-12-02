import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('challenge-dialog-overlay')
export default class ChallengeDialogOverlay extends LitElement{

    static override get styles(): CSSResult{
        return css`
            :host{
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                transition: opacity 0.3s ease, visibility 0.3s ease;
                box-sizing: border-box;
            }
        `;
    }

    @property({ type: Boolean })
    visible: boolean = false;

    show(){
        this.visible = true;
    }

    hide(){
        this.visible = false;
    }

    protected override render(): TemplateResult{
        return html`
            <style>
                :host{
                    visibility: ${this.visible ? 'visible': 'hidden'};
                    opacity: ${this.visible ? '1': '0'};
                    z-index: ${this.visible ? '1000' : '-1'};
                    pointer-events: ${this.visible ? 'auto': 'none'};
                }

            </style>
            <slot></slot>
        `;
    }
}

declare global{
    interface HTMLElementTagNameMap{
        'challenge-dialog-overlay': ChallengeDialogOverlay
    }
}