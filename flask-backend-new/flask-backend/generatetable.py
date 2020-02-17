import sqlite3

connection = sqlite3.connect('data.db')
cursor = connection.cursor()

create_table_admin = "CREATE TABLE IF NOT EXISTS admins (id INTEGER PRIMARY KEY, username text, password text)"
cursor.execute(create_table_admin)

create_table_employees = "CREATE TABLE IF NOT EXISTS employees (id INTEGER PRIMARY KEY, email text, Age int, Gender text, Country text, self_employed text, family_history text, work_interfere text, no_employees text, remote_work text, tech_company text, benefits text, care_options text, wellness_program text, seek_help text, anonymity text, leave text, mental_health_consequence text, phys_health_consequence text, coworkers text, supervisor text, mental_health_interview text, phys_health_interview text, mental_vs_physical  text, obs_consequence text, comments text, treatment text)"
cursor.execute(create_table_employees)

# data = [(1, 'yugal.saluja@globallogic.com', 32, 'Male', 'India', 'No', 'No', 'Sometimes', 'More than 1000', 'No', 'Yes', 'Yes', 'No', 'No', 'Yes', 'Yes', 'No', 'Yes', 'Yes', 'Yes', 'No', 'No', 'Yes', 'Yes', 'No', 'NA', 'Yes', None, 0), (2, 'kishore.patel@globallogic.com', 25, 'Male', 'India', 'No', 'No', 'Rarely', 'More than 1000', 'No', 'Yes', 'Yes', 'Yes', 'Yes', 'No', 'Yes', 'Somewhat easy', 'Yes', 'Yes', 'Yes', 'Some of them', 'No', 'Yes', 'Yes', 'No', 'NA', 'Yes', None, 0), (3, 'vishnupriya.jayaraj@globallogic.com', 22, 'Female', 'India', 'No', 'No', 'Rarely', 'More than 1000', 'No', 'Yes', 'No', 'No', 'No', 'No', "Don't know", "Don't  know", 'No', 'No', 'Some of them', 'Some of them', 'No', 'No', "Don't know", 'No', 'NA', 'Yes', None, 0)]

# cursor.executemany("INSERT INTO employees values(" + "?,"*26 +"?)", data)

connection.commit()
print(len(list(cursor.execute('select * from employees'))))
connection.close()


