import re

with open('src/app/staff/properties/page.tsx', 'r') as f:
    content = f.read()

# Replace the fallback dummy name
content = content.replace(
    "const mockStudentName = isFilled ? (selectedRoom.bedOccupants?.[idx] || `Student ${selectedRoom.roomNum}-${bedLabel}`) : null;",
    "const mockStudentName = isFilled ? (selectedRoom.bedOccupants?.[idx] || 'Unknown Student') : null;"
)

with open('src/app/staff/properties/page.tsx', 'w') as f:
    f.write(content)
