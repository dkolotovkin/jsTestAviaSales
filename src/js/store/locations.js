import api from "../services/apiService";
import {formatDate} from "../helpers/dateHelper";
import ticketsUI from "../views/tickets";

class Locations {
    constructor(api) {
        this.api = api;
        this.countries = null;
        this.cities = null;
        this.citiesByAutocompleteKey = null;
        this.citiesForAutocomplete = null;
        this.airlines = null;
    }

    async init() {
        const response = await Promise.all([api.getCountries(), api.getCities(), api.getAirlines()]);
        const [countries, cities, airlines] = response;
        this.countries = countries.reduce((acc, element) => {
            acc[element.code] = element;
            return acc;
        },{});
        this.citiesByAutocompleteKey = cities.reduce((acc, element) => {
            const key = `${element.name || element.name_translations.en}, ${this.countries[element.country_code].name}`;
            acc[key] = element;
            return acc;
        },{});
        this.citiesForAutocomplete = cities.reduce((acc, element) => {
            const key = `${element.name || element.name_translations.en}, ${this.countries[element.country_code].name}`;
            acc[key] = null;
            return acc;
        },{});
        this.cities = cities.reduce((acc, element) => {
            acc[element.code] = element;
            return acc;
        },{});
        this.airlines = airlines.reduce((acc, element) => {
            element.logo = `https://pics.avs.io/200/200/${element.code}.png`;
            element.name_any = element.name ? element.name : element.name_translations.en;
            acc[element.code] = element;
            return acc;
        },{});

        return response;
    }

    getCitiesByCountryCode(code) {
        return this.cities.filter((city) => city.country_code === code);
    }

    getCityCodeByAutocompleteKey(key) {
        return this.citiesByAutocompleteKey[key].code;
    }

    async getTickets(params) {
        const response = await api.getPrices(params);

        const serialisedTickets = Object.values(response.data).map((element) => {
            return {
                ...element,
                airline:this.airlines[element.airline],
                origin: this.cities[element.origin],
                destination: this.cities[element.destination],
                departure_date: formatDate(element.departure_at, "hh:mm MMM yyyy"),
                return_date: formatDate(element.return_at, "hh:mm MMM yyyy")
            };
        }, {});
        ticketsUI.renderTickets(serialisedTickets);
    }
}

const locations = new Locations(api);

export default locations;