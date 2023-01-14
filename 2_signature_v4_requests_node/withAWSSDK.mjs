import * as https from 'https';
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { Sha256 } from '@aws-crypto/sha256-js';
import { fromNodeProviderChain } from "@aws-sdk/credential-providers";

import * as dotenv from 'dotenv'
dotenv.config()

// Use the default provider chain
const credentialProvider = fromNodeProviderChain();

const sigv4 = new SignatureV4({
	service: 's3',
	region: process.env.REGION,
	credentials: credentialProvider,
	sha256: Sha256,
});

// Create SignatureV4 request
const signed = await sigv4.sign({
	method: 'GET',
	hostname: `${process.env.S3_BUCKET}.s3.eu-west-1.amazonaws.com`,
	path: '/lorem_ipsum.txt',
	protocol: 'https:',
	headers: {
		host: `${process.env.S3_BUCKET}.s3.eu-west-1.amazonaws.com`
	},
});

const req = https.request(signed, res => {
	res.on('data', function (chunk) {
		console.log('BODY: ' + chunk);
	  });
});
req.on('error', e => {
	console.log(`ERROR httpsGet: ${e}`);
});
req.end();