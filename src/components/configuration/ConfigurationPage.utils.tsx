import { DB } from './ConfigurationPage.const';


//Arrays of this page's form inputs
export const INPUTS: HTMLInputElement[] = [];

//Trigger an input event for a given element
export function triggerInput(inputEleId: string, inputValue: string) {
  var input = document.getElementById(inputEleId) as HTMLInputElement;
  input.value = inputValue;
  const event = new Event("input", { bubbles: true });
  input.dispatchEvent(event);
}

//Eager load all form's input field to an array
export function loadInputs() {
  var formControls: HTMLFormControlsCollection = (document.getElementById("configurationForm") as HTMLFormElement).elements;
  for (var inputFieldIndex = 0; inputFieldIndex < formControls.length; inputFieldIndex++) {
    var id = formControls[inputFieldIndex].id;
    if (INPUTS.indexOf(document.getElementById(id) as HTMLInputElement) < 0) {
      INPUTS.push(
        document.getElementById(id) as HTMLInputElement
      );
    }
  }
}


//Fetch the processors/data from the API
export function fetchProcessor(processors : Array<any>) {
  return new Promise((resolve, reject) => {
    resolve(fetch(DB)
      .then((response) => { return response.json() })
      .then((data: any) => {
        for (var i in data) {
          processors.push(
            <option key={i} value={data[i]}>
              {data[i]}
            </option>
          );
        }
      })
  )});
}
//Debounce function
export function debounce(func: Function, wait: number) {
  var timeout: any;
  return function (this: Function) {
    var context = this;
    var args = arguments;
    //The function to be called later
    var later = function () {
      func.apply(context, args);
    };
    //Reset the timeout obj per input
    clearTimeout(timeout);
    //Schedule the function
    timeout = setTimeout(later, wait);
  };
};
//Save data in sessionStorage
export function saveData() {
  INPUTS.forEach((inputElement) => {
    sessionStorage.setItem(inputElement.id, inputElement.value);
  });
}

