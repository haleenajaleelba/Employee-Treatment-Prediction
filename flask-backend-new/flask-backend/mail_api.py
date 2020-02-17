from flask_restful import Resource, reqparse
from flask_mail import Mail, Message
from flask_jwt_extended import jwt_required

from app import mail, app


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
        print("29",data)
        print("30", data['tomail'])
        # with app.app_context():
        #     msg = Message(subject=data['subject'],
        #                   sender=app.config.get("MAIL_USERNAME"),
        #                   recipients=[data['tomail']],
        #                   body=data['message']
        #                   )
        #     mail.send(msg)
        return {"message": "Mail sent successfully"}
