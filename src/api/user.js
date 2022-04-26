import apiClient from "./httpService";

export function getUsers(){
    return apiClient.get("/user/profile");
}

export function userSignin(values){
    return apiClient.post("/user/signin",values);
}

export function getDebtDetails(id){
    return apiClient.get(`/user/createDebt/${id}`);
}

export function getTransactionDetails(id){
    return apiClient.get(`/user/profile/${id}`);
}