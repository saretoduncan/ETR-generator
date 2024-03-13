import { useState } from "react";
import { Etr } from "./etr";
import { EtrForm } from "./etrForm";
import { TErpInput } from "./types/Types";

function App() {
  const [etrData, setEtrData] = useState<TErpInput | null>(null);
  const handleSetEtrData = (data: TErpInput) => {
    setEtrData(() => data);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-center font-bold">ETR GENERATOR</h1>
      <div className="grid lg:grid-cols-2 md:gap-8 ">
        <div className=" lg:justify-self-end">
          <EtrForm getFormData={handleSetEtrData} />
        </div>
        <div className="lg:justify-self-start">
          <Etr erpInputs={etrData} />
        </div>
      </div>
    </div>
  );
}

export default App;
