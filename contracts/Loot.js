import { Contract } from 'ethers';

import { lootABI } from 'loot.js/src/abi';
import helpers, { BAG_TYPES, GLOOT_OFFSET } from 'utils/helpers';

class Loot {
  constructor(provider, lootAddress, mLootAddress, gLootAddress) {
    const loot = new Contract(lootAddress, lootABI, provider);
    const mLoot = new Contract(mLootAddress, lootABI, provider);
    const gLoot = new Contract(gLootAddress, lootABI, provider);

    this.loot = loot;
    this.mLoot = mLoot;
    this.gLoot = gLoot;
  }

  async bag(lootId) {
    if (lootId > 0) {
      const loot = lootId < 8001 ? this.loot : this.mLoot;
      const type = lootId < 8001 ? 'Loot' : 'More Loot';

      const [chest, foot, hand, head, neck, ring, waist, weapon] =
        await Promise.all([
          loot.getChest(lootId),
          loot.getFoot(lootId),
          loot.getHand(lootId),
          loot.getHead(lootId),
          loot.getNeck(lootId),
          loot.getRing(lootId),
          loot.getWaist(lootId),
          loot.getWeapon(lootId),
        ]);

      const bag = {
        id: lootId,
        type,
        chest,
        foot,
        hand,
        head,
        neck,
        ring,
        waist,
        weapon,
      };

      return bag;
    }

    return {};
  }

  async numberOfOGBagsInWallet(address) {
    const balance = await this.loot.balanceOf(address);

    return balance.toNumber();
  }

  async numberOfMBagsInWallet(address) {
    const balance = await this.mLoot.balanceOf(address);

    return balance.toNumber();
  }

  async numberOfGBagsInWallet(address) {
    const balance = await this.gLoot.balanceOf(address);

    return balance.toNumber();
  }

  async numberOfBagsInWallet(
    address,
    excludingMLoot = false,
    excludingGLoot = false,
  ) {
    const promises = [this.numberOfOGBagsInWallet(address)];

    if (!excludingMLoot) {
      promises.push(this.numberOfMBagsInWallet(address));
    }

    if (!excludingGLoot) {
      promises.push(this.numberOfGBagsInWallet(address));
    }

    const responses = await Promise.all(promises);
    return responses.reduce((prev, curr) => curr + prev, 0);
  }

  async getImage(bagId) {
    const bagType = helpers.getBagType(bagId);

    let contract = this.loot;
    let id = bagId;

    if (bagType === BAG_TYPES.MLOOT) {
      contract = this.mLoot;
    } else if (bagType === BAG_TYPES.GLOOT) {
      contract = this.gLoot;
      id = parseInt(bagId, 10) - GLOOT_OFFSET;
    }

    const token = await contract.tokenURI(id);

    return helpers.imageFromTokenUri(token);
  }

  async lootIdsInWallet(
    address,
    excludingMLoot = false,
    excludingGLoot = false,
  ) {
    const bagCountPromises = [
      this.numberOfOGBagsInWallet(address),
      !excludingMLoot && this.numberOfMBagsInWallet(address),
      !excludingGLoot && this.numberOfGBagsInWallet(address),
    ];

    const [numberOfOGBags, numberOfMBags, numberOfGBags] = await Promise.all(
      bagCountPromises,
    );

    const lootIds = [];
    const tasks = [];

    for (let i = 0; i < numberOfOGBags; i++) {
      tasks.push(this.loot.tokenOfOwnerByIndex(address, i));
    }

    if (!excludingMLoot) {
      for (let i = 0; i < numberOfMBags; i++) {
        tasks.push(this.mLoot.tokenOfOwnerByIndex(address, i));
      }
    }

    if (!excludingGLoot) {
      for (let i = 0; i < numberOfGBags; i++) {
        tasks.push(this.gLoot.tokenOfOwnerByIndex(address, i));
      }
    }

    const data = await Promise.all(tasks);
    data.forEach((lootIdBN, index) => {
      let id = lootIdBN.toNumber();
      if (index >= numberOfOGBags + numberOfMBags) {
        id += GLOOT_OFFSET;
      }
      lootIds.push(id.toString());
    });

    return lootIds;
  }
}

export default Loot;
