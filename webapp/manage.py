from app import app
from app import db
from app.models import *

if __name__ == "__main__":
    db.create_all()
    app.run('0.0.0.0', 4000, debug=True)
