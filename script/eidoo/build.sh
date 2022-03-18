#!/usr/bin/env bash

echo "Removing checksums..."
node script/eidoo/remove-checksum.js blockchains_source/avalanchec_mainnet
node script/eidoo/remove-checksum.js blockchains_source/bsc_mainnet
node script/eidoo/remove-checksum.js blockchains_source/eth_mainnet
node script/eidoo/remove-checksum.js blockchains_source/fantom_mainnet
node script/eidoo/remove-checksum.js blockchains_source/polygon_mainnet
# Please notice: No Solana here! Its assets need to keep the checksum.

echo "Replacing assets type..."
node script/eidoo/replace-assets-type.js blockchains_source/avalanchec_mainnet
node script/eidoo/replace-assets-type.js blockchains_source/bsc_mainnet
node script/eidoo/replace-assets-type.js blockchains_source/eth_mainnet
node script/eidoo/replace-assets-type.js blockchains_source/fantom_mainnet
node script/eidoo/replace-assets-type.js blockchains_source/polygon_mainnet
node script/eidoo/replace-assets-type.js blockchains_source/solana_mainnet

echo "Building token lists..."
node script/eidoo/build-token-list.js blockchains_source/avalanchec_mainnet
node script/eidoo/build-token-list.js blockchains_source/bsc_mainnet
node script/eidoo/build-token-list.js blockchains_source/eth_mainnet
node script/eidoo/build-token-list.js blockchains_source/fantom_mainnet
node script/eidoo/build-token-list.js blockchains_source/polygon_mainnet
node script/eidoo/build-token-list.js blockchains_source/solana_mainnet

echo "Copying everything in 'blockchains' folder..."
node script/eidoo/copy-to-blockchains.js

echo "Done!"
