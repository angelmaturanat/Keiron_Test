export const ticketcontroller = {
    getTickets,
    getTicketsForMe,
    updateTicket,
    createTicket
};

function getTickets(){
    let state = localStorage["appState"];
    let AppState = JSON.parse(state);
    let token = AppState.user.access_token;

    let header = {
        headers: {"Authorization" : `Bearer ${token}`}
    };

    return new Promise((resolve, reject) => {
        axios
        .get("/api/tickets", header)
        .then(result => {
            resolve(result.data);
        }).catch(error => reject(error));
    });
}

function getTicketsForMe(){
    let state = localStorage["appState"];
    let AppState = JSON.parse(state);
    let token = AppState.user.access_token;

    let header = {
        headers: {"Authorization" : `Bearer ${token}`}
    };

    return new Promise((resolve, reject) => {
        axios
        .get("/api/owntickets", header)
        .then(result => {
            resolve(result.data);
        }).catch(error => reject(error));
    });
}

function createTicket(data){
    let state = localStorage["appState"];
    let AppState = JSON.parse(state);
    let token = AppState.user.access_token;

    let header = {
        headers: {"Authorization" : `Bearer ${token}`}
    };

    return new Promise((resolve, reject) => {
        axios
        .post("/api/tickets", data, header)
        .then(result => {
            resolve(result.data);
        }).catch(error => reject(error));
    });
}

function updateTicket(id, data){
    let state = localStorage["appState"];
    let AppState = JSON.parse(state);
    let token = AppState.user.access_token;

    let header = {
        headers: {"Authorization" : `Bearer ${token}`}
    };

    return new Promise((resolve, reject) => {
        axios
        .patch("/api/tickets/"+id, data, header)
        .then(result => {
            resolve(result.data);
        }).catch(error => reject(error));
    });
}
