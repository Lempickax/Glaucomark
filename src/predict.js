import * as tf from '@tensorflow/tfjs';
import { useEffect } from 'react';
window.tf = tf;
window.progress = 0;
window.bytesUsed = 0;

tf.enableProdMode();

let start;

const MODEL_URL = window.location.href + 'model_full/model.json';

const checkOD = (img) => {
	if (img != undefined) return true;
	setTimeout(function () {
		return false;
	}, 1000);
};
const generate = async (model, img, output) => {
	console.log('Generation start');
	console.log(img);
	// while(img == undefined){
	// 	setTimeout(function () {
	// 		console.log("Processing Image");
	// 	}, 1000);
	// }
	// console.log(checkOD(img));
	let img_tensor = tf.browser.fromPixels(img);

	let scaled_img_tensor;
	console.log('Original image size:', img_tensor.shape);
	scaled_img_tensor = tf.tidy(() =>
		tf.image.resizeBilinear(img_tensor, [224, 224]).expandDims(0).div(255)
	); // Batch size may be larger
	img_tensor.dispose();
	start = performance.now();
	let generated = await model.predict(scaled_img_tensor);
	scaled_img_tensor.dispose();
	let end = performance.now();
	console.log('Image Generated');
	console.log(`Took ${(end - start) / 1000} s to generate the image`);

	// tf.browser.toPixels((generated.squeeze(0).add(1)).div(2), output);
	console.log('generated.print: ' + generated.flatten().arraySync());
	let result = (1 - generated.flatten().arraySync()) * 100;
	output.innerHTML =
		'The chance for positive glaucoma is ' + result + '%';
	generated.dispose();

	return true
};

const generateImage = async (img_id, canvas_id) => {
	let model_load_start = performance.now();

	await tf.loadLayersModel(MODEL_URL).then(async (model) => {
		console.log('Model Loaded');
		let model_load_end = performance.now();
		await generate(model, document.getElementById(img_id), document.getElementById(canvas_id));
		tf.disposeVariables();
		console.log(tf.memory());
	});
	window.progress = 1.0;
};

export { generateImage };