import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Sale } from '../type/sale';
import TargetSystem from '../target-system';

@customElement('challenge-one')
export default class ChallegeOne extends LitElement{

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

            p, h1{
                margin: 0;
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
            }

            select{
                padding: 0.5rem;
                cursor: pointer;
                font-size: 16px;
                outline: none;
                border-radius: 5px;
            }
        `;
    }   

    private commissionRules = [
        { min: 0,   max: 100, rate: 0    },   // até 100 → sem comissão
        { min: 100, max: 500, rate: 0.05 },   // entre 100 e 500
        { min: 500, max: Infinity, rate: 0.05 }, // acima de 500
    ];

    @state()
    private _listSales: Sale[] = [];

    @state()
    private _listSalesOriginal: Sale[] = [];

    @state()
    private _sallersName: string[] = [];

    override async connectedCallback(): Promise<void> {
        super.connectedCallback();

        TargetSystem.instance.challengeLoading.show();
        this._listSales = await this._getSales();
        this._sallersName = [...new Set(this._listSales.map(s => s.vendedor))];
        this._listSalesOriginal = [...this._listSales];
        TargetSystem.instance.challengeLoading.hide();

        this._calculateCommissionOfSaller();
    }

    private async _getSales(): Promise<Sale[]>{
        const request = await fetch("../data/sales.json");
        const response = await request.json();

        return response.vendas;
    }   

    private _getCommissionRate(value: number): number {
        const rule = this.commissionRules.find(r => value >= r.min && value < r.max);
        return rule ? rule.rate : 0;
    }

    private _calculateCommissionOfSaller(): void{
        this._listSales.forEach((saller: Sale, index) => {
            const rate = this._getCommissionRate(saller.valor);
            const result = saller.valor * rate;

            this._listSales[index].comissao = Number(result.toFixed(2));
        });
    }

    private _generateSales(): Array<TemplateResult> {
        return this._listSales?.map((sale: Sale) => html`
            <tr>
                <td>${sale.vendedor}</td>
                <td>R$ ${sale.valor.toFixed(2)}</td>
                <td>R$ ${sale.comissao}</td>
            </tr>
        `);
    }

    private _generateCommissionAll(): Array<TemplateResult> {
        const sellers = this._listSales.reduce((acc, sale) => {
            const existing = acc.find(item => item.vendedor === sale.vendedor);
            if (existing) {
                existing.value += sale.comissao;
            } else {
                acc.push({
                    vendedor: sale.vendedor,
                    value: sale.comissao
                });
            }

            return acc;
        }, [] as { vendedor: string; value: number }[]);

        return sellers.map(seller => html`
            <tr>
                <td>${seller.vendedor}</td>
                <td>R$ ${seller.value.toFixed(2)}</td>
            </tr>
        `);
    }

    private _getValueInput(e: MouseEvent): void {
        const select = e.target as HTMLSelectElement;
        
        this._listSales = [...this._listSalesOriginal];
        const filtered = this._listSales.filter(sale => sale.vendedor === select.value);
        this._listSales = filtered.length > 0 ? filtered : this._listSalesOriginal;
    }

    protected override render(): TemplateResult{
        return html`
            <div class="container">
                <h1>Comissão de cada vendedor</h1>

                <h2>Filtrar</h2>
                <select @input=${((e: MouseEvent) => {this._getValueInput(e)})}>
                    <option disabled selected>Selecionar Vendedor</option>
                    <option>Todos</option>
                    ${this._sallersName.map((name: string) => html`<option value=${name}>${name}</option>`)}
                </select>

                <h2>Comissão Total</h2>
                <table class="table">
                    <tr class="table__head">
                        <th>Vendedor</th>
                        <th>Comissão Total</th>
                    </tr>
                    ${this._generateCommissionAll()}
                </table>

                <h2>Vendas</h2>
                <table class="table">
                    <tr class="table__head">
                        <th>Vendedor</th>
                        <th>Valor da Venda</th>
                        <th>Comissão Por Venda</th>
                    </tr>
                    ${this._generateSales()}
                </table>
                
            </div>
        `;
    }

}

declare global{
    interface HTMLElementTagNameMap{
        'challenge-one': ChallegeOne
    }
}