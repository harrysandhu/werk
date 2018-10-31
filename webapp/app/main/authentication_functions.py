import re
from app.models import User
from flask import session
def validate_username(username):
    e = ''
    u = User.query.filter_by(username=username).first()
    print(u)
    if len(username) < 3:
        e = 'Username must be minimum 3 characters long.'
        return e
    elif re.match('^[a-zA-Z0-9._]+$', username) is None:
        e = 'Username not allowed.'
        return e
    elif u:
        e = 'Username not available'
        return e
    else:
        return e

def validate_password(password, password2):
    e = ''
    if len(password) < 8:
        e = 'Password should be at least 8 characters long.'
        return e
    elif password != password2:
        e = 'Passwords do not match.'
        return e
    else:
        return e

    
def validate(username, password, password2):
    #validates form and returns error if any
    errors = []
    username_errors = validate_username(username)
    password_errors = validate_password(password, password2)
    print(type(username_errors))
    errors.append(username_errors) 
    errors.append(password_errors)

    return errors


def userLoggedIn(id):
    if session[id]:
        return True
    else:
        return False