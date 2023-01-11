import { useEffect, useState } from "react";
import { ethers } from "ethers";
import DonateEthABI from "../web3/abis/DonateEth.json";
import { SmartContract } from "../web3/addresses/contracts.ts";
import Donate from "../components/Donate";

export default function Home() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          SmartContract,
          DonateEthABI,
          signer
        );
        setState({ provider, signer, contract });
      }
    };
    connectWallet();
  }, []);
  console.log(state);
  return (
    <div>
      <Donate state={state} />
    </div>
  );
}
