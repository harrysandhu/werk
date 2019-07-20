from marshmallow import Schema, fields

class UserSchema(Schema):
    id = fields.Integer()
    username = fields.Str()
    

class TodoSchema(Schema):
    id  = fields.Integer()
    content = fields.Str()
    status = fields.Boolean()
    date_posted = fields.DateTime()
    user_id = fields.Integer()