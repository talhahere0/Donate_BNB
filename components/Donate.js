import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { ethers } from "ethers";

const Donate = ({ state }) => {
  const { contract } = state;
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const getdonation = "";

  const handleChange = async (e) => {
    e.preventDefault();
    const donationAmount = { value: ethers.utils.parseEther("0.0001") };
    const transaction = await contract.donate(name, message, donationAmount);
    setName("");
    setMessage("");
    toast.success("Transaction successful!");
  };
  return (
    <div>
      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Enter name"
      />
      <input
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="Enter message"
      />
      <button onClick={handleChange}>Donate</button>
    </div>
  );
};

export default Donate;
