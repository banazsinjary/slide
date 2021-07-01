import { html, fixture, expect } from '@open-wc/testing';

import type { SlideBar } from '../src/slide-bar';
import '../src/slide-bar';

describe('SlideBar', () => {
  it('has a list tag', async () => {
    const el = await fixture<SlideBar>(html`<slide-bar></slide-bar>>`);

    const list = el.shadowRoot?.querySelector('ul');
    expect(list).to.exist;
  });
});
