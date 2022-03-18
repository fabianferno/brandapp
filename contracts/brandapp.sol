// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
 
import "https://github.com/nibbstack/erc721/blob/master/src/contracts/tokens/nf-token-metadata.sol";
import "https://github.com/nibbstack/erc721/blob/master/src/contracts/ownership/ownable.sol";
 
contract brandNFT is NFTokenMetadata, Ownable {
 
  constructor() {
    nftName = "BrandNFT";
    nftSymbol = "BFT";
  }

  uint256 private _lastTokenId;

  mapping(uint256 => string) private _tokens;

  function mint(address _to, string calldata _uri) external onlyOwner {
    super._mint(_to, _lastTokenId);
    super._setTokenUri(_lastTokenId, _uri);
    _tokens[_lastTokenId]=_uri;
    _lastTokenId++;
  }
   
  function burn(uint256 _tokenId) external onlyOwner
  {
    super._burn(_tokenId);
    _tokens[_tokenId]="NULL";
  }

  function viewAllBrands() external view returns(string[] memory)
  {
    
    string[] memory brands=new string[](_lastTokenId);
    for(uint256 i=0;i<_lastTokenId;i++)
    {
      brands[i]=_tokens[i];                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    }
    return brands;
  }

  function viewBrand(uint256 _tokenId) external view returns(string memory)
  {
    require(_lastTokenId>_tokenId);
    return _tokens[_tokenId];
  }

}