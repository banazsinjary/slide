import { html, fixture, expect, oneEvent } from '@open-wc/testing';

import type { SlideBar } from '../src/slide-bar';
import '../src/slide-bar';

describe('SlideBar', () => {
  it('has a list tag', async () => {
    const el = await fixture<SlideBar>(html`<slide-bar></slide-bar>`);

    const list = el.shadowRoot?.querySelector('ul');
    expect(list).to.exist;
  });

  it('has a list tag', async () => {
    const el = await fixture<SlideBar>(
      html`<slide-bar
        .entries=${[{ displayName: 'UPLOADS' }, { displayName: 'POSTS' }]}
      ></slide-bar>`
    );

    const list = el.shadowRoot?.querySelectorAll('li');
    expect(list?.length).to.equal(2);
  });

  it('has no passes', async () => {
    const el = await fixture<SlideBar>(html`<slide-bar></slide-bar>`);

    const list = el.shadowRoot?.querySelector('li');
    expect(list).to.not.exist;
  });

  it('emits an event when item is clicked on', async () => {
    const el = await fixture<SlideBar>(
      html`<slide-bar
        .entries=${[{ displayName: 'UPLOADS' }, { displayName: 'POSTS' }]}
      ></slide-bar>`
    );

    const button = el.shadowRoot?.querySelector('button');
    const listener = oneEvent(el, 'itemclicked');
    button?.click();
    const { detail } = await listener;
    expect(detail.index).to.equal(0);
  });

  it('adds active class to item clicked', async () => {
    const el = await fixture<SlideBar>(
      html`<slide-bar
        .entries=${[{ displayName: 'UPLOADS' }, { displayName: 'POSTS' }]}
      ></slide-bar>`
    );

    const button = el.shadowRoot?.querySelector('button');
    button?.click();
    await el.updateComplete;
    expect(button?.classList.contains('active')).to.be.true;
  });
});
