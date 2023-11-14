import random

def generate_credit_card_number():
    # 2 Mastercard, 3 American Express, 4 Visa, 5 MasterCard, 6 Elo
    # Choose the first digit based on card type
    first_digit = random.choice([2, 3, 4, 5, 6])

    # Generate 15 random digits for the rest of the credit card number
    other_digits = [random.randint(0, 9) for _ in range(15)]

    # Calculate the Luhn algorithm to determine the last digit
    total = first_digit
    for i, digit in enumerate(other_digits):
        if i % 2 == 0:
            digit *= 2
            if digit > 9:
                digit -= 9
        total += digit

    last_digit = (10 - (total % 10)) % 10

    # Combine all digits to form the complete credit card number
    credit_card_number = [str(first_digit)] + [str(digit) for digit in other_digits] + [str(last_digit)]

    return ''.join(credit_card_number)


def determine_flag(first_digit):
    # Determine the card flag based on the first digit
    if first_digit == 2:
        return "Mastercard"
    elif first_digit == 3:
        return "AmericanExpress"
    elif first_digit == 4:
        return "Visa"
    elif first_digit == 5:
        return "Mastercard"
    elif first_digit == 6:
        return "Elo"
