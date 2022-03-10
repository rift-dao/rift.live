import { Contract } from 'ethers';

import riftAbi from './Rift.json';
import riftDataAbi from './RiftData.json';

class Rift {
  constructor(provider, riftAddress, riftDataAddress) {
    const rift = new Contract(riftAddress, riftAbi, provider);
    const riftData = new Contract(riftDataAddress, riftDataAbi, provider);

    this.library = provider;
    this.rift = rift;
    this.riftData = riftData;
  }

  async bag(bagId) {
    if (bagId > 0) {
      const {
        charges,
        chargesPurchased,
        chargesUsed,
        lastChargePurchased,
        level,
        xp,
      } = await this.rift.getBagInfo(bagId);

      return {
        charges: charges.toNumber(),
        chargesPurchased: chargesPurchased.toNumber(),
        chargesUsed: chargesUsed.toNumber(),
        lastChargePurchased: lastChargePurchased.toNumber(),
        level: level.toNumber(),
        xp: xp.toNumber(),
      };
    }

    return {};
  }

  async buyCharge(bagId) {
    const signer = this.rift.connect(this.library.getSigner());
    return signer.buyCharge(bagId);
  }

  async growTheRift(burnableAddress, tokenId, bagId) {
    const signer = this.rift.connect(this.library.getSigner());
    return signer.growTheRift(burnableAddress, tokenId, bagId);
  }

  async riftInfo() {
    const promises = [this.rift.riftLevel()];

    const [level] = await Promise.all(promises);

    return {
      level,
    };
  }
}

export default Rift;
