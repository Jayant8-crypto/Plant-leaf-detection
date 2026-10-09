import io
import logging
import os
from contextlib import asynccontextmanager

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, UnidentifiedImageError

from app.model import load_model_and_labels, model_is_loaded, predict_image


logger = logging.getLogger(__name__)
MAX_UPLOAD_BYTES = 5 * 1024 * 1024
CORS_ORIGINS = [
    origin.strip()
    for origin in os.getenv(
        "CORS_ORIGINS",
        "http://localhost:3000,http://127.0.0.1:3000",
    ).split(",")
    if origin.strip()
]


@asynccontextmanager
async def lifespan(_app: FastAPI):
    load_model_and_labels()
    yield


app = FastAPI(title="Cotton Disease Analyzer API", lifespan=lifespan)


app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "Cotton Disease Analyzer API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model": "cotton_disease_cnn",
        "model_loaded": model_is_loaded(),
    }


@app.post("/api/analyze")
async def analyze_leaf(file: UploadFile = File(...)):

    allowed_types = {
        "image/jpeg",
        "image/png",
        "image/jpg",
    }

    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Only JPG, JPEG and PNG images are allowed."
        )

    image_data = await file.read(MAX_UPLOAD_BYTES + 1)

    if not image_data:
        raise HTTPException(
            status_code=400,
            detail="Uploaded image is empty."
        )

    if len(image_data) > MAX_UPLOAD_BYTES:
        raise HTTPException(
            status_code=413,
            detail="Image must be 5 MB or smaller.",
        )

    try:
        with Image.open(io.BytesIO(image_data)) as image:
            image.verify()
    except (
        UnidentifiedImageError,
        OSError,
        ValueError,
        SyntaxError,
        Image.DecompressionBombError,
    ):
        raise HTTPException(
            status_code=400,
            detail="Uploaded file is not a valid JPG or PNG image.",
        ) from None

    try:
        prediction = predict_image(image_data)

        return {
            "success": True,
            "filename": file.filename,
            "crop": "cotton",
            "prediction": prediction,
            "message": "Image analyzed successfully."
        }

    except Exception:
        logger.exception("Prediction failed")
        raise HTTPException(
            status_code=500,
            detail="Prediction failed. Please try again later.",
        ) from None