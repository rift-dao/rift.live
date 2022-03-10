const envconfig = {
  // Contract addresses
  addresses: {
    ropsten: {
      crystals: '0x93625D926BAd2C91E95E09D289b33204379CA757',
      crystalsMetadata: '0xd38828463276d66d29a3f08fa0156b586dc7067d',
      gLoot: '0x160016f0785829080ab51e844b7e8eeab2c270ee',
      loot: '0x841e03065558AeE39D6Cb2F751DB964f80E95EE3',
      mana: '0x19882f7910407634da3fc8bff6483715a320feef',
      mLoot: '0x841e03065558AeE39D6Cb2F751DB964f80E95EE3',
      rift: '0xf0CdC112A01AA657a6283fe9B61BC2eD0869c0f1',
      riftData: '0xa1604ced1d0dbae35f84ac4ec1da64cc222c1570',
    },
    mainnet: {
      crystals: '0x3051162ED7DeF8Af730Aaf4C7cB8a10Ee19b8303',
      crystalsMetadata: '0xc7df8711812013330635566b513a44b3c7b427fb',
      gLoot: '0x8dB687aCEb92c66f013e1D614137238Cc698fEdb',
      loot: '0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7',
      mana: '0xefefe7bda162647c1447e12b10c75b977618d2b2',
      mLoot: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
      rift: '0x290a1a360f64758d1b46f994e541ac9b7ae5c830',
      riftData: '0x632678bba8a4dd16255f164e9d74853bea9856e7',
    },
  },

  // @web3-react connectors for activate()
  connectors: {},

  // api keys for chain read/write
  keys: {
    alchemy: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    infura: process.env.NEXT_PUBLIC_INFURA_API_KEY,
  },

  // chain read/write services; alchemy, infura, etc.
  apis: {},

  // https://besu.hyperledger.org/en/stable/Concepts/NetworkID-And-ChainID/
  supportedChainIds: [1, 2, 3, 4, 5, 1337, 31337],
  defaultNetwork: 'mainnet',
};

envconfig.apis = {
  alchemy: `https://eth-{NETWORK}.alchemyapi.io/v2/{KEY}`,
  infura: `https://{NETWORK}.infura.io/v3/{KEY}`,
};

envconfig.getAddress = (contract, network = envconfig.defaultNetwork) =>
  envconfig.addresses[network][contract];

envconfig.getApi = (
  service = 'alchemy',
  network = envconfig.defaultNetwork,
) => {
  const key = envconfig.keys[service] || envconfig.keys.alchemy;
  const api = envconfig.apis[service] || envconfig.apis.alchemy;
  return api.replace('{NETWORK}', network).replace('{KEY}', key);
};

// get "random" network for API calls
envconfig.getRandomApi = (network = envconfig.defaultNetwork) => {
  const apiIndex = Math.floor(
    Math.random() * Object.keys(envconfig.apis).length,
  );

  const service = Object.keys(envconfig.apis)[apiIndex];

  console.log('service', service);

  return {
    url: envconfig.getApi(service, network),
    pollingInterval: 120000,
    timeout: 120000,
  };
};

envconfig.connectors = {
  walletConnect: {
    supportedChainIds: envconfig.supportedChainIds,
    qrcode: true,
    pollingInterval: 120000,
  },
  injected: { supportedChainIds: envconfig.supportedChainIds },
};

export default envconfig;
