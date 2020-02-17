from flask import Flask, jsonify
from flask_restful import Resource, Api, reqparse
from flask_jwt_extended import create_access_token, create_refresh_token, JWTManager, jwt_required
from flask_mail import Mail, Message
from flask_cors import CORS
import os

from employee_api import EmployeeRegister, EmployeeGetAll
from admin_api import AdminLogin, TokenRefresh

app = Flask(__name__)
app.config['PROPAGATE_EXCEPTIONS'] = True
app.secret_key = "it's a secret"
api = Api(app)
CORS(app)

jwt = JWTManager(app)

mail_settings = {
    "MAIL_SERVER": "smtp.gmail.com",
    "MAIL_PORT": 465,
    "MAIL_USE_TLS": False,
    "MAIL_USE_SSL": True,
    "MAIL_USERNAME": os.environ["EMAIL_USERNAME"],
    "MAIL_PASSWORD": os.environ["EMAIL_PASSWORD"]
}

app.config.update(mail_settings)
mail = Mail(app)


@app.route('/')
def home():
    return jsonify({"message": "Api running successfully"})


api.add_resource(EmployeeRegister, '/registeremployee')
api.add_resource(EmployeeGetAll, '/getallemployee')
api.add_resource(AdminLogin, '/adminlogin')
api.add_resource(TokenRefresh, '/refreshtoken')

# from mail_api import MailSender

class MailSender(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('tomail',
                        type=str,
                        required=True,
                        help="To 'mail' is required"
                        )
    parser.add_argument('subject',
                        type=str,
                        required=True,
                        help="Subject field is required"
                        )
    parser.add_argument('message',
                        type=str,
                        required=True,
                        help="Message field is required"
                        )

    @jwt_required
    def post(self):
        data = self.parser.parse_args()
        # print("65",data)
        # print("66", data['tomail'])
        with app.app_context():
            msg = Message(subject=data['subject'],
                          sender=app.config.get("MAIL_USERNAME"),
                          recipients=[data['tomail']],
                          body=data['message']
                          )
            mail.send(msg)
        return {"message": "Mail sent successfully"}, 200


api.add_resource(MailSender, '/sendmail')

app.run(port=4500, debug=True)
