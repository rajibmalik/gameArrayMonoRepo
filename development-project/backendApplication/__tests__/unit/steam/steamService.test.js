const { getAppDetails } = require('../../../services/steamService');

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
});
