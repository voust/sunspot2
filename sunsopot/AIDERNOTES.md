# Sunspot Project Notes

## Project Notes

- **Current Step:** [Insert current step description here]
- **Next Steps:** [Insert list of next steps here]
- **Issues:** [Insert any issues encountered here]
- **Decisions:** [Insert any important decisions made here]
- **Code Snippets:** [Insert any relevant code snippets here]

## Data Collection Notes

- **Mapillary API Key:** [Insert Mapillary API key here]
- **Data Collection Regions:** [Insert list of data collection regions here]
- **Data Collection Scope:** [Insert description of data collection scope here]
- **Data Storage:** [Insert description of data storage method here]
- **Metadata File:** [Insert description of metadata file format here]

## Model Training Notes

- **Model Architecture:** MobileNetV2
- **Output Layer:** 4 values (sine and cosine of latitude and longitude)
- **Transfer Learning:** Freeze base model layers initially
- **Optimizer:** Adam
- **Loss Function:** Custom Haversine loss function
- **Training Parameters:** Batch size, number of epochs, learning rate
- **Fine-tuning:** Unfreeze selected layers and continue training with a lower learning rate

## Evaluation Notes

- **Evaluation Metric:** Mean geodesic error
- **Visualization Tools:** Folium, Matplotlib
- **Robustness Checks:** Test on diverse datasets

## Deployment Notes

- **Model Format:** .h5 file
- **Prediction Script:** Input images and output geographical coordinates
- **User Interface:** (Optional) Flask or Streamlit

## Other Notes

- [Insert any other relevant notes here]
