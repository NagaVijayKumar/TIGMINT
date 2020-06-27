const express = require('express');
const { spawn } = require('child_process');
const app = express();
const port = 3000;
app.get('/:param1/:param2', (req, res) => {
	var dataToSend;
	// spawn new child process to call the python script
	const python = spawn('python', [
		'D:\\Web Development\\OSINT-Tool\\API server\\script1.py',
		req.params.param1,
		req.params.param2,
	]);
	// collect data from script
	python.stdout.on('data', function (data) {
		console.log('Pipe data from python script ...');
		dataToSend = data.toString();
		res.send(dataToSend);
	});
	// in close event we are sure that stream from child process is closed
	python.on('close', (code) => {
		console.log(`child process close all stdio with code ${code}`);
		// send data to browser
	});
});
app.listen(port, () =>
	console.log(`Example app listening on port 
${port}!`)
);
