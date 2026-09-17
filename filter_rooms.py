import re

with open('src/app/staff/properties/page.tsx', 'r') as f:
    content = f.read()

# 1. Add state for roomFilters
state_str = """
  const [propertyToDelete, setPropertyToDelete] = useState<number | null>(null);
  const [roomFilters, setRoomFilters] = useState({ occupied: false, available: false, maintenance: false });"""
content = content.replace("  const [propertyToDelete, setPropertyToDelete] = useState<number | null>(null);", state_str)

# 2. Add filteredRooms useMemo
# Find `const handleAddProperty` to insert right before it
filtered_rooms_memo = """
  const filteredRooms = useMemo(() => {
    const isFilterActive = roomFilters.occupied || roomFilters.available || roomFilters.maintenance;
    if (!isFilterActive) return rooms;
    
    return rooms.filter(room => {
      if (room.status === 'occupied' && roomFilters.occupied) return true;
      if (room.status === 'available' && roomFilters.available) return true;
      if (room.status === 'maintenance' && roomFilters.maintenance) return true;
      return false;
    });
  }, [rooms, roomFilters]);

  const handleDeleteProperty"""

content = content.replace("  const handleDeleteProperty", filtered_rooms_memo)

# 3. Use filteredRooms instead of rooms in the map
content = content.replace(
    "{rooms.map(({ roomNum, status, beds }) => (",
    "{filteredRooms.map(({ roomNum, status, beds }) => ("
)

# 4. Replace legend with interactive filters
old_legend = """            {/* Legend */}
            <div className="absolute bottom-4 left-6 flex flex-wrap gap-4 text-xs font-medium bg-white/80 backdrop-blur-sm p-2 rounded-lg border border-gray-200">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-white border border-gray-300"></div> Occupied</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-green-50 border border-green-300"></div> Available</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-red-50 border border-red-300"></div> Maintenance</div>
            </div>"""

new_legend = """            {/* Legend / Filters */}
            <div className="absolute bottom-4 left-6 flex flex-wrap gap-4 text-xs font-medium bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-gray-200 shadow-sm">
              <label className="flex items-center gap-2 cursor-pointer select-none hover:opacity-80 transition-opacity">
                <input 
                  type="checkbox" 
                  checked={roomFilters.occupied}
                  onChange={(e) => setRoomFilters({...roomFilters, occupied: e.target.checked})}
                  className="rounded border-gray-300 text-gray-900 focus:ring-gray-500 h-3.5 w-3.5 cursor-pointer"
                />
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-white border border-gray-300"></div> Occupied</div>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none hover:opacity-80 transition-opacity">
                <input 
                  type="checkbox" 
                  checked={roomFilters.available}
                  onChange={(e) => setRoomFilters({...roomFilters, available: e.target.checked})}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500 h-3.5 w-3.5 cursor-pointer"
                />
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-green-50 border border-green-300"></div> Available</div>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none hover:opacity-80 transition-opacity">
                <input 
                  type="checkbox" 
                  checked={roomFilters.maintenance}
                  onChange={(e) => setRoomFilters({...roomFilters, maintenance: e.target.checked})}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500 h-3.5 w-3.5 cursor-pointer"
                />
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-red-50 border border-red-300"></div> Maintenance</div>
              </label>
            </div>"""

content = content.replace(old_legend, new_legend)

with open('src/app/staff/properties/page.tsx', 'w') as f:
    f.write(content)
