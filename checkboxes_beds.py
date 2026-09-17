import re

with open('src/app/staff/properties/page.tsx', 'r') as f:
    content = f.read()

# 1. Update State Types
old_state = "const [editRoomData, setEditRoomData] = useState({ status: '', beds: 0, freeBeds: 0, filledBeds: 0 });"
new_state = "const [editRoomData, setEditRoomData] = useState({ status: '', beds: 0, freeBeds: 0, filledBeds: 0, bedStatuses: [] as boolean[] });"
content = content.replace(old_state, new_state)

old_selected_type = "const [selectedRoom, setSelectedRoom] = useState<{ roomNum: number, status: string, beds: number, freeBeds?: number, filledBeds?: number } | null>(null);"
new_selected_type = "const [selectedRoom, setSelectedRoom] = useState<{ roomNum: number, status: string, beds: number, freeBeds?: number, filledBeds?: number, bedStatuses?: boolean[] } | null>(null);"
content = content.replace(old_selected_type, new_selected_type)

old_overrides_type = "const [roomOverrides, setRoomOverrides] = useState<Record<string, { status?: string, beds?: number, freeBeds?: number, filledBeds?: number }>>({});"
new_overrides_type = "const [roomOverrides, setRoomOverrides] = useState<Record<string, { status?: string, beds?: number, freeBeds?: number, filledBeds?: number, bedStatuses?: boolean[] }>>({});"
content = content.replace(old_overrides_type, new_overrides_type)

# 2. Update filteredRooms useMemo
old_return = """        freeBeds: override?.freeBeds !== undefined ? override.freeBeds : (defaultStatus === 'occupied' ? 0 : defaultBeds),
        filledBeds: override?.filledBeds !== undefined ? override.filledBeds : (defaultStatus === 'occupied' ? defaultBeds : 0)
      };"""
new_return = """        freeBeds: override?.freeBeds !== undefined ? override.freeBeds : (defaultStatus === 'occupied' ? 0 : defaultBeds),
        filledBeds: override?.filledBeds !== undefined ? override.filledBeds : (defaultStatus === 'occupied' ? defaultBeds : 0),
        bedStatuses: override?.bedStatuses
      };"""
content = content.replace(old_return, new_return)

# 3. Update map onClick
content = content.replace(
    "{filteredRooms.map(({ roomNum, status, beds, freeBeds, filledBeds }) => (",
    "{filteredRooms.map(({ roomNum, status, beds, freeBeds, filledBeds, bedStatuses }) => ("
)
content = content.replace(
    "setSelectedRoom({ roomNum, status, beds, freeBeds, filledBeds });",
    "setSelectedRoom({ roomNum, status, beds, freeBeds, filledBeds, bedStatuses });"
)

# 4. Update handleEditRoomStart
old_start = """  const handleEditRoomStart = () => {
    if (!selectedRoom) return;
    setEditRoomData({ 
      status: selectedRoom.status, 
      beds: selectedRoom.beds,
      freeBeds: selectedRoom.freeBeds !== undefined ? selectedRoom.freeBeds : selectedRoom.beds,
      filledBeds: selectedRoom.filledBeds !== undefined ? selectedRoom.filledBeds : 0
    });
    setIsEditingRoom(true);
  };"""
new_start = """  const handleEditRoomStart = () => {
    if (!selectedRoom) return;
    const filledCount = selectedRoom.filledBeds !== undefined ? selectedRoom.filledBeds : (selectedRoom.status === 'occupied' ? selectedRoom.beds : 0);
    const initialBedStatuses = selectedRoom.bedStatuses || Array.from({ length: selectedRoom.beds }, (_, i) => i < filledCount);
    
    setEditRoomData({ 
      status: selectedRoom.status, 
      beds: selectedRoom.beds,
      freeBeds: selectedRoom.freeBeds !== undefined ? selectedRoom.freeBeds : selectedRoom.beds,
      filledBeds: filledCount,
      bedStatuses: initialBedStatuses
    });
    setIsEditingRoom(true);
  };"""
content = content.replace(old_start, new_start)

# 5. Update handleSaveRoomEdit
old_save = """      [overrideKey]: {
        status: editRoomData.status,
        beds: editRoomData.beds,
        freeBeds: editRoomData.freeBeds,
        filledBeds: editRoomData.filledBeds
      }"""
new_save = """      [overrideKey]: {
        status: editRoomData.status,
        beds: editRoomData.beds,
        freeBeds: editRoomData.freeBeds,
        filledBeds: editRoomData.filledBeds,
        bedStatuses: editRoomData.bedStatuses
      }"""
content = content.replace(old_save, new_save)

content = content.replace(
    """      freeBeds: editRoomData.freeBeds,
      filledBeds: editRoomData.filledBeds
    });""",
    """      freeBeds: editRoomData.freeBeds,
      filledBeds: editRoomData.filledBeds,
      bedStatuses: editRoomData.bedStatuses
    });"""
)

# 6. Update JSX Edit UI
old_edit_jsx = """                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-500">Total Beds</span>
                    <input 
                      type="number"
                      value={editRoomData.beds}
                      onChange={(e) => {
                        const newTotal = parseInt(e.target.value) || 0;
                        setEditRoomData(prev => ({...prev, beds: newTotal, freeBeds: newTotal - prev.filledBeds}));
                      }}
                      className="w-20 border border-gray-300 rounded-lg px-2 py-1 text-sm text-right focus:ring-2 focus:ring-blue-500 outline-none"
                      min="1" max="10"
                    />
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-500">Free Beds</span>
                    <input 
                      type="number"
                      value={editRoomData.freeBeds}
                      onChange={(e) => {
                        const newFree = parseInt(e.target.value) || 0;
                        setEditRoomData(prev => ({...prev, freeBeds: newFree, filledBeds: prev.beds - newFree}));
                      }}
                      className="w-20 border border-gray-300 rounded-lg px-2 py-1 text-sm text-right focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-500">Filled Beds</span>
                    <input 
                      type="number"
                      value={editRoomData.filledBeds}
                      onChange={(e) => {
                        const newFilled = parseInt(e.target.value) || 0;
                        setEditRoomData(prev => ({...prev, filledBeds: newFilled, freeBeds: prev.beds - newFilled}));
                      }}
                      className="w-20 border border-gray-300 rounded-lg px-2 py-1 text-sm text-right focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  
                  {(editRoomData.freeBeds < 0 || editRoomData.filledBeds < 0 || editRoomData.freeBeds > editRoomData.beds || editRoomData.filledBeds > editRoomData.beds) && (
                    <div className="text-red-500 text-xs font-medium flex items-center gap-1.5 pt-1">
                      <AlertCircle className="h-4 w-4" /> 
                      Warning: Free and Filled beds cannot exceed Total Beds.
                    </div>
                  )}"""

new_edit_jsx = """                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-500">Total Beds</span>
                    <input 
                      type="number"
                      value={editRoomData.beds}
                      onChange={(e) => {
                        const newTotal = parseInt(e.target.value) || 0;
                        const newBedStatuses = Array.from({ length: newTotal }, (_, i) => 
                          i < editRoomData.bedStatuses.length ? editRoomData.bedStatuses[i] : false
                        );
                        const newFilled = newBedStatuses.filter(v => v).length;
                        setEditRoomData(prev => ({
                          ...prev, 
                          beds: newTotal, 
                          bedStatuses: newBedStatuses,
                          filledBeds: newFilled,
                          freeBeds: newTotal - newFilled
                        }));
                      }}
                      className="w-20 border border-gray-300 rounded-lg px-2 py-1 text-sm text-right focus:ring-2 focus:ring-blue-500 outline-none"
                      min="1" max="10"
                    />
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-500">Individual Beds</span>
                    <div className="flex gap-3 flex-wrap justify-end max-w-[220px]">
                      {editRoomData.bedStatuses.map((isFilled, idx) => {
                        const bedLabel = String.fromCharCode(65 + idx);
                        return (
                          <label key={idx} className="flex items-center gap-1.5 cursor-pointer text-sm font-medium text-gray-700 hover:text-blue-600">
                            <input 
                              type="checkbox"
                              checked={isFilled}
                              onChange={(e) => {
                                const newStatuses = [...editRoomData.bedStatuses];
                                newStatuses[idx] = e.target.checked;
                                const newFilled = newStatuses.filter(v => v).length;
                                setEditRoomData(prev => ({
                                  ...prev,
                                  bedStatuses: newStatuses,
                                  filledBeds: newFilled,
                                  freeBeds: prev.beds - newFilled
                                }));
                              }}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5 cursor-pointer"
                            />
                            {bedLabel}
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-500">Free Beds</span>
                    <div className="text-right">
                      <span className="font-medium text-green-600">{editRoomData.freeBeds}</span>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {editRoomData.bedStatuses.map((filled, i) => !filled ? String.fromCharCode(65 + i) : null).filter(Boolean).join(', ') || 'None'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-500">Filled Beds</span>
                    <div className="text-right">
                      <span className="font-medium text-red-600">{editRoomData.filledBeds}</span>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {editRoomData.bedStatuses.map((filled, i) => filled ? String.fromCharCode(65 + i) : null).filter(Boolean).join(', ') || 'None'}
                      </div>
                    </div>
                  </div>"""

content = content.replace(old_edit_jsx, new_edit_jsx)


# 7. Update View JSX (so labels also show up when not editing)
old_view_jsx = """                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Free Beds</span>
                    <span className="font-medium text-green-600">{selectedRoom.freeBeds !== undefined ? selectedRoom.freeBeds : '-'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Filled Beds</span>
                    <span className="font-medium text-red-600">{selectedRoom.filledBeds !== undefined ? selectedRoom.filledBeds : '-'}</span>
                  </div>"""

new_view_jsx = """                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Free Beds</span>
                    <div className="text-right">
                      <span className="font-medium text-green-600">{selectedRoom.freeBeds !== undefined ? selectedRoom.freeBeds : '-'}</span>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {selectedRoom.bedStatuses ? selectedRoom.bedStatuses.map((filled, i) => !filled ? String.fromCharCode(65 + i) : null).filter(Boolean).join(', ') : 'All'}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Filled Beds</span>
                    <div className="text-right">
                      <span className="font-medium text-red-600">{selectedRoom.filledBeds !== undefined ? selectedRoom.filledBeds : '-'}</span>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {selectedRoom.bedStatuses ? selectedRoom.bedStatuses.map((filled, i) => filled ? String.fromCharCode(65 + i) : null).filter(Boolean).join(', ') : 'None'}
                      </div>
                    </div>
                  </div>"""

content = content.replace(old_view_jsx, new_view_jsx)

with open('src/app/staff/properties/page.tsx', 'w') as f:
    f.write(content)
