import axios from "axios";

const API_URL = "https://maskinrummet.pythonanywhere.com/";

export function getDatasetNames() {
  return axios(API_URL + "names");
}

export function getDatasetById(id) {
  return axios(API_URL + "dataset/" + id);
}

export function postDataset(dataset) {
  return axios.post(API_URL + "new", dataset);
}

export function verifyPassword(id, password) {
  return axios.post(API_URL + "dataset/" + id + "/verify", { password });
}

export function addSentenceToDataset(id, new_sentence) {
  return axios.post(API_URL + "dataset/" + id + "/add", { new_sentence });
}

export function editDataset(dataset, password) {
  return axios.post(API_URL + "edit", {
    id: dataset.id,
    new_name: dataset.name,
    new_json_string: dataset.json_string,
    new_is_open: dataset.is_open,
    password: password,
  });
}

export function removeDataset(id, password) {
  return axios.post(API_URL + "remove", { id, password });
}
