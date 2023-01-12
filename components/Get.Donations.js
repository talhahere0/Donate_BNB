import React, { useEffect, useState } from 'react'

const GetDonations = ({ state }) => {
  const { contract } = state
  const [donations, setDonations] = useState([])
  useEffect(() => {
    const getDonations = async () => {
      const donations = await contract.getDonations()
      setDonations(donations)
    }
    contract && getDonations()
  }, [contract])
  return (
    <div>
      {donations.map((donation, index) => (
        <div key={index}>
          <p>{donation.name}</p>
          <p>{donation.message}</p>
          <p>{donation.donor}</p>
        </div>
      ))}
    </div>
  )
}

export default GetDonations
