import { useForm, useFieldArray, } from 'react-hook-form'

import { DevTool } from "@hookform/devtools"



type formValue = {
  username: string,
  email: string,
  channel: string,
  social: {
    twitter: string,
    facebook: string
  },
  phoneNumbers: string[];
  phNumbers: {
    number: string
  }[],
  age: number,
  dob: Date,
}

const Youtubeform = () => {

  const form = useForm<formValue>({
    // defaultValues: async () => {
    //   const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    //   const data = await response.json();
    //   return {
    //     username: "Batman",
    //     email: data.email,
    //     channel: ""
    //   }
    // }
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: ""
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
      age: 0,
      dob: new Date(),
    },
    mode: "onBlur"
  });
  const { register, control, handleSubmit, formState, getValues, reset, trigger } = form;
  const { errors, isDirty, isValid, isSubmitting, isSubmitted, isSubmitSuccessful, submitCount } = formState
  // const {name,ref,onChange,onBlur} = register("username");

  // console.log({ isDirty, isValid })  
  console.log({ isSubmitting, isSubmitted, isSubmitSuccessful, submitCount })

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control
  })





  const onSumbit = (data: formValue) => {
    console.log('Form Submit Successfully ', data)
  }

  const handlegetValues = () => {
    console.log("Get Values", getValues());
  }

  //const watchForm = watch();
  {/* <h2>Watched value : {JSON.stringify(watchForm)}</h2> */ }
  return (

    <div className="bg-gray-200 w-[500px] border-2 rounded  p-4">
      <form onSubmit={handleSubmit(onSumbit)} noValidate>
        <div className=' p-1 flex flex-col'>
          <label htmlFor="username" className="font-bold text-sm">Username</label>
          <input type="text" id="username" {...register("username", {
            required: {
              value: true,
              message: 'User Name is Required'
            }
          })} className="p-2 mt-1 border-2 border-green-600 rounded-md text-sm font-medium font-sans" />

          <p className='text-sm font-bold p-1 text-red-700'>{errors.username?.message}</p>
        </div>
        <div className=' p-1 flex flex-col'>
          <label htmlFor="email" className="font-bold text-sm ">Email</label>
          <input type="text" id="email" {...register("email", {
            pattern: {
              value: /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/,
              message: "Invalid Pattern"
            },
            validate: {
              notAdmin: (fieldValue) => {
                return (
                  fieldValue !== "admin@gmail.com" || "Enter a different email address"
                )
              },
              notBlackListed: (fieldValue) => {
                return (
                  !fieldValue.endsWith("baddomain.com") || "This domain is not supported"
                )
              }
            },
          })} className="p-2 mt-1  border-2 border-green-600 rounded-md  text-sm font-medium font-sans" />
          <p className='text-sm font-bold p-1 text-red-700'>{errors.email?.message}</p>
        </div>



        <div className='p-1 flex flex-col'>
          <label htmlFor="channel" className="font-bold text-sm">Channel</label>
          <input type="text" id="channel" {...register("channel", {
            required: {
              value: true,
              message: "Channel name is required"
            }
          })} className="p-2 mt-1  border-2 border-green-600 rounded-md  text-sm font-medium font-sans" />
          <p className='text-sm font-bold p-1 text-red-700'>{errors.channel?.message}</p>
        </div>


        <div className=' p-1 flex flex-col'>
          <label htmlFor="twitter" className="font-bold text-sm">Twitter</label>
          <input type="text" id="twitter" {...register("social.twitter", {
            required: {
              value: true,
              message: "Twitter accont is required"
            }
          })} className="p-2 mt-1 mb-2  border-2 border-green-600 rounded-md  text-sm font-medium font-sans" />
          <p className='text-sm font-bold p-1 text-red-700'>{errors.social?.twitter?.message}</p>
        </div>



        <div className=' p-1 flex flex-col'>
          <label htmlFor="facebook" className="font-bold text-sm">facebook</label>
          <input type="text" id="facebook" {...register("social.facebook", {
            required: {
              value: true,
              message: "Facebook account is required"
            }
          })} className="p-2 mt-1 mb-2  border-2 border-green-600 rounded-md  text-sm font-medium font-sans" />
          <p className='text-sm font-bold p-1 text-red-700'>{errors.social?.facebook?.message}</p>

        </div>


        <div className=' p-1 flex flex-col'>
          <label htmlFor="primaryphonenumber" className="font-bold text-sm">Primary-Phone Number</label>
          <input type="text" id="phonenumber" className="p-2 mt-1 mb-2  border-2 border-green-600 rounded-md  text-sm font-medium font-sans" {...register("phoneNumbers.0", {
            required: {
              value: true,
              message: "Primary Number is Required"
            }
          })} />
          <p className='text-sm font-bold p-1 text-red-700'>{errors.phoneNumbers?.[0]?.message}</p>
        </div>





        <div className=' p-1 flex flex-col'>
          <label htmlFor="secondaryphonenumber" className="font-bold text-sm">Secondary-Phone Number</label>
          <input type="text" id="secphonenumber" className="p-2 mt-1 mb-2  border-2 border-green-600 rounded-md  text-sm font-medium font-sans" {...register("phoneNumbers.1", {
            required: {
              value: true,
              message: "Secondary Number is Required"
            }
          })} />
          <p className='text-sm font-bold p-1 text-red-700'>{errors.phoneNumbers?.[1]?.message}</p>

        </div>
        <div className=' p-1 flex flex-col'>
          <label className="font-bold text-sm">List of numbers</label>
          <div >
            {fields.map((field, index) => {
              return (
                <div key={field.id} className='flex'>
                  <input type="text"
                    {...register(`phNumbers.${index}.number` as const)} className="p-2 mt-1 mb-2  border-2 border-green-600 rounded-md  text-sm font-medium font-sans" />
                  {
                    index > 0 && (
                      <button type='button' onClick={() => remove(index)} className=" p-2 border-2 border-red-500 rounded-md  bg-green-300 font-serif text-sm font-bold">
                        Remove </button>
                    )
                  }
                </div>
              )
            })
            }
          </div>
        </div>
        <button type='button' onClick={() => append({ number: "" })} className=" p-4 border-2 border-red-500 rounded-md  bg-green-300 font-serif text-sm font-bold">
          Add Phone Number</button>


        <div className='p-1 flex flex-col'>
          <label htmlFor="age" className="font-bold text-sm">Age</label>
          <input type="number" id="age" {...register("age", {
            valueAsNumber: true,
            required: {
              value: true,
              message: "Age name is required"
            }
          })} className="p-2 mt-1  border-2 border-green-600 rounded-md  text-sm font-medium font-sans" />
          <p className='text-sm font-bold p-1 text-red-700'>{errors.age?.message}</p>
        </div>

        <div className='p-1 flex flex-col'>
          <label htmlFor="date" className="font-bold text-sm">Age</label>
          <input type="date" id="date" {...register("dob", {
            valueAsDate: true,
            required: {
              value: true,
              message: "Date name is required"
            }
          })} className="p-2 mt-1  border-2 border-green-600 rounded-md  text-sm font-medium font-sans" />
          <p className='text-sm font-bold p-1 text-red-700'>{errors.dob?.message}</p>
        </div>



        <div className=' flex justify-center items-center '>
          <button
            className=" p-4 border-2 border-red-500 rounded-md  bg-green-300 font-serif text-sm font-bold" disabled={!isDirty || !isValid}>
            Submit
          </button>
        </div>
        <div className=' flex justify-center items-center '>
          <button
            onClick={handlegetValues} className=" p-4 border-2 border-red-500 rounded-md  bg-green-300 font-serif text-sm font-bold">
            Get Values
          </button>
        </div>

        <div className=' flex justify-center items-center '>
          <button
            onClick={() => reset()} className=" p-4 border-2 border-red-500 rounded-md  bg-green-300 font-serif text-sm font-bold">
            Reset
          </button>
        </div>

        <div className=' flex justify-center items-center '>
          <button
            onClick={() => trigger("channel")} className=" p-4 border-2 border-red-500 rounded-md  bg-green-300 font-serif text-sm font-bold">
            trigger
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default Youtubeform;
