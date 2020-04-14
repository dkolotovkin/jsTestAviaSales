import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

var select = document.querySelectorAll('select');
M.FormSelect.init(select);

var autocomplete = document.querySelectorAll('.autocomplete');
M.Autocomplete.init(autocomplete, {});

var datepicker = document.querySelectorAll('.datepicker');
M.Datepicker.init(datepicker, {format: "yyyy-mm"});

export function getAutocompleteInstance(elem) {
  return M.Autocomplete.getInstance(elem);
}

export function getDatepickerInstance(elem) {
  return M.Datepicker.getInstance(elem);
}