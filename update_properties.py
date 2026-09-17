import re

with open('src/app/staff/properties/page.tsx', 'r') as f:
    content = f.read()

# 1. Update INITIAL_PROPERTIES
content = re.sub(
    r"const INITIAL_PROPERTIES = \[.*?\];",
    """const INITIAL_PROPERTIES = [
  { id: 1, name: 'The Grand Residence', location: 'City Center', rooms: 120, occupancy: '92%', status: 'Operational', beds: 2, floors: 5, roomsPerFloor: [24, 24, 24, 24, 24] },
  { id: 2, name: 'Riverside Halls', location: 'East Campus', rooms: 85, occupancy: '84%', status: 'Operational', beds: 1, floors: 4, roomsPerFloor: [22, 21, 21, 21] },
  { id: 3, name: 'Heritage House', location: 'Old Town Square', rooms: 64, occupancy: '100%', status: 'Operational', beds: 2, floors: 3, roomsPerFloor: [22, 21, 21] },
];""",
    content,
    flags=re.DOTALL
)

# 2. Update States
content = content.replace(
    "const [editPropertyForm, setEditPropertyForm] = useState({ name: '', location: '', rooms: '', floors: '1', beds: '2' });",
    "const [editPropertyForm, setEditPropertyForm] = useState({ name: '', location: '', rooms: '', floors: '1', beds: '2', roomsPerFloor: ['0'] });"
)
content = content.replace(
    "const [newProperty, setNewProperty] = useState({ name: '', location: '', rooms: '', floors: '1', beds: '2' });",
    "const [newProperty, setNewProperty] = useState({ name: '', location: '', rooms: '', floors: '1', beds: '2', roomsPerFloor: ['0'] });"
)

# 3. Update rooms useMemo
content = re.sub(
    r"const rooms = useMemo\(\(\) => \{.*?\}, \[selectedPropertyId, selectedFloor, selectedProperty, roomOverrides\]\);",
    """const rooms = useMemo(() => {
    if (!selectedProperty) return [];
    
    let roomsOnThisFloor = 0;
    if (selectedProperty.roomsPerFloor && selectedProperty.roomsPerFloor.length >= selectedFloor) {
      roomsOnThisFloor = selectedProperty.roomsPerFloor[selectedFloor - 1];
    } else {
      const totalRooms = selectedProperty.rooms || 0;
      const totalFloors = selectedProperty.floors || 1;
      const baseRoomsPerFloor = Math.floor(totalRooms / totalFloors);
      const extraRooms = totalRooms % totalFloors;
      roomsOnThisFloor = selectedFloor <= extraRooms ? baseRoomsPerFloor + 1 : baseRoomsPerFloor;
    }
    
    if (roomsOnThisFloor <= 0) return [];

    return Array.from({ length: roomsOnThisFloor }).map((_, i) => {
      const roomNum = (selectedFloor * 100) + i + 1;
      const hash = roomNum * selectedPropertyId;
      const defaultStatus = hash % 7 === 0 ? 'maintenance' : hash % 3 === 0 ? 'available' : 'occupied';
      const defaultBeds = selectedProperty?.beds || 2;
      
      const overrideKey = `${selectedPropertyId}-${roomNum}`;
      const override = roomOverrides[overrideKey];
      
      return { 
        roomNum, 
        status: override?.status || defaultStatus,
        beds: override?.beds || defaultBeds
      };
    });
  }, [selectedPropertyId, selectedFloor, selectedProperty, roomOverrides]);""",
    content,
    flags=re.DOTALL
)

# 4. handleAddProperty
content = content.replace(
    "rooms: parseInt(newProperty.rooms) || 0,",
    "rooms: newProperty.roomsPerFloor.reduce((acc, curr) => acc + (parseInt(curr) || 0), 0),"
)
content = content.replace(
    "floors: parseInt(newProperty.floors) || 1,",
    "floors: parseInt(newProperty.floors) || 1,\n      roomsPerFloor: newProperty.roomsPerFloor.map(v => parseInt(v) || 0),"
)
content = content.replace(
    "setNewProperty({ name: '', location: '', rooms: '', floors: '1', beds: '2' });",
    "setNewProperty({ name: '', location: '', rooms: '', floors: '1', beds: '2', roomsPerFloor: ['0'] });"
)

# 5. handleEditPropertyStart
content = re.sub(
    r"const handleEditPropertyStart = \(prop: any\) => \{.*?setEditingPropertyId\(prop\.id\);\n  \};",
    """const handleEditPropertyStart = (prop: any) => {
    const floorsCount = prop.floors || 1;
    let fallbackRoomsPerFloor = [];
    if (prop.roomsPerFloor) {
      fallbackRoomsPerFloor = prop.roomsPerFloor.map(String);
    } else {
      const base = Math.floor((prop.rooms || 0) / floorsCount);
      const extra = (prop.rooms || 0) % floorsCount;
      for (let i = 0; i < floorsCount; i++) {
        fallbackRoomsPerFloor.push(String(i < extra ? base + 1 : base));
      }
    }
    
    setEditPropertyForm({
      name: prop.name,
      location: prop.location,
      rooms: prop.rooms?.toString() || '0',
      floors: floorsCount.toString(),
      beds: (prop.beds || 2).toString(),
      roomsPerFloor: fallbackRoomsPerFloor
    });
    setEditingPropertyId(prop.id);
  };""",
    content,
    flags=re.DOTALL
)

# 6. handleUpdateProperty
content = content.replace(
    "rooms: parseInt(editPropertyForm.rooms) || 0,",
    "rooms: editPropertyForm.roomsPerFloor.reduce((acc, curr) => acc + (parseInt(curr) || 0), 0),"
)
content = content.replace(
    "floors: parseInt(editPropertyForm.floors) || 1,",
    "floors: parseInt(editPropertyForm.floors) || 1,\n          roomsPerFloor: editPropertyForm.roomsPerFloor.map(v => parseInt(v) || 0),"
)


# Helper for Modals
rooms_per_floor_ui_new = """
              <div className="space-y-3 mt-4 border-t border-gray-100 pt-4">
                <label className="text-sm font-medium text-gray-700">Rooms per Floor</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {newProperty.roomsPerFloor.map((rooms, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                      <span className="text-xs text-gray-500">Floor {idx + 1}</span>
                      <input 
                        type="number" 
                        value={rooms}
                        onChange={(e) => {
                          const newRooms = [...newProperty.roomsPerFloor];
                          newRooms[idx] = e.target.value;
                          setNewProperty({...newProperty, roomsPerFloor: newRooms});
                        }}
                        className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
"""

rooms_per_floor_ui_edit = rooms_per_floor_ui_new.replace("newProperty", "editPropertyForm").replace("setNewProperty", "setEditPropertyForm")

# 7. Add Modal (Replace floors input logic)
content = content.replace(
    """onChange={(e) => setNewProperty({...newProperty, floors: e.target.value})}""",
    """onChange={(e) => {
                      const newFloors = parseInt(e.target.value) || 1;
                      let newRoomsPerFloor = [...newProperty.roomsPerFloor];
                      if (newFloors > newRoomsPerFloor.length) {
                        for (let i = newRoomsPerFloor.length; i < newFloors; i++) {
                          newRoomsPerFloor.push('0');
                        }
                      } else if (newFloors < newRoomsPerFloor.length && newFloors > 0) {
                        newRoomsPerFloor.length = newFloors;
                      }
                      setNewProperty({...newProperty, floors: e.target.value, roomsPerFloor: newRoomsPerFloor});
                    }}"""
)
# Total rooms should be read only for Add
content = content.replace(
    """onChange={(e) => setNewProperty({...newProperty, rooms: e.target.value})}""",
    """readOnly value={newProperty.roomsPerFloor.reduce((acc, curr) => acc + (parseInt(curr) || 0), 0)}"""
)

# 8. Edit Modal
content = content.replace(
    """onChange={(e) => setEditPropertyForm({...editPropertyForm, floors: e.target.value})}""",
    """onChange={(e) => {
                      const newFloors = parseInt(e.target.value) || 1;
                      let newRoomsPerFloor = [...editPropertyForm.roomsPerFloor];
                      if (newFloors > newRoomsPerFloor.length) {
                        for (let i = newRoomsPerFloor.length; i < newFloors; i++) {
                          newRoomsPerFloor.push('0');
                        }
                      } else if (newFloors < newRoomsPerFloor.length && newFloors > 0) {
                        newRoomsPerFloor.length = newFloors;
                      }
                      setEditPropertyForm({...editPropertyForm, floors: e.target.value, roomsPerFloor: newRoomsPerFloor});
                    }}"""
)
# Total rooms should be read only for Edit
content = content.replace(
    """onChange={(e) => setEditPropertyForm({...editPropertyForm, rooms: e.target.value})}""",
    """readOnly value={editPropertyForm.roomsPerFloor.reduce((acc, curr) => acc + (parseInt(curr) || 0), 0)}"""
)

# Add the ui below the grid
content = content.replace(
    """              </div>
              
              <div className="pt-6 flex gap-3">
                <button 
                  onClick={() => setIsAddPropertyModalOpen(false)}""",
    """              </div>
REPLACE_ME_NEW
              <div className="pt-6 flex gap-3">
                <button 
                  onClick={() => setIsAddPropertyModalOpen(false)}""".replace("REPLACE_ME_NEW", rooms_per_floor_ui_new)
)

content = content.replace(
    """              </div>
              
              <div className="pt-6 flex gap-3">
                <button 
                  onClick={() => setEditingPropertyId(null)}""",
    """              </div>
REPLACE_ME_EDIT
              <div className="pt-6 flex gap-3">
                <button 
                  onClick={() => setEditingPropertyId(null)}""".replace("REPLACE_ME_EDIT", rooms_per_floor_ui_edit)
)

# Also disable editing total rooms class
content = content.replace(
    """className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                    placeholder="0" """,
    """className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-not-allowed" 
                    placeholder="0" """
)

with open('src/app/staff/properties/page.tsx', 'w') as f:
    f.write(content)
