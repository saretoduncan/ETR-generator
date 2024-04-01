import { useEffect, useRef, useState } from "react";
import { TErpInput } from "../types/Types";
import QRCode from "react-qr-code";
import ReactToPrint from "react-to-print";
type EtrProps = {
  erpInputs: TErpInput | null;
};
const Etr: React.FC<EtrProps> = ({ erpInputs }) => {
  const componentRef = useRef(null);
  const [vatAmt, setVatAmount] = useState("0.00");
  const [totalAmount, setTotalAmount] = useState("0.00");
  const [Subtotal, setSubtotal] = useState("0.00");
  const handleTotal = () => {
    let sum: number = 0.0;
    erpInputs?.items.forEach((item) => {
      sum += parseFloat(item.price) * parseFloat(item.quantity);
    });
    return sum;
  };
  useEffect(() => {
    if (erpInputs !== null) {
      setTotalAmount(() => handleTotal().toFixed(2));
      setVatAmount(() =>
        ((erpInputs.taxPercentage / 100) * handleTotal()).toFixed(2)
      );
      setSubtotal(() =>
        (
          handleTotal() -
          (erpInputs.taxPercentage / 100) * handleTotal()
        ).toFixed(2)
      );
    }
  }, [erpInputs]);

  return (
    <>

      <div
        className="font-mono md:w-[80mm]  mx-auto  bg-white py-2 text-sm mt-2"
        ref={componentRef}
      >
        <div className="text-center">
          <p>{erpInputs?.businessName}</p>
          <p>{erpInputs?.businessAddress}</p>
          <p>{erpInputs?.city}</p>
          <p>Tel: {erpInputs?.telephone}</p>
          <p>Pin: {erpInputs?.businessPin}</p>
          <strong>TAX INVOICE </strong>
          <br />
          <strong>ORIGINAL</strong>
        </div>

        <table className="table-auto w-full border-y-2 border-dotted">
          <thead>
            <tr className="text-sm">
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {erpInputs?.items.map((item, index) => (
              <tr className="text-center" key={index}>
                <td>{item.productName}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{(parseFloat(item.price)*parseFloat(item.quantity)).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <div className="grid grid-cols-2 text-center text-sm">
            <p className="">SUB-TOTAL(KSH)</p>
            <p className="">{Subtotal}</p>
          </div>
          <div className="grid grid-cols-2 text-center text-sm">
            <p className="">VAT AMT</p>
            <p className=" ">{vatAmt}</p>
          </div>
          <div className="grid grid-cols-2 text-center text-sm">
            <p className="">EXEMPT AMT</p>
            <p className="">0.00</p>
          </div>
          <div className="grid grid-cols-2 text-center text-sm">
            <p className="">DISCOUNT AMT</p>
            <p className="">0.00</p>
          </div>
          <br />
          <div className="grid grid-cols-2 text-center">
            <p className="text-xl">Total(KSH)</p>
            <p className="text-xl">{totalAmount}</p>
          </div>
          <div className="grid grid-cols-2 text-center text-sm">
            <p className="">PAYMENT MODE:</p>
            <p className="">{erpInputs?.modeOfPayment}</p>
          </div>
        </div>
        <div className="border-y-2 border-dotted grid grid-cols-2 text-center">
          <p>change</p>
          <p>0.00</p>
        </div>
        <div className="px-3 text-sm">
          <p>Prices inclusive of VAT where applicable</p>
          <p>Goods once sold cant be returned</p>
          <br />
          <p>20% charged on returned goods.</p>
          <p>You were served by: admin</p>
        </div>
        <div className="border-y-2 border-dotted px-3 text-sm">
          <div className="flex justify-between">
            <p>Date: {erpInputs?.date}</p>
            <p>time: {erpInputs?.time}</p>
          </div>
          <div>
            <div className="flex justify-center my-1">
              <QRCode value="kraohtper" className="size-[100px]" />
            </div>

            <p>CU invoice no:09474394935</p>
            <p>CU serial no:KRAIH00439435</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <ReactToPrint
          trigger={() => (
            <button className="bg-green-500 px-3 py-2 rounded-md text-white font-bold mt-5">
              Print
            </button>
          )}
          content={() => componentRef.current}
          pageStyle={`@page {size:80mm 200mm; font-size:12px;  }}`}
        />
      </div>
    </>
  );
};

export default Etr;
