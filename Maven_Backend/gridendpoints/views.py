from django.shortcuts import render
import pymongo
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render
from bson.json_util import dumps, loads
import cloudinary.uploader as uploader
import cloudinary
from keras.models import Sequential
from keras_contrib.losses import crf_loss
from keras_contrib.metrics import crf_viterbi_accuracy
import torch 
from diffusors import StableDiffusionPipeline

pipe = StableDiffusionPipeline.from_pretrained("CompVis/stable-diffusion-v1-4", torch_dtype=torch.float16)
client = pymongo.MongoClient('mongodb+srv://saisambhavchaini:Koitohai@cluster0.bme2n0o.mongodb.net/?retryWrites=true&w=majority')


Cluster_db = client['Cluster0']
page_size = 20

Product_collection = Cluster_db['ProductDetails']
Users_collection = Cluster_db['UserData']

# To save model
model.save('llama-2-fashion_generator.hdf5')

# To load the model
custom_objects={'CRF': CRF,'crf_loss': crf_loss,'crf_viterbi_accuracy':crf_viterbi_accuracy}

# To load a persisted model that uses the CRF layer 
model1 = load_model("/home/sam_7/llama-2-fashion_generator.hdf5", custom_objects = custom_objects)

def get_json_response(cursor):
    """Converts a PyMongo cursor to a REST JSON response."""

    # Convert the cursor to a list of dictionaries.
    documents = list(cursor)

    # Convert the list of dictionaries to JSON.
    json_data = dumps(documents)

    # Return the JSON data.
    return json_data

@api_view(['POST'])
def sign_up(request):
    body = request.data
    document = {
        "username": body["name"],
        "email": body["email"],
        "password": body["password"],
        "age": body["age"],
        "gender": body["gender"],
        "past_orders": [],
    }
    Users_collection.insert_one(document)
    return Response({"response": "user created successfully"}, status=status.HTTP_200_OK)

@api_view(['POST'])
def log_in(request):
    body = request.data
    user_details = Users_collection.find({"email": body["email"]})
    if user_details[0]['password'] == body["password"]:
        return Response({"response": "user logged in successfully", "user": get_json_response(user_details)}, status=status.HTTP_200_OK)
    else:
        return Response({"response": "user auth wrong"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def get_prod_count(request):
    return Response({"status": "success", "data": Product_collection.count()}, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_prod_by_id(request):
    prod_id = request.query_params.get('id')
    prod_details = Product_collection.find({"id": prod_id})
    resp = get_json_response(prod_details)
    return Response({"data": resp}, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_prod_by_query(request):
    prod_query = request.query_params.get('q')
    query_params = request.query_params
    page_number = int(query_params.get('page_number'))

    # regex_q = pymongo.regex.Regex(prod_query)
    query_details = {
        "productDisplayName": {
            "$regex": prod_query
        }
    }
    offset = (page_number - 1)*page_size
    cursor = Product_collection.find(query_details)
    cursor.skip(offset)
    cursor.limit(page_size)
    resp = get_json_response(cursor)
    return Response({"data": resp}, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_all_prod(request):
    query_params = request.query_params
    page_number = int(query_params.get('page_number'))
    query_details = {}
    for key in query_params.keys():
        if(key == 'page_number'):
            continue
        if(key == 'q'):
            query_details['productDisplayName'] = {
                "$regex": query_params[key]
            }
        else:
            query_details[key]=query_params[key]
    
    offset = (page_number - 1)*page_size
    cursor = Product_collection.find(query_details)
    cursor.skip(offset)
    cursor.limit(page_size)
    resp = get_json_response(cursor)
    return Response({"data": resp, "page_number": page_number}, status=status.HTTP_200_OK)

@api_view(['POST'])
def send_prompt(request):
    body = request.data
    prompt = body['prompt']
    userhistory = body['userhistory']
    response = model1.predict(prompt, userhistory)
    images = pipe(response).images
    return Response({"response": response, "product": images},status=status.HTTP_200_OK)
