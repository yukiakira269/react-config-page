
import React, { useEffect, useState } from 'react';
import ProcessorConfirmModal from '../modal/ConfirmModal';
import styles from './ConfigurationPage.module.css';
import { render } from '@testing-library/react';
import { Spinner } from 'react-bootstrap';
import { triggerInput, loadInputs, INPUTS, debounce, saveData, fetchProcessor } from './ConfigurationPage.utils';
import { DB } from './ConfigurationPage.const';

function ConfigurationPage() {
  const [isLoading, setLoading] = useState(true);
  const [systemName, setSystemName] = useState('');
  const [processor, setProcessor] = useState('');
  const [processorList, setProcessorList] = useState([]);
  const processorsArray: any = [];

  /** Handling auto-rendering when the user switches tabs, provided that the
   * user stays in the same session
   */
  //Loading all form's inputs
  useEffect(() => {
    //Loading auto-saved inputs
    fetchProcessor(processorsArray)
      .then(() => {
        setLoading(false);
        setProcessorList(processorsArray);
        loadInputs();
        if (sessionStorage.length !== 0) {
          INPUTS.forEach((inputElement) => {
            var inputValue = sessionStorage.getItem(inputElement.id);
            if (inputValue !== null) {
              //The Processor select element has been disabled => Using ProcessorRealInput as a hidden form field
              if (inputElement.id === "processorRealInput") {
                triggerInput("processor", inputValue);
                if (inputValue.length !== 0)
                  (document.getElementById("processor") as HTMLSelectElement).disabled = true;
              }
              //Other normal inputs elements
              else {
                triggerInput(inputElement.id, inputValue);
              }
            }
          });
        }
      }).catch(err => console.log(err));
  }, []);
  //Set the processor Name
  function processorSelected() {
    setProcessor((document.getElementById("processor") as HTMLSelectElement).value)
  }
  //Handle autosaving with 500ms delay
  const autosave = debounce(saveData, 500);

  /** Handling iframe communication */
  //Receiving messages (Parent -> Child)
  const messageHandler = (e: MessageEvent) => {
    if (e.origin.startsWith('http://localhost:8000')) {
      triggerInput("systemName", e.data);
      //Remove the EventListener to prevent the listener from being added everytime a new message arrive
      window.removeEventListener('message', messageHandler);
    }
  }
  window.addEventListener('message', messageHandler, false);
  //Set the systemName's state to the value of the form's input
  const iframeCommunicationHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSystemName(event.target.value);
  }
  //Sending message back to the parent whenever the systemName changes
  useEffect(() => {
    //window.parent.postMessage(systemName, 'http://localhost:8000');
  }, [systemName]);


  if (isLoading === true) {
    return <div className="col offset-md-6 mt-5">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  }
  return (
    <div>
      <div className="pt-5">
        <form id="configurationForm" onInput={autosave}>
          <div className="form-group row pt-3" >
            <label className="col-md-2 offset-sm-1 col-form-label"
              htmlFor="systemName">
              System Name:  <span className={styles.required}>*</span>
            </label>
            <div className="col-md-4 offset-sm-1">
              <input className="form-control"
                type="text" id="systemName" name="systemName" required
                onInput={iframeCommunicationHandler}
                value={systemName} />
            </div>
          </div>

          <div className="form-group row pt-3" >
            <label className="col-md-2 offset-sm-1 col-form-label"
              htmlFor="processor">
              Processor: <span className={styles.required}>*</span>
            </label>
            <div className="col-md-4 offset-sm-1">
              <select className={`form-control form-select ${styles.select}`}
                id="processor" name="processor" defaultValue={processor} required onInput={processorSelected}
                onChange={() => { render(<ProcessorConfirmModal processorName={processor} />) }}>
                <option value="">Please select a processor</option>
                {processorList}
              </select>
              <input className="form-control"
                type="hidden" name="processorRealInput" id="processorRealInput" value={processor} />
            </div>
          </div>

          <div className="form-group row pt-3" >
            <label className="col-md-2 offset-sm-1 col-form-label"
              htmlFor="customerName">
              Customer Name:{" "}
            </label>
            <div className="col-md-4 offset-sm-1">
              <input className="form-control"
                type="text" id="customerName" name="customerName" placeholder="Customer Name" />
            </div>
          </div>

          <div className="form-group row pt-3" >
            <label className="col-md-2 offset-sm-1 col-form-label"
              htmlFor="addressLine1">
              Address Line 1:{" "}
            </label>
            <div className="col-md-4 offset-sm-1">
              <input className="form-control"
                type="text" id="addressLine1" name="addressLine1" placeholder="Address Line 1" />
            </div>
          </div>

          <div className="form-group row pt-3" >
            <label className=" col-md-2 offset-sm-1 col-form-label"
              htmlFor="addressLine2">
              Address Line 2:{" "}
            </label>
            <div className="col-md-4 offset-sm-1">
              <input className="form-control"
                type="text" id="addressLine2" name="AddressLine2" placeholder="Address Line 2" />
            </div>
          </div>

          <div className="form-group row pt-3" >
            <label className=" col-md-2 offset-sm-1 col-form-label"
              htmlFor="city">
              City:{" "}
            </label>
            <div className="col-md-4 offset-sm-1">
              <input className="form-control"
                type="text" id="city" name="City" placeholder="City" />
            </div>
          </div>

          <div className="form-group row pt-3" >
            <label className="col-md-2 offset-sm-1 col-form-label"
              htmlFor="stateProvince">
              State Province:{" "}
            </label>
            <div className="col-md-4 offset-sm-1">
              <input className="form-control"
                type="text" id="stateProvince" name="StateProvince" placeholder="State\Province" />
            </div>
          </div>

          <div className="form-group row pt-3" >
            <label className="col-md-2 offset-sm-1 col-form-label"
              htmlFor="zipCode">
              Zip/Postal Code:{" "}
            </label>
            <div className="col-md-4 offset-sm-1">
              <input className="form-control"
                type="text" id="zipCode" name="zipCode" placeholder="ZIP Code" />
            </div>
          </div>

          <div className="form-group row pt-3" >
            <label className="col-md-2 offset-sm-1 col-form-label"
              htmlFor="countryRegion">
              Coutry Region:{" "}
            </label>
            <div className="col-md-4 offset-sm-1">
              <input className="form-control"
                type="text" id="countryRegion" name="countryRegion" placeholder="Country/Region" />
              <small className="text-muted float-end mt-3">
                <span className={styles.required}>*</span>
                Required field
              </small>
            </div>
          </div>

        </form>
      </div>
    </div >

  );
}

export default ConfigurationPage;
