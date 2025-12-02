import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { Stock } from '../type/stock';
import TargetSystem from '../target-system';
import "ecv-component";
import { IconTypes } from 'ecv-component';
import "../components/challenge-modal-movement";
import ChallengeModalMovement from '../components/challenge-modal-movement';
import { MovimentStock } from '../type/movimentStock';
import "../components/challenge-modal-list-moviment";
import ChallengeModalListMoviment from '../components/challenge-modal-list-moviment';

@customElement('challenge-two')
export default class ChallengeTwo extends LitElement{

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

            table {
                width: 100%;
                border-collapse: collapse;
                background: #1c1c1c;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 0 10px rgba(0,0,0,0.3);
            }

            th, td {
                padding: 12px 16px;
                text-align: left;
                font-size: 15px;
            }

            th {
                background: #252525;
                font-weight: bold;
                border-bottom: 2px solid #333;
            }

            td {
                border-bottom: 1px solid #2e2e2e;
                color: #e0e0e0;
                text-align: center;
            }

            tr:last-child td {
                border-bottom: none;
            }

            tr:hover td {
                background: #2a2a2a;
                transition: 0.2s;
            }

            .table__head th {
                color: #f5f5f5;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                text-align: center;
            }

            .stock{
                color: var(--text-main);
                font-size: 16px;
                font-weight: bold;
            }

            select{
                padding: 0.5rem;
                cursor: pointer;
                font-size: 16px;
                outline: none;
                border-radius: 5px;
            }

            ecv-icon{
                cursor: pointer;
                transition: all 0.3s ease;
            }

            ecv-icon:hover{
                color: var(--primary-dark);
            }
        `;
    }

    @state()
    private _listStocks: Stock[] = [];

    @state()
    private _listStocksMoviments: MovimentStock[] = [];

    @query("challenge-modal-movement")  
    private _challengeModalMovement!: ChallengeModalMovement;

    @query("challenge-modal-list-moviment")
    private _challengeModalMovementList!: ChallengeModalListMoviment;

    override async connectedCallback(): Promise<void> {
        super.connectedCallback();

        TargetSystem.instance.challengeLoading.show();
        this._listStocks = await this._getStock();
        TargetSystem.instance.challengeLoading.hide();
    }

    private async _getStock(): Promise<Stock[]>{
        const request = await fetch("../data/stock.json");
        const response = await request.json();

        return response.estoque;
    }

    private _openModal(stock: Stock): void {
        this._challengeModalMovement.stock = stock;
        this._challengeModalMovement.showDialog();
    }

    private _openModalMovimentList(stock: Stock): void {
        this._challengeModalMovementList.stock = stock;
        this._challengeModalMovementList.listMovimentStock = this._listStocksMoviments.filter(list => list.idProduct == stock.codigoProduto);
        this._challengeModalMovementList.showDialog();
    }

    private _generateStock(): Array<TemplateResult> {
        return this._listStocks?.map((stock: Stock) => html`
            <tr>
                <td>${stock.codigoProduto}</td>
                <td>${stock.descricaoProduto}</td>
                <td class="stock">${stock.estoque}</td>
                <td><ecv-icon .icon=${"delivery_truck_speed" as IconTypes} .iconStyle=${{size: "30px"}} @click=${() => {this._openModal(stock)}}></ecv-icon></td>
                <td><ecv-icon .icon=${"receipt" as IconTypes} .iconStyle=${{size: "30px"}} @click=${() => {this._openModalMovimentList(stock)}}></ecv-icon></td>
            </tr>
        `);
    }   

    private getMovimentChanged(e: CustomEvent){
        this._listStocksMoviments.push({ 
            id: e.detail.id,
            entryMoviment: e.detail.entryMoviment,
            exitMoviment: e.detail.exitMoviment,
            description: e.detail.description,
            idProduct: e.detail.idProduct,
            date: Date.now()
        });

        if(e.detail.entryMoviment == null){
            this._listStocks = this._listStocks.map((stock: Stock) => {
                if (stock.codigoProduto == e.detail.idProduct) {
                    stock.estoque = Number(stock.estoque) - Number(e.detail.exitMoviment);
                }
                
                return stock;
            });
        }else{
            this._listStocks = this._listStocks.map((stock: Stock) => {
                if (stock.codigoProduto === e.detail.idProduct) {
                    stock.estoque = Number(stock.estoque) + Number(e.detail.entryMoviment);
                }

                return stock;
            });
        }

        this.requestUpdate();
    }

    protected override render(): TemplateResult{
        return html`
            <div class="container">
                <h1>Produtos</h1>
                <table class="table">
                    <tr class="table__head">
                        <th>ID</th>
                        <th>Descrição</th>
                        <th>Estoque</th>
                        <th>Movimentar Estoque</th>
                        <th>Relátorio</th>
                    </tr>
                    ${this._generateStock()}
                </table>
            </div>
            <challenge-modal-movement @moviment-changed=${(e: CustomEvent) => {this.getMovimentChanged(e)}}></challenge-modal-movement>
            <challenge-modal-list-moviment .listMovimentStock=${this._listStocksMoviments} .stock=${this._listStocks[0]}></challenge-modal-list-moviment>
        `;
    }

}

declare global{
    interface HTMLElementTagNameMap{
        'challenge-two': ChallengeTwo
    }
}