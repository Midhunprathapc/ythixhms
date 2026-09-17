import re

with open('src/app/staff/properties/page.tsx', 'r') as f:
    content = f.read()

# Replace all hasBedsPerFloor with isCustomBedsPerFloor
content = content.replace('hasBedsPerFloor', 'isCustomBedsPerFloor')

# Remove duplicate bedsPerFloor lines in handleAddProperty
content = content.replace("""      isCustomBedsPerFloor: newProperty.isCustomBedsPerFloor,
      bedsPerFloor: newProperty.bedsPerFloor.map(v => parseInt(v) || 2),
      isCustomBedsPerFloor: newProperty.isCustomBedsPerFloor,
      bedsPerFloor: newProperty.bedsPerFloor.map(v => parseInt(v) || 2),""", """      isCustomBedsPerFloor: newProperty.isCustomBedsPerFloor,
      bedsPerFloor: newProperty.bedsPerFloor.map(v => parseInt(v) || 2),""")

# Remove duplicate bedsPerFloor lines in handleUpdateProperty
content = content.replace("""          isCustomBedsPerFloor: editPropertyForm.isCustomBedsPerFloor,
          bedsPerFloor: editPropertyForm.bedsPerFloor.map(v => parseInt(v) || 2),
          isCustomBedsPerFloor: editPropertyForm.isCustomBedsPerFloor,
          bedsPerFloor: editPropertyForm.bedsPerFloor.map(v => parseInt(v) || 2),""", """          isCustomBedsPerFloor: editPropertyForm.isCustomBedsPerFloor,
          bedsPerFloor: editPropertyForm.bedsPerFloor.map(v => parseInt(v) || 2),""")

with open('src/app/staff/properties/page.tsx', 'w') as f:
    f.write(content)
