import {Buffer} from 'buffer';
import {sha256} from 'js-sha256';

export const ConvertJsonToBase64 = jsonData => {
  return Buffer.from(JSON.stringify(jsonData)).toString('base64');
};

export const ConvertToSHA256 = data => {
  return sha256(data);
};
