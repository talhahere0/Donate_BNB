import { useState } from 'react'
import toast from 'react-hot-toast'
import { ethers } from 'ethers'
import { ImSpinner7 } from 'react-icons/im'
import { useForm } from 'react-hook-form'

interface FormData {
  fullName: string
  message: string
}

const Donate = ({ state }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>()
  const { contract } = state
  const [fullName, setName] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = async (e) => {
    try {
      const donationAmount = { value: ethers.utils.parseEther('0.0001') }
      await contract.donate(fullName, message, donationAmount)
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white max-w-xl mx-auto rounded-md p-4 sm:p-8 space-y-8 shadow-lg "
      >
        <h3 className="text-2xl font-semibold text-center">
          Feel Free To Donate
        </h3>
        <div>
          <label
            htmlFor="fullName"
            className="block mb-2 text-gray-400 text-sm"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            onChange={(e) => setName(e.target.value)}
            value={fullName}
            // {...register('fullName', {
            //   required: {
            //     value: true,
            //     message: 'Full Name is required',
            //   },
            // })}
            className={`block ring-2 ring-gray-300 focus:ring-brand-3 focus:outline-none rounded w-full p-2 ${
              errors.fullName ? 'ring-red-400 focus:ring-red-400' : ''
            }`}
          />
          {errors.fullName?.type === 'required' && (
            <p className="text-red-400 mt-2 font-light">
              {errors.fullName.message}
            </p>
          )}

          <label
            htmlFor="message"
            className="block mt-4 mb-2 text-gray-400 text-sm"
          >
            Message
          </label>
          <input
            type="text"
            id="message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            // {...register('message', {
            //   required: {
            //     value: true,
            //     message: 'Message is required',
            //   },
            // })}
            className={`block ring-2 ring-gray-300 focus:ring-brand-3 focus:outline-none rounded w-full p-2 ${
              errors.message ? 'ring-red-400 focus:ring-red-400' : ''
            }`}
          />

          {errors.message?.type === 'required' && (
            <p className="text-red-400 mt-2 font-light">
              {errors.message.message}
            </p>
          )}
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
