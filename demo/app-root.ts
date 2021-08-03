import { html, css, LitElement, customElement, query } from 'lit-element';
import '../src/slide-bar';
import type { SlideBar } from '../src/slide-bar';

@customElement('app-root')
export class AppRoot extends LitElement {
  @query('slide-bar') slideBar!: SlideBar;

  private itemClicked(e: CustomEvent) {
    console.log('ahhhh', e, e.detail);
  }

  private doSomething() {
    this.slideBar.entries = [
      { displayName: 'CHANGE' },
      { displayName: 'TITLE' },
      { displayName: 'OPTIONS' },
      { displayName: 'ACITIVE' },
    ];
  }

  private loadControl() {
    console.log(this.slideBar.isLoading);
    this.slideBar.isLoading = !this.slideBar.isLoading;
  }

  private indexSelect() {
    this.slideBar.selectedIndex = Math.floor(Math.random() * 6);
  }

  render() {
    return html`
      <button @click=${this.doSomething}>change options</button>
      <button @click=${this.loadControl}>load on/off</button>
      <button @click=${this.indexSelect}>index select</button>
      <slide-bar
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
      </slide-bar>
    `;
  }

  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--your-webcomponent-text-color, #000);
    }

    slide-bar {
      --underLineThick: 3px;
    }
  `;
}
