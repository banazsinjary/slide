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
    ];
  }

  render() {
    return html`
      <button @click=${this.doSomething}>Click me</button>
      <slide-bar
        @itemclicked=${this.itemClicked}
        .entries=${[{ displayName: 'UPLOADS' }, { displayName: 'POSTS' }]}
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
  `;
}
