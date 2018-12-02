from . import main
from flask import render_template,request, redirect, session, jsonify, json
from . import authentication_functions as auth
from app import db
from app.models import User, Todo
import hashlib, binascii
import os
import sys
from sqlalchemy import func
@main.route("/", methods=['GET'])
def index():
    #logged in
    
    if session:
        return render_template("home.html" )
    return render_template("index.html")


@main.route("/api/session", methods=['GET'])
def user():

    if session:
        print(session)
        id = session['id']
        u = User.query.filter_by(id=id).first()
        
        user = {'id': u.id, 'username': u.username}
        return jsonify({'user':user})
    else:
        return jsonify({'error':'Not authenticated.'})



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
                    return jsonify({'session_id': session['id'], 'username': username, 'success': 'true'}) 
        


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
        todos = Todo.query.filter_by(user_id=user_id).all()
        t_list = []

        for t in todos:
            t_obj = {'id':t.id, 'content':t.content, 'date_posted':  t.date_posted, 'status':t.status }
            t_list.insert(0, t_obj)
        
        print(t_list)
        return jsonify({'todos':t_list, 'success': 'true'})
    return jsonify({"error": "Invalid Request"})   

@main.route("/api/todo", methods=['GET', 'POST'])
def todo():
    if request.method == 'POST':
        data = request.get_json()
        todo = data['todo']
        t = Todo(content=todo, user_id=session['id'])
        db.session.add(t)
        db.session.commit()
        if t:
            return jsonify({'id':t.id, 'content':t.content, 'date_posted':  t.date_posted, 'status':t.status,  'success': 'true'})
        else:
            return jsonify({'error':'Something went wrong.'})   
    if request.method == 'GET':
        id = request.args.get('id')
        try:
            todo = Todo.query.filter_by(id=id).first()
            if todo:
                t_obj = {'id':todo.id, 'content':todo.content, 'status':todo.status }
                return jsonify({'todo': t_obj, 'success': 'true'})
        except:
            return jsonify({'error': 'Invalid Request'})
    return jsonify({"error": "Something Went Wrong."}) 

@main.route("/api/todo/status", methods=['POST'])
def todoStatus():
    data = request.get_json()
    id = data['id']
    status = data['status']
    try:
        todo = Todo.query.filter_by(id=id).first()
        if status is True:
            todo.status = False
        else:
            todo.status = True
        db.session.commit()
        return jsonify({'status':todo.status, 'success':'true'})
    except:
        return jsonify({'error':'Something went wrong.'})


@main.route("/api/todo/delete", methods=['POST'])
def deleteTodo():
    data = request.get_json()
    id = data['id']
    if session['id']:
        try:
            todo = Todo.query.filter_by(id=id).delete()
            print(todo)
            db.session.commit()
            print('yo')
            return jsonify({'success':'true'})
        except:
            print('nah')
            return jsonify({'error': 'Something went wrong'})
    return jsonify({'error': 'Invalid request.'})   