import { html, css, LitElement, customElement, query } from 'lit-element';
import '../src/ia-underlined-tab-bar';
import type { UnderlinedTabBar } from '../src/ia-underlined-tab-bar';

@customElement('app-root')
export class AppRoot extends LitElement {
  @query('ia-underlined-tab-bar') tabBar!: UnderlinedTabBar;

  private itemClicked() {}

  private doSomething() {
    this.tabBar.entries = [
      { displayName: 'CHANGE' },
      { displayName: 'TITLE' },
      { displayName: 'OPTIONS' },
      { displayName: 'ACITIVE' },
    ];
  }

  private loadControl() {
    console.log(this.tabBar.isLoading);
    this.tabBar.isLoading = !this.tabBar.isLoading;
  }

  private indexSelect() {
    this.tabBar.selectedIndex = Math.floor(Math.random() * 6);
  }

  private underlineWideInc() {
    const component = this.shadowRoot?.querySelector(
      'ia-underlined-tab-bar'
    ) as UnderlinedTabBar;
    component.increment();
  }

  private underlineWideDec() {
    const component = this.shadowRoot?.querySelector(
      'ia-underlined-tab-bar'
    ) as UnderlinedTabBar;
    component.decrement();
  }

  render() {
    return html`
      <button @click=${this.doSomething}>change options</button>
      <button @click=${this.loadControl}>load on/off</button>
      <button @click=${this.indexSelect}>index select</button>
      <button @click=${this.underlineWideInc}>line width increase</button>
      <button @click=${this.underlineWideDec}>line width decrease</button>

      <ia-underlined-tab-bar
        @itemclicked=${this.itemClicked}
        .entries=${[
          { displayName: 'UPLOADS' },
          { displayName: 'POSTS' },
          { displayName: 'REVIEWS' },
          { displayName: 'COLLECTIONS' },
          { displayName: 'LOANS' },
          { displayName: 'WEB ARCHIVE' },
        ]}
      >
      </ia-underlined-tab-bar>
    `;
  }

  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--your-webcomponent-text-color, #000);
    }

    ia-underlined-tab-bar {
      --underLineThick: 5px;
    }
  `;
}
