import React from "react";
import classes from "./About.module.css";

const About = () => {
  return (
    <html className={classes.About}>
      <head>
        <link rel="stylesheet" href="frostedGlass.css" />
      </head>
      <br />
      <br />
      <br />
      <header>
        <div>
          <h1>User Guide</h1>
        </div>
      </header>
      <body>
        <br />
        <h3>What is GlaucoMark?</h3>
        <br />
        <div>
          <p>
            GlaucoMark is a web application based on deep learning that offers a
            handy and cost-worthy glaucoma exam that is available to everyone
            with access to the Internet.
          </p>
        </div>
        <h3>Why Do We Need GlaucoMark?</h3>
        <br />
        <p>
          The most common form of glaucoma, open-angle glaucoma, at its early
          stage is easy to treat but asymptomatic until blindness. In China, 90
          percent of the glaucoma patients are unaware of it and therefore
          receive no treatment. In developing countries like Kenya, eye doctors
          are barely accessible. In the United States, the glaucoma exam is
          expensive and time-consuming.
        </p>
        <h3>How Can GlaucoMark Solve These Issues?</h3>
        <p>
          <br />
          Glaucomark offers online glaucoma test that is available to everyone
          with access to the Internet. Users only need to upload a picture of a
          retina taken by any smartphone with a 20D lens that costs only 10
          dollars. This whole process is extremely simple and takes only about 2
          minutes. With this early result, the patient can get a head start in
          treatment and prevent further progression.
        </p>
        <h3>Is Glaucomark Credible?</h3>
        <br />
        <p>
          The way Glaucomark is able to detect glaucoma is using deep learning
          architectures called YOLOv3 and Vgg16. First, the YoloV3 detects and
          focus the analysis on the area of optic disc to narrow down the
          computation task for the next step. Then, Vgg16 detects glaucoma
          features on the optic disc to classify it between healthy and glaucoma
          eyes. These two models were trained with more than 6000 images of
          healthy eyes and glaucoma eyes. Testing by 400 retina images, the
          system achieved an accuracy of 98% with the area under the ROC curve
          of 0.994. However, you should consult for your doctor before and
          medication.
        </p>

        <h4>
				This site is created by Tony Dang'21 using Reactjs.
				<br />
				Source code is public at{' '}
				<a href="https://github.com/Lempickax/Glaucomark">
					Github
				</a>
			</h4>
      </body>
    </html>
  );
};

export default About;
