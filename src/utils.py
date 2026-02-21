def calculate_total(items):
    """Calculate total price of items"""
    return sum(item['price'] for item in items)

def format_date(date):
    """Format date to YYYY-MM-DD"""
    return date.strftime('%Y-%m-%d')