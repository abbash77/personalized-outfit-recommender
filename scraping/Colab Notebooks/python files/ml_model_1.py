# -*- coding: utf-8 -*-
"""ml-model-1.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1S_z51-pTXx8i0mhdJ1HQoliNKrgZSI-3

## MODEL FOR EXTRACTING TYPE OF CLOTH, COLOR FROM PICTURE
"""

!wget  t.dripemail2.com/c/eyJhY2NvdW50X2lkIjoiNDc2ODQyOSIsImRlbGl2ZXJ5X2lkIjoiNGx2MjNucTVyb3E3ZHl5bTViZzgiLCJ1cmwiOiJodHRwOi8vcHlpbWcuY28veHVsd3o_X19zPTJueWptNWE2c2F0eXdrcWlqcnkwIn0 -O code.zip
!unzip code.zip

# Commented out IPython magic to ensure Python compatibility.
# %cd keras-multi-label/

!python3 train.py --dataset ./dataset  --model new.model --labelbin abc.pickle

# Commented out IPython magic to ensure Python compatibility.
# %cp -r /content/drive/My\ Drive/data/* /content/keras-multi-label/dataset/

# Commented out IPython magic to ensure Python compatibility.
# %cd /content/drive/My\ Drive/

!wget  t.dripemail2.com/c/eyJhY2NvdW50X2lkIjoiNDc2ODQyOSIsImRlbGl2ZXJ5X2lkIjoiNGx2MjNucTVyb3E3ZHl5bTViZzgiLCJ1cmwiOiJodHRwOi8vcHlpbWcuY28veHVsd3o_X19zPTJueWptNWE2c2F0eXdrcWlqcnkwIn0 -O code.zip
!unzip code.zip

# Commented out IPython magic to ensure Python compatibility.
# %cp data/* keras-multi-label/dataset/ -r

# Commented out IPython magic to ensure Python compatibility.
# %cd keras-multi-label/

!python3 train.py --dataset ./dataset  --model new_fashion.model --labelbin new_bin.pickle

# Commented out IPython magic to ensure Python compatibility.
# %cd /content/drive/My\ Drive/keras-multi-label

!mkdir test

!curl https://media.vogue.co.uk/photos/5f05e6b9100363e6123065b4/2:3/w_3840%2cc_limit/musesuniform_104015415_154661506176557_2551978359224582867_n.jpg -o test/image.jpg

!cp new_* ../../../

# Commented out IPython magic to ensure Python compatibility.
# %cd /content/

!mkdir test
k = 0

!curl https://media.vogue.co.uk/photos/5eb93bc37bbee730113fff41/2:3/w_3840%2cc_limit/GettyImages-2673657.jpg -o test/image.jpg

# USAGE
!curl blob:https://web.whatsapp.com/2a548536-4cf8-463c-bfe9-982ebe42a80a -o test/image.jpg
# import the necessary packages
from keras.preprocessing.image import img_to_array
from keras.models import load_model
import numpy as np
import argparse
import imutils
import pickle
import cv2
import os
from google.colab.patches import cv2_imshow
# construct the argument parse and parse the arguments
# ap = argparse.ArgumentParser()
# ap.add_argument("-m", "--model", required=True,
# 	help="path to trained model model")
# ap.add_argument("-l", "--labelbin", required=True,
# 	help="path to label binarizer")
# ap.add_argument("-i", "--image", required=True,
# 	help="path to input image")
# args = vars(ap.parse_args())


# load the image
image = cv2.imread("./test/image.jpg")
os.rename("./test/image.jpg","./test/image" + str(k)+ ".jpg")
k += 1
output = imutils.resize(image, width=400)
 
# pre-process the image for classification
image = cv2.resize(image, (96, 96))
image = image.astype("float") / 255.0
image = img_to_array(image)
image = np.expand_dims(image, axis=0)

# load the trained convolutional neural network and the multi-label
# binarizer
print("[INFO] loading network...")
model = load_model("./new_fashion.model")
mlb = pickle.loads(open("./new_bin.pickle", "rb").read())

# classify the input image then find the indexes of the two class
# labels with the *largest* probability
print("[INFO] classifying image...")
proba = model.predict(image)[0]
idxs = np.argsort(proba)[::-1][:2]

# loop over the indexes of the high confidence class labels
for (i, j) in enumerate(idxs):
	# build the label and draw the label on the image
	label = "{}: {:.2f}%".format(mlb.classes_[j], proba[j] * 100)
	cv2.putText(output, label, (10, (i * 30) + 25), 
		cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)

# show the probabilities for each of the individual labels
for (label, p) in zip(mlb.classes_, proba):
	print("{}: {:.2f}%".format(label, p * 100))

# show the output image
cv2_imshow(output)
# cv2.waitKey(0)

