import apiClient from "./httpService";

export function addUser(values){
    return apiClient.post("/admin/adduser",values);
}

export function userSignin(values){
    return apiClient.post("/user/profile",values);
}