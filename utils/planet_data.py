import pandas as pd

def load_planet_data():
    """
    Loads planet data from CSV file
    """
    try:
        return pd.read_csv('data/planets.csv')
    except Exception as e:
        print(f"Error loading planet data: {e}")
        return pd.DataFrame()

def get_planet_info(planet_name):
    """
    Returns information about a specific planet
    """
    df = load_planet_data()
    planet_info = df[df['name'] == planet_name].iloc[0] if not df.empty else None
    if planet_info is not None:
        return {
            'name': planet_info['name'],
            'distance': planet_info['distance_from_earth'],
            'climate': planet_info['climate'],
            'inhabitability': planet_info['inhabitability'],
            'description': planet_info['description']
        }
    return None
