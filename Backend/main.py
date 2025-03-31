from fastapi import FastAPI, File, UploadFile
import boto3
from fastapi.middleware.cors import CORSMiddleware
from utils import upload_file_to_s3, generate_presigned_url

app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

AWS_S3_BUCKET = "prepme.ai"
s3_client = boto3.client("s3")

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """Upload file to S3 using utility function"""
    file_url = upload_file_to_s3(file.file, file.filename)
    return {"message": f"File {file.filename} uploaded successfully", "url": file_url}

@app.get("/download/{file_name}")
def download_file(file_name: str):
    """Generate a pre-signed URL for downloading a file"""
    url = generate_presigned_url(file_name)
    return {"url": url}