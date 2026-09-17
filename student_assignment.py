import re

with open('src/app/staff/properties/page.tsx', 'r') as f:
    content = f.read()

# 1. Add MOCK_STUDENTS
mock_students_code = """const MOCK_STUDENTS = [
  { id: 1, name: 'Alex Johnson', course: 'B.Tech Computer Science', phone: '+1 (555) 019-1000' },
  { id: 2, name: 'Maria Garcia', course: 'MBA Finance', phone: '+1 (555) 019-1001' },
  { id: 3, name: 'James Smith', course: 'B.Arch', phone: '+1 (555) 019-1002' },
  { id: 4, name: 'Emma Wilson', course: 'B.Tech Electronics', phone: '+1 (555) 019-1003' },
  { id: 5, name: 'Liam Brown', course: 'B.Tech Mechanical', phone: '+1 (555) 019-1004' },
  { id: 6, name: 'Olivia Taylor', course: 'M.Tech Data Science', phone: '+1 (555) 019-1005' },
];

export default function Properties() {"""
content = content.replace("export default function Properties() {", mock_students_code)

# 2. Update Types & State
content = content.replace(
    "const [editRoomData, setEditRoomData] = useState({ status: '', beds: 0, freeBeds: 0, filledBeds: 0, bedStatuses: [] as boolean[] });",
    """const [editRoomData, setEditRoomData] = useState({ status: '', beds: 0, freeBeds: 0, filledBeds: 0, bedStatuses: [] as boolean[], bedOccupants: [] as (string | null)[] });
  const [activeSearchBed, setActiveSearchBed] = useState<number | null>(null);
  const [studentSearchQuery, setStudentSearchQuery] = useState('');"""
)

content = content.replace(
    "const [selectedRoom, setSelectedRoom] = useState<{ roomNum: number, status: string, beds: number, freeBeds?: number, filledBeds?: number, bedStatuses?: boolean[] } | null>(null);",
    "const [selectedRoom, setSelectedRoom] = useState<{ roomNum: number, status: string, beds: number, freeBeds?: number, filledBeds?: number, bedStatuses?: boolean[], bedOccupants?: (string | null)[] } | null>(null);"
)

content = content.replace(
    "const [roomOverrides, setRoomOverrides] = useState<Record<string, { status?: string, beds?: number, freeBeds?: number, filledBeds?: number, bedStatuses?: boolean[] }>>({});",
    "const [roomOverrides, setRoomOverrides] = useState<Record<string, { status?: string, beds?: number, freeBeds?: number, filledBeds?: number, bedStatuses?: boolean[], bedOccupants?: (string | null)[] }>>({});"
)

# 3. filteredRooms logic
content = content.replace(
    """        bedStatuses: override?.bedStatuses
      };""",
    """        bedStatuses: override?.bedStatuses,
        bedOccupants: override?.bedOccupants
      };"""
)

content = content.replace(
    "{filteredRooms.map(({ roomNum, status, beds, freeBeds, filledBeds, bedStatuses }) => (",
    "{filteredRooms.map(({ roomNum, status, beds, freeBeds, filledBeds, bedStatuses, bedOccupants }) => ("
)
content = content.replace(
    "setSelectedRoom({ roomNum, status, beds, freeBeds, filledBeds, bedStatuses });",
    "setSelectedRoom({ roomNum, status, beds, freeBeds, filledBeds, bedStatuses, bedOccupants });"
)

# 4. handleEditRoomStart & Save
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

old_save = """        freeBeds: editRoomData.freeBeds,
        filledBeds: editRoomData.filledBeds,
        bedStatuses: editRoomData.bedStatuses
      }
    }));
    
    setSelectedRoom({
      ...selectedRoom,
      status: editRoomData.status,
      beds: editRoomData.beds,
      freeBeds: editRoomData.freeBeds,
      filledBeds: editRoomData.filledBeds,
      bedStatuses: editRoomData.bedStatuses
    });
    setIsEditingRoom(false);"""
new_save = """        freeBeds: editRoomData.freeBeds,
        filledBeds: editRoomData.filledBeds,
        bedStatuses: editRoomData.bedStatuses,
        bedOccupants: editRoomData.bedOccupants
      }
    }));
    
    setSelectedRoom({
      ...selectedRoom,
      status: editRoomData.status,
      beds: editRoomData.beds,
      freeBeds: editRoomData.freeBeds,
      filledBeds: editRoomData.filledBeds,
      bedStatuses: editRoomData.bedStatuses,
      bedOccupants: editRoomData.bedOccupants
    });
    setIsEditingRoom(false);
    setActiveSearchBed(null);"""
content = content.replace(old_save, new_save)


# 5. Total beds change logic
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
