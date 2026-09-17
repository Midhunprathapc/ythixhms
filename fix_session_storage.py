import re

with open('src/app/staff/properties/page.tsx', 'r') as f:
    content = f.read()

# 1. Remove the broken URL params useEffect
broken_effect = """  // Check for openRoom in URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const openRoom = urlParams.get('openRoom');
      if (openRoom && properties.length > 0 && !selectedRoom) {
        let foundRoom = null;
        let foundPropertyId = null;
        for (const property of properties) {
          for (const floor of property.floors) {
            const r = floor.rooms.find(r => r.roomNum === openRoom);
            if (r) {
              foundRoom = { ...r, floor: floor.level, property: property.name };
              foundPropertyId = property.id;
              break;
            }
          }
          if (foundRoom) break;
        }
        if (foundRoom) {
          setSelectedPropertyId(foundPropertyId);
          setSelectedRoom(foundRoom);
        }
      }
    }
  }, [properties, selectedRoom]);"""

new_effect = """  // Restore room modal if returning from student details
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const returnRoom = sessionStorage.getItem('hms_return_room');
      if (returnRoom) {
        try {
          const parsed = JSON.parse(returnRoom);
          setSelectedRoom(parsed);
          sessionStorage.removeItem('hms_return_room');
        } catch (e) {}
      }
    }
  }, []);"""

content = content.replace(broken_effect, new_effect)

# 2. Update Link to use onClick that sets sessionStorage
old_link = """                              {isFilled ? (
                                <Link 
                                  href={`/staff/students/1?from=properties&room=${selectedRoom.roomNum}`}
                                  className="flex items-center gap-3 mt-1 cursor-pointer group p-1.5 -mx-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                                    {mockStudentName!.charAt(0)}
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{mockStudentName}</span>
                                    <span className="text-xs text-gray-500 font-medium mt-0.5 group-hover:text-blue-500">View Details &rarr;</span>
                                  </div>
                                </Link>
                              ) : ("""

new_link = """                              {isFilled ? (
                                <Link 
                                  href={`/staff/students/1?from=properties`}
                                  onClick={() => sessionStorage.setItem('hms_return_room', JSON.stringify(selectedRoom))}
                                  className="flex items-center gap-3 mt-1 cursor-pointer group p-1.5 -mx-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                                    {mockStudentName!.charAt(0)}
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{mockStudentName}</span>
                                    <span className="text-xs text-gray-500 font-medium mt-0.5 group-hover:text-blue-500">View Details &rarr;</span>
                                  </div>
                                </Link>
                              ) : ("""
content = content.replace(old_link, new_link)

with open('src/app/staff/properties/page.tsx', 'w') as f:
    f.write(content)
