import axios from "axios";

export default axios.create({
    baseURL: "https://backendapi.turing.com/",
    responseType: "json"
})

