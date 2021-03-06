import { game } from "../types/game";

const moveGameToHistory = (gamesInRotation: game[], history: game[], selectedGame: game) => {
    if (gamesInRotation.length + history.length < 2) {
        return [gamesInRotation, history];
    }

    const selectedGameIndex = gamesInRotation.indexOf(selectedGame);

    let gamesResult = [...gamesInRotation];
    let removedFromRotation = gamesResult.splice(selectedGameIndex, 1);
    let historyResult = history.concat(removedFromRotation);
    if (historyResult.length > gamesResult.length) {
        let removedFromHistory = historyResult.splice(0, 1);
        gamesResult = gamesResult.concat(removedFromHistory);
    }

    return [gamesResult, historyResult];
}

export default moveGameToHistory;