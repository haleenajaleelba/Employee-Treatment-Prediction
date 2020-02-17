from models.admin import Admin
from flask_restful import Resource, Api, reqparse
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, jwt_required, jwt_refresh_token_required
from werkzeug.security import safe_str_cmp

class AdminLogin(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('username',
                        type=str,
                        required=True,
                        help="This field cannot be blank."
                        )
    parser.add_argument('password',
                        type=str,
                        required=True,
                        help="This field cannot be blank."
                        )
    
    def post(self):
        data = self.parser.parse_args()

        admin = Admin.find_by_username(data['username'])

        # print(data['password'], admin['password'])

        if admin and safe_str_cmp(admin['password'], data['password']):
            access_token = create_access_token(identity=admin['id'], fresh=True)
            refresh_token = create_refresh_token(admin['id'])
            return {
                "access_token": access_token,
                "refresh_token": refresh_token
            }, 200
        
        return {"message": "Invalid credentials!"}, 401


class TokenRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        # retrive the user's identity from the refresh token using a Flask-JWT-Extended built-in method
        current_user = get_jwt_identity()
        # return a non-fresh token for the user
        new_token = create_access_token(identity=current_user, fresh=False)
        return {'access_token': new_token}, 200

# Endpoints decorated with @jwt_refresh_token_required require that an Authorization: Bearer {refresh_token} header is included in the request.

# An endpoint that requires a valid access token (non-expired, either fresh or non-fresh)
# @jwt_required
# def get(self):
#     pass

# An endpoint that requires a valid fresh access token (non-expired and fresh only)
# @fresh_jwt_required
# def post(self):
#     pass