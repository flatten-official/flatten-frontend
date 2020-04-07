const ESRI_URL =
  "https://opendata.arcgis.com/datasets/e5403793c5654affac0942432783365a_0.geojson";

function getGSBucketReference(bucket) {
  try {
    const storage = firebase.storage();
    return storage.refFromURL(bucket);
  } catch (error) {
    console.log(
      "Couldn't load firebase.storage. Please use 'firebase serve' to allow Google Cloud Storage Connection"
    );
  }
}

function getGSDownloadURL(bucket_reference, file) {
  return bucket_reference.child(file).getDownloadURL();
}

function jsonRequest(url) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, false);
  xhr.send();
  return JSON.parse(xhr.responseText);
}

async function obtainAndDisplayMaps() {
  const remoteConfig = firebase.remoteConfig();

  remoteConfig.settings = { minimumFetchIntervalMillis: 3600000 };
  remoteConfig.defaultConfig = { bucket: "gs://flatten-271620.appspot.com" };

  try {
    await remoteConfig.fetchAndActivate();
  } catch (e) {
    console.log("Issue fetching remote config...");
  }

  const bucket = remoteConfig.getValue("bucket").asString();
  const bucket_reference = getGSBucketReference(bucket);
  form_data_obj = jsonRequest(
    await getGSDownloadURL(bucket_reference, "form_data.json")
  );
  // Query confirmed case data from ESRI
  confirmed_data = jsonRequest(ESRI_URL);

  displayMaps();
  tabs.pot_vul.switch_to_tab(map);
}

// Calls the function.
obtainAndDisplayMaps();
