export const STORAGE_CONFIG = {
    // Testnet RPC endpoint
    evmRpc: 'https://evmrpc-testnet.0g.ai/',
    
    privateKey: 'fdabfcb34de0acfc54421d6fd5ffbbf1c0bbd1c99dd76d235fc77a9e499ba94c',
    
    // Flow contract addresses
    flowAddresses: {
        turbo: '0xbD2C3F0E65eDF5582141C35969d66e34629cC768',  // Faster but expensive
        standard: '0x0460aA47b41a66694c0a73f667a1b795A5ED3556' // Slower but cheaper
    },
    
    // Indexer RPC
    indexerRpc: 'https://indexer-storage-testnet-standard.0g.ai',
    
    kvClientAddr: 'http://3.101.147.150:6789'
};