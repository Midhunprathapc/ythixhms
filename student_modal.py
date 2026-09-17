import re

with open('src/app/staff/properties/page.tsx', 'r') as f:
    content = f.read()

# 1. Add state for selectedStudent
old_state = "const [editRoomData, setEditRoomData] = useState({ status: '', beds: 0, freeBeds: 0, filledBeds: 0, bedStatuses: [] as boolean[] });"
new_state = """const [editRoomData, setEditRoomData] = useState({ status: '', beds: 0, freeBeds: 0, filledBeds: 0, bedStatuses: [] as boolean[] });
  const [selectedStudent, setSelectedStudent] = useState<{name: string, room: number, bed: string, phone: string, course: string} | null>(null);"""
content = content.replace(old_state, new_state)

# 2. Update View UI in Room Details
old_view_ui = """                  <div className="flex justify-between py-2 border-b border-gray-100">
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

new_view_ui = """                  <div className="pt-3 mt-2 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-500 font-medium">Beds & Occupants</span>
                      <div className="text-xs text-gray-500 flex gap-3">
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> Free: {selectedRoom.freeBeds}</span>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> Filled: {selectedRoom.filledBeds}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1">
                      {Array.from({ length: selectedRoom.beds }).map((_, idx) => {
                        const bedLabel = String.fromCharCode(65 + idx);
                        const isFilled = selectedRoom.bedStatuses ? selectedRoom.bedStatuses[idx] : idx < (selectedRoom.filledBeds || 0);
                        const mockStudentName = isFilled ? `Student ${selectedRoom.roomNum}-${bedLabel}` : null;
                        
                        return (
                          <div key={idx} className="flex justify-between items-center p-2.5 rounded-lg bg-gray-50 border border-gray-200">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${isFilled ? 'bg-red-500' : 'bg-green-500'}`}></div>
                              <span className="font-medium text-gray-700">Bed {bedLabel}</span>
                            </div>
                            {isFilled ? (
                              <button 
                                onClick={() => setSelectedStudent({ name: mockStudentName!, room: selectedRoom.roomNum, bed: bedLabel, phone: '+1 (555) 019-' + (1000 + idx * 42), course: 'B.Tech Computer Science' })}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline focus:outline-none"
                              >
                                {mockStudentName}
                              </button>
                            ) : (
                              <span className="text-green-600 text-sm font-medium">Available</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>"""
content = content.replace(old_view_ui, new_view_ui)

# 3. Add Student Details Modal at the end
student_modal_jsx = """      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="font-semibold text-gray-800">Occupant Details</h3>
              <button onClick={() => setSelectedStudent(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold">
                  {selectedStudent.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{selectedStudent.name}</h4>
                  <p className="text-sm text-gray-500">Room {selectedStudent.room} • Bed {selectedStudent.bed}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Course</span>
                  <span className="text-gray-800 font-medium mt-0.5">{selectedStudent.course}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Phone</span>
                  <span className="text-gray-800 font-medium mt-0.5">{selectedStudent.phone}</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <button onClick={() => setSelectedStudent(null)} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-lg transition-colors">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
"""
content = content.replace("    </div>\n  );\n}", student_modal_jsx + "\n    </div>\n  );\n}")

with open('src/app/staff/properties/page.tsx', 'w') as f:
    f.write(content)
