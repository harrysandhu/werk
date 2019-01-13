from . import main
from flask import render_template,request, redirect, session, jsonify, json
from . import authentication_functions as auth
from app import db
from app.models import User, Todo
import hashlib, binascii
import os
import sys
from sqlalchemy import func
from marshmallow import schema, pprint
from .schema.Schema import UserSchema, TodoSchema

@main.route('/s35')
def ind():
    session['id'] = 35
    return 'x'


@main.route("/", methods=['GET'])
def index():
    #logged in

    if session:
        return render_template("home.html" )
    return render_template("index.html")


@main.route("/api/session", methods=['GET'])
def user():
    if session:
        id = session['id']    
        u = User.query.filter_by(id=id).first()
        user = UserSchema().dump(u).data
        print(user)
        return jsonify(user=user)
    else:
        return jsonify(error='unauthorized')    





@main.route("/login", methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    if username != '' and password != '':
            user = User.query.filter_by(username=username).first()
            if user is None:
                return jsonify({'error':'Invalid username/password' })
            elif user.password == password:
                session['id'] = user.id
                session['username'] = user.username
                return jsonify({'success':'true'})
            else:
                return jsonify({'error':'Invalid username/password' })
    return jsonify({'error':'Invalid username/password' })



@main.route('/logout', methods=['GET'])
def logout():
    if session:
        session.pop('username', None)
        session.pop('id', None)
    return jsonify({'success':'true'})



@main.route("/signup", methods=['POST'])
def register():
        #get data
        data = request.get_json()
        username = data['username']
        password = data['password']
        password2 = data['password2']
        #validate
        errors = auth.validate(username, password, password2)
        for a in errors:
            print(a)
        if errors[0] != '' or errors[1] != '':
            return jsonify({'errors':errors, 'error':'true'})
        else:
            user = User(username=username, password=password, salt="salt")
            db.session.add(user)
            db.session.commit()
            if user:
                u = User.query.filter_by(username=username).first()
                session['id'] = u.id
                session['username'] = u.username
                print(session['id'])             
                if session['id']:
                    return jsonify({'session_id': session['id'], 'username': username}) 
        


@main.route("/api/user", methods=['GET'])
def query():
    username = request.args.get('username')
    print(username)
    user_row = User.query.filter_by(username=username).first()
    if user_row is None:
        #not found
        return jsonify({"error":"User not found."})
    else:
        #found
        return jsonify({"username": user_row.username})
    return jsonify({"error": "Invalid parameters."})    


@main.route("/api/todos", methods=['GET'])
def todos():
    if request.method == "GET" and session:
        user_id = session['id']
        todo_rows = Todo.query.filter_by(user_id=user_id).all()
        #Intitialize the schema class with 'many=True' argument
        todos_array = TodoSchema(many=True).dump(todo_rows).data
        #Hash table for todos
        todos = {}
        todosById = []
        index = 0;
        for todo in todos_array:            
            todos[todo['id']] = todo
            todosById.append(todo['id'])

        print(todo)
        return jsonify(todos=todos, todosById=todosById)
    return jsonify(error='Invalid request.')






@main.route("/api/todo", methods=['GET', 'POST'])
def todo():
    if request.method == 'POST' and session:
        data = request.get_json()
        todo = data['todo']
        user_id = session['id']    
        todo_row = Todo(content=todo, user_id=user_id)
        db.session.add(todo_row)
        db.session.commit()
        todo = TodoSchema().dump(todo_row).data 
        if todo:
            return jsonify(todo=todo)
        else:
            return jsonify(error='Something went wrong!')
 
    if request.method == 'GET':
        id = request.args.get('id')
        try:
            todo_row = Todo.query.filter_by(id=id).first()
            todo = TodoSchema().dump(todo_row).data
            return jsonify(todo=todo)
        except Exception as error:
            print(error)
            return jsonify(error='Something went wrong.')
    
    return jsonify(error='Invalid Request.')
            

@main.route("/api/todo/status", methods=['POST'])
def todoStatus():
    data = request.get_json()
    id = data['id']
    status = data['status']
    try:
        todo_row = Todo.query.filter_by(id=id).first()

        if todo_row.status == True:
            todo_row.status = False
        else:
            todo_row.status = True
        db.session.commit()
        todo = TodoSchema().dump(todo_row).data
        print(todo)
        return jsonify(todo=todo)
    except:
        return jsonify({'error':'Something went wrong.'})


@main.route("/api/todo/delete", methods=['POST'])
def deleteTodo():
    data = request.get_json()
    id = data['id']
    if session['id']:
        Todo.query.filter_by(id=id).delete()
        db.session.commit()
        print('yo')
        return jsonify(id=id)
    
       #     return jsonify({'error': 'Something went wrong'})
    return jsonify({'error': 'Invalid request.'})   



@main.route("/api/todo/update", methods=['POST'])
def updateTodo():
    data = request.get_json()
    print(data['id'])
    id = data['id']
    content = data['content']
    user_id = session['id']
    try:
        todo_row = Todo.query.filter_by(id=id, user_id=user_id).first()
        todo_row.content = content
        db.session.commit()
        todo = TodoSchema().dump(todo_row).data
        return jsonify(todo=todo)
    except:
        return jsonify({'error':'Something went wrong!'})

    return jsonify({'error': 'Something went wrong.'})



