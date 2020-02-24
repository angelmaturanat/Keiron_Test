export const userscontroller = {
    getUsers,
    createUser
};

function getUsers(){
    return new Promise((resolve, reject) => {
        axios
        .get("/api/users")
        .then(result => {
            resolve(result.data);
        }).catch(error => reject(error));
    });
}

function createUser(userData){
    return new Promise((resolve, reject) => {
        axios
        .post("/api/users", userData)
        .then(result => {
            resolve(result.data);
        }).catch(error => reject(error));
    });
}
