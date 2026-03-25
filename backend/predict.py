import argparse
import torch
from torchvision import transforms
from PIL import Image
import json
import sys
import torch.nn as nn
import torchvision.models as models

# ------------ MODEL LOADING ------------
def load_model(model_name):
    if model_name == "ResNet-50":
        model = models.resnet50(pretrained=False)
        model.fc = nn.Linear(2048, 11)
        model.load_state_dict(torch.load("resnet50.pt", map_location="cpu"))
        model.eval()
        return model

    elif model_name == "DenseNet-121":
        model = models.densenet121(pretrained=False)
        model.classifier = nn.Linear(1024, 11)
        model.load_state_dict(torch.load("densenet121.pt", map_location="cpu"))
        model.eval()
        return model

    elif model_name == "MobileNetV2":
        model = models.mobilenet_v2(pretrained=False)
        model.classifier[1] = nn.Linear(1280, 11)
        model.load_state_dict(torch.load("mobilenetv2_100.pt", map_location="cpu"))
        model.eval()
        return model

    elif model_name == "EfficientNet-B0":
        model = models.efficientnet_b0(pretrained=False)
        model.classifier[1] = nn.Linear(1280, 11)
        model.load_state_dict(torch.load("efficientnet_b0.pt", map_location="cpu"))
        model.eval()
        return model

    else:
        raise ValueError("Unknown model name")

# ------------ IMAGE PREPROCESSING ------------
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

# ------------ PREDICT FUNCTION ------------
def predict(model_name, image_path):
    model = load_model(model_name)

    img = Image.open(image_path).convert("RGB")
    img = transform(img).unsqueeze(0)

    with torch.no_grad():
        output = model(img)
        confidence, predicted = torch.max(torch.softmax(output, dim=1), 1)

    # You MUST replace this list with your real labels
    classes = [
        "Healthy Leaf",
        "Early Blight",
        "Late Blight",
        "Leaf Mold",
        "Bacterial spot",
        "Powdery Mildew",
        "Septoria leaf spot",
        "Spider mites Two spotted spider mite",
        "Target spot",
        "Tomato mosaic virus",
        "Tomato yellow leaf curl virus"
    ]

    disease = classes[predicted.item()]
    confidence = round(confidence.item() * 100, 2)

    return disease, confidence

# ------------ MAIN CODE ------------
if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--model", required=True)
    parser.add_argument("--image", required=True)
    args = parser.parse_args()

    disease, confidence = predict(args.model, args.image)

    result = {
        "disease": disease,
        "confidence": confidence
    }

    print(json.dumps(result))   # return JSON to Node
    sys.stdout.flush()
