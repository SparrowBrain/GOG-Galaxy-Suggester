import { game } from "../types/game";
import { bias, biases, ignoreAllBias } from "../types/preferences";
import { prepareBiasedTickets } from "./biasedTickets";
import { testGame } from "./testData";

describe('biasedTickets', () => {
    let games: game[] = [
    ];

    let biases: biases;

    beforeEach(() => {
        games = [
            { ...testGame, title: 'A', gameMinutes: 1 },
            { ...testGame, title: 'B' },
            { ...testGame, title: 'C' },
        ];

        biases = { ...ignoreAllBias }
    });

    it('should return same list if all biases ignored', () => {
        const actualGames = prepareBiasedTickets(games, biases);

        expect(actualGames).toEqual(games);
    });

    it('should two games twice if same genre and one game has a minute played with matching genre in another while third has nothing to match', () => {
        biases.genre = bias.same;
        games[0].genres = ['RPG'];
        games[1].genres = ['RPG'];
        const actualGames = prepareBiasedTickets(games, biases);

        expect(actualGames.length).toEqual(5);
        expect(actualGames.filter(x => x.title === 'A').length).toEqual(2);
        expect(actualGames.filter(x => x.title === 'B').length).toEqual(2);
        expect(actualGames.filter(x => x.title === 'C').length).toEqual(1);
    });

    it('should promote unplayed genre if different genre and one game has a minute played with matching genre in another while third has nothing to match', () => {
        biases.genre = bias.different;
        games[0].genres = ['RPG'];
        games[1].genres = ['RPG'];
        const actualGames = prepareBiasedTickets(games, biases);

        expect(actualGames.length).toEqual(4);
        expect(actualGames.filter(x => x.title === 'A').length).toEqual(1);
        expect(actualGames.filter(x => x.title === 'B').length).toEqual(1);
        expect(actualGames.filter(x => x.title === 'C').length).toEqual(2);
    });

    it('should two games twice if same theme and one game has a minute played with matching theme in another while third has nothing to match', () => {
        biases.theme = bias.same;
        games[0].themes = ['Action'];
        games[1].themes = ['Action'];
        const actualGames = prepareBiasedTickets(games, biases);

        expect(actualGames.length).toEqual(5);
        expect(actualGames.filter(x => x.title === 'A').length).toEqual(2);
        expect(actualGames.filter(x => x.title === 'B').length).toEqual(2);
        expect(actualGames.filter(x => x.title === 'C').length).toEqual(1);
    });

    it('should promote unplayed theme if different theme and one game has a minute played with matching theme in another while third has nothing to match', () => {
        biases.theme = bias.different;
        games[0].themes = ['Action'];
        games[1].themes = ['Action'];
        const actualGames = prepareBiasedTickets(games, biases);

        expect(actualGames.length).toEqual(4);
        expect(actualGames.filter(x => x.title === 'A').length).toEqual(1);
        expect(actualGames.filter(x => x.title === 'B').length).toEqual(1);
        expect(actualGames.filter(x => x.title === 'C').length).toEqual(2);
    });

    it('should two games twice if same developer and one game has a minute played with matching developer in another while third has nothing to match', () => {
        biases.developer = bias.same;
        games[0].developers = ['Games.dev'];
        games[1].developers = ['Games.dev'];
        const actualGames = prepareBiasedTickets(games, biases);

        expect(actualGames.length).toEqual(5);
        expect(actualGames.filter(x => x.title === 'A').length).toEqual(2);
        expect(actualGames.filter(x => x.title === 'B').length).toEqual(2);
        expect(actualGames.filter(x => x.title === 'C').length).toEqual(1);
    });

    it('should promote unplayed developer if different developer and one game has a minute played with matching developer in another while third has nothing to match', () => {
        biases.developer = bias.different;
        games[0].developers = ['Games.dev'];
        games[1].developers = ['Games.dev'];
        const actualGames = prepareBiasedTickets(games, biases);

        expect(actualGames.length).toEqual(4);
        expect(actualGames.filter(x => x.title === 'A').length).toEqual(1);
        expect(actualGames.filter(x => x.title === 'B').length).toEqual(1);
        expect(actualGames.filter(x => x.title === 'C').length).toEqual(2);
    });

    it('should two games twice if same publisher and one game has a minute played with matching publisher in another while third has nothing to match', () => {
        biases.publisher = bias.same;
        games[0].publishers = ['Stocks inc.'];
        games[1].publishers = ['Stocks inc.'];
        const actualGames = prepareBiasedTickets(games, biases);

        expect(actualGames.length).toEqual(5);
        expect(actualGames.filter(x => x.title === 'A').length).toEqual(2);
        expect(actualGames.filter(x => x.title === 'B').length).toEqual(2);
        expect(actualGames.filter(x => x.title === 'C').length).toEqual(1);
    });

    it('should promote unplayed publisher if different publisher and one game has a minute played with matching publisher in another while third has nothing to match', () => {
        biases.publisher = bias.different;
        games[0].publishers = ['Stocks inc.'];
        games[1].publishers = ['Stocks inc.'];
        const actualGames = prepareBiasedTickets(games, biases);

        expect(actualGames.length).toEqual(4);
        expect(actualGames.filter(x => x.title === 'A').length).toEqual(1);
        expect(actualGames.filter(x => x.title === 'B').length).toEqual(1);
        expect(actualGames.filter(x => x.title === 'C').length).toEqual(2);
    });
});