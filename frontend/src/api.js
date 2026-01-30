const BASE_URL = "http://localhost:5000/alerts";

export const getAlerts = () =>
  fetch(BASE_URL).then(res => res.json());

export const createAlert = (data) =>
  fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const updateAlert = (id, status) =>
  fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

export const deleteAlert = (id) =>
  fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
