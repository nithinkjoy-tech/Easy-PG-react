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

export function debtDetails(id){
    return apiClient.get(`/user/debtdetails/${id}`);
}

export function createDebt(values){
    return apiClient.post(`/user/createDebt`,values);
}

export function getTransactionDetails(id){
    return apiClient.get(`/user/profile/${id}`);
}

export function updateTransaction(values){
    return apiClient.put(`/user/profile`,values);
}

export function getMaxAmount(id){
    return apiClient.get(`/user/profile/getmax/${id}`);
}