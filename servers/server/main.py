# from flask import Flask, request, jsonify
# from tensorflow.keras.preprocessing import image
# from tensorflow.keras.layers import GlobalMaxPooling2D
# from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
# from tensorflow.keras.models import Sequential
# import numpy as np
# from numpy.linalg import norm
# import os
# import pickle

# app = Flask(__name__)

# model = ResNet50(weights="imagenet", include_top=False, input_shape=(224, 224, 3))
# model.trainable = False

# model = Sequential([model, GlobalMaxPooling2D()])

# def extract_features(img_path, model):
#     # ... (your existing feature extraction code)

# @app.route('/api/extract-features', methods=['POST'])
# def process_image():
#     if 'image' not in request.files:
#         return jsonify({'error': 'No image provided'}), 400

#     image_file = request.files['image']

#     if image_file.filename == '':
#         return jsonify({'error': 'No selected file'}), 400

#     try:
#         image_features = extract_features(image_file, model)
#         response = {'features': image_features.tolist()}
#         return jsonify(response), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)






# Replace this path with the actual path to your image directory






import tensorflow
import pandas as pd
from PIL import Image
import pickle
import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
from tensorflow.keras.layers import GlobalMaxPooling2D
from tensorflow.keras.models import Sequential
from flask import Flask, request, jsonify, send_from_directory
app = Flask(__name__, static_folder='static')  
from numpy.linalg import norm
from flask_cors import CORS, cross_origin
from sklearn.neighbors import NearestNeighbors
import os
CORS(app)
# IMAGE_DIRECTORY = '/fashion_small/images/' 
app.config['CORS_HEADERS'] = 'Content-Type'

features_list = pickle.load(open("image_features_embedding.pkl", "rb"))
img_files_list = pickle.load(open("img_files.pkl", "rb"))
# img_dir = "D:\grid\\resources\New folder (2)\Fashion-Recommender-system\\fashion_small"



model = ResNet50(weights="imagenet", include_top=False, input_shape=(224, 224, 3))
model.trainable = False
model = Sequential([model, GlobalMaxPooling2D()])


def save_file(uploaded_file):
    try:
        with open(os.path.join("uploader", uploaded_file.name), 'wb') as f:
            f.write(uploaded_file.getbuffer())
            return 1
    except:
        return 0
    


def extract_img_features(img_path, model):
    print("imgpath",img_path)
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    expand_img = np.expand_dims(img_array, axis=0)
    preprocessed_img = preprocess_input(expand_img)
    result_to_resnet = model.predict(preprocessed_img)
    flatten_result = result_to_resnet.flatten()
    # normalizing
    print('hello6')
    result_normlized = flatten_result / norm(flatten_result)

    return result_normlized


def recommendd(features, features_list):
    neighbors = NearestNeighbors(n_neighbors=6, algorithm='brute', metric='euclidean')
    neighbors.fit(features_list)

    distence, indices = neighbors.kneighbors([features])

    return indices



@app.route('/fashion_small/images/<filename>')
def get_image(filename):
    print(filename)
    print("cha")
    return send_from_directory(app.static_folder, filename)

# uploaded_file = st.file_uploader("Choose your image")
@app.route('/api/extract-features', methods=['POST'])
@cross_origin()
def process_image():
   
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    print('hey')
    uploaded_file = request.files['image']
    print(uploaded_file)
    if save_file(uploaded_file):
        # display image
        # show_images = Image.open(uploaded_file)
        # size = (400, 400)
        # resized_im = show_images.resize(size)
        
        # extract features of uploaded image
        features = extract_img_features(os.path.join("uploader", uploaded_file.name), model)
        print('hello2')
        #st.text(features)
        img_indicess = recommendd(features, features_list)[0]
        print(img_indicess)
        list=[]
        for i in img_indicess:
            
            print(img_files_list[i])
            list.append(img_files_list[i])
        
        return jsonify({'message': 'done',"list":list}), 200
        # # col1,col2,col3,col4,col5 = st.columns(5)

        # with col1:
        #     st.header("I")
        #     st.image(img_files_list[img_indicess[0][0]])

        # with col2:
        #     st.header("II")
        #     st.image(img_files_list[img_indicess[0][1]])

        # with col3:
        #     st.header("III")
        #     st.image(img_files_list[img_indicess[0][2]])

        # with col4:
        #     st.header("IV")
        #     st.image(img_files_list[img_indicess[0][3]])

        # with col5:
        #     st.header("V")
        #     st.image(img_files_list[img_indicess[0][4]])
    else:
        return jsonify({'error': 'some error occured'}), 400

if __name__ == '__main__':
    app.run(debug=True)
