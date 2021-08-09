import $ from 'jquery';

//Arrays of the configuration's form inputs
export const INPUTS: HTMLInputElement[] = [];
//Load all inputs to the array
export function loadInputs() {
  $("#configurationForm").find('input').each(function () {
    var id = $(this).attr('id')!;
    if (INPUTS.indexOf(document.getElementById(id) as HTMLInputElement) < 0) {
      INPUTS.push(
        document.getElementById(id) as HTMLInputElement
      );
    }
  });
}


//Trigger an input event for a given element
export function triggerInput(inputEleId: string, inputValue: string) {
  var input = document.getElementById(inputEleId) as HTMLInputElement;
  input.value = inputValue;
  const event = new Event("input", { bubbles: true });
  input.dispatchEvent(event);
}

