# Sunspot

## Project Description

Sunspot is an AI-driven project aimed at surpassing human performance in predicting street view locations within Florida, with plans to scale globally. Leveraging street view images and geographical data, Sunspot employs advanced machine learning techniques to accurately determine the location of a given image. The project integrates various enhancements such as OCR for text recognition, cultural and environmental feature analysis, and multimodal learning to improve localization accuracy and model robustness.

## Objectives

- Develop an AI model that accurately predicts street view locations in Florida.
- Utilize cyclical encoding for geographical coordinates to maintain spatial relationships.
- Implement a lightweight neural network architecture suitable for deployment on modest hardware.
- Integrate additional features like OCR, cultural elements, and environmental diversity to enhance model performance.
- Scale the model globally by expanding the dataset and incorporating diverse geographical regions.
- Ensure ethical and legal compliance in data collection and model deployment.

## Features

- Data collection via Mapillary API with latitude and longitude metadata.
- Cyclical encoding of geographical coordinates.
- Data augmentation to preserve and enhance geographical features.
- Lightweight neural network architecture using MobileNetV2.
- Custom haversine loss function for geodesic distance measurement.
- OCR integration for text recognition in images.
- Analysis of cultural and human elements such as vehicles and license plates.
- Environmental diversity handling including seasonal and weather-based imagery.
- Sun position estimation from shadows and lighting conditions.
- Simulated movement through image sequences for dynamic interaction.
- Multimodal learning incorporating visual, text, and metadata inputs.
- Robust evaluation and interpretability tools like Grad-CAM.
- Scalable architecture for global deployment.

## Development Steps

1. **Data Collection**
   - **Register for a Mapillary account and obtain an API key.**
     - Visit the Mapillary website and create an account.
     - Navigate to the developer portal and obtain an API key.
     - Store the API key securely for use in the data collection script.
   - **Develop a data scraper using Python with libraries such as `requests` or `mapillary`.**
     - Utilize the `requests` library to make API calls to the Mapillary API.
     - Consider using the `mapillary` library for simplified API interaction.
     - Implement error handling and rate limiting to ensure API compliance.
   - **Define the scope to cover key regions in Florida (e.g., Miami, Orlando, Tampa).**
     - Determine the geographical boundaries of the target regions.
     - Use latitude and longitude coordinates to define the bounding box for data collection.
   - **Fetch street view images along with their latitude and longitude.**
     - Use the Mapillary API to retrieve street view images within the defined bounding box.
     - Extract the latitude and longitude metadata associated with each image.
   - **Implement rate limit handling to comply with Mapillary’s usage policies.**
     - Monitor API calls and implement a mechanism to pause or throttle requests if rate limits are exceeded.
     - Ensure responsible and ethical data collection practices.
   - **Store images in a structured directory and maintain a metadata file (CSV or database) linking image paths to their coordinates.**
     - Create a directory structure to organize images based on regions or cities.
     - Create a metadata file (CSV or database) to store image paths and corresponding latitude and longitude values.

2. **Data Preprocessing**
   - Organize images into directories based on regions or cities if necessary.
   - Encode latitude and longitude using cyclical encoding with sine and cosine transformations.
   - Apply basic data augmentation techniques (rotations, flips, brightness adjustments) using libraries like `Augmentor`, `imgaug`, or `torchvision.transforms`.
   - Split the dataset into training and validation sets, typically using an 80/20 split.

3. **Model Selection and Design**
   - Choose MobileNetV2 as the base architecture for its efficiency and performance.
   - Modify the output layer to predict four values corresponding to the sine and cosine of latitude and longitude.
   - Implement transfer learning by freezing the base model layers initially.
   - Compile the model with an appropriate optimizer (e.g., Adam) and prepare for the custom haversine loss function.

4. **Implement Custom Haversine Loss Function**
   - Define the haversine loss function to calculate the geodesic distance between predicted and actual coordinates.
   - Integrate the custom loss function into the model compilation process.

5. **Model Training**
   - Set training parameters such as batch size, number of epochs, and learning rate.
   - Train the model with the base layers frozen to leverage pre-trained features.
   - Fine-tune the model by unfreezing selected layers and continuing training with a lower learning rate to improve performance.

6. **Model Evaluation**
   - Evaluate the model using the mean geodesic error metric.
   - Visualize predictions by plotting actual and predicted locations on a map using libraries like `folium` or `matplotlib`.
   - Fine-tune hyperparameters based on validation performance.
   - Conduct robustness checks by testing the model on diverse datasets to ensure consistency.

7. **Deployment**
   - Export the trained model in a deployable format (e.g., `.h5` file).
   - Set up the local environment with necessary dependencies on the target machine.
   - Develop a prediction script to input images and output geographical coordinates.
   - Test the deployment by running the prediction script on sample images.
   - (Optional) Develop a basic user interface using frameworks like Flask or Streamlit for easier interaction.

8. **Iterative Improvements and Next Steps**
   - Gather feedback from initial testing and real-world usage.
   - Enhance data quality by incorporating more diverse and high-quality images.
   - Optimize the model architecture and hyperparameters for improved accuracy and efficiency.
   - Integrate additional features such as OCR, cultural elements, and environmental diversity.
   - Expand the dataset to include global regions beyond Florida.
   - Implement advanced data augmentation techniques and explore multimodal learning approaches.
   - Ensure ethical and legal compliance in data handling and model deployment.
   - Improve model interpretability with visualization tools like Grad-CAM.
   - Develop a scalable and modular system architecture to facilitate future expansions and updates.

## Installation

- Ensure Python is installed on your system.
- Install necessary Python libraries using pip:
