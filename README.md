# GOG-Galaxy-Suggester
![](https://github.com/SparrowBrain/GOG-Galaxy-Suggester/workflows/Continuous%20Integration/badge.svg)

A website that recommends a random game to play from your GOG Galaxy library.

Open your GOG Galaxy database file with this website and it will pick a random game for you. Then you can click a platform icon to show it in your **GOG Galaxy** client.

Visit at: https://sparrowbrain.github.io/GOG-Galaxy-Suggester/

## How it works
It's a React application that runs in your browser. It uses https://github.com/sql-js/sql.js/ to open GOG Galaxy's SQLite database file. Then it gathers all your game data and spits out a random result.

## Acknowledgements
The **GOG Galaxy** database query is mostly taken from **AB1908's** [GOG-Galaxy-Export-Script](https://github.com/AB1908/GOG-Galaxy-Export-Script)

Idea to open gameView in **GOG Galaxy** and use *LibraryReleases* table from [maxwellainatchi](https://gist.github.com/maxwellainatchi/794d22c2c24f98d5dc8e6abc7ccc8a92)
