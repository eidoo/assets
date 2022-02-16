#!/usr/bin/env bash

echo "Removing checksum..."
node script/eidoo/remove-checksum.js blockchains/avalanchec_mainnet
node script/eidoo/remove-checksum.js blockchains/bsc_mainnet
node script/eidoo/remove-checksum.js blockchains/eth_mainnet
node script/eidoo/remove-checksum.js blockchains/fantom_mainnet
node script/eidoo/remove-checksum.js blockchains/polygon_mainnet
# Please notice: No Solana here! Its assets need to keep the checksum.

echo "Replace assets type..."
node script/eidoo/replace-assets-type.js blockchains/avalanchec_mainnet
node script/eidoo/replace-assets-type.js blockchains/bsc_mainnet
node script/eidoo/replace-assets-type.js blockchains/eth_mainnet
node script/eidoo/replace-assets-type.js blockchains/fantom_mainnet
node script/eidoo/replace-assets-type.js blockchains/polygon_mainnet
node script/eidoo/replace-assets-type.js blockchains/solana_mainnet

echo "Building token lists..."
node script/eidoo/build-token-list.js blockchains/avalanchec_mainnet
node script/eidoo/build-token-list.js blockchains/bsc_mainnet
node script/eidoo/build-token-list.js blockchains/eth_mainnet
node script/eidoo/build-token-list.js blockchains/fantom_mainnet
node script/eidoo/build-token-list.js blockchains/polygon_mainnet
node script/eidoo/build-token-list.js blockchains/solana_mainnet

echo "Done!"
