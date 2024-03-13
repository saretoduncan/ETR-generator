import { useEffect } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

type ErpInput = {
  businessName: string;
  businessAddress: string;
  city: string;
  businessPin: string;
  telephone: string;
  date: string;
  time: string;
  currency: string;
  taxType: string;
  taxPercentage: number;
  modeOfPayment: string;
  items: ItemType[];
};
type ItemType = {
  quantity: string;
  productName: string;
  price: string;
};

const EtrForm = () => {
  const { register, handleSubmit,  control } = useForm<ErpInput>({
    defaultValues: {
      businessAddress: "",
      businessName: "",
      businessPin: "",
      city: "",
      currency: "",
      date: "",
      items: [{ price: "", productName: "", quantity: "" }],
      modeOfPayment: "",
      taxPercentage: 0,
      taxType: "",
      telephone: "",
      time: "",
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "items",
    control,
  });
  const onSubmit: SubmitHandler<ErpInput> = (e) => {
    console.log(e);
  };

  return (
    <>
      <form
        id="etrForm"
        className="justify-self-end px-6 md:px-0"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid">
          <label htmlFor="businessName">Business Name</label>
          <input
            type="text"
            id="businessName"
            {...register("businessName")}
            required
            className="outline-none border-gray-100 border-2 focus:border-green-500 rounded-md"
          />
        </div>
        <div className="grid">
          <label htmlFor="businessAddress">Business Address</label>
          <input
            type="text"
            required
            id="businessAddress"
            {...register("businessAddress")}
            className="outline-none border-gray-100 border-2 focus:border-green-500 rounded-md"
          />
        </div>
        <div className="grid">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            className="outline-none border-gray-100 border-2 focus:border-green-500 rounded-md"
          />
        </div>
        <div className="grid">
          <label htmlFor="businessPin">Business pin</label>
          <input
            id="businessPin"
            type="text"
            {...register("businessPin")}
            className="outline-none border-gray-100 border-2 focus:border-green-500 rounded-md"
          />
        </div>
        <div className="grid">
          <label htmlFor="telephone">Phone number</label>
          <input
            id="telephone"
            type="text"
            {...register("telephone")}
            className="outline-none border-gray-100 border-2 focus:border-green-500 rounded-md"
          />
        </div>
        <div className="grid">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            {...register("date")}
            className="outline-none border-gray-100 border-2 focus:border-green-500 rounded-md"
          />
        </div>
        <div className="grid">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            {...register("time")}
            className="outline-none border-gray-100 border-2 focus:border-green-500 rounded-md"
          />
        </div>

        <div className="grid grid-cols-3 gap-1">
          <div className="grid">
            <label htmlFor="currency">curreny</label>
            <select id="currency" {...register("currency")}>
              <option value="KSH">KSH</option>
              <option value="USD">USD</option>
              <option value="EURO">EURO</option>
            </select>
          </div>

          <div className="grid">
            <label htmlFor="taxType">Tax type</label>
            <select {...register("taxType")} id="taxType">
              <option value="VAT">VAT</option>
              <option value="TAX">TAX</option>
              <option value="SALES TAX">SALES TAX</option>
              <option value="SERVICE">SERVICE</option>
            </select>
          </div>
          <div className="grid">
            <label htmlFor="taxPercentage">Tax %</label>
            <input
              id="taxPercentage"
              type="text"
              {...register("taxPercentage")}
              className="outline-none border-gray-100 border-2 focus:border-green-500 rounded-md w-[100px]"
            />
          </div>
        </div>
        <div className="grid">
          <label htmlFor="modeOfPayment">Mode of Payment</label>
          <input
            type="text"
            id="modeOfPayment"
            {...register("modeOfPayment")}
            placeholder="m-pesa, cash, visa etc"
            className="outline-none border-gray-100 border-2 focus:border-green-500 rounded-md"
          />
        </div>
        {fields.map((item, index) => (
          <div className="grid md:grid-cols-4 gap-1" key={item.id}>
            <div className="grid">
              <label htmlFor="quantity">Quantity</label>

              <input
                type="text"
                id="quantity"
                {...register(`items.${index}.quantity`)}
                placeholder="Qty"
                className="outline-none border-gray-100 border-2 focus:border-green-500 rounded-md"
              />
            </div>
            <div className="grid">
              <label htmlFor="productName">Product Name</label>
              <input
                id="productName"
                type="text"
                {...register(`items.${index}.productName`)}
                placeholder="product"
                className="outline-none border-gray-100 border-2 focus:border-green-500 rounded-md"
              />
            </div>
            <div className="grid">
              <label htmlFor="price">Price</label>
              <input
                id="number"
                type="number"
                min="0"
                {...register(`items.${index}.price`)}
                placeholder="0"
                className="outline-none border-gray-100 border-2 focus:border-green-500 rounded-md"
              />
            </div>

            <div className="self-end">
              <button
                className={`${
                  index === 0 ? "bg-green-500" : "bg-red-500"
                } text-white rounded px-3`}
                id="addProduct"
                onClick={(e) => {
                  e.preventDefault();
                  index === 0
                    ? append({ price: "", productName: "", quantity: "" })
                    : remove(index);
                }}
              >
                {index === 0 ? "+" : "-"}
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-center my-2">
          <button
            id="submiter"
            type="submit"
            className="bg-green-500 px-4 py-2 rounded-md text-white font-bold"
          >
            CREATE ETR
          </button>
        </div>
      </form>
    </>
  );
};

export default EtrForm;
