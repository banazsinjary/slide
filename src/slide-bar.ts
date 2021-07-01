import {
  html,
  css,
  LitElement,
  property,
  customElement,
  internalProperty,
} from 'lit-element';

export interface TopTab {
  displayName: string;
  tabTitle?: string;
}

@customElement('slide-bar')
export class SlideBar extends LitElement {
  @property({ type: Array }) entries: TopTab[] = [];

  @property({ type: String }) title = 'Hey There';

  @property({ type: Number }) counter = 0;

  @internalProperty() selectedIndex = 0;

  private itemClicked(index: number) {
    console.log('hi', index);
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
                    @click=${this.itemClicked}
                    class=${index === this.selectedIndex ? 'active' : ''}
                  >
                    ${entry.displayName}
                  </button>
                </li>
              `
          )}
        </ul>
      </div>
    `;
  }

  static styles = css`
    .headD {
      background-color: #00468b;
      height: 60px;
      padding-top: 10px;
      color: white;
      font-size: 18px;
    }
    .headD ul {
      display: flex;
      flex-wrap: wrap;
    }

    .headding li {
      display: inline;
      padding: 10px;
      margin: 5px;
      color: #d7dce2;
      font-size: 15px;
      font-family: Arial, Helvetica, sans-serif;
    }

    .headding li.active {
      cursor: pointer;
      font-weight: bold;
      text-decoration: underline;
      text-decoration-thickness: 4px;
    }
    .oof {
      position: absolute;
      border-bottom: 4px solid transparent;
      z-index: -1;
      transform: translate(60px);
    }

    .headD a,
    .oof {
      transition: all 0.35s ease-in-out;
    }

    :host {
      display: block;
      color: var(--your-webcomponent-text-color, #000);
    }
  `;
}
// padding: 25px; for host
