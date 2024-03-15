import re
import json
from pathlib import Path
import os

def process_file_metadata(file_path):
    metadata_pattern = re.compile(r"(Title|Author|Release Date):\s*(.*)")
    metadata = {
        "name": "None",
        "author": "None",
        "medium": "Book",
        "yearReleased": "None",
        "language": "English",
        "cid": Path(file_path).stem
    }
    
    with open(file_path, 'r', encoding='utf-8', errors='replace') as file:
        for line in file:
            match = metadata_pattern.match(line)
            if match:
                key, value = match.groups()
                value = value.lower().replace(" ", "")
                if key == "Title":
                    metadata["name"] = value
                elif key == "Author":
                    metadata["author"] = value
                elif key == "Release Date":
                    year_match = re.search(r"\d{4}", value)
                    if year_match:
                        metadata["yearReleased"] = year_match.group()
    return metadata

def process_files(directory_path, last_file_number):
    metadata_objects = []
    
    for file_number in range(1, last_file_number + 1):
        file_path = Path(directory_path) / f"{file_number}.txt"
        if file_path.exists():
            metadata = process_file_metadata(file_path)
            metadata_objects.append(metadata)
        print(f"Processed file number: {file_number}")
    
    return metadata_objects

# Replace 'your_directory_path' with the path to your directory of text files
metadata_objects = process_files("/Volumes/Untitled/files", 64076)

# Write the array of JavaScript objects to a JSON file
output_file = os.path.expanduser("~/metadata_output.json")

with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(metadata_objects, f, indent=2)
