admins = [{
    "id": 1,
    "username": "yugal.saluja",
    "password": "yugal123"
}, {
    "id": 2,
    "username": "kishore.patel",
    "password": "kishore123"
}, {
    "id": 3,
    "username": "manish.bansal",
    "password": "manish123"
}, {
    "id": 4,
    "username": "ambea.thirumalesu",
    "password": "ambea123"
}, {
    "id": 5,
    "username": "pawan.singh6",
    "password": "pawan123"
}, {
    "id": 6,
    "username": "haleena.a",
    "password": "haleena123"
},{
    "id": 7,
    "username": "mariya.mathew",
    "password": "mariya123"
}, {
    "id": 8,
    "username": "vishnupriya.jayaraj",
    "password": "vishnupriya123"
}]

# username_mapping = {
#     "yugal.saluja": {
#         "id": 1,
#         "username": "yugal.saluja",
#         "password": "yugal123"
#     },
#     "kishore.patel": {
#         "id": 2,
#         "username": "kishore.patel",
#         "password": "kishore123"
#     }
# }

username_mapping = {admin['username']: admin for admin in admins}

# userid_mapping = {
#     1: {
#         "id": 1,
#         "username": "yugal.saluja",
#         "password": "yugal.saluja"
#     },
#     2: {
#         "id": 2,
#         "username": "kishore.patel",
#         "password": "kishore123"
#     }
# }

userid_mapping = {admin['id']: admin for admin in admins}

class Admin:
    @classmethod
    def find_by_id(self, _id):
        admin = userid_mapping.get(_id, None)
        return admin
    @classmethod
    def find_by_username(self, username):
        admin = username_mapping.get(username, None)
        return admin


# print(username_mapping)
# print(userid_mapping)