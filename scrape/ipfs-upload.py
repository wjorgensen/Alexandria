import json
import os
import subprocess

def upload_to_ipfs(file_path):
    try:
        result = subprocess.run(['ipfs', 'add', file_path], capture_output=True, text=True)
        output = result.stdout
        # The output format is expected to be: "added <CID> <Filename>"
        ipfs_hash = output.split()[1]  # Extract the CID from the output
        return ipfs_hash
    except Exception as e:
        print(f"Error uploading {file_path} to IPFS: {e}")
        return None

def update_metadata_with_ipfs_cid(metadata_file, directory_path, output_path):
    with open(metadata_file, 'r', encoding='utf-8') as f:
        metadata_objects = json.load(f)
    
    updated_metadata = []
    
    for metadata in metadata_objects:
        original_cid = metadata["cid"]
        file_name = f"{original_cid}.txt"
        file_path = os.path.join(directory_path, file_name)
        ipfs_cid = upload_to_ipfs(file_path)

        if ipfs_cid:
            print(f"Uploaded {file_name} to IPFS with CID: {ipfs_cid}")
            metadata["cid"] = ipfs_cid
        else:
            print(f"Failed to upload {file_name} to IPFS.")
        
        updated_metadata.append(metadata)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(updated_metadata, f, indent=2)

# Example usage
metadata_file_path = '/mnt/IPFS/metadata_output.json'  # Update this path
directory_path = '/mnt/IPFS/files'  # Update this path
output_path = os.path.expanduser('~/IPFS/metadata_output.json')
update_metadata_with_ipfs_cid(metadata_file_path, directory_path, output_path)
