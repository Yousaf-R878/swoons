import json
import random

# Load the data from the provided files
with open('./dates.json', 'r') as file:
    dates_data = json.load(file)

with open('./tripAdvLocations.json', 'r') as file:
    trip_adv_data = json.load(file)

# Define constants
tags = ['food', 'drinks', 'coffee', 'sights', 'arts', 'outdoors', 'shopping', 'hotels', 'tours', 'events', 'other', 
        'museums', 'zoos', 'aquariums', 'amusement parks', 'water parks', 'nature', 'parks', 'beaches', 'gardens', 
        'playgrounds', 'casinos', 'bowling', 'cinemas', 'theatres', 'concerts', 'music venues', 'stadiums', 'arenas', 
        'zoos', 'aquariums', 'amusement parks', 'water parks', 'nature', 'parks', 'beaches', 'gardens', 'playgrounds', 
        'casinos', 'bowling']
date_titles = [
    "City Adventure", "Beach Relaxation", "Cultural Exploration", "Nature Getaway", "Historical Journey",
    "Foodie Tour", "Artistic Encounter", "Shopping Spree", "Musical Nights", "Sports Fan Day",
    "Family Fun", "Romantic Escape", "Science Expedition", "Garden Retreat", "Cinema Experience",
    "Theatre Evening", "Coffee Trail", "Zoo Visit", "Amusement Park Thrills", "Aquarium Discovery"
]

random.seed(42)  # for reproducibility

# Process the data
for date in dates_data:
    # Assign a random title
    date['title'] = random.choice(date_titles)

    # Assign 2-6 random tags
    date['tagArray'] = random.sample(tags, random.randint(2, 6))

    # Randomize events from tripAdvLocations.json within each date object
    random.shuffle(trip_adv_data)
    selected_events = random.sample(trip_adv_data, random.randint(1, 4))  # 1-4 events per date

    # Replace eventArray with new selected events, maintaining the structure
    date['eventArray'] = [
        {
            "name": event['name'],
            "location": event['location'],
            "tripAdvisorLocationId": event['tripAdvisorLocationId'],
            "description": "This is a description"
        } for event in selected_events
    ]

# Save the modified dates data to a new file
output_file_path = './datesModified.json'
with open(output_file_path, 'w') as file:
    json.dump(dates_data, file)

# Return the path of the modified file and a sample of the modified data
output_file_path, dates_data[:2]  # Sample of the first two modified dates
