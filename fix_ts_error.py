import re

with open('src/app/staff/properties/page.tsx', 'r') as f:
    content = f.read()

content = content.replace("const defaultStatus = 'available';", "const defaultStatus: string = 'available';")

with open('src/app/staff/properties/page.tsx', 'w') as f:
    f.write(content)
