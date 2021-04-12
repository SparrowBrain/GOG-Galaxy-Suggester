import React, { useState } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { purple, teal } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import { SqlJs } from 'sql.js/module';

import Background from './components/Background/Background';
import Error from './components/Error/Error';
import FileUpload from './components/FileUpload/FileUpload';
import GameDetails from './components/GameDetails/GameDetails';
import GameNotFound from './components/GameNotFound/GameNotFound';
import Loading from './components/Loading/Loading';
import Navigation from './components/Navigation/Navigation';
import Preferences from './components/Preferences/Preferences';

import dbRowToGameDetails from './utils/dbRowToGame';
import { readGogGames } from './utils/gogDb';
import { game } from './types/game';
import { preferences } from './types/preferences';
import { pickAGameAndRefreshRotaion, pickAGameInRotation } from './utils/gamesRotation';
import { navigationPage } from './types/navigation';


const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: teal,
    type: 'dark',
  },
});

const defaultPreferences: preferences = {
  filters: {
    played: true,
    unplayed: true,
  }
};

function App() {
  const [error, setError] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [game, setGame] = useState<game | null>(null);
  const [allGames, setAllGames] = useState<game[] | null>(null);
  const [gamesInRotation, setGamesInRotation] = useState<game[]>([]);
  const [gamesInHistory, setGamesInHistory] = useState<game[]>([]);
  const [preferences, setPreferences] = useState<preferences>(defaultPreferences);
  const [currentPage, setCurrentPage] = useState<navigationPage>(navigationPage.openFile);

  const handleGogRead = (queryResults: SqlJs.QueryResults) => {
    let rows = queryResults.values;

    let games = rows.map(x => dbRowToGameDetails(x, queryResults.columns));
    setAllGames(games);

    const selectedGame = pickAGameAndRefreshRotaion(games, preferences, setGamesInRotation, setGamesInHistory);

    setGame(selectedGame);
    setIsLoaded(true);
  };

  const handleGogReadError = (error: any) => {
    console.error(error);
    setError(error);
    setIsLoaded(true);
  };

  const handleFileChange = async (blob: Blob) => {
    setIsLoaded(false);
    try {
      let results = await readGogGames(blob);
      handleGogRead(results);
    }
    catch (error) {
      handleGogReadError(error);
    }
  };

  const handlePreferencesChanged = (newPreferences: preferences) => {
    setPreferences(newPreferences);
  };

  const handleNavigationChanged = (goToPage: navigationPage) => {
    setError(null);

    switch (goToPage) {
      case navigationPage.openFile:
        setGame(null);
        break;
      case navigationPage.gameDetails:
        setNextGame();
        break;
      case navigationPage.preferences:
        setGame(null);
        setGamesInRotation([]);
        break;
    }

    setCurrentPage(goToPage);
  };

  const setNextGame = () => {
    if (allGames === null) {
      return;
    }

    const selectedGame = gamesInRotation.length === 0
      ? pickAGameAndRefreshRotaion(allGames, preferences, setGamesInRotation, setGamesInHistory)
      : pickAGameInRotation(gamesInRotation, gamesInHistory, preferences, setGamesInRotation, setGamesInHistory);

    setGame(selectedGame);
  };

  const isNextGameDisabled = () => {
    return allGames === null || allGames.length === 0;
  }

  const renderPageWhenNoGame = () => {
    switch (currentPage) {
      case navigationPage.openFile: return <FileUpload onFileChange={handleFileChange}></FileUpload>;
      case navigationPage.preferences: return <Preferences preferences={preferences} onPreferencesChanged={handlePreferencesChanged}></Preferences>;
      case navigationPage.gameDetails: return <GameNotFound />;
      default: return <GameNotFound />;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <Background backgroundImage={game?.backgroundImage ?? ''}>
          <Navigation onNavigationChanged={handleNavigationChanged} isNextGameDisabled={isNextGameDisabled()}></Navigation>
          {error && error.message
            ? <Error message={error.message} />
            : !isLoaded
              ? <Loading />
              : game != null
                ? <GameDetails {...game} />
                : renderPageWhenNoGame()
          }
        </Background>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
