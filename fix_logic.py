import re

with open('src/app/staff/properties/page.tsx', 'r') as f:
    content = f.read()

old_start = """    const initialBedStatuses = selectedRoom.bedStatuses || Array.from({ length: selectedRoom.beds }, (_, i) => i < filledCount);
    
    setEditRoomData({ 
      status: selectedRoom.status, 
      beds: selectedRoom.beds,
      freeBeds: selectedRoom.freeBeds !== undefined ? selectedRoom.freeBeds : selectedRoom.beds,
      filledBeds: filledCount,
      bedStatuses: initialBedStatuses
    });
    setIsEditingRoom(true);"""
new_start = """    const initialBedStatuses = selectedRoom.bedStatuses || Array.from({ length: selectedRoom.beds }, (_, i) => i < filledCount);
    const initialBedOccupants = selectedRoom.bedOccupants || Array.from({ length: selectedRoom.beds }, (_, i) => i < filledCount ? `Student ${selectedRoom.roomNum}-${String.fromCharCode(65 + i)}` : null);
    
    setEditRoomData({ 
      status: selectedRoom.status, 
      beds: selectedRoom.beds,
      freeBeds: selectedRoom.freeBeds !== undefined ? selectedRoom.freeBeds : selectedRoom.beds,
      filledBeds: filledCount,
      bedStatuses: initialBedStatuses,
      bedOccupants: initialBedOccupants
    });
    setActiveSearchBed(null);
    setStudentSearchQuery('');
    setIsEditingRoom(true);"""
content = content.replace(old_start, new_start)

old_beds_change = """                        const newBedStatuses = Array.from({ length: newTotal }, (_, i) => 
                          i < editRoomData.bedStatuses.length ? editRoomData.bedStatuses[i] : false
                        );
                        const newFilled = newBedStatuses.filter(v => v).length;
                        const newFree = newTotal - newFilled;
                        
                        setEditRoomData(prev => {
                          let newStatus = prev.status;
                          if (newFilled === newTotal && newTotal > 0) {
                            newStatus = 'occupied';
                          } else if (newFree > 0 && prev.status !== 'maintenance') {
                            newStatus = 'available';
                          }
                          return {
                            ...prev, 
                            beds: newTotal, 
                            bedStatuses: newBedStatuses,
                            filledBeds: newFilled,
                            freeBeds: newFree,
                            status: newStatus
                          };
                        });"""

new_beds_change = """                        const newBedStatuses = Array.from({ length: newTotal }, (_, i) => 
                          i < editRoomData.bedStatuses.length ? editRoomData.bedStatuses[i] : false
                        );
                        const newBedOccupants = Array.from({ length: newTotal }, (_, i) => 
                          i < editRoomData.bedOccupants.length ? editRoomData.bedOccupants[i] : null
                        );
                        const newFilled = newBedStatuses.filter(v => v).length;
                        const newFree = newTotal - newFilled;
                        
                        setEditRoomData(prev => {
                          let newStatus = prev.status;
                          if (newFilled === newTotal && newTotal > 0) {
                            newStatus = 'occupied';
                          } else if (newFree > 0 && prev.status !== 'maintenance') {
                            newStatus = 'available';
                          }
                          return {
                            ...prev, 
                            beds: newTotal, 
                            bedStatuses: newBedStatuses,
                            bedOccupants: newBedOccupants,
                            filledBeds: newFilled,
                            freeBeds: newFree,
                            status: newStatus
                          };
                        });"""
content = content.replace(old_beds_change, new_beds_change)

with open('src/app/staff/properties/page.tsx', 'w') as f:
    f.write(content)
