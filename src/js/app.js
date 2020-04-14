import locations from "./store/locations";
import "../style/style.css";
import "./plugins/index.js"
import formUI from "./views/form";

document.addEventListener("DOMContentLoaded", () => {
    initApp();

    formUI.form.addEventListener("submit", (e) => {
        e.preventDefault();

        const origin = locations.getCityCodeByAutocompleteKey(formUI.originValue);
        const destination = locations.getCityCodeByAutocompleteKey(formUI.destinationValue);
        const depart_date = formUI.departValue;
        const return_date = formUI.returnValue;

        locations.getTickets({origin, destination, depart_date, return_date})
    })

    async function initApp() {
        await locations.init();
        formUI.initAutoComplete(locations.citiesForAutocomplete);
    }
})