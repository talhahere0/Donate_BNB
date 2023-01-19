import { useState } from 'react'
import toast from 'react-hot-toast'
import { ethers } from 'ethers'
import { ImSpinner7 } from 'react-icons/im'
import { useForm } from 'react-hook-form'

const Donate = ({ state }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    // electionName: '',
  })
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
    <div className="bg-gray-100 h-[900px]">
      {/* <input
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
      <button className="text-red-600" onClick={handleChange}>
        Donate
      </button> */}

      <form
        // onSubmit={handleSubmit(onSubmit)}
        className="bg-white max-w-xl mx-auto rounded-md p-4 sm:p-8 space-y-8 shadow-lg "
      >
        <h3 className="text-2xl font-semibold text-center">
          Feel Free To Donate
        </h3>
        <div>
          <label
            htmlFor="electionName"
            className="block mb-2 text-gray-400 text-sm"
          >
            Full Name
          </label>
          <input
            type="text"
            id="electionName"
            // {...register('electionName', {
            //   required: {
            //     value: true,
            //     message: 'Election Name is required',
            //   },
            // })}
            className={`block ring-2 ring-gray-300 focus:ring-brand-3 focus:outline-none rounded w-full p-2 ${
              errors.electionName ? 'ring-red-400 focus:ring-red-400' : ''
            }`}
          />

          <label
            htmlFor="electionName"
            className="block mt-4 mb-2 text-gray-400 text-sm"
          >
            Message
          </label>
          <input
            type="text"
            id="electionName"
            // {...register('electionName', {
            //   required: {
            //     value: true,
            //     message: 'Election Name is required',
            //   },
            // })}
            className={`block ring-2 ring-gray-300 focus:ring-brand-3 focus:outline-none rounded w-full h-[130px] p-2 ${
              errors.electionName ? 'ring-red-400 focus:ring-red-400' : ''
            }`}
          />

          {/* {errors.electionName?.type === 'required' && (
            <p className="text-red-400 mt-2 font-light">
              {errors.electionName.message}
            </p>
          )} */}
        </div>

        <div className="text-right">
          <button
            // ref={submitBtnRef}
            type="submit"
            className="btn-primary inline-flex items-center group"
          >
            <span className="block group-disabled:hidden">Pay</span>
            <ImSpinner7 className="ml-2 animate-spin hidden group-disabled:block" />
          </button>
        </div>
      </form>
    </div>
  )
}

export default Donate
