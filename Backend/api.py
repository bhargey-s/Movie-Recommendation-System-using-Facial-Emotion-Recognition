import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
from deepface import DeepFace
import cv2
import matplotlib.pyplot as plt

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this with the appropriate origin or origins
    allow_methods=["*"],  # Update this with the appropriate HTTP methods
    allow_headers=["*"],  # Update this with the appropriate headers
)

model = DeepFace


class ImageData(BaseModel):
    image: str


@app.get('/index')
def getprediction():
    return {'emotion': 'Happy'}


@app.post('/predict')
def detectEmotion(data: ImageData):
    image = data.image

    try:
        prediction = model.analyze(image)
        return {'emotion': prediction}
    except:
        return ({'emotion': {}})


if __name__ == "__main__":
    uvicorn.run(app, host='127.0.0.1', port=8000)
