const platformFromReleaseKey = (releaseKey: string) => {
    let platformPrefix = releaseKey.split('_')[0];
    return platformPrefix;
};

export default platformFromReleaseKey;