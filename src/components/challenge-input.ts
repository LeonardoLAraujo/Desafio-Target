import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

@customElement('challenge-input')
export default class ChallengeInput extends LitElement{

    static override get styles(): CSSResult{
        return css`
            .inputContainer{
                display: flex;
                flex-direction: column;
                font-size: 16px;
                gap: 10px;
            }

            .inputContainer label{
                --tw-text-opacity: 1;
                color: #fff;
                font-weight: 500;
                font-size: 18px;
            }

            .inputContainer input{
                width: calc(100% - 34px);
                background-color: var(--color-background-input);
                border: 1px solid #4b5563;
                border-radius: 0.5rem;
                padding: 0.75rem 1rem;
                color: white;
                transition: border-color 0.2s ease;
                font-size: 17px;
            }

            .inputContainer input:focus{
                outline: none;
                border-color: var(--color-neon-pink-light);
            }

            /* ===== Range input (slider) ===== */
            .inputContainer input[type="range"] {
                -webkit-appearance: none;
                appearance: none;
                width: 100%;
                height: 6px;
                border-radius: 5px;
                background: linear-gradient(to right, var(--color-neon-pink-light), #4b5563);
                outline: none;
                cursor: pointer;
                margin-top: 8px;
                padding: 0;
            }

            .inputContainer input[type="range"]::-webkit-slider-runnable-track {
                height: 6px;
                border-radius: 5px;
                background: linear-gradient(to right, var(--color-neon-pink-light), #4b5563);
            }
            .inputContainer input[type="range"]::-moz-range-track {
                height: 6px;
                border-radius: 5px;
                background: linear-gradient(to right, var(--color-neon-pink-light), #4b5563);
            }

            .inputContainer input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: white;
                border: 2px solid var(--color-neon-pink-light);
                cursor: grab;
                transition: background 0.2s ease;
                margin-top: -6px;
            }
            .inputContainer input[type="range"]::-webkit-slider-thumb:active {
                cursor: grabbing;
                background: var(--color-neon-pink-light);
            }

            .inputContainer input[type="range"]::-moz-range-thumb {
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: white;
                border: 2px solid var(--color-neon-pink-light);
                cursor: grab;
                transition: background 0.2s ease;
            }
            .inputContainer input[type="range"]::-moz-range-thumb:active {
                background: var(--color-neon-pink-light);
            }

            .rangeValue {
                margin-top: 6px;
                font-size: 16px;
                color: var(--color-neon-pink-light);
                text-align: right;
            }

            /* Checkbox estilizado */
            .checkbox-container {
                display: inline-block;
                position: relative;
                cursor: pointer;
            }

            .checkbox-container input {
                position: absolute;
                opacity: 0;
                width: 0;
                height: 0;
            }

            .checkmark {
                width: 20px; /* tamanho desejado */
                height: 20px;
                background-color: transparent;
                border: 2px solid var(--color-neon-pink-light);
                border-radius: 4px;
                transition: all 0.2s ease;
                display: inline-block;
                position: relative;
            }

            .checkbox-container:hover .checkmark {
                box-shadow: 0 0 4px var(--color-neon-pink-light);
            }

            .checkbox-container input:checked + .checkmark {
                background-color: var(--color-neon-pink-light);
                border-color: var(--color-neon-pink-light);
            }

            .checkmark::after {
                content: "";
                position: absolute;
                left: 50%;
                top: 50%;
                width: 5px;
                height: 9px;
                border: solid white;
                border-width: 0 2px 2px 0;
                transform: translate(-50%, -50%) rotate(45deg) scale(0);
                opacity: 0;
                transition: transform 0.2s ease, opacity 0.2s ease;
            }

            .checkbox-container input:checked + .checkmark::after {
                transform: translate(-50%, -50%) rotate(45deg) scale(1);
                opacity: 1;
            }

            input[type="date"]::-webkit-calendar-picker-indicator {
                filter: invert(1); 
                cursor: pointer;
            }
        `;
    }

    @property({ type: String }) 
    label: string = '';

    @property({ type: String })
    placeholder: string = '';

    @property({ type: Boolean })
    isShowLabel: boolean = true;

    @property({ type: String })
    value: string = "";

    @property({type: String})
    type: any = "text";

    @property({type: Number})
    min: number = -100;

    @property({type: Number})
    max: number = 100;

    @property({type: Number})
    step: number = 1;

    @query('#input')
    private _inputElement!: HTMLInputElement;

    @property({type: String})
    rangeValue: string = this.value;

    private _onInput(e: Event) {
        const target = e.target as HTMLInputElement;
        this.rangeValue = target.value;
    }

    public getValue(): string {
        return this._inputElement.value;    
    }

    public clear(): void{
        this._inputElement.value = "";
    }

    protected override render(): TemplateResult{
        return html`<div class="inputContainer">
                        ${this.isShowLabel ? html`<label for="input">${this.label}</label>` : html``}

                        <input 
                            type=${this.type} 
                            id="input" 
                            name="input" 
                            min=${this.min} 
                            max=${this.max} 
                            step=${this.step}
                            .value=${this.value}
                            placeholder=${this.placeholder} 
                            required
                            autocomplete="off"
                            @input=${this._onInput}
                        >
                    </div>
        `;
    }

}

declare global{
    interface HTMLElementTagNameMap{
        'challenge-input': ChallengeInput
    }
}
