import requests
import mapillary
from geopy.geocoders import Nominatim
import os
import csv
import time

# Replace with your actual API key
API_KEY = "YOUR_MAPILLARY_API_KEY"

# Initialize the Mapillary API client
client = mapillary.Client(API_KEY)

# Define the regions to scrape
regions = [
    {"name": "Miami", "coordinates": (25.7617, -80.1918)},
    {"name": "Orlando", "coordinates": (28.5383, -81.3792)},
    {"name": "Tampa", "coordinates": (27.9506, -82.4572)},
]

# Create a directory to store images
image_dir = "mapillary_images"
os.makedirs(image_dir, exist_ok=True)

# Create a CSV file to store metadata
metadata_file = "metadata.csv"
with open(metadata_file, "w", newline="") as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(["Image Path", "Latitude", "Longitude"])

# Function to fetch images for a given region
def scrape_region(region_name, coordinates):
    # Use geopy to get the bounding box for the region
    geolocator = Nominatim(user_agent="mapillary_scraper")
    location = geolocator.reverse(coordinates)
    bounding_box = location.raw["boundingbox"]

    # Fetch images within the bounding box
    images = client.images.search(
        bbox=bounding_box,
        # Add any other search parameters as needed
    )

    # Download and save images
    for image in images:
        image_url = image.thumbnail_url
        image_path = os.path.join(image_dir, f"{image.key}.jpg")
        response = requests.get(image_url, stream=True)
        with open(image_path, "wb") as f:
            for chunk in response.iter_content(chunk_size=1024):
                if chunk:
                    f.write(chunk)

        # Write metadata to the CSV file
        with open(metadata_file, "a", newline="") as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow([image_path, image.latitude, image.longitude])

        # Implement rate limiting
        time.sleep(1)  # Wait for 1 second before making the next request

# Scrape each region
for region in regions:
    scrape_region(region["name"], region["coordinates"])

print("Data scraping complete!")
