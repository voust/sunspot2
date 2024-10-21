import requests
import mapillary
import json
import os
import csv

# Replace with your actual API key
API_KEY = "YOUR_MAPILLARY_API_KEY"

# Define target region (Florida)
regions = [
    {
        "name": "Florida",
        "bbox": [
            -87.634938, 24.523096, -80.031362, 31.000888
        ]
    }
]

# Create a directory to store images
images_dir = "images"
os.makedirs(images_dir, exist_ok=True)

# Initialize Mapillary API client
client = mapillary.Client(API_KEY)

# Function to fetch images within a bounding box
def fetch_images(region_name, bbox):
    # Set up the Mapillary API request
    params = {
        "bbox": ",".join(map(str, bbox)),
        "type": "image",
        "per_page": 100  # Adjust as needed
    }

    # Fetch images from Mapillary
    response = client.get_images(params=params)

    # Process images
    image_data = []
    for image in response.json()["images"]:
        # Download image
        image_url = image.get("key")
        image_path = os.path.join(images_dir, f"{region_name}_{image.get('id')}.jpg")
        try:
            response = requests.get(image_url, stream=True)
            response.raise_for_status()
            with open(image_path, "wb") as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            image_data.append({
                "image_path": image_path,
                "latitude": image.get("geometry").get("coordinates")[1],
                "longitude": image.get("geometry").get("coordinates")[0]
            })
        except requests.exceptions.RequestException as e:
            print(f"Error downloading image: {e}")

    return image_data

# Main script
if __name__ == "__main__":
    # Create a CSV file to store metadata
    metadata_file = "metadata.csv"
    with open(metadata_file, "w", newline="") as csvfile:
        fieldnames = ["image_path", "latitude", "longitude"]
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()

        for region in regions:
            print(f"Fetching images for {region['name']}")
            image_data = fetch_images(region['name'], region['bbox'])
            for data in image_
                writer.writerow(data)
