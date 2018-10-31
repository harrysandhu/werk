from datetime import datetime
from app import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(500), nullable=False)
    salt = db.Column(db.String(500), nullable=False)
    todos = db.relationship('Todo', backref='author', lazy=True)

    def __repr__(self):
        return f"User('{self.id}','{self.username}')"

    

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    status = db.Column(db.Boolean, nullable=False, default=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
         return f"Todo('{self.id}','{self.content}', '{self.status}', '{self.date_posted}', '{self.user_id}')"