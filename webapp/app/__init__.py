from flask import Flask
from config import DevelopmentConfig
from flask_sqlalchemy import SQLAlchemy
 

 
app = Flask(__name__)
app.config.from_object(DevelopmentConfig)
db = SQLAlchemy(app)

from app.models import User, Todo

from app.main import main as main_blueprint
app.register_blueprint(main_blueprint)

