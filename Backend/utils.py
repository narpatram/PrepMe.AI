import boto3
from botocore.exceptions import NoCredentialsError

AWS_S3_BUCKET = "your-bucket-name"  # Replace with your bucket name
AWS_REGION = "us-east-1"  # Replace with your AWS region

# Initialize S3 client
s3_client = boto3.client("s3")

def upload_file_to_s3(file_obj, object_name: str):
    """Uploads a file to S3 and returns the file URL"""
    try:
        s3_client.upload_fileobj(file_obj, AWS_S3_BUCKET, object_name)
        return f"https://{AWS_S3_BUCKET}.s3.{AWS_REGION}.amazonaws.com/{object_name}"
    except NoCredentialsError:
        return "AWS credentials not found!"

def generate_presigned_url(file_name: str, expiration: int = 3600):
    """Generates a pre-signed URL for downloading a file"""
    try:
        url = s3_client.generate_presigned_url(
            "get_object",
            Params={"Bucket": AWS_S3_BUCKET, "Key": file_name},
            ExpiresIn=expiration,
        )
        return url
    except Exception as e:
        return str(e)
