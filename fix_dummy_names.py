import re

with open('src/app/staff/properties/page.tsx', 'r') as f:
    content = f.read()

# Replace the dummy names generation logic
old_occupants = """    const initialBedOccupants = selectedRoom.bedOccupants || Array.from({ length: selectedRoom.beds }, (_, i) => i < filledCount ? `Student ${selectedRoom.roomNum}-${String.fromCharCode(65 + i)}` : null);"""
new_occupants = """    const initialBedOccupants = selectedRoom.bedOccupants || Array.from({ length: selectedRoom.beds }, () => null);"""

content = content.replace(old_occupants, new_occupants)

with open('src/app/staff/properties/page.tsx', 'w') as f:
    f.write(content)
