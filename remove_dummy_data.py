import re

with open('src/app/staff/properties/page.tsx', 'r') as f:
    content = f.read()

old_logic = """      const isNewProperty = selectedPropertyId > 3;
      const defaultStatus = isNewProperty ? 'available' : (hash % 7 === 0 ? 'maintenance' : hash % 3 === 0 ? 'available' : 'occupied');"""

new_logic = """      // No dummy data - default to available
      const defaultStatus = 'available';"""

content = content.replace(old_logic, new_logic)

with open('src/app/staff/properties/page.tsx', 'w') as f:
    f.write(content)
