import { Blob as ZgBlob, getFlowContract, Indexer } from "./zgstorage.esm.js";

import { ethers } from 'ethers';
import { STORAGE_CONFIG } from '../data/0gConfig';

export class StorageService {
    private provider: ethers.JsonRpcProvider;
    private signer: ethers.Wallet;
    private flowContract: any;
    private indexer: Indexer;

    constructor() {
        this.provider = new ethers.JsonRpcProvider(STORAGE_CONFIG.evmRpc);
        this.signer = new ethers.Wallet(STORAGE_CONFIG.privateKey, this.provider);
        this.flowContract = getFlowContract(STORAGE_CONFIG.flowAddresses.standard, this.signer);
        this.indexer = new Indexer(STORAGE_CONFIG.indexerRpc);
    }

    async uploadFile(file: File): Promise<void> {
        try {
            const zgFile = new ZgBlob(file);

            const [tree, treeErr] = await zgFile.merkleTree();
            
            if (treeErr) {
                throw new Error(`Error generating merkle tree: ${treeErr}`);
            }
            
            console.log("File Root Hash:", tree?.rootHash());


            const [tx, uploadErr] = await this.indexer.upload(
                zgFile,
                0,
                STORAGE_CONFIG.evmRpc,
                this.flowContract
            );

            if (uploadErr) {
                throw new Error(`Upload error: ${uploadErr}`);
            }

            console.log("Upload successful. Transaction:", tx);            
        } catch (error) {
            console.error("Upload failed:", error);
            throw error;
        }
    }

    async downloadFile(rootHash: string, outputPath: string): Promise<void> {
        try {
            const err = await this.indexer.download(rootHash, outputPath, true);
            
            if (err) {
                throw new Error(`Download error: ${err}`);
            }
            
            console.log("Download successful");
            
        } catch (error) {
            console.error("Download failed:", error);
            throw error;
        }
    }
}