var https = require('https');
var aws4 = require('aws4');

require('dotenv').config();

// to illustrate usage, we'll create a utility function to request and pipe to stdout
function request(opts) { https.request(opts, function(res) { res.pipe(process.stdout) }).end(opts.body || '') }

var {S3_BUCKET, REGION } = process.env;

request(aws4.sign({ 
	host: `${S3_BUCKET}.s3.${REGION}.amazonaws.com`, 
	path: '/lorem_ipsum.txt', 
	service: 's3', 
	region: REGION
}))