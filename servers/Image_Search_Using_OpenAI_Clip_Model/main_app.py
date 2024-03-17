from flask import Flask, config, render_template, flash, request, redirect,url_for
from werkzeug.utils import secure_filename
import os
import src.annoy_search as ann
from flask import g
from flask import Flask, request, jsonify, send_from_directory
import src.config as config

from flask_cors import CORS, cross_origin
app = Flask(__name__)  
import os
CORS(app)
app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy   dog'
app.config['CORS_HEADERS'] = 'Content-Type'
print("hello")
cors = CORS(app, resources={r"/search": {"origins": "http://localhost:3000"}})

def create_app():

    app = Flask(__name__)
    app.secret_key = "secret key"
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
    app.config['UPLOAD_FOLDER'] = config.IMAGES_UPLOAD_PATH
    app.config['USER_UPLOAD_FOLDER'] = config.USER_UPLOAD_FOLDER
    app.config['USER_SEARCH_IMAGE'] = config.USER_SEARCH_IMAGE


    ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])


    @app.teardown_appcontext
    def close_connection(exception):
        db = getattr(g, '_database', None)
        if db is not None:
            db.close()


    def allowed_file(filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


    @app.route('/', methods=['POST', 'GET'])
    def index():
        images = ann.search(search_type=None, search_term_or_image_path=None)
        return render_template('index.html', images=images)

    @app.route('/display/<filename>')
    def display_image(filename):
        return redirect(url_for('static', filename='uploads/' + filename), code=301)

    @app.route('/display_user/<filename>')
    def display_user_image(filename):
        return redirect(url_for('static', filename='user/uploads/' + filename), code=301)

    @app.route('/about')
    def about():
        return render_template('about.html')


    @app.route('/upload', methods=['POST', 'GET'])
    def upload():
        if request.method == 'POST':
            if 'file' not in request.files:
                flash('No file part')
                return redirect(request.url)
            file = request.files['file']
            if file.filename == '':
                flash('No image selected for uploading')
                return redirect(request.url)
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(os.path.join(app.config['USER_UPLOAD_FOLDER'], filename))
                flash('Image successfully uploaded and displayed below')
                return render_template('upload.html', filename=filename)
            else:
                flash('Allowed image types are -> png, jpg, jpeg')
                return redirect(request.url)
        else:
            return render_template("upload.html")

    # @app.route('/search', methods=['POST', 'GET'])

    @app.route('/static/uploads/<filename>')
    def get_image(filename):
        print(filename)
        print("cha")
        return send_from_directory('static/uploads', filename)

    @app.route('/search', methods=['POST', 'GET'])
    @cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
    def search():
        if request.method == 'POST':
            data = request.data.decode('utf-8')
            print("data",data)
            
            images = ann.search("text", data)
            print('hello')
            # return render_template('index.html', images=images)
            # print(images)
            results = [tuple(row) for row in images]
            print("res",results)
            # json_string = jsonify(results)
            # print("json",json_string)
            response = jsonify(results)
            
            response.status_code = 200 # or 400 or whatever
            return response
            # return jsonify({'message': 'done',"image":json_string}), 200
            
      
       
    return app

        

if __name__ == '__main__':
    os.makedirs(config.IMAGES_UPLOAD_PATH, exist_ok=True) # not good a good idea for production
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=7070)