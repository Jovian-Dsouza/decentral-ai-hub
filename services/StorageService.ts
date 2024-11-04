/* eslint-disable @typescript-eslint/no-explicit-any */
import { Blob as ZgBlob, getFlowContract, Indexer } from "./zgstorage.esm.js";
import { ethers } from 'ethers';
import { STORAGE_CONFIG } from '../data/0gConfig';

export class StorageService {

    private flowContract: any;
    private indexer: Indexer;
    private initialized: boolean = false;

    constructor() {
        this.indexer = new Indexer(STORAGE_CONFIG.indexerRpc);
    }

    async initialize() {
        if (this.initialized) {
            return;
        }
        try {
             if (!window.ethereum) {
                throw new Error("MetaMask is not installed");
            }
            const provider = new ethers.BrowserProvider(window.ethereum);
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const signer = await provider.getSigner();
            this.flowContract = getFlowContract(STORAGE_CONFIG.flowAddresses.standard, signer);
            this.indexer = new Indexer(STORAGE_CONFIG.indexerRpc);
            this.initialized = true;
        } catch (error) {
            throw new Error(`Failed to connect to MetaMask: ${error}`);
        }
    }

    async uploadFile(file: File): Promise<void> {
        await this.initialize();
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
        await this.initialize();
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