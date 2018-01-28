import {PeerUpPage} from './app.po';

describe('peer-up App', () => {
    let page: PeerUpPage;

    beforeEach(() => {
        page = new PeerUpPage();
    });

    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('Welcome to app!');
    });
});
