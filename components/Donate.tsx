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
  } = useForm<FormData>({
    values: {
      fullName: '',
      message: '',
    },
  })
  const { contract } = state
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const donationAmount = { value: ethers.utils.parseEther('0.0001') }
      const tx = await contract.donate(
        data.fullName,
        data.message,
        donationAmount
      )
      await tx.wait()
      setLoading(false)
      toast.success('Transaction successful!')
      reset()
    } catch (err) {
      console.log(
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
        <h3 className="text-2xl font-semibold text-center bg-[#FFB100] rounded-md py-1">
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
            {...register('fullName', {
              required: {
                value: true,
                message: 'Full Name is required',
              },
            })}
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
            {...register('message', {
              required: {
                value: true,
                message: 'Message is required',
              },
            })}
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
            type="submit"
            className="bg-[#FFB100] hover:bg-[#FBC252] px-5 rounded-md py-2 inline-flex items-center"
          >
            {loading ? (
              <ImSpinner7 className="animate-spin" />
            ) : (
              <span className="block">Pay</span>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Donate
