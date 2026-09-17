import re

with open('src/app/staff/properties/page.tsx', 'r') as f:
    content = f.read()

# 1. Update INITIAL_PROPERTIES
content = content.replace(
    "floors: 5, roomsPerFloor: [24, 24, 24, 24, 24] },",
    "floors: 5, roomsPerFloor: [24, 24, 24, 24, 24], isCustomBedsPerFloor: false, bedsPerFloor: [2, 2, 2, 2, 2] },"
).replace(
    "floors: 4, roomsPerFloor: [22, 21, 21, 21] },",
    "floors: 4, roomsPerFloor: [22, 21, 21, 21], isCustomBedsPerFloor: false, bedsPerFloor: [1, 1, 1, 1] },"
).replace(
    "floors: 3, roomsPerFloor: [22, 21, 21] },",
    "floors: 3, roomsPerFloor: [22, 21, 21], isCustomBedsPerFloor: false, bedsPerFloor: [2, 2, 2] },"
)

# 2. Update States
content = content.replace(
    "const [editPropertyForm, setEditPropertyForm] = useState({ name: '', location: '', rooms: '', floors: '1', beds: '2', roomsPerFloor: ['0'] });",
    "const [editPropertyForm, setEditPropertyForm] = useState({ name: '', location: '', rooms: '', floors: '1', beds: '2', roomsPerFloor: ['0'], isCustomBedsPerFloor: false, bedsPerFloor: ['2'] });"
).replace(
    "const [newProperty, setNewProperty] = useState({ name: '', location: '', rooms: '', floors: '1', beds: '2', roomsPerFloor: ['0'] });",
    "const [newProperty, setNewProperty] = useState({ name: '', location: '', rooms: '', floors: '1', beds: '2', roomsPerFloor: ['0'], isCustomBedsPerFloor: false, bedsPerFloor: ['2'] });"
)

# 3. Update rooms useMemo
content = content.replace(
    "const defaultBeds = selectedProperty?.beds || 2;",
    """const defaultBeds = selectedProperty?.isCustomBedsPerFloor && selectedProperty.bedsPerFloor && selectedProperty.bedsPerFloor.length >= selectedFloor
        ? selectedProperty.bedsPerFloor[selectedFloor - 1]
        : (selectedProperty?.beds || 2);"""
)

# 4. handleAddProperty
content = content.replace(
    "roomsPerFloor: newProperty.roomsPerFloor.map(v => parseInt(v) || 0),",
    """roomsPerFloor: newProperty.roomsPerFloor.map(v => parseInt(v) || 0),
      isCustomBedsPerFloor: newProperty.isCustomBedsPerFloor,
      bedsPerFloor: newProperty.bedsPerFloor.map(v => parseInt(v) || 2),"""
)
content = content.replace(
    "setNewProperty({ name: '', location: '', rooms: '', floors: '1', beds: '2', roomsPerFloor: ['0'] });",
    "setNewProperty({ name: '', location: '', rooms: '', floors: '1', beds: '2', roomsPerFloor: ['0'], isCustomBedsPerFloor: false, bedsPerFloor: ['2'] });"
)

# 5. handleEditPropertyStart
content = content.replace(
    "roomsPerFloor: fallbackRoomsPerFloor\n    });",
    """roomsPerFloor: fallbackRoomsPerFloor,
      isCustomBedsPerFloor: prop.isCustomBedsPerFloor || false,
      bedsPerFloor: prop.bedsPerFloor ? prop.bedsPerFloor.map(String) : Array(floorsCount).fill((prop.beds || 2).toString())
    });"""
)

# 6. handleUpdateProperty
content = content.replace(
    "roomsPerFloor: editPropertyForm.roomsPerFloor.map(v => parseInt(v) || 0),",
    """roomsPerFloor: editPropertyForm.roomsPerFloor.map(v => parseInt(v) || 0),
          isCustomBedsPerFloor: editPropertyForm.isCustomBedsPerFloor,
          bedsPerFloor: editPropertyForm.bedsPerFloor.map(v => parseInt(v) || 2),"""
)

# 7. Modal Form updates for 'floors' input changes
def replace_floors_onChange(prefix):
    return f"""onChange={{(e) => {{
                      const newFloors = parseInt(e.target.value) || 1;
                      let newRoomsPerFloor = [...{prefix}.roomsPerFloor];
                      let newBedsPerFloor = [...{prefix}.bedsPerFloor];
                      if (newFloors > newRoomsPerFloor.length) {{
                        for (let i = newRoomsPerFloor.length; i < newFloors; i++) {{
                          newRoomsPerFloor.push('0');
                          newBedsPerFloor.push({prefix}.beds || '2');
                        }}
                      }} else if (newFloors < newRoomsPerFloor.length && newFloors > 0) {{
                        newRoomsPerFloor.length = newFloors;
                        newBedsPerFloor.length = newFloors;
                      }}
                      set{prefix[:1].upper() + prefix[1:]}({{...{prefix}, floors: e.target.value, roomsPerFloor: newRoomsPerFloor, bedsPerFloor: newBedsPerFloor}});
                    }}}}"""

content = re.sub(
    r"onChange=\{\(e\) => \{\s*const newFloors.*?setNewProperty\(\{.*?roomsPerFloor: newRoomsPerFloor\}\);\s*\}\}",
    replace_floors_onChange("newProperty"),
    content,
    flags=re.DOTALL
)

content = re.sub(
    r"onChange=\{\(e\) => \{\s*const newFloors.*?setEditPropertyForm\(\{.*?roomsPerFloor: newRoomsPerFloor\}\);\s*\}\}",
    replace_floors_onChange("editPropertyForm"),
    content,
    flags=re.DOTALL
)


# 8. Modals UI: Checkbox and beds array
def generate_beds_ui(prefix):
    setter = f"set{prefix[:1].upper() + prefix[1:]}"
    return f"""
              <div className="mt-4 border-t border-gray-100 pt-4">
                <div className="flex items-center mb-3">
                  <input 
                    type="checkbox" 
                    id="{prefix}_customBeds"
                    checked={{{prefix}.isCustomBedsPerFloor}}
                    onChange={{(e) => {setter}({{...{prefix}, isCustomBedsPerFloor: e.target.checked}})}}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="{prefix}_customBeds" className="ml-2 block text-sm font-medium text-gray-700">
                    Specify beds per floor
                  </label>
                </div>
                
                {{{prefix}.isCustomBedsPerFloor && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-3">
                    {{{prefix}.bedsPerFloor.map((beds, idx) => (
                      <div key={{idx}} className="flex flex-col gap-1">
                        <span className="text-xs text-gray-500">Floor {{idx + 1}} Beds</span>
                        <input 
                          type="number" 
                          value={{beds}}
                          onChange={{(e) => {{
                            const newBeds = [...{prefix}.bedsPerFloor];
                            newBeds[idx] = e.target.value;
                            {setter}({{...{prefix}, bedsPerFloor: newBeds}});
                          }}}}
                          className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                    ))}}
                  </div>
                )}}
              </div>
"""

# Insert Beds UI in both Modals right before the buttons
content = content.replace(
    """              </div>
              <div className="pt-6 flex gap-3">
                <button 
                  onClick={() => setIsAddPropertyModalOpen(false)}""",
    """              </div>""" + generate_beds_ui("newProperty") + """
              <div className="pt-6 flex gap-3">
                <button 
                  onClick={() => setIsAddPropertyModalOpen(false)}"""
)

content = content.replace(
    """              </div>
              <div className="pt-6 flex gap-3">
                <button 
                  onClick={() => setEditingPropertyId(null)}""",
    """              </div>""" + generate_beds_ui("editPropertyForm") + """
              <div className="pt-6 flex gap-3">
                <button 
                  onClick={() => setEditingPropertyId(null)}"""
)


with open('src/app/staff/properties/page.tsx', 'w') as f:
    f.write(content)
