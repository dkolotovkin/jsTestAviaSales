class TickeysUI {
    constructor() {
        this.ticketsContainer = document.querySelector(".avia-tickets");
    }

    renderTickets(tickets) {
        this.ticketsContainer.innerHTML = "";

        let ticketsFragment = "";
        tickets.forEach((ticket) => {
            ticketsFragment += `<div class="col s6">
                                    <div class="card blue-grey lighten-5">
                                    <div class="card-content black-text">
                                        <div class="row">
                                            <div class="col s12 d-flex align-items-center">
                                                    <img src="${ticket.airline.logo}" height="80px"/>
                                                    <span class="card-title">&nbsp;${ticket.airline.name_any}</span>
                                            </div>
                                            <div class="col s8">
                                                    <b>${ticket.origin.name}&nbsp;<i class="material-icons">flight_takeoff</i></b>
                                            </div>
                                            <div class="col s4">
                                                    <b><i class="material-icons">flight_land</i>&nbsp;${ticket.destination.name}</b>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-action d-flex align-items-center">
                                        <div class="avia-card">
                                            <div>${ticket.departure_date}</div>
                                            <div><i>${ticket.transfers} пересадок</i></div>
                                        </div>                        
                                        <a class="waves-effect purple lighten-2 waves-light btn margin-left-auto">${ticket.transfers}$</a>
                                    </div>
                                    </div>
                                </div>`;
        });
        
        this.ticketsContainer.insertAdjacentHTML("afterbegin", ticketsFragment);
    }
}

const ticketsUI = new TickeysUI();

export default ticketsUI;