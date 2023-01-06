import './App.css';
import { useState } from "react";
import Coupon from './Components/Coupon';
import Alert from './Components/Alert';

function App() {
  const [alert, setAlert] = useState({ status: false, message: "", type: "" });
  const showAlert = (_message, _type) => {
    setAlert({ status: true, message: _message, type: _type });

    //after a few seconds auto close alert box
    setTimeout(() => {
      setAlert({ status: false, message: "", type: "" });
    }, 10000);
  };
  return (
    <>
    {alert.status && <Alert alert={alert} setAlert={setAlert} />}
    <Coupon showAlert={showAlert}/>
    </>
  );
}

export default App;