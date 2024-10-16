import axios from "axios";

const API_URL =
  "https://maskinrummet-aefmcse5dad0hmbb.northeurope-01.azurewebsites.net/";

export function getDatasetNames() {
  return axios(API_URL + "datasets");
}

export function getDatasetById(id) {
  return axios(API_URL + "datasets/" + id);
}

export function postDataset(dataset) {
  return axios.post(API_URL + "datasets/new", dataset);
}

export function verifyPassword(id, password) {
  return axios.post(API_URL + "datasets/" + id + "/verify", { password });
}

export function addSentenceToDataset(id, new_text) {
  return axios.post(API_URL + "datasets/" + id + "/add", { new_text });
}

export function editDataset(dataset, password) {
  return axios.post(API_URL + "datasets/" + dataset.id + "/edit", {
    new_name: dataset.name,
    new_is_open: dataset.is_open,
    new_use_value: dataset.use_value,
    new_value_name: dataset.new_value_name || "",
    new_sentences: dataset.sentencesToAdd,
    edited_sentences: dataset.sentencesToEdit,
    sentences_to_remove: dataset.deletedIds,
    password,
  });
}

export function removeDataset(id, password) {
  return axios.post(API_URL + "datasets/" + id + "/delete", {
    password,
  });
}
