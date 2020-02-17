import joblib
import numpy as np

rf_model = joblib.load('./finalized_model.rf_copy.binary')
extracted_features = joblib.load('./extracted_features.list_copy.binary')


def get_prediction(data):

    # Gender
    male_female = []
    trans = []
    if data['Gender'] == "Male":
        male_female.append(0)
        trans.append(0)
    elif data['Gender'] == 'Female':
        male_female.append(1)
        trans.append(0)
    else:
        male_female.append(0)
        trans.append(1)

    # Family history
    family_history = []
    if data['family_history'] == 'Yes':
        family_history.append(1)
    else:
        family_history.append(0)

    # Mental health consequence
    mental_health_consequence = []
    if data['mental_health_consequence'] == 'Yes':
        mental_health_consequence.append(1)
    else:
        mental_health_consequence.append(0)

    # work_interfere - often, rarely, sometimes, never
    work_interfere_often = []
    work_interfere_rarely = []
    work_interfere_sometimes = []
    work_interfere_never = []
    if data['work_interfere'] == 'Often':
        work_interfere_often.append(1)
        work_interfere_rarely.append(0)
        work_interfere_sometimes.append(0)
        work_interfere_never.append(0)
    elif data['work_interfere'] == 'Rarely':
        work_interfere_often.append(0)
        work_interfere_rarely.append(1)
        work_interfere_sometimes.append(0)
        work_interfere_never.append(0)
    elif data['work_interfere'] == 'Sometimes':
        work_interfere_often.append(0)
        work_interfere_rarely.append(0)
        work_interfere_sometimes.append(1)
        work_interfere_never.append(0)
    elif data['work_interfere'] == 'Never':
        work_interfere_often.append(0)
        work_interfere_rarely.append(0)
        work_interfere_sometimes.append(0)
        work_interfere_never.append(1)
    else:
        work_interfere_often.append(0)
        work_interfere_rarely.append(0)
        work_interfere_sometimes.append(0)
        work_interfere_never.append(0)

    # benefits
    benefits_yes_no = []
    if data['benefits'] == 'Yes':
        benefits_yes_no.append(1)
    else:
        benefits_yes_no.append(0)

    #  care options: care_options_not_sure
    care_options_not_sure = []
    if data['care_options'] == 'Yes' or data['care_options'] == 'No':
        care_options_not_sure.append(0)
    else:
        care_options_not_sure.append(1)

    # leave: leave_somewhat_difficult, leave_very_difficult
    leave_somewhat_difficult = []
    leave_very_difficult = []
    leave_val = data['leave']
    leave_val = leave_val.lower()
    if leave_val == 'somewhat difficult':
        leave_somewhat_difficult.append(1)
        leave_very_difficult.append(0)
    elif leave_val == 'very difficult':
        leave_somewhat_difficult.append(0)
        leave_very_difficult.append(1)
    else:
        leave_somewhat_difficult.append(0)
        leave_very_difficult.append(0)

    # coworkers
    coworkers_yes_no = []
    coworkers_some_of_them = []
    if data['coworkers'] == 'Yes':
        coworkers_yes_no.append(1)
        coworkers_some_of_them.append(0)
    elif data['coworkers'] == 'No':
        coworkers_yes_no.append(0)
        coworkers_some_of_them.append(0)
    else:
        coworkers_yes_no.append(0)
        coworkers_some_of_them.append(1)

    # obs_consequence
    obs_consequence = []
    if data['obs_consequence'] == 'Yes':
        obs_consequence.append(1)
    else:
        obs_consequence.append(0)

    # numpy column stack
    inputdata = np.column_stack((male_female,
                                 trans,
                                 family_history,
                                 mental_health_consequence,
                                 work_interfere_often,
                                 work_interfere_rarely,
                                 work_interfere_sometimes,
                                 work_interfere_never,
                                 benefits_yes_no,
                                 care_options_not_sure,
                                 leave_somewhat_difficult,
                                 leave_very_difficult,
                                 coworkers_yes_no,
                                 coworkers_some_of_them,
                                 obs_consequence
                                 ))

    # print(inputdata.shape)

    result = rf_model.predict(inputdata)
    # print(result)

    return "Yes" if result[0] else "No"
    # return rf_model


# print(rf_model)
# print(extracted_features)
