/* eslint-disable @typescript-eslint/no-explicit-any */
import { Blob as ZgBlob, getFlowContract, Indexer } from "./zgstorage.esm.js";
import { ethers } from 'ethers';
import { STORAGE_CONFIG } from '../data/0gConfig';


export type UploadFileResponse = {
    tx: string;
    rootHash: string;
}

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

    async uploadFile(file: File): Promise<UploadFileResponse> {
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
            return {
                tx,
                rootHash: tree?.rootHash()
            }            
        } catch (error) {
            console.error("Upload failed:", error);
            throw error;
        }
    }

    async downloadFile(rootHash: string, fileName: string): Promise<void> {
        await this.initialize();
        try {
            const downloadResult = await this.indexer.downloadBrowser(rootHash, true);
            
            if (downloadResult instanceof Error) {
                throw new Error(`Download error: ${downloadResult.message}`);
            }
            if(downloadResult instanceof Uint8Array) {
                console.log("Download successful");
                // Create blob and trigger download
                const blob = new Blob([downloadResult], { type: 'application/octet-stream' });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = fileName;

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            }
            // console.log("Download result:", downloadResult)
            
        } catch (error) {
            console.error("Download failed:", error);
            throw error;
        }
    }
}