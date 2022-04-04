import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    // console.log(err);
    // the promise thats being returned from getJSON will
    // actually reject. propagated the error from one async function to another
    // by rethrowing the error in this catch block
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    //POST request, we need to pass in an object of options
    const fetchPro = fetch(url, {
      method: 'POST',
      //headers are snippets of text which are info about the request itself
      headers: {
        //telling the api that the data we are gonna send is in the JSON format
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
