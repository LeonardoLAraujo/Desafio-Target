import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import "../components/challenge-input";
import ChallengeInput from '../components/challenge-input';
import { Fees } from '../type/fees';

@customElement('challenge-three')
export default class ChallangeThree extends LitElement{

    static override get styles(): CSSResult{
        return css`
            :host{
                width: 100%;
                height: 100%;
            }

            .container{
                width: calc(100% - 64px);
                display: flex;
                flex-direction: column;
                gap: 10px;
                color: #fff;
                padding: 2rem;
            }

            .container__fees {
                width: 100%;
                max-height: 680px; /* scroll automático */
                overflow-y: auto;
                padding: 10px;
                display: flex;
                flex-direction: column;
                gap: 12px;
            }

            /* Scroll bonito */
            .container__fees::-webkit-scrollbar {
                width: 8px;
            }
            .container__fees::-webkit-scrollbar-thumb {
                background: var(--primary);
                border-radius: 10px;
            }
            .container__fees::-webkit-scrollbar-track {
                background: var(--bg-card);
            }

            .fees__item {
                background: var(--bg-card);
                padding: 15px 18px;
                border-radius: var(--radius);
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: var(--transition);
                border: 1px solid transparent;
            }

            .fees__item:hover {
                background: var(--bg-card-hover);
                border-color: var(--primary);
            }

            .fees__item p {
                margin: 0;
                color: var(--text-main);
                font-size: 16px;
            }

            .fees__item p:last-child {
                font-weight: bold;
                color: var(--color-neon-pink-light);
            }

            button {
                padding: 12px 22px;
                background: var(--primary);
                border: none;
                border-radius: var(--radius);
                color: var(--text-main);
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: var(--transition);
                letter-spacing: 0.5px;
            }

            button:hover {
                background: var(--primary-dark);
                transform: translateY(-2px);
                box-shadow: 0 0 12px var(--primary);
            }

            button:active {
                transform: scale(0.97);
            }

        `;
    }

    @state()
    private _listChallengeFees: Fees[] = []

    @query(".container__value")
    private _containerValue!: ChallengeInput;

    @query(".container__calender")
    private _containerCalender!: ChallengeInput;
    
    private _calculaterFees(): void {
        let i = 0;
        this._listChallengeFees = [];
        const dateStart = new Date(this._containerCalender.getValue());
        const dateEnd = new Date();

        dateStart.setHours(0,0,0,0);
        dateEnd.setHours(0,0,0,0);

        dateStart.setDate(dateStart.getDate() + 1);

        while (dateStart <= dateEnd) {
            i++;
            dateStart.setDate(dateStart.getDate() + 1);

            this._listChallengeFees.push({date: dateStart.setDate(dateStart.getDate() + 1), fees: Number(this._containerValue.getValue()) * 0.025 * i})
        }

        if(this._listChallengeFees.length == 0){
            this._listChallengeFees.push({
                date: Date.now(),
                fees: 0
            })
        }

        this.requestUpdate();
    }

    private _formatTimestamp(timestamp: number, withTime: boolean = false): string { 
        const date = new Date(timestamp); 
        
        return withTime ? date.toLocaleString("pt-BR", { 
                day: "2-digit", 
                month: "2-digit", 
                year: "numeric", 
                hour: "2-digit", 
                minute: "2-digit", 
                second: "2-digit" 
            })
            : date.toLocaleDateString("pt-BR"); 
    }
    
    private _calculateTotal(fees: number): number {
        return fees + Number(this._containerValue.getValue());
    }

    private _generateFees(): TemplateResult[] {
        return this._listChallengeFees.slice().sort((a,b) => b.date - a.date).map((fees: Fees) => html`
                <div class="fees__item">
                    <p>Data: ${this._formatTimestamp(fees.date)}</p>
                    <p>Valor do Juros: R$ ${fees.fees.toFixed(2)}</p>
                    <p>Total: R$ ${this._calculateTotal(fees.fees).toFixed(2)}</p>
                </div>
            `);
    }

    protected override render(): TemplateResult{
        return html`
            <div class="container">
                <challenge-input label="Valor" type="number" class="container__value"></challenge-input>
                <challenge-input label="Data" type="date" class="container__calender"></challenge-input>
                <button @click=${this._calculaterFees}>Calcular</button>

                <div class="container__fees">
                    ${this._generateFees()}
                </div>
            </div>
        `;
    }

}

declare global{
    interface HTMLElementTagNameMap{
        'challenge-three': ChallangeThree
    }
}