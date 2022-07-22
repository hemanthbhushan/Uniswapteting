const { inputToConfig } = require("@ethereum-waffle/compiler");
const { getSigners } = require("@nomiclabs/hardhat-ethers/dist/src/helpers");
const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");
const { getContractFactory } = require("hardhat/types");
describe("testing",()=>{
    let Pair;
    let pair;
    let Factory;
    let factory2;
    let test;
    let owner;
    let signer1;
    let signer2;
    let tokenA;
    let tokenB;
    let Router;
    let router;
    let WETH;
    let TokenA;
    let TokenB;
    let wETH;


    beforeEach(async ()=>{
        [owner,signer1,signer2,tokenA,tokenB,test] = await ethers.getSigners();

        TokenA = await ethers.getContractFactory("TokenA");
        tokenA = await TokenA.deploy();

        TokenB = await ethers.getContractFactory("TokenB");
        tokenB = await TokenB.deploy();

        Factory = await ethers.getContractFactory("UniswapV2Factory");
        factory2 = await Factory.deploy(signer1.address);

        Pair = await ethers.getContractFactory("UniswapV2Pair",factory2.address);
        pair = await Pair.deploy();
        
        WETH = await ethers.getContractFactory("WETH");
        wETH = await WETH.deploy();

        Router = await ethers.getContractFactory("UniswapV2Router02");
        router = await Router.deploy(factory2.address,wETH.address);

        await  tokenA.mintToken(signer2.address,10000000);
        await  tokenB.mintToken(signer2.address,100000);
    })
    describe("liquidity",()=>{
        it("checking",async()=>{
           const quidityFunction = await router.connect(signer2).addLiquidity(tokenA.address,tokenB.address,1000,1000,900,900,signer2.address,1658691676);   
        //     console.log("tokenaddress",tokenA.address);
        //     console.log("factory address",factory2.address);
        //     console.log("eth address",wETH.address);
        }); 
    })

});