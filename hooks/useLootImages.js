import envconfig from 'config/envconfig';
import Loot from 'contracts/Loot';
import { providers } from 'ethers';
import { useEffect, useMemo, useState } from 'react';

const PREFIX = `rift-bagImg-`;
function useLootImages(bagIds) {
  const [fetchingIds, setFetchingIds] = useState([]);
  const [imageMap, setImageMap] = useState({});
  const [firstLoad, setFirstLoad] = useState(false);
  const [fetching, setFetching] = useState(false);

  const lootContract = useMemo(
    () =>
      new Loot(
        providers.getDefaultProvider(),
        envconfig.getAddress('loot', 'mainnet'),
        envconfig.getAddress('mLoot', 'mainnet'),
        envconfig.getAddress('gLoot', 'mainnet'),
      ),
    [],
  );

  useEffect(() => {
    if (bagIds.length > 0) {
      const lsMap = {};
      bagIds.forEach((bagId) => {
        const localImg = localStorage.getItem(`${PREFIX}${bagId}`);
        if (!localImg) return;
        lsMap[bagId] = localImg;
      });
      setImageMap(lsMap);
      setFirstLoad(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    async function fetchData() {
      const fetchIds = [];
      bagIds.forEach((bagId) => {
        if (
          bagId &&
          fetchingIds.indexOf(bagId) === -1 &&
          typeof imageMap[bagId] === 'undefined'
        ) {
          fetchIds.push(bagId);
        }
      });

      if (fetchIds.length === 0) return;

      setFetching(true);
      setFetchingIds(fetchIds);
      const promises = fetchIds.map((bagId) => lootContract.getImage(bagId));

      const images = await Promise.all(promises);

      const newMap = { ...imageMap };
      images.forEach((image, index) => {
        localStorage.setItem(`${PREFIX}${fetchIds[index]}`, image);
        newMap[fetchIds[index]] = image;
      });

      setImageMap(newMap);
      setFetching(false);
      setFetchingIds([]);
    }

    if (firstLoad && !fetching && bagIds) {
      fetchData();
    }
  }, [bagIds, fetching, fetchingIds, firstLoad, imageMap, lootContract]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    imageMap,
  };
}

export default useLootImages;
