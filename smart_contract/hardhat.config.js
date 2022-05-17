

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity : '0.8.0', // solidity version of smart contract
  networks : {
    rinkeby : {
      url :"https://rinkeby.infura.io/v3/a0ae18e49da24797bdc866783819bbe8", // infura url for the deployment of smart contract
      accounts : ['5891b493c71e777c3d64d82695e379e4738600dfcbce1dc272c6c08e3f094c35'] //private key
    }
  }
}