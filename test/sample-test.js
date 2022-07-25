const { ethers } = require("hardhat");

describe("Testing", () => {
    let owner, factory, router, tokenA, tokenB, wETH;

    beforeEach(async () => {
        [owner] = await ethers.getSigners();
        amountA = 1000;
        amountB = 10000;

        const TokenA = await ethers.getContractFactory("TokenA");
        const TokenB = await ethers.getContractFactory("TokenB");
        const WETH = await ethers.getContractFactory("WETH");
        const Factory = await ethers.getContractFactory("UniswapV2Factory");

        factory = await Factory.deploy(owner.address);
        await factory.deployed();
        tokenA = await TokenA.deploy();
        await tokenA.deployed();
        tokenB = await TokenB.deploy();
        await tokenB.deployed();
        wETH = await WETH.deploy();
        await wETH.deployed();

        await factory.createPair(tokenA.address, tokenB.address);

        const Router = await ethers.getContractFactory("UniswapV2Router02");
        router = await Router.deploy(factory.address, wETH.address);
        await router.deployed();

        await tokenA.approve(router.address, amountA);
        await tokenB.approve(router.address, amountB);
    });

    it("Testing", async () => {
        // Min amount must be 10000 tokens each

        await tokenA.approve(router.address, 10000);
        await tokenB.approve(router.address, 10000);
        await router.addLiquidity(
            tokenA.address,
            tokenB.address,
            10000,
            10000,
            9,
            9,
            owner.address,
            1658666362
        );
    });
});
