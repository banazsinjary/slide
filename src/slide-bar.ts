import {
  html,
  css,
  LitElement,
  property,
  customElement,
  query,
} from 'lit-element';
import { nothing } from 'lit-html';
import './slide-bar-loading-dots';

export interface TopTab {
  displayName: string;
  tabTitle?: string;
}

@customElement('slide-bar')
export class SlideBar extends LitElement {
  @property({ type: Array }) entries: TopTab[] = [];

  @property({ type: String }) title = 'Hey There';

  @property({ type: Number }) counter = 0;

  @property({ type: Number }) selectedIndex = 0;

  @property({ type: Boolean }) isLoading = true;

  @query('.headD') container!: HTMLDivElement;

  private itemClicked(e: Event, index: number) {
    console.log(
      'hi',
      (e.target as HTMLButtonElement).getBoundingClientRect(),
      index
    );
    const boundingRect = (e.target as HTMLButtonElement).getBoundingClientRect();
    const containerRect = this.container.getBoundingClientRect();
    const containerDiff = boundingRect.x - containerRect.x;
    this.style.setProperty('--underlineLeftPosition', `${containerDiff}px`);
    this.style.setProperty('--underlineWidth', `${boundingRect.width}px`);

    const event = new CustomEvent('itemclicked', {
      detail: {
        index,
      },
    });
    this.selectedIndex = index;
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <div class="headD">
        <ul class="headding">
          ${this.entries.map(
            (entry, index) =>
              html`
                <li>
                  <button
                    @click=${(e: Event) => this.itemClicked(e, index)}
                    class=${index === this.selectedIndex ? 'active' : ''}
                  >
                    ${entry.displayName}
                  </button>
                </li>
              `
          )}
          ${this.isLoading
            ? html`<div id="loadingState">
                <slide-bar-loading-dots></slide-bar-loading-dots>
              </div>`
            : nothing}
        </ul>
        <div id="underLine"></div>
      </div>
    `;
  }

  static styles = css`
    .spinnyCircle {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;
    }
    .spinnyCircle div {
      position: absolute;
      top: 2px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #d7dce2;
      animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }
    .spinnyCircle div:nth-child(1) {
      left: 8px;
      animation: spinnyCircle1 0.6s infinite;
    }
    .spinnyCircle div:nth-child(2) {
      left: 8px;
      animation: spinnyCircle2 0.6s infinite;
    }
    .spinnyCircle div:nth-child(3) {
      left: 32px;
      animation: spinnyCircle2 0.6s infinite;
    }
    .spinnyCircle div:nth-child(4) {
      left: 56px;
      animation: spinnyCircle3 0.6s infinite;
    }
    @keyframes spinnyCircle1 {
      0% {
        transform: scale(0);
      }
      100% {
        transform: scale(1);
      }
    }
    @keyframes spinnyCircle3 {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(0);
      }
    }
    @keyframes spinnyCircle2 {
      0% {
        transform: translate(0, 0);
      }
      100% {
        transform: translate(24px, 0);
      }
    }

    #loadingState {
      text-align: center;
      width: 65px;
      height: 17px;
      background-color: none;
      margin-top: 9px;
      margin-left: 10px;
      color: white;
    }

    #underLine {
      position: relative;
      width: var(--underlineWidth, 0px);
      height: 5px;
      top: 0px;
      left: var(--underlineLeftPosition, 0px);
      background-color: white;
      transition-property: left, width;
      transition-duration: 1s;
      transition-delay: 0;
    }

    .headD {
      background-color: #00468b;
      height: 70px;
      padding-top: 10px;
      color: white;
      font-size: 18px;
    }
    .headD ul {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 0;
      padding-left: 10;
    }

    .headding li {
      display: inline;
      color: #d7dce2;
      font-size: 15px;
      font-family: Arial, Helvetica, sans-serif;
    }

    button:hover {
      cursor: pointer;
    }

    button {
      background: none;
      border: none;
      display: inline;
      color: #d7dce2;
      background-color: #00468b;
      font-size: 15px;
      font-family: Arial, Helvetica, sans-serif;
      padding: 10px;
    }
    :host {
      display: block;
      color: var(--your-webcomponent-text-color, #000);
    }
  `;
}
// padding: 25px; for host
