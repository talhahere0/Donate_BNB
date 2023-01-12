import { useEffect, useState } from "react";
import { ethers } from "ethers";
import DonateBnbABI from "../web3/abis/DonateBnb.json";
import { SmartContract } from "../web3/addresses/contracts.ts";
import Donate from "../components/Donate";
import GetDonations from "../components/Get.Donations";

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
          DonateBnbABI,
          signer
        );
        setState({ provider, signer, contract });
      }
    };
    connectWallet();
  }, []);

  return (
    <div>
      <Donate state={state} />
      <GetDonations state={state} />
    </div>
  );
}
