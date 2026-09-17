import re

with open('src/app/staff/properties/page.tsx', 'r') as f:
    content = f.read()

# We know the Modals start at line 449: `      {/* Add Property Modal */}`
# Let's extract everything up to that point.
split_point = content.find("      {/* Add Property Modal */}")
head_content = content[:split_point]

# Now we append the correct modals to `head_content`.

new_modals = """      {/* Add Property Modal */}
      {isAddPropertyModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900">Add New Property</h2>
              <button onClick={() => setIsAddPropertyModalOpen(false)} className="text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Property Name</label>
                <input 
                  type="text" 
                  value={newProperty.name}
                  onChange={(e) => setNewProperty({...newProperty, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                  placeholder="e.g. University View" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Location / Address</label>
                <input 
                  type="text" 
                  value={newProperty.location}
                  onChange={(e) => setNewProperty({...newProperty, location: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                  placeholder="e.g. North Campus" 
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Total Rooms</label>
                  <input 
                    type="number" 
                    readOnly value={newProperty.roomsPerFloor.reduce((acc, curr) => acc + (parseInt(curr) || 0), 0)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-not-allowed" 
                    placeholder="0" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Floors</label>
                  <input 
                    type="number" 
                    value={newProperty.floors}
                    onChange={(e) => {
                      const newFloors = parseInt(e.target.value) || 1;
                      let newRoomsPerFloor = [...newProperty.roomsPerFloor];
                      let newBedsPerFloor = [...newProperty.bedsPerFloor];
                      if (newFloors > newRoomsPerFloor.length) {
                        for (let i = newRoomsPerFloor.length; i < newFloors; i++) {
                          newRoomsPerFloor.push('0');
                          newBedsPerFloor.push(newProperty.beds);
                        }
                      } else if (newFloors < newRoomsPerFloor.length && newFloors > 0) {
                        newRoomsPerFloor.length = newFloors;
                        newBedsPerFloor.length = newFloors;
                      }
                      setNewProperty({...newProperty, floors: e.target.value, roomsPerFloor: newRoomsPerFloor, bedsPerFloor: newBedsPerFloor});
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                    placeholder="1" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Beds / Room</label>
                  <input 
                    type="number" 
                    value={newProperty.beds}
                    onChange={(e) => setNewProperty({...newProperty, beds: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                    placeholder="2" 
                  />
                </div>
              </div>

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
              
              <div className="mt-4 border-t border-gray-100 pt-4">
                <div className="flex items-center mb-3">
                  <input 
                    type="checkbox" 
                    id="newProperty_customBeds"
                    checked={newProperty.isCustomBedsPerFloor}
                    onChange={(e) => setNewProperty({...newProperty, isCustomBedsPerFloor: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="newProperty_customBeds" className="ml-2 block text-sm font-medium text-gray-700">
                    Specify beds per floor
                  </label>
                </div>
                
                {newProperty.isCustomBedsPerFloor && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-3 animate-in fade-in slide-in-from-top-2">
                    {newProperty.bedsPerFloor.map((beds, idx) => (
                      <div key={idx} className="flex flex-col gap-1">
                        <span className="text-xs text-gray-500">Floor {idx + 1} Beds</span>
                        <input 
                          type="number" 
                          value={beds}
                          onChange={(e) => {
                            const newBeds = [...newProperty.bedsPerFloor];
                            newBeds[idx] = e.target.value;
                            setNewProperty({...newProperty, bedsPerFloor: newBeds});
                          }}
                          className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-6 flex gap-3">
                <button 
                  onClick={() => setIsAddPropertyModalOpen(false)}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddProperty}
                  disabled={!newProperty.name || !newProperty.location}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Property
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Property Modal */}
      {editingPropertyId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900">Edit Property</h2>
              <button onClick={() => setEditingPropertyId(null)} className="text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Property Name</label>
                <input 
                  type="text" 
                  value={editPropertyForm.name}
                  onChange={(e) => setEditPropertyForm({...editPropertyForm, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                  placeholder="e.g. University View" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Location / Address</label>
                <input 
                  type="text" 
                  value={editPropertyForm.location}
                  onChange={(e) => setEditPropertyForm({...editPropertyForm, location: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                  placeholder="e.g. North Campus" 
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Total Rooms</label>
                  <input 
                    type="number" 
                    readOnly value={editPropertyForm.roomsPerFloor.reduce((acc, curr) => acc + (parseInt(curr) || 0), 0)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-not-allowed" 
                    placeholder="0" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Floors</label>
                  <input 
                    type="number" 
                    value={editPropertyForm.floors}
                    onChange={(e) => {
                      const newFloors = parseInt(e.target.value) || 1;
                      let newRoomsPerFloor = [...editPropertyForm.roomsPerFloor];
                      let newBedsPerFloor = [...editPropertyForm.bedsPerFloor];
                      if (newFloors > newRoomsPerFloor.length) {
                        for (let i = newRoomsPerFloor.length; i < newFloors; i++) {
                          newRoomsPerFloor.push('0');
                          newBedsPerFloor.push(editPropertyForm.beds);
                        }
                      } else if (newFloors < newRoomsPerFloor.length && newFloors > 0) {
                        newRoomsPerFloor.length = newFloors;
                        newBedsPerFloor.length = newFloors;
                      }
                      setEditPropertyForm({...editPropertyForm, floors: e.target.value, roomsPerFloor: newRoomsPerFloor, bedsPerFloor: newBedsPerFloor});
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                    placeholder="1" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Beds / Room</label>
                  <input 
                    type="number" 
                    value={editPropertyForm.beds}
                    onChange={(e) => setEditPropertyForm({...editPropertyForm, beds: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                    placeholder="2" 
                  />
                </div>
              </div>

              <div className="space-y-3 mt-4 border-t border-gray-100 pt-4">
                <label className="text-sm font-medium text-gray-700">Rooms per Floor</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {editPropertyForm.roomsPerFloor.map((rooms, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                      <span className="text-xs text-gray-500">Floor {idx + 1}</span>
                      <input 
                        type="number" 
                        value={rooms}
                        onChange={(e) => {
                          const newRooms = [...editPropertyForm.roomsPerFloor];
                          newRooms[idx] = e.target.value;
                          setEditPropertyForm({...editPropertyForm, roomsPerFloor: newRooms});
                        }}
                        className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-4 border-t border-gray-100 pt-4">
                <div className="flex items-center mb-3">
                  <input 
                    type="checkbox" 
                    id="editPropertyForm_customBeds"
                    checked={editPropertyForm.isCustomBedsPerFloor}
                    onChange={(e) => setEditPropertyForm({...editPropertyForm, isCustomBedsPerFloor: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="editPropertyForm_customBeds" className="ml-2 block text-sm font-medium text-gray-700">
                    Specify beds per floor
                  </label>
                </div>
                
                {editPropertyForm.isCustomBedsPerFloor && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-3 animate-in fade-in slide-in-from-top-2">
                    {editPropertyForm.bedsPerFloor.map((beds, idx) => (
                      <div key={idx} className="flex flex-col gap-1">
                        <span className="text-xs text-gray-500">Floor {idx + 1} Beds</span>
                        <input 
                          type="number" 
                          value={beds}
                          onChange={(e) => {
                            const newBeds = [...editPropertyForm.bedsPerFloor];
                            newBeds[idx] = e.target.value;
                            setEditPropertyForm({...editPropertyForm, bedsPerFloor: newBeds});
                          }}
                          className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-6 flex gap-3">
                <button 
                  onClick={() => setEditingPropertyId(null)}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleUpdateProperty}
                  disabled={!editPropertyForm.name || !editPropertyForm.location}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Update Property
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
"""

with open('src/app/staff/properties/page.tsx', 'w') as f:
    f.write(head_content + new_modals)
