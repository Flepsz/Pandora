import requests, os, subprocess, multiprocessing
from time import sleep

BASE_URL = 'http://10.109.71.9:8080/api/v1/'

user_create_url = os.path.join(BASE_URL, 'auth/users/')
jwt_create_url = os.path.join(BASE_URL, 'auth/jwt/create/')
natural_person_url = os.path.join(BASE_URL, 'customersnp/')
legal_person_url = os.path.join(BASE_URL, 'customerslp/')
contacts_url = os.path.join(BASE_URL, 'contacts/')
address_url = os.path.join(BASE_URL, 'addresses/')
account_url = os.path.join(BASE_URL, 'accounts/')
card_url = os.path.join(BASE_URL, 'cards/')
transaction_url = os.path.join(BASE_URL, 'transactions/')
investment_url = os.path.join(BASE_URL, 'investments/')
create_loan_url = os.path.join(BASE_URL, 'loans/')


def data_base_creation():
    try:
        subprocess.run(['py', 'manage.py', 'makemigrations'], check=True)
        subprocess.run(['py', 'manage.py', 'migrate'], check=True)
        print('Success')
    except subprocess.CalledProcessError as e:
        print(e)
    except Exception as e:
        print(e)


def run_server():
    try:
        subprocess.run(['py', 'manage.py', 'runserver', '10.109.71.9:8080'], check=True)
    except subprocess.CalledProcessError as e:
        print(e)
    except Exception as e:
        print(e)


def superuser_creation():
    try:
        subprocess.run(['py', 'manage.py', 'create_superuser'], check=True)
    except subprocess.CalledProcessError as e:
        print(e)
    except Exception as e:
        print(e)


def user_create(first_name, last_name, register_number, password):
    response = requests.post(user_create_url,
                             json={
                                 "first_name": first_name,
                                 "last_name": last_name,
                                 "register_number": register_number,
                                 "password": password,
                             })
    return response.json()


def create_headers(register_number, password):
    response = requests.post(jwt_create_url,
                             json={
                                 'register_number': register_number,
                                 'password': password
                             })
    access_token = response.json()['access']
    headers = {'Authorization': f'Bearer {access_token}'}
    return headers


def create_natural_person(headers, register_number, name, social_name, cpf, rg, birthdate):
    response = requests.post(natural_person_url, headers=headers,
                             json={
                                 'customer': register_number,
                                 'name': name,
                                 'social_name': social_name,
                                 'cpf': cpf,
                                 'rg': rg,
                                 'birthdate': birthdate
                             })
    print(response)
    return response.json()


def create_legal_person(headers, register_number, fantasy_name, establishment_date, cnpj, state_registration, municipal_registration
                        ):
    response = requests.post(legal_person_url, headers=headers,
                             json={
                                 'customer': register_number,
                                 'fantasy_name': fantasy_name,
                                 'establishment_date': establishment_date,
                                 'cnpj': cnpj,
                                 'sr': state_registration,
                                 'mr': municipal_registration,
                             })
    return response.json()


def create_address(headers, register_number, street, number, neighborhood, city, state, cep):
    response = requests.post(address_url, headers=headers, json={
        'customer': register_number,
        'street': street,
        'number': number,
        'neighborhood': neighborhood,
        'city': city,
        'state': state,
        'zip_code': cep
    })
    return response.json()


def create_contact(headers, register_number, number, email):
    response = requests.post(address_url, headers=headers, json={
        'customer': register_number,
        'number': number,
        'email': email,
    })
    return response.json()


def create_account(headers, register_number, acc_type):
    response = requests.post(account_url, headers=headers, json={
        'customer': [register_number],
        'acc_type': acc_type
    })
    return response.json()


def create_card(headers, number_account):
    response = requests.post(card_url, headers=headers, json={
        'account': number_account
    })
    return response.json()


def main():
    data_base_creation()
    server_process = multiprocessing.Process(target=run_server)
    server_process.start()
    sleep(1)

    # superuser_creation()
    # super_user_header = create_headers(123, '123')

    print("Inicio do populate")

    # NATURAL PERSON REGISTRATION
    print(user_create("Felipe", "Pereira", 123456, "test@test"))
    headers_1 = create_headers(123456, "test@test")

    print(create_natural_person(headers_1, 123456, 'Luís', 'Felipe', '28345407056', '241767738', '2005-11-03'))

    print(user_create("a", "b", 1234567, "test@test"))
    headers_2 = create_headers(1234567, "test@test")

    print(create_natural_person(headers_2, 1234567, 'Felipe', 'Pereira', '42921996049', '337994134', '2005-11-03'))

    # LEGAL PERSON REGISTRATION
    print(user_create("a", "b", 654321, "test@test"))
    headers_3 = create_headers(654321, "test@test")

    print(create_legal_person(headers_3, 654321, 'Fantasy', '2023-06-19', '40205420000129', '1234', '4321'))

    print(user_create("a", "b", 7654321, "test@test"))
    headers_4 = create_headers(7654321, "test@test")

    print(create_legal_person(headers_4, 7654321, 'Fantasy', '2023-06-19', '05213978000155',  '1234', '4321'))

    # ADDRESS REGISTRATION
    print(create_address(headers_1, 123456, 'Rua Carlo', '69', 'Litle Inf', 'Valinhos', 'SP', '12564789'))

    # ACCOUNT REGISTRATION
    print(create_account(headers_1, 123456, 'savings'))
    print(create_account(headers_3, 654321, 'checking'))

    print("Fim do populate")
    # print(create_card(headers_1, 1111))


if __name__ == '__main__':
    main()
