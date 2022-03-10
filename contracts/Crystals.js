import { Contract } from 'ethers';

import crystalsAbi from './Crystals.json';
import crystalsMetadataAbi from './CrystalsMetadata.json';

class Crystals {
  constructor(provider, crystalsAddress, metadataAddress) {
    const crystals = new Contract(crystalsAddress, crystalsAbi, provider);

    const crystalsMetadata = new Contract(
      metadataAddress,
      crystalsMetadataAbi,
      provider,
    );

    this.library = provider;
    this.crystals = crystals;
    this.crystalsMetadata = crystalsMetadata;
  }

  async crystal(crystalId) {
    const { crystals, crystalsMetadata } = this;

    const [token, spin, resonance, color, lootType, name, data, claimableMana] =
      await Promise.all([
        crystals.tokenURI(crystalId),
        crystals.getSpin(crystalId),
        crystals.getResonance(crystalId),
        crystalsMetadata.getColor(crystalId),
        crystalsMetadata.getLootType(crystalId),
        crystalsMetadata.getName(crystalId),
        crystals.crystalsMap(crystalId),
        crystals.claimableMana(crystalId),
      ]);

    const {
      attunement,
      focus,
      lastClaim,
      levelManaProduced,
      lvlClaims,
      regNum,
    } = data;

    return {
      attunement,
      claimableMana,
      color,
      focus,
      id: crystalId,
      lastClaim: lastClaim.toString(),
      levelManaProduced,
      lootType,
      lvlClaims,
      name: name.trim(),
      regNum,
      resonance,
      spin,
      token,
    };
  }

  // async numberOfOGBagsInWallet(address) {
  //   const balance = await this.crystals.balanceOf(address);

  //   return balance.toNumber();
  // }

  // async numberOfMoreBagsInWallet(address) {
  //   const balance = await this.moreLoot.balanceOf(address);

  //   return balance.toNumber();
  // }

  async refocusCrystal(tokenId) {
    const signer = this.crystals.connect(this.library.getSigner());
    return signer.refocusCrystal(tokenId);
  }

  async claimCrystalMana(tokenId) {
    const signer = this.crystals.connect(this.library.getSigner());
    return signer.claimCrystalMana(tokenId);
  }

  async getRegisteredCrystal(bagId) {
    return this.crystals.getRegisteredCrystal(bagId);
  }

  async multiClaimCrystalMana(tokenIds) {
    const signer = this.crystals.connect(this.library.getSigner());
    return signer.multiClaimCrystalMana(tokenIds);
  }

  async multiRefocusCrystal(tokenIds) {
    const signer = this.crystals.connect(this.library.getSigner());
    return signer.multiRefocusCrystal(tokenIds);
  }

  async numberOfCrystalsInWallet(address) {
    const crystalCount = await this.crystals.balanceOf(address);

    return crystalCount;
  }

  async firstMint(address, bagId) {
    const signer = await this.crystals.connect(this.library.getSigner());

    return signer.firstMint(bagId, {
      from: address,
      value: '40000000000000000',
    });
    // return signer.firstMint(bagId, { from: address, gas: 3000000, value: 100 })
  }

  async mint(bagId) {
    const signer = await this.crystals.connect(this.library.getSigner());

    return signer.mintCrystal(bagId);
  }

  async crystalIdsInWallet(address) {
    const numberOfCrystals = await this.numberOfCrystalsInWallet(address);
    const crystalsIds = [];
    const tasks = [];
    for (let i = 0; i < numberOfCrystals; i++) {
      tasks.push(this.crystals.tokenOfOwnerByIndex(address, i));
    }

    const data = await Promise.all(tasks);

    data.forEach((crystalIdBn) => {
      crystalsIds.push(crystalIdBn.toString());
    });

    return crystalsIds;
  }

  async sacrificeAndMint(tokenId, bagId) {
    const signer = this.crystals.connect(this.library.getSigner());
    return signer.sacrificeAndMint(tokenId, bagId);
  }
}

export default Crystals;
