const {
  getAppDetails,
  getUserAchievements,
  getIsProfileVisibile,
} = require('../../../services/steamService');

describe('Steam API Integration', () => {
  it('should fetch correct data for appid 570 (Dota 2)', async () => {
    // appIDs for Dota 2 and CS GO
    const appIDs = [570];
    const result = await getAppDetails(appIDs);
    const data = result[0]['570'].data;
    const success = result[0]['570'].success;

    expect(result).toHaveLength(1);
    expect(success).toBe(true);
    expect(data.name).toBe('Dota 2');
    expect(data.steam_appid).toBe(570);
  });

  it('should fetch correct data for appids 570 (Dota 2) and 730 (CS GO 2)', async () => {
    // appIDs for Dota 2 and CS GO 2
    const appIDs = [570, 730];
    const result = await getAppDetails(appIDs);
    const dotaSearch = result.find((obj) => obj['570'])['570'];
    const dotaSearchSuccess = dotaSearch.success;
    const dota = dotaSearch.data;
    const csSearch = result.find((obj) => obj['730'])['730'];
    const csSearchSuccess = csSearch.success;
    const cs = csSearch.data;

    expect(result).toHaveLength(2);
    expect(dotaSearchSuccess).toBe(true);
    expect(dota.name).toBe('Dota 2');
    expect(dota.steam_appid).toBe(570);

    expect(csSearchSuccess).toBe(true);
    expect(cs.name).toBe('Counter-Strike 2');
    expect(cs.steam_appid).toBe(730);
  });

  it('should fetch correct achievement data for appids 292030 (Witcher 3) and 105600 (Terraria)', async () => {
    // appIDs for Dota 2 and CS GO 2
    const appID = [292030, 105600];
    const steamid = '76561198087601822';
    const result = await getUserAchievements(appID, steamid);

    const witcherAchievementData = result.find((data) => data.appID === 292030);
    const terrariaAchievementData = result.find(
      (data) => data.appID === 105600,
    );

    expect(witcherAchievementData).toBeDefined();
    expect(witcherAchievementData.appID).toBe(292030);
    expect(terrariaAchievementData).toBeDefined();
    expect(terrariaAchievementData.appID).toBe(105600);
  });

  it('should fetch achievement data for many games', async () => {
    // appIDs for Dota 2 and CS GO 2
    const appIDs = [
      251570, 730, 271590, 1238840, 204360, 255710, 383180, 570, 289070, 239820,
      1222690, 238960, 344770, 550, 215530, 872790, 379720, 379430, 22380,
      236850, 413150,
    ];
    const steamid = '76561198087601822';
    const result = await getUserAchievements(appIDs, steamid);
    console.log('HERE: ' + result.length);

    expect(result).toHaveLength(21);

    appIDs.forEach((appID) => {
      const achievementData = result.find((data) => data.appID === appID);
      expect(achievementData).toBeDefined();
      expect(achievementData.appID).toBe(appID);
    });
  });

  it('should fetch no achievement data for appid 10 which has no achievement data (Counter Strike)', async () => {
    // appIDs for Dota 2 and CS GO 2
    const appID = [10];
    const steamid = '76561198087601822';
    const result = await getUserAchievements(appID, steamid);

    const csAchievementData = result[0];

    expect(csAchievementData.achievements).toBeNull();
    expect(csAchievementData.appID).toBe(10);
  });

  it('should fetch correct visibility data on the profile  ', async () => {
    const steamid = '76561199689477389';
    const result = await getIsProfileVisibile(steamid);

    expect(result).toBe(true);
  });
});
