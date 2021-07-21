// https://github.com/gogcom/galaxy-integrations-python-api/blob/master/PLATFORM_IDs.md as per commit 1e7c284 on Jun 19, 2020
// GOG added manually
const platformMap: { [key: string]: string } = {
    'gog': 'GOG',
    'test': 'Testing purposes',
    'steam': 'Steam',
    'psn': 'PlayStation Network',
    'xboxone': 'Xbox Live',
    'origin': 'Origin',
    'uplay': 'Ubisoft Connect',
    'battlenet': 'Battle.net',
    'epic': 'Epic Games Store',
    'bethesda': 'Bethesda.net',
    'paradox': 'Paradox Plaza',
    'humble': 'Humble Bundle',
    'kartridge': 'Kartridge',
    'itch': 'Itch.io',
    'nswitch': 'Nintendo Switch',
    'nwiiu': 'Nintendo Wii U',
    'nwii': 'Nintendo Wii',
    'ncube': 'Nintendo GameCube',
    'riot': 'Riot',
    'wargaming': 'Wargaming',
    'ngameboy': 'Nintendo Game Boy',
    'atari': 'Atari',
    'amiga': 'Amiga',
    'snes': 'SNES',
    'beamdog': 'Beamdog',
    'd2d': 'Direct2Drive',
    'discord': 'Discord',
    'dotemu': 'DotEmu',
    'gamehouse': 'GameHouse',
    'gmg': 'Green Man Gaming',
    'weplay': 'WePlay',
    'zx': 'Zx Spectrum PC',
    'vision': 'ColecoVision',
    'nes': 'NES',
    'sms': 'Sega Master System',
    'c64': 'Commodore 64',
    'segag': 'Sega Genesis',
    'neo': 'NeoGeo',
    'sega32': 'Sega 32X',
    'segacd': 'Sega CD',
    '3do': '3DO Interactive ',
    'saturn': 'SegaSaturn',
    'psx': 'Sony PlayStation',
    'ps2': 'Sony PlayStation 2',
    'n64': 'Nintendo64',
    'jaguar': 'Atari Jaguar',
    'dc': 'Sega Dreamcast',
    'xboxog': 'Original Xbox games',
    'amazon': 'Amazon',
    'gg': 'GamersGate',
    'egg': 'Newegg',
    'bb': 'BestBuy',
    'gameuk': 'Game UK',
    'fanatical': 'Fanatical store',
    'stadia': 'Google Stadia',
    'arc': 'ARC',
    'eso': 'ESO',
    'glyph': 'Trion World',
    'aionl': 'Aion: Legions of War',
    'aion': 'Aion',
    'blade': 'Blade & Soul',
    'gw': 'Guild Wars',
    'gw2': 'Guild Wars 2',
    'lin2': 'Lineage 2',
    'ffxi': 'Final Fantasy XI',
    'ffxiv': 'Final Fantasy XIV ',
    'totalwar': 'Total War',
    'winstore': 'Windows Store',
    'elites': 'Elite Dangerous',
    'star': 'Star Citizen',
    'psp': 'PlayStation Portable',
    'psvita': 'PlayStation Vita',
    'nds': 'Nintendo DS',
    '3ds': 'Nintendo 3DS',
    'pathofexile': 'Path of Exile',
    'twitch': 'Twitch',
    'minecraft': 'Minecraft',
    'gamesessions': 'GameSessions',
    'nuuvem': 'Nuuvem',
    'fxstore': 'FX Store',
    'indiegala': 'IndieGala',
    'playfire': 'Playfire',
    'oculus': 'Oculus',
    'rockstar': 'Rockstar',
};

const readablePlatformName = (platform: string) => {
    if (platform in platformMap) {
        return platformMap[platform];
    }

    return platform;
}

export default readablePlatformName;