import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { IconTypes } from 'ecv-component';
import ChallengeDialogOverlay from './challenge-dialog-overlay';
import { Stock } from '../type/stock';
import "./challenge-dialog-modal";
import "./challenge-dialog-overlay";
import "./challenge-textarea";
import "./challenge-input";
import ChallengeInput from './challenge-input';
import challengeTextarea from './challenge-textarea';

@customElement('challenge-modal-movement')
export default class ChallengeModalMovement extends LitElement{

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

            .modal__warning,
            .modal__error{
                color: rgb(156 163 175 / var(--tw-text-opacity, 1));
                text-align: center;
                margin-top: 1rem;
            }

            .modal__error{
                color: #b31414;
                font-size: 18px;
                font-weight: bold;
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
    
    @state()
    private _messageError: string = "";

    @query("challenge-dialog-overlay")
    private _chanllengeDialogOverlay!: ChallengeDialogOverlay;

    @query(".entry__moviment")
    private _entryMovimentInput!: ChallengeInput;

    @query(".exit__moviment")
    private _exitMovimentInput!: ChallengeInput;

    @query("challenge-textarea")
    private _descriptionTextArea!: challengeTextarea;

    @property({attribute: false})
    stock!: Stock;

    public showDialog(): void {
        this._chanllengeDialogOverlay.visible = true;

        this.requestUpdate();
    }

    private _closeDialog(): void {
        this._messageError = "";
        this._chanllengeDialogOverlay.visible = false;
    }

    private _confirmMoviment(): void{
        if((this._entryMovimentInput.getValue().trim() == "" && this._exitMovimentInput.getValue().trim() == "") || this._descriptionTextArea.getValue().trim() == ""){
            this._messageError = "Descrição está vazia!";
            return;
        }

        if(this._exitMovimentInput){
            if(Number(this._exitMovimentInput.getValue()) > Number(this.stock.estoque)){
                this._messageError = "Estoque insuficiente para executar a Saída";
                return;
            }
        }

        this.dispatchEvent(new CustomEvent('moviment-changed', {
            detail: {
                id: crypto.randomUUID(),
                entryMoviment: this._entryMovimentInput.getValue().trim() == "" ? null : this._entryMovimentInput.getValue(),
                exitMoviment: this._exitMovimentInput.getValue().trim() == "" ? null : this._exitMovimentInput.getValue(),
                description: this._descriptionTextArea.getValue(),
                idProduct: this.stock.codigoProduto 
            },
            bubbles: true,
            composed: true
        }));

        this._entryMovimentInput.clear();
        this._exitMovimentInput.clear();
        this._descriptionTextArea.resetValue();

        this._closeDialog();
    }

    protected override render(): TemplateResult{
        return html`
            <challenge-dialog-overlay>
                <challenge-dialog-modal>
                    <ecv-icon class="modal__close" .icon=${IconTypes.Close} .iconStyle=${{size: "30px"}} @click=${this._closeDialog}></ecv-icon>
                    <h1>Movimentar Estoque</h1>
                    <p>Dar entrada ou Saida no estoque da <span>${this.stock?.descricaoProduto}</span> ?</p>
                    <p>Estoque Atual: ${this.stock?.estoque}</p>
                    <div class="modal__inputs">
                        <challenge-input label="Entrada" type="number" class="entry__moviment"></challenge-input>
                        <challenge-input label="Saída" type="number" class="exit__moviment"></challenge-input>
                    </div>
                    <challenge-textarea label="Descrição"></challenge-textarea>
                    <span class="modal__error">${this._messageError}</span>
                    <span class="modal__warning">A alteração do estoque é atualizada em tempo real!</span>
                    <div class="form__buttons">
                        <button class="buttons__cancel" @click=${this._closeDialog}>Cancelar</button>
                        <button class="buttons__apply" @click=${this._confirmMoviment}>Confirmar</button>
                    </div>
                </challenge-dialog-modal>
            </challenge-dialog-overlay>
        `;
    }

}

declare global{
    interface HTMLElementTagNameMap{
        'challenge-modal-movement': ChallengeModalMovement
    }
}