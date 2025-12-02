import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { IconTypes } from 'ecv-component';
import ChallengeDialogOverlay from './challenge-dialog-overlay';
import { Stock } from '../type/stock';
import "./challenge-dialog-modal";
import "./challenge-dialog-overlay";
import { MovimentStock } from '../type/movimentStock';

@customElement('challenge-modal-list-moviment')
export default class ChallengeModalListMoviment extends LitElement{

    static override get styles(): CSSResult{
        return css`
            :host{
                position: fixed;
            }

            .modal__close{
                position: absolute;
                right: 10px;
                top: 10px;
                cursor: pointer;
                color: var(--primary-dark);
                transition: all 0.3s ease;
            }

            .modal__close:hover{
                color: var(--color-neon-pink-light);
            }

            h1{
                color: var(--primary);
                text-align: center;
            }

            p{
                margin: 0;
                padding: 0;
                color: rgb(209 213 219 / var(--tw-text-opacity, 1));
                margin-bottom: 1.5rem;
                font-size: 20px;
                text-align: center;
            }

            p span{
                font-weight: bold;
                color: #fff;
            }

            .form{
                display: flex;
                flex-direction: column;
                gap: 20px;
            }

            .form__buttons{
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 10px;
                margin-top: 2rem;
            }

            button{
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 9999px;
                border: none;
                padding: 0.65rem 1.5rem;
                font-size: 20px;
                color: #fff;
                cursor: pointer;
            }

            .buttons__cancel{
                background-color: var(--bg-card);
                transition: background 0.3s ease-in;
            }

            .buttons__cancel:hover{
                background-color: var(--bg-card-hover);
            }

            .buttons__apply{
                opacity: 1;
                background-color: var(--primary);
                transition: all 0.3s ease-in;
            }

            .buttons__apply:hover{
                background-color: var(--primary-dark);
            }   

            .modal__span{
                color: var(--background-green);
            }

            .modal__warning{
                color: rgb(156 163 175 / var(--tw-text-opacity, 1));
                text-align: center;
                margin-top: 1rem;
            }

            .modal__inputs{
                display: flex;
                align-items: center;
                margin-bottom: 1rem;
                gap: 40px;
            }

            challenge-input{
                width: 100%;
            }

           .list {
                max-height: 500px; /* altura máxima antes de surgir scroll */
                overflow-y: auto;
                padding-right: 8px; 
                display: flex;
                flex-direction: column;
                gap: 16px;
            }

            /* Estilo dos cards de movimentação */
            .list__moviment {
                display: flex;
                flex-direction: column;
                background: var(--bg-card);
                border-radius: var(--radius);
                padding: 16px;
                display: flex;
                flex-direction: column;
                gap: 10px;
                color: var(--text-main);
                border: 1px solid transparent;
                transition: var(--transition);
            }

            .list__moviment:hover {
                background: var(--bg-card-hover);
                border-color: var(--primary);
                transform: translateY(-2px);
            }

            /* Cada linha de texto */
            .list__moviment p {
                margin: 0;
                font-size: 17px;
                text-align: left;
            }

            /* Labels */
            .list__moviment span {
                font-weight: 600;
                color: var(--primary);
            }

            /* Descrição com destaque */
            .list__moviment div {
                background: rgba(255, 255, 255, 0.03);
                padding: 10px;
                border-radius: var(--radius);
                border: 1px solid rgba(255, 255, 255, 0.05);
            }

            /* Scroll estilizado */
            .list::-webkit-scrollbar {
                width: 8px;
            }

            .list::-webkit-scrollbar-track {
                background: var(--bg-main);
            }

            .list::-webkit-scrollbar-thumb {
                background: var(--primary-dark);
                border-radius: 10px;
            }

            .list::-webkit-scrollbar-thumb:hover {
                background: var(--primary);
            }


            @media (min-width: 750px){
                .form__buttons{
                    flex-wrap: nowrap;
                }

                button{
                    width: fit-content;
                }
            }
        `;
    }   
    
    @query("challenge-dialog-overlay")
    private _chanllengeDialogOverlay!: ChallengeDialogOverlay;

    @property({attribute: false})
    stock!: Stock;

    @property({attribute: false})
    listMovimentStock!: MovimentStock[];

    public showDialog(): void {
        this._chanllengeDialogOverlay.visible = true;
    }

    private _closeDialog(): void {
        this._chanllengeDialogOverlay.visible = false
    }

    private _formatTimestamp(timestamp: number): string {
        const date = new Date(timestamp);

        return date.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
    }
    
    private _generateMoviment(): Array<TemplateResult>{
        return this.listMovimentStock.slice().sort((a, b) => Number(b.date) - Number(a.date)).map((moviment: MovimentStock) => html`
            <div class="list__moviment">
                <p><span>ID da movimentação:</span> ${moviment.id}</p>
                <p><span>ID do produto:</span> ${moviment.idProduct}</p>
                <p><span>Entrada do estoque:</span> ${moviment.entryMoviment == null ? 0 : moviment.entryMoviment}</p>
                <p><span>Saída do estoque:</span> ${moviment.exitMoviment == null ? 0 : moviment.exitMoviment}</p>
                <div>
                    <span>Motivo da movimentação</span>
                    <p>${moviment.description}</p>
                </div>
                <p>${this._formatTimestamp(moviment.date as number)}</p>
            </div>
        `);
    }

    protected override render(): TemplateResult{
        return html`
            <challenge-dialog-overlay>
                <challenge-dialog-modal>
                    <ecv-icon class="modal__close" .icon=${IconTypes.Close} .iconStyle=${{size: "30px"}} @click=${this._closeDialog}></ecv-icon>
                    <h1>Movimentações do Estoque</h1>
                    <p>Movimentações do estoque <span>${this.stock?.descricaoProduto}</span></p>
                    <div class="list">
                        ${this._generateMoviment()}
                    </div>
                    <div class="form__buttons">
                        <button class="buttons__cancel" @click=${this._closeDialog}>Fechar</button>
                    </div>
                </challenge-dialog-modal>
            </challenge-dialog-overlay>
        `;
    }

}

declare global{
    interface HTMLElementTagNameMap{
        'challenge-modal-list-moviment': ChallengeModalListMoviment
    }
}