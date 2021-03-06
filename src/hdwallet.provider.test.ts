import Ganache from "ganache-core";
import assert from "assert";
import Web3 from "web3";
import HDWalletProvider from "./";

const MNEMONIC = "toy junior around syrup kiwi vast echo joke cross vote animal soup";
const PORT = 8646;

describe("HD Wallet Provider", () => {
  let server: any;
  let provider: HDWalletProvider;
  let second: string;
  let web3: Web3;

  before(done => {
    server = Ganache.server({
      port: PORT,
      mnemonic: MNEMONIC,
      network_id: 4
    });
    server.listen(PORT, async () => {
      provider = HDWalletProvider.mnemonic({
        mnemonic: MNEMONIC,
        rpc: `http://localhost:${PORT}`,
        numberOfAccounts: 2
      });
      second = (await provider.getAddresses())[1];
      web3 = new Web3(provider);
      done();
    });
  });

  after(async () => {
    provider.engine.stop();
    setTimeout(() => {
      server.close();
    }, 100);
  });

  it("provide block number", async () => {
    const blockNumber = await web3.eth.getBlockNumber();
    assert(blockNumber === 0);
  });

  it("sign message", async () => {
    const account = (await web3.eth.getAccounts())[0];
    const signature = await web3.eth.sign("0xdeadbeaf", account);
    assert.strictEqual(
      signature,
      "0xb9d7007683c71806dd0341c66b0392ef6294233fdc4ebb1c05069db9d513873f4cc47fdb28c50fe194f1f623731d75c457108e8882ee2a153f8f5bcef564fe231c"
    );
  });

  it("provide accounts", async () => {
    const actual = await web3.eth.getAccounts();
    const expected = ["0x26D1b581c536217f7B58E5c5D34959d99d017Be6", "0xD9DB3d0DB7413820AFc11FFb0E27f8a113dddDE7"];
    assert.deepStrictEqual(expected, actual);
  });
});
