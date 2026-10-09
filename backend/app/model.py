import io
import json
from pathlib import Path

try:
    import numpy as np
    import tensorflow as tf
    from PIL import Image
except ImportError as exc:  # pragma: no cover - handled at runtime
    np = None
    tf = None
    Image = None
    _IMPORT_ERROR = exc
else:
    _IMPORT_ERROR = None


# backend/
BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "models" / "cotton_disease_cnn.keras"
CLASS_NAMES_PATH = BASE_DIR / "class_names.json"

_model = None
_class_names = None


def _load_model_and_labels():
    global _model, _class_names

    if _IMPORT_ERROR is not None:
        raise RuntimeError(
            "TensorFlow dependencies are not installed. Run: pip install -r requirements.txt"
        ) from _IMPORT_ERROR

    if _model is None:
        print(f"Loading CNN model from: {MODEL_PATH}")
        _model = tf.keras.models.load_model(MODEL_PATH)
        print("CNN model loaded successfully.")

    if _class_names is None:
        with open(CLASS_NAMES_PATH, "r", encoding="utf-8") as file:
            _class_names = json.load(file)
        print("Classes:", _class_names)

    if not isinstance(_class_names, list) or not all(
        isinstance(class_name, str) for class_name in _class_names
    ):
        raise RuntimeError("Class names must be a JSON list of strings.")

    if _model.input_shape[1:] != (128, 128, 3):
        raise RuntimeError("The CNN model must accept 128x128 RGB images.")

    if _model.output_shape[-1] != len(_class_names):
        raise RuntimeError("The CNN output count does not match class_names.json.")

    return _model, _class_names


def load_model_and_labels():
    return _load_model_and_labels()


def model_is_loaded():
    return _model is not None and _class_names is not None


def predict_image(image_bytes: bytes):
    model, class_names = _load_model_and_labels()

    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize((128, 128))

    image_array = np.array(image, dtype=np.float32)
    image_array = np.expand_dims(image_array, axis=0)

    predictions = model.predict(image_array, verbose=0)
    probabilities = predictions[0]

    predicted_index = int(np.argmax(probabilities))
    confidence = float(probabilities[predicted_index])
    disease = class_names[predicted_index]

    return {
        "disease": disease,
        "confidence": confidence,
        "class_index": predicted_index,
    }