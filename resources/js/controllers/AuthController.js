export const authcontroller = {
    login,
    register,
    logout
};

function login(userData) {
    return new Promise((resolve, reject) => {
        axios
        .post("/api/auth/login", userData)
        .then(json => {
            if (json.data.success) {
                let userData = {
                    id: json.data.user.id,
                    name: json.data.user.name,
                    email: json.data.user.email,
                    tipo_user_id: json.data.user.tipo_user_id,
                    access_token: json.data.token
                };

                let appState = {
                    isLoggedIn: true,
                    user: userData
                };

                localStorage["appState"] = JSON.stringify(appState);

                resolve({
                    isLoggedIn: appState.isLoggedIn,
                    user: appState.user,
                    error: ""
                });
            } else {
                alert(`Our System Failed To Register Your Account!`);
            }
        })
        .catch(error => {
            if (error.response) {
                let err = error.response.data;

                reject({
                    error: err.message,
                    errorMessage: err.errors,
                    formSubmitting: false
                });
            } else if (error.request) {
                let err = error.request;
                reject({
                    error: err,
                    formSubmitting: false
                });
            } else {
                let err = error.message;

                reject({
                    error: err,
                    formSubmitting: false
                });
            }
        });
    });
}

function register(userData){
    return new Promise((resolve, reject) => {
        axios
        .post("/api/auth/register", userData)
        .then(result => {
            let appState = {
                isRegistered: true
            };
            
            resolve({
                isRegistered: appState.isRegistered,
                error: ""
            });
        }).catch(err => {
            reject({
                error: err,
                formSubmitting: false
            })
        });
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('appState');
}
