import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

@customElement('challenge-textarea')
export default class challengeTextarea extends LitElement{

    static override get styles(): CSSResult{
        return css`
            .inputContainer{
                display: flex;
                flex-direction: column;
                font-size: 18px;
                gap: 10px;
            }

            .inputContainer label{
                --tw-text-opacity: 1;
                color: #fff;
                font-weight: 500;
                font-size: 18px;
            }

            .inputContainer textarea{
                width: calc(100% - 34px);
                border: 1px solid #4b5563;
                border-radius: 0.5rem;
                padding: 0.75rem 1rem;
                color: white;
                transition: border-color 0.2s ease;
                font-size: 18px;
                resize: none;
                font-family: Arial, Helvetica, sans-serif;
            }

            .inputContainer textarea:focus{
                outline: none;
                border-color: var(--color-neon-pink-light);
            }
        `;
    }

    @property({ type: String }) 
    label: string = '';

    @property({ type: String })
    placeholder: string = '';

    @property({ type: String })
    value: string = "";

    @property({type: String})
    backgroundColor: string = "var(--color-background-input)";

    @query('#textarea')
    private _textareaElement!: HTMLInputElement;

    public getValue(): string {
        return this._textareaElement.value;    
    }

    public resetValue(): void{
        this._textareaElement.value = "";
    }

    protected override render(): TemplateResult{
        return html`
            <style>
                textarea{
                    background-color: ${this.backgroundColor}
                }
            </style>

            <div class="inputContainer">
                <label for="textarea">${this.label}</label>
               <textarea
                    id="textarea"
                    name="textarea"
                    rows="4"
                    cols="50"
                    placeholder=${this.placeholder}
                    autocapitalize="off"
                    .value=${this.value}
                ></textarea>
            </div>
        `;
    }

}

declare global{
    interface HTMLElementTagNameMap{
        'challenge-textarea': challengeTextarea
    }
}