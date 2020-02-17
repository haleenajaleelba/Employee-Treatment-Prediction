import sqlite3
from flask_restful import Resource, reqparse
from mlmodel_copy import get_prediction
from flask_jwt_extended import jwt_required


columnlist =  [
    'id', 'email', 'Age', 'Gender', 'Country', 
    'self_employed', 'family_history', 'work_interfere', 'no_employees', 'remote_work',
    'tech_company', 'benefits', 'care_options', 'wellness_program', 'seek_help',
    'anonymity', 'leave', 'mental_health_consequence', 'phys_health_consequence', 'coworkers',
    'supervisor', 'mental_health_interview', 'phys_health_interview', 'mental_vs_physical', 'obs_consequence',
    'comments', 'treatment'
] 

class EmployeeRegister(Resource):
    parser = reqparse.RequestParser()
    # 0
    parser.add_argument('email', type=str)
    # 1
    parser.add_argument('Age',
                        type=int,
                        required=True,
                        help="This field can't be left blank"
                        )
    # 2
    parser.add_argument('Gender',
                        type=str,
                        required=True,
                        help="This field can't be left blank"
                        )
    # 3
    parser.add_argument('Country',
                        type=str,
                        required=True,
                        help="This field can't be left blank"
                        )
    # 4
    parser.add_argument('self_employed',
                        type=str,
                        required=True,
                        help="This field can't be left blank"
                        )
    # 5
    parser.add_argument('family_history',
                        type=str,
                        required=True,
                        help="This field can't be left blank"
                        )
    # 6
    parser.add_argument('work_interfere',
                        type=str,
                        required=True,
                        help="This field can't be left blank"
                        )
    # 7
    parser.add_argument('no_employees',
                        type=str,
                        required=True,
                        help="This field can't be left blank"
                        )
    # 8
    parser.add_argument('remote_work',
                        type=str,
                        required=True,
                        help="This field can't be left blank"
                        )
    # 9
    parser.add_argument('tech_company',
                        type=str,
                        required=True,
                        help="This field can't be left blank"
                        )
    # 10
    parser.add_argument('benefits',
                        type=str,
                        required=True,
                        help="This field can't be left blank"
                        )
    # 11
    parser.add_argument('care_options',
                        type=str,
                        required=True,
                        help="This field can't be left blank"
                        )
    # 12
    parser.add_argument('wellness_program',
                        type=str,
                        required=True,
                        help="This field can't be left blank"
                        )
    # 13
    parser.add_argument('seek_help',
                        type=str,
                        required=True,
                        help="This field can't be left blank"
                        )
    # 14
    parser.add_argument('anonymity',
                        type=str,
                        required=True,
                        help="This field can't be left blank"
                        )
    # 15
    parser.add_argument('leave',
                        type=str,
                        required=True,
                        help="This field can't be left blank"
                        )
    # 16
    parser.add_argument('mental_health_consequence',
                        type=str,
                        required=True,
                        help="This field can't be left blank"
                        )
    # 17
    parser.add_argument('phys_health_consequence',
                        type=str,
                        required=True,
                        help="This field can't be left blank"
                        )
    # 18
    parser.add_argument('coworkers',
                        type=str,
                        required=True,
                        help="This field can't be left blank"
                        )
    # 19
    parser.add_argument('supervisor',
                        type=str,
                        required=True,
                        help="This field can't be left blank"
                        )
    # 20
    parser.add_argument('mental_health_interview',
                        type=str,
                        required=True,
                        help="This field can't be left blank"
                        )
    # 21
    parser.add_argument('phys_health_interview',
                        type=str,
                        required=True,
                        help="This field can't be left blank"
                        )
    # 22
    parser.add_argument('mental_vs_physical',
                        type=str,
                        required=True,
                        help="This field can't be left blank"
                        )
    # 23
    parser.add_argument('obs_consequence',
                        type=str,
                        required=True,
                        help="This field can't be left blank"
                        )
    # 24
    parser.add_argument('comments',
                        type=str,
                        )
    # 25 treatment
    # parser.add_argument('treatment',
    #                     type=str,
    #                     required=True,
    #                     help="This field can't be left blank"
    #                     )

    def post(self):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        data = EmployeeRegister.parser.parse_args()

        # getting prediction
        pred_result = get_prediction(data)
        # print("pred_result:", pred_result, type(pred_result))

        query = "INSERT INTO employees VALUES(NULL, " + "?, " * 25  + "?)"
        cursor.execute(query, (
            data['email'],      # 0
            data['Age'],        # 1
            data['Gender'],     # 2
            data['Country'],    # 3
            data['self_employed'],  # 4
            data['family_history'],  # 5
            data['work_interfere'],  # 6
            data['no_employees'],   # 7
            data['remote_work'],    # 8
            data['tech_company'],   # 9
            data['benefits'],      # 10
            data['care_options'],    # 11
            data['wellness_program'],   # 12
            data['seek_help'],  # 13
            data['anonymity'],  # 14
            data['leave'],  # 15
            data['mental_health_consequence'],   # 16
            data['phys_health_consequence'],    # 17
            data['coworkers'],  # 18
            data['supervisor'],  # 19
            data['mental_health_interview'],  # 20
            data['phys_health_interview'],  # 21
            data['mental_vs_physical'],     # 22
            data['obs_consequence'],        # 23
            data['comments'],   # 24
            pred_result         # 25
        ))

        connection.commit()
        connection.close()

        return {
            "message": "Registration successful",
            "result": pred_result
        }, 201

class EmployeeGetAll(Resource):
    @jwt_required
    def get(self):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        data = cursor.execute("SELECT * FROM employees")
        result = []
        
        for row in data:
            row_dict = {}
            # for k, v in zip(columnlist, row):
            #     row_dict[k] = v 
            row_dict = {k: v for k, v in zip(columnlist, row)}
            result.append(row_dict)

        # print(result)
        connection.close()
        return {"employees":result}, 200
    