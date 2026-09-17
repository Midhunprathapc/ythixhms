import re

with open('src/app/staff/properties/page.tsx', 'r') as f:
    content = f.read()

# 1. Add useEffect for URL params
effect_logic = """  const [searchQuery, setSearchQuery] = useState('');

  // Check for openRoom in URL
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

content = content.replace("  const [searchQuery, setSearchQuery] = useState('');", effect_logic)

# 2. Update Link to include URL param
old_link = """                                <Link 
                                  href={`/staff/students/1`}"""
new_link = """                                <Link 
                                  href={`/staff/students/1?from=properties&room=${selectedRoom.roomNum}`}"""

content = content.replace(old_link, new_link)

with open('src/app/staff/properties/page.tsx', 'w') as f:
    f.write(content)
