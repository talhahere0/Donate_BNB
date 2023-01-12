declare const React: any
import { useState } from 'react'
import toast from 'react-hot-toast'
import { ethers } from 'ethers'

const Donate = ({ state }) => {
  const { contract } = state
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const handleChange = async (e) => {
    e.preventDefault()
    try {
      const donationAmount = { value: ethers.utils.parseEther('0.0001') }
      const transaction = await contract.donate(name, message, donationAmount)
      setName('')
      setMessage('')
      toast.success('Transaction successful!')
    } catch (err) {
      toast.error(
        'The owner cannot make a donation, Kindly change the wallet address'
      )
    }
  }
  return (
    <div>
      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        value={name}
        placeholder="Enter name"
      />
      <input
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        value={message}
        placeholder="Enter message"
      />
      <button onClick={handleChange}>Donate</button>
    </div>
  )
}

export default Donate
