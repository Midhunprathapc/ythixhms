import re

with open('src/app/staff/properties/page.tsx', 'r') as f:
    content = f.read()

# 1. Update states
state_old = "const [editRoomData, setEditRoomData] = useState({ status: '', beds: 0 });"
state_new = "const [editRoomData, setEditRoomData] = useState({ status: '', beds: 0, freeBeds: 0, filledBeds: 0 });"
content = content.replace(state_old, state_new)

# 2. Update filteredRooms useMemo
# Find the return inside filteredRooms where room object is returned
old_room_return = """      return { 
        roomNum, 
        status: override?.status || defaultStatus,
        beds: override?.beds || defaultBeds
      };"""
new_room_return = """      return { 
        roomNum, 
        status: override?.status || defaultStatus,
        beds: override?.beds || defaultBeds,
        freeBeds: override?.freeBeds !== undefined ? override.freeBeds : (defaultStatus === 'occupied' ? 0 : defaultBeds),
        filledBeds: override?.filledBeds !== undefined ? override.filledBeds : (defaultStatus === 'occupied' ? defaultBeds : 0)
      };"""
content = content.replace(old_room_return, new_room_return)

# 3. Update handleEditRoomStart
old_handle_start = """  const handleEditRoomStart = () => {
    if (!selectedRoom) return;
    setEditRoomData({ status: selectedRoom.status, beds: selectedRoom.beds });
    setIsEditingRoom(true);
  };"""
new_handle_start = """  const handleEditRoomStart = () => {
    if (!selectedRoom) return;
    setEditRoomData({ 
      status: selectedRoom.status, 
      beds: selectedRoom.beds,
      freeBeds: selectedRoom.freeBeds !== undefined ? selectedRoom.freeBeds : selectedRoom.beds,
      filledBeds: selectedRoom.filledBeds !== undefined ? selectedRoom.filledBeds : 0
    });
    setIsEditingRoom(true);
  };"""
content = content.replace(old_handle_start, new_handle_start)

# 4. Update handleSaveRoomEdit
old_handle_save = """    setRoomOverrides(prev => ({
      ...prev,
      [overrideKey]: {
        status: editRoomData.status,
        beds: editRoomData.beds
      }
    }));
    
    setSelectedRoom({
      ...selectedRoom,
      status: editRoomData.status,
      beds: editRoomData.beds
    });"""
new_handle_save = """    setRoomOverrides(prev => ({
      ...prev,
      [overrideKey]: {
        status: editRoomData.status,
        beds: editRoomData.beds,
        freeBeds: editRoomData.freeBeds,
        filledBeds: editRoomData.filledBeds
      }
    }));
    
    setSelectedRoom({
      ...selectedRoom,
      status: editRoomData.status,
      beds: editRoomData.beds,
      freeBeds: editRoomData.freeBeds,
      filledBeds: editRoomData.filledBeds
    });"""
content = content.replace(old_handle_save, new_handle_save)

# 5. Update setSelectedRoom onClick in the grid
old_on_click = """                  onClick={() => {
                    setSelectedRoom({ roomNum, status, beds });
                    setIsEditingRoom(false);
                  }}"""
new_on_click = """                  onClick={() => {
                    setSelectedRoom({ roomNum, status, beds, freeBeds: locals.freeBeds, filledBeds: locals.filledBeds });
                    setIsEditingRoom(false);
                  }}"""
# Need to use the variables mapped from filteredRooms. Wait, we need to destructure freeBeds, filledBeds in the map!
content = content.replace(
    "{filteredRooms.map(({ roomNum, status, beds }) => (",
    "{filteredRooms.map(({ roomNum, status, beds, freeBeds, filledBeds }) => ("
)
content = content.replace(old_on_click, """                  onClick={() => {
                    setSelectedRoom({ roomNum, status, beds, freeBeds, filledBeds });
                    setIsEditingRoom(false);
                  }}""")

# 6. Update the Modal UI view mode
old_view_ui = """                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Bed Type</span>
                    <span className="font-medium text-gray-900">{selectedRoom.beds} Bed{selectedRoom.beds !== 1 ? 's' : ''}</span>
                  </div>
                </>"""
new_view_ui = """                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Total Beds</span>
                    <span className="font-medium text-gray-900">{selectedRoom.beds} Bed{selectedRoom.beds !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Free Beds</span>
                    <span className="font-medium text-green-600">{selectedRoom.freeBeds !== undefined ? selectedRoom.freeBeds : '-'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Filled Beds</span>
                    <span className="font-medium text-red-600">{selectedRoom.filledBeds !== undefined ? selectedRoom.filledBeds : '-'}</span>
                  </div>
                </>"""
content = content.replace(old_view_ui, new_view_ui)

# 7. Update Modal UI edit mode
old_edit_ui = """                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-500">Beds</span>
                    <input 
                      type="number"
                      value={editRoomData.beds}
                      onChange={(e) => setEditRoomData({...editRoomData, beds: parseInt(e.target.value) || 0})}
                      className="w-20 border border-gray-300 rounded-lg px-2 py-1 text-sm text-right focus:ring-2 focus:ring-blue-500 outline-none"
                      min="1" max="10"
                    />
                  </div>
                </>"""
new_edit_ui = """                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-500">Total Beds</span>
                    <input 
                      type="number"
                      value={editRoomData.beds}
                      onChange={(e) => setEditRoomData({...editRoomData, beds: parseInt(e.target.value) || 0})}
                      className="w-20 border border-gray-300 rounded-lg px-2 py-1 text-sm text-right focus:ring-2 focus:ring-blue-500 outline-none"
                      min="1" max="10"
                    />
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-500">Free Beds</span>
                    <input 
                      type="number"
                      value={editRoomData.freeBeds}
                      onChange={(e) => setEditRoomData({...editRoomData, freeBeds: parseInt(e.target.value) || 0})}
                      className="w-20 border border-gray-300 rounded-lg px-2 py-1 text-sm text-right focus:ring-2 focus:ring-blue-500 outline-none"
                      min="0" max="10"
                    />
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-500">Filled Beds</span>
                    <input 
                      type="number"
                      value={editRoomData.filledBeds}
                      onChange={(e) => setEditRoomData({...editRoomData, filledBeds: parseInt(e.target.value) || 0})}
                      className="w-20 border border-gray-300 rounded-lg px-2 py-1 text-sm text-right focus:ring-2 focus:ring-blue-500 outline-none"
                      min="0" max="10"
                    />
                  </div>
                </>"""
content = content.replace(old_edit_ui, new_edit_ui)


# Fix the type of selectedRoom in useState to include freeBeds and filledBeds
old_type = "const [selectedRoom, setSelectedRoom] = useState<{ roomNum: number, status: string, beds: number } | null>(null);"
new_type = "const [selectedRoom, setSelectedRoom] = useState<{ roomNum: number, status: string, beds: number, freeBeds?: number, filledBeds?: number } | null>(null);"
content = content.replace(old_type, new_type)

# Fix roomOverrides state type
old_type_overrides = "const [roomOverrides, setRoomOverrides] = useState<Record<string, { status?: string, beds?: number }>>({});"
new_type_overrides = "const [roomOverrides, setRoomOverrides] = useState<Record<string, { status?: string, beds?: number, freeBeds?: number, filledBeds?: number }>>({});"
content = content.replace(old_type_overrides, new_type_overrides)


with open('src/app/staff/properties/page.tsx', 'w') as f:
    f.write(content)

