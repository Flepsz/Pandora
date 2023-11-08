import random

def generate_credit_card_number():
    # 2 Mastercard, 3 American Express, 4 Visa, 5 MasterCard, 6 Elo
    first_digit = random.choice([2, 3, 4, 5, 6])

    other_digits = [random.randint(0, 9) for _ in range(15)]

    total = first_digit
    for i, digit in enumerate(other_digits):
        if i % 2 == 0:
            digit *= 2
            if digit > 9:
                digit -= 9
        total += digit

    last_digit = (10 - (total % 10)) % 10

    credit_card_number = [str(first_digit)] + [str(digit)
                                            for digit in other_digits] + [str(last_digit)]

    return ''.join(credit_card_number)


def determine_flag(first_digit):
    if first_digit == 2:
        return "Mastercard"
    if first_digit == 3:
        return "American Express"
    if first_digit == 4:
        return "Visa"
    if first_digit == 5:
        return "MasterCard"
    if first_digit == 6:
        return "Elo"