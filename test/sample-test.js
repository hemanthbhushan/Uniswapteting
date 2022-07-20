const { inputToConfig } = require("@ethereum-waffle/compiler");
const { getSigners } = require("@nomiclabs/hardhat-ethers/dist/src/helpers");
const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");
const { getContractFactory } = require("hardhat/types");

describe("test for pair ",()=>{
    let Pair;
    let pair;
    let Factory;
    let factory2;
    let owner;
    let feeToSetter1;
    let signer1;
    let signer2;
    let tokenA;
    let tokenB;
    
    beforeEach(async ()=>{
        [owner,feeToSetter1,signer1,signer2,tokenA,tokenB] =await ethers.getSigners();
        Factory = await ethers.getContractFactory("UniswapV2Factory");
        factory2 = await Factory.deploy(feeToSetter1.address);
        Pair = await ethers.getContractFactory("UniswapV2Pair",factory2.address);
        pair = await Pair.deploy();
        })
    describe("checking constructor",()=>{
        
        it("check feeToSetter",async ()=>{
            const fee = await factory2.feeToSetter();
           expect(fee).to.be.equal(feeToSetter1.address);
        })
        it(" check factory address in pair",async ()=>{
            const factory1 =  await pair.factory();
            expect(factory1).to.equal(owner.address);

        })

    })
     describe("check fee to",()=>{
//         describe("if require condition sastified",()=>{
//             it("check",async()=>{
//                 await factory2.connect(feeToSetter1).setFeeTo(signer1.address);
//                 expect(await factory2.feeTO()).to.equal(signer1.address);
//  })
        
        // })
        describe("if require condition not sastified",()=>{
            it("check", ()=>{
                    expect(factory2.setFeeTo(signer1.address)).to.be.revertedWith("UniswapV2: FORBIDDEN");
            })
        })
    })
    describe("check setFeeToSetter",()=>{
        describe("if it sastifies the require",()=>{
            it("check",async ()=>{
                await factory2.connect(feeToSetter1).setFeeToSetter(signer1.address);
                expect(await factory2.feeToSetter()).to.equal(signer1.address);

            })
        })
        describe("if it is not sastifies the require",()=>{
            it("check",async ()=>{
                expect(factory2.setFeeToSetter(signer1.address)).to.be.revertedWith("UniswapV2: FORBIDDEN");

            })
        })

    })
    describe("check createPair",()=>{
        describe("if the require condition sastified",()=>{
            it("check",async()=>{
              const createPair =   await factory2.createPair(tokenA.address,tokenB.address);
              const pairAddress = await factory2.getPair(tokenA.address,tokenB.address);

              console.log("pair address",pairAddress);

              pair = await Pair.attach(pairAddress);

              const pairToken0 = await pair.token0();
              const pairToken1 = await pair.token1();

              expect(pairToken0).to.equal(tokenA.address);
              expect(pairToken1).to.equal(tokenB.address);

              const length = await factory2.allPairsLength();
              expect(length).to.equal(1);
            })

        })
        describe("if the require condition not sastified",()=>{
            it("check",()=>{
                expect(factory2.connect(owner).createPair(tokenA.address,tokenA.address)).to.be.revertedWith("UniswapV2: IDENTICAL_ADDRESSES");
                expect(pair.initialize(tokenA.address,tokenB.address)).to.be.revertedWith('UniswapV2: FORBIDDEN');
            })
        })
       
     })
    
    })    
    
     

