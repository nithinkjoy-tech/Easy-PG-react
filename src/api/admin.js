import apiClient from "./httpService";

export function addUser(values){
    return apiClient.post("/admin/adduser",values);
}

export function adminSignin(values){
    return apiClient.post("/admin/signin",values);
}