import React, { Component } from 'react';
import logo from './logo.svg';
import { Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { generateImage } from './predict.js';
import Modal from './UI/Modal/Modal';
import PressButton from './UI/Button/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

let success = false;
var ODimage = new Image();
class App extends Component {
	state = {
		uploadedImageURL: 'data:image/png;',
		ImageURL: 'data:image/png;',
		uploaded: false,
		generationStatus: 0,
		updateGenerationProgressInterval: -1,
		bytesUsed: 0,
		operating: false,
		width: 1,
		height: 1,
	};

	operateCancelHandler = () => {
		this.setState({ operating: false });
	};

	operateHandler = () => {
		this.setState({ operating: true });
	};

	onUpload = (e) => {
		var input = e.target;
		var reader = new FileReader();
		reader.onload = () => {
			var dataURL = reader.result;
			var image = new Image();
			image.src = dataURL;
			image.onload = () => {
				this.setState({
					uploadedImageURL: dataURL,
					uploaded: true,
				});
			};
		};

		reader.readAsDataURL(input.files[0]);
	};
	detectOD = (img) => {
		let fd = new FormData();
		fd.append('image', img.files[0]);
		console.log(...fd);
		fetch(
			'https://cors-anywhere.herokuapp.com/http://47.251.47.22:5000/image',
			{
				method: 'POST',
				//headers: {'Content-Type':'multipart/form-data'},
				body: fd,
			}
		)
			.then((response) => response.text())
			.then((result) => {
				ODimage.src = 'data:image/png;base64,' + result;
				this.setState({ ImageURL: 'data:image/png;base64,' + result });
				ODimage.onload = () => {
					this.setState({
						width: ODimage.width,
						height: ODimage.width,
					});
				};
				generateImage('output', 'result');
				success = true;
				console.log(document.getElementById("result").innerHTML)
				let checker = setInterval(()=>{
					if(document.getElementById("result").innerHTML!==""){
						this.setState({generationStatus: 2});
						clearInterval(checker)
					}
				},1000)
			})
			.catch((error) => console.log('error', error));
	};

	generate = async () => {
		if (this.state.generationStatus !== 0) {
			return;
		}

		console.log(this.state);
		if (this.state.uploaded === false) {
			alert('Please upload an image.');
			return;
		}

		window.progress = 0;
		window.bytesUsed = 0;
		let updateGenerationProgressInterval = setInterval(() => {
			this.setState({
				generationProgress: window.progress * 100,
				bytesUsed: window.bytesUsed,
			});

			if (this.state.generationStatus !== 1) {
				clearInterval(updateGenerationProgressInterval);
			}
		}, 500);

		this.setState({
			generationStatus: 1,
			updateGenerationProgressInterval: updateGenerationProgressInterval,
		});

		try {
			await this.detectOD(document.getElementById('image'));
		} catch (error) {
			alert('Error encountered while generating image: ' + error);
			this.setState({
				generationStatus: 0,
			});
		}
	};

	componentWillUnmount = () => {
		if (this.state.updateGenerationProgressInterval !== -1) {
			clearInterval(this.state.updateGenerationProgressInterval);
		}
	};
	componentWillMount = () => {
		
	};

	render() {
		return (
			<div className="app">
				<Container
					fluid
					style={{
						display:
							this.state.generationStatus === 0
								? 'block'
								: 'none',
					}}
				>
					{/* change layout after user press predict button */}

					<Row className="margin">
						<div className="topbar">
							<h1 className="title">
								GlaucoMark: Take a Glaucoma Test at Home
							</h1>
							{
								<a href="https://github.com/Lempickax/Glaucomark">
									View Source Code
								</a>
							}
						</div>
					</Row>
					<Row className="margin">
						<Col />
						<Col xs="12" md="8" lg="6"></Col>
						<Col />
					</Row>
					<Row className="margin">
						<Col />
						<Col
							xs="12"
							md="8"
							lg="5"
							xl="4"
							style={{ textAlign: 'center', marginTop: '80px' }}
						>
							<h5 style={{ textAlign: 'center', width: '100%' }}>
								Upload a image of retina to continue
							</h5>
							<input
								label={
									this.state.uploaded
										? 'Change the image'
										: 'Upload an image'
								}
								onChange={this.onUpload}
								multiple={false}
								custom
								type="file"
								name="image"
								id="image"
								alt=""
								width={this.state.width}
								height={this.state.height}
							/>
							<img
								id="uploaded-image"
								alt=""
								src={this.state.uploadedImageURL}
							/>
						</Col>
						<Col />
					</Row>
					<Row className="margin">
						<Col />
						<Col
							xs="12"
							md="8"
							lg="6"
							style={{ textAlign: 'center' }}
						>
							<Modal
								show={this.state.operating}
								modalClosed={this.operateCancelHandler}
							>
								<div>
									<h1>Term of Use </h1>
									<p style={{ textAlign: 'left' }}>
										The result from this website can only be
										used as references.
									</p>
									<p style={{ textAlign: 'left' }}>
										While the predicting model had been
										validated with a high accuracy, the
										training dataset still lacks variety.{' '}
									</p>
									<p style={{ textAlign: 'left' }}>
										Thus, the author of this site makes no
										claims, promises or guarantees about the
										testing results, and expressly disclaims
										liability for any potential errors.
									</p>
									<p style={{ fontWeight: 'bold' }}>
										Please see a doctor for final diagnosis.{' '}
									</p>
								</div>
								<div>
									<PressButton
										btnType="Success"
										clicked={this.generate}
									>
										Agree
									</PressButton>
									<PressButton
										btnType="Danger"
										clicked={this.operateCancelHandler}
									>
										Cancel
									</PressButton>
								</div>
							</Modal>
							<Button
								variant="primary"
								onClick={this.operateHandler}
							>
								Predict
							</Button>
						</Col>
						<Col />
					</Row>
				</Container>

				<div
					className="overlay"
					style={{
						display:
							this.state.generationStatus === 1
								? 'block'
								: 'none',
					}}
				>
					<div
						style={{
							marginTop: 'calc( 50vh - 50px )',
							height: '100px',
							textAlign: 'center',
						}}
					>
						<Container fluid>
							<Row>
								<Col />
								<Col
									xs="12"
									md="8"
									lg="6"
									style={{ textAlign: 'center' }}
								>
									<Spinner animation="border" role="status">
										<span className="sr-only">
											Loading...
										</span>
									</Spinner>
									<p>Predicting results...</p>
									<p>
										This may take 15 to 30 seconds depending
										on your device.
									</p>
								</Col>
								<Col />
							</Row>
						</Container>
					</div>
				</div>

				<div
					className="overlay"
					style={{
						display:
							this.state.generationStatus === 2
								? 'block'
								: 'none',
					}}
				>
					<Container fluid>
						<Row className="margin">
							<Col />
							<Col
								xs="12"
								md="8"
								lg="5"
								xl="4"
								style={{
									textAlign: 'center',
									marginBottom: '20px',
								}}
							>
								<div>
									<img
										id="output"
										src={this.state.ImageURL}
									/>
									<div id="result"></div>
								</div>
							</Col>
							<Col />
						</Row>
						<Row className="margin">
							<div
								className="button"
								style={{ textAlign: 'center', margin: '0px' }}
							>
								<Button
									variant="primary"
									onClick={() => window.location.reload()}
								>
									Restart
								</Button>
							</div>
						</Row>
					</Container>
				</div>
			</div>
		);
	}
}

export default App;
