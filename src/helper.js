export function changeElementColor(elementId, hexColorCode) {
  document.getElementById(elementId).style.backgroundColor = hexColorCode;
}
export async function formDataPost(formdatas, apiUrl) {
  let result = await fetch(apiUrl, {
    method: "POST",
    body: formdatas,
  });
}
export async function jsonDataPost(jsondatas, apiUrl) {
  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(jsondatas),
  });
}
export async function getConnectIdData(api, setID, setData, connectoinId) {
  let result = await fetch(api);
  result = await result.json();
  console.log(result);
  setID(result[connectoinId]);
  setData(result);
}
export async function getData(api, setData) {
  let result = await fetch(api);
  result = await result.json();
  console.log(result);
  setData(result);
}
