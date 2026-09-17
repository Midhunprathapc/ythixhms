import re

with open('src/app/staff/students/[id]/page.tsx', 'r') as f:
    content = f.read()

# Replace the old complex backLink logic with a simple one that just returns to properties
content = content.replace(
    "const backLink = (from === 'properties' && room) ? `/staff/properties?openRoom=${room}` : '/staff/students';",
    "const backLink = from === 'properties' ? '/staff/properties' : '/staff/students';"
)

with open('src/app/staff/students/[id]/page.tsx', 'w') as f:
    f.write(content)
