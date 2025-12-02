import {LitElement, html, css, TemplateResult, CSSResult, PropertyValues} from 'lit';
import { customElement, queryAll } from 'lit/decorators.js';
import "ecv-component";
import "./challenge-top-bar-link-button";
import ChallengeTopBarLinkButton from './challenge-top-bar-link-button';
import TargetSystem from '../target-system';

@customElement('challenge-menu')
export default class ChallengeMenu extends LitElement{

    static override get styles(): CSSResult{
        return css`
            :host{
                width: 100%;
                display: block;
            }

            .glassEffect{
                background: #131314;
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                position: fixed;
                width: 100%;
                z-index: 200;
                top: 0;
                user-select: none;
            }

            .glassEffect__topBar{
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                justify-content: space-evenly;
                padding: 1rem 1rem;
            }

            h1{
                margin: 0;
                font-size: 25px;
                color: #fff;
                font-weight: bolder;
                transition: all 0.3s ease;
                cursor: pointer;
            }

            h1:hover{
                color: var(--text-muted);
            }

            .logo__title{
                color: var(--color-neon-pink-light);
            }

            .logo__complement{
                color: var(--color-neon-cyan);
            }

            .topBar__links{
                display: flex;
                align-items: center;
                gap: 25px;
                font-size: 1.125rem;
            }

            .topBar__contact{
                display: flex;
                align-items: center;
                gap: 10px;
            }

            svg{
                color: #fff;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            svg:hover{
                color: var(--primary-dark);
            }

            @media (min-width: 500px){
                .glassEffect__topBar{
                    padding: 1rem 2rem;
                }
            }
        `;
    }

    @queryAll("challenge-top-bar-link-button")
    private _linkButtons!: NodeListOf<ChallengeTopBarLinkButton>;

    protected override firstUpdated(_changedProperties: PropertyValues): void {
        this._linkButtons[0]?.click();
    }

    public resetLinkButtonsTopBar(): void{
        this._linkButtons.forEach((button) => {     
            button.isActive = false;
        });
    }

    public getAllLinkButtons(): NodeListOf<HTMLElement> {
        return this._linkButtons;
    }

    private _goToChallengeHome(): void {
        TargetSystem.instance.goToPage("/");
    }

    private _goToChallengeOne(): void {
        TargetSystem.instance.goToPage("/chellangeOne");
    }

    private _goToChallengeTwo(): void {
        TargetSystem.instance.goToPage("/chellangeTwo");
    }

    private _goToChallengeThree(): void {
        TargetSystem.instance.goToPage("/chellangeThree");
    }

    // This method is used to change the active state of the link buttons in the top bar.
    private _alterLinkButton(event: MouseEvent): void {
        const target = event.target as ChallengeTopBarLinkButton;
        this.resetLinkButtonsTopBar();
        target.isActive = true;
    }

    private _goToLinkedin(): void{
        window.open("https://www.linkedin.com/in/leonardo-leal-ara%C3%BAjo-2653b91b9/", "_blank");
    }

    private _goToPortfolio(): void{
        window.open("https://portfolio-leonardo-leal.vercel.app/", "_blank");
    }

    private _goToGitHub(): void{
        window.open("https://github.com/LeonardoLAraujo", "_blank");
    }
    
    private _generetateLinkButtons(): TemplateResult{
        return html`
            <challenge-top-bar-link-button label="Início" ?isActive=${true}     @click=${(e: MouseEvent) => {this._alterLinkButton(e); this._goToChallengeHome()}}></challenge-top-bar-link-button>
            <challenge-top-bar-link-button label="Desafio 1"                    @click=${(e: MouseEvent) => {this._alterLinkButton(e); this._goToChallengeOne()}}></challenge-top-bar-link-button>
            <challenge-top-bar-link-button label="Desafio 2"                    @click=${(e: MouseEvent) => {this._alterLinkButton(e); this._goToChallengeTwo()}}></challenge-top-bar-link-button>
            <challenge-top-bar-link-button label="Desafio 3"                    @click=${(e: MouseEvent) => {this._alterLinkButton(e); this._goToChallengeThree()}}></challenge-top-bar-link-button>
        `;
    }

    protected override render(): TemplateResult{
        return html`
            <header class="glassEffect">
                <nav class="glassEffect__topBar">
                    <h1 @click=${this._goToLinkedin}>< Leonardo Leal ></h1>
                    <div class="topBar__links">
                        ${this._generetateLinkButtons()}
                    </div>
                    <div class="topBar__contact">
                        <svg @click=${this._goToPortfolio} width="28" height="28" viewBox="0 0 24 24" fill="none" 
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 7H21V18C21 19.1 20.1 20 19 20H5C3.9 20 3 19.1 3 18V7Z"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" 
                                stroke-linejoin="round"/>
                            <path d="M3 7L5.5 4H10L12 6H21"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" 
                                stroke-linejoin="round"/>
                            <path d="M12 11L13 13.5H15.5L13.75 15L14.5 17.5L12 16L9.5 17.5L10.25 15L8.5 13.5H11L12 11Z"
                                fill="currentColor"/>
                        </svg>
                        <svg @click=${this._goToGitHub} width="28" height="28" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M12 2C6.48 2 2 6.58 2 12.26C2 16.57 4.87 20.23 8.84 21.5C9.34 21.6 9.52 21.27 9.52 20.99C9.52 20.74 9.51 20.14 9.51 19.39C7 19.93 6.48 18.37 6.48 18.37C6.03 17.26 5.39 16.96 5.39 16.96C4.5 16.36 5.46 16.37 5.46 16.37C6.45 16.44 6.97 17.47 6.97 17.47C7.84 19.03 9.34 18.58 10 18.31C10.1 17.67 10.37 17.23 10.66 16.98C8.61 16.73 6.44 15.87 6.44 12.39C6.44 11.34 6.82 10.47 7.46 9.79C7.35 9.54 7 8.57 7.55 7.19C7.55 7.19 8.41 6.92 9.52 7.88C10.33 7.64 11.2 7.52 12.07 7.52C12.94 7.52 13.81 7.64 14.62 7.88C15.73 6.92 16.59 7.19 16.59 7.19C17.14 8.57 16.79 9.54 16.68 9.79C17.32 10.47 17.7 11.34 17.7 12.39C17.7 15.88 15.52 16.73 13.47 16.97C13.85 17.3 14.18 17.94 14.18 18.93C14.18 20.39 14.16 21.51 14.16 20.99C14.16 21.27 14.34 21.61 14.85 21.5C18.82 20.23 21.69 16.57 21.69 12.26C21.69 6.58 17.21 2 11.69 2H12Z"
                            stroke="currentColor" stroke-width="1.7" />
                        </svg>
                    </div>

                </nav>
            </header>
        `;
    }
}


declare global{
   interface HTMLElementTagNameMap{
      'challenge-menu': ChallengeMenu
   }
}