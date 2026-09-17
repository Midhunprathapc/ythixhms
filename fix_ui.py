import re

with open('src/app/staff/properties/page.tsx', 'r') as f:
    content = f.read()

old_ui = """                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
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
                                
                                setEditRoomData(prev => {
                                  const newFree = prev.beds - newFilled;
                                  let newStatus = prev.status;
                                  if (newFilled === prev.beds && prev.beds > 0) {
                                    newStatus = 'occupied';
                                  } else if (newFree > 0 && prev.status !== 'maintenance') {
                                    newStatus = 'available';
                                  }
                                  return {
                                    ...prev,
                                    bedStatuses: newStatuses,
                                    filledBeds: newFilled,
                                    freeBeds: newFree,
                                    status: newStatus
                                  };
                                });
                              }}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5 cursor-pointer"
                            />
                            {bedLabel}
                          </label>
                        );
                      })}
                    </div>
                  </div>"""

new_ui = """                  <div className="pt-2 pb-1">
                    <span className="text-gray-500 font-medium mb-3 block">Bed Assignments</span>
                    <div className="flex flex-col gap-3">
                      {editRoomData.bedStatuses.map((isFilled, idx) => {
                        const bedLabel = String.fromCharCode(65 + idx);
                        const occupant = editRoomData.bedOccupants[idx];
                        
                        return (
                          <div key={idx} className="flex flex-col gap-2 p-3 rounded-lg border border-gray-200 bg-gray-50">
                            <div className="flex justify-between items-center relative">
                              <span className="font-bold text-gray-700">Bed {bedLabel}</span>
                              {isFilled && occupant ? (
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-semibold text-gray-900">{occupant}</span>
                                  <button 
                                    onClick={() => {
                                      const newStatuses = [...editRoomData.bedStatuses];
                                      const newOccupants = [...editRoomData.bedOccupants];
                                      newStatuses[idx] = false;
                                      newOccupants[idx] = null;
                                      
                                      const newFilled = newStatuses.filter(v => v).length;
                                      setEditRoomData(prev => {
                                        const newFree = prev.beds - newFilled;
                                        let newStatus = prev.status;
                                        if (newFilled === prev.beds && prev.beds > 0) {
                                          newStatus = 'occupied';
                                        } else if (newFree > 0 && prev.status !== 'maintenance') {
                                          newStatus = 'available';
                                        }
                                        return { ...prev, bedStatuses: newStatuses, bedOccupants: newOccupants, filledBeds: newFilled, freeBeds: newFree, status: newStatus };
                                      });
                                    }}
                                    className="text-red-500 hover:bg-red-50 p-1 rounded transition-colors"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ) : (
                                <div>
                                  <button 
                                    onClick={() => {
                                      setActiveSearchBed(activeSearchBed === idx ? null : idx);
                                      setStudentSearchQuery('');
                                    }}
                                    className="text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors"
                                  >
                                    Assign Student
                                  </button>
                                  
                                  {activeSearchBed === idx && (
                                    <div className="absolute right-0 top-10 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-[60] p-2">
                                      <div className="relative mb-2">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                                        <input 
                                          type="text" 
                                          placeholder="Search students..." 
                                          value={studentSearchQuery}
                                          onChange={e => setStudentSearchQuery(e.target.value)}
                                          className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                          autoFocus
                                        />
                                      </div>
                                      <div className="max-h-40 overflow-y-auto custom-scrollbar">
                                        {MOCK_STUDENTS.filter(s => s.name.toLowerCase().includes(studentSearchQuery.toLowerCase())).map(student => (
                                          <button
                                            key={student.id}
                                            onClick={() => {
                                              const newStatuses = [...editRoomData.bedStatuses];
                                              const newOccupants = [...editRoomData.bedOccupants];
                                              newStatuses[idx] = true;
                                              newOccupants[idx] = student.name;
                                              
                                              const newFilled = newStatuses.filter(v => v).length;
                                              setEditRoomData(prev => {
                                                const newFree = prev.beds - newFilled;
                                                let newStatus = prev.status;
                                                if (newFilled === prev.beds && prev.beds > 0) {
                                                  newStatus = 'occupied';
                                                } else if (newFree > 0 && prev.status !== 'maintenance') {
                                                  newStatus = 'available';
                                                }
                                                return { ...prev, bedStatuses: newStatuses, bedOccupants: newOccupants, filledBeds: newFilled, freeBeds: newFree, status: newStatus };
                                              });
                                              setActiveSearchBed(null);
                                            }}
                                            className="w-full text-left px-3 py-2 hover:bg-blue-50 rounded-md text-sm text-gray-700 hover:text-blue-700 transition-colors"
                                          >
                                            <div className="font-semibold">{student.name}</div>
                                            <div className="text-[10px] text-gray-500">{student.course}</div>
                                          </button>
                                        ))}
                                      </div>
                                      <button 
                                        className="w-full mt-2 flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 py-2 rounded-md transition-colors"
                                        onClick={() => {
                                          const newName = studentSearchQuery.trim() || `New Student ${Math.floor(Math.random() * 1000)}`;
                                          MOCK_STUDENTS.push({ id: Date.now(), name: newName, course: 'Unassigned', phone: '+1 (555) 000-0000' });
                                          
                                          const newStatuses = [...editRoomData.bedStatuses];
                                          const newOccupants = [...editRoomData.bedOccupants];
                                          newStatuses[idx] = true;
                                          newOccupants[idx] = newName;
                                          
                                          const newFilled = newStatuses.filter(v => v).length;
                                          setEditRoomData(prev => {
                                            const newFree = prev.beds - newFilled;
                                            let newStatus = prev.status;
                                            if (newFilled === prev.beds && prev.beds > 0) {
                                              newStatus = 'occupied';
                                            } else if (newFree > 0 && prev.status !== 'maintenance') {
                                              newStatus = 'available';
                                            }
                                            return { ...prev, bedStatuses: newStatuses, bedOccupants: newOccupants, filledBeds: newFilled, freeBeds: newFree, status: newStatus };
                                          });
                                          setActiveSearchBed(null);
                                        }}
                                      >
                                        <Plus className="w-3 h-3" /> Add New Student
                                      </button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>"""

content = content.replace(old_ui, new_ui)

with open('src/app/staff/properties/page.tsx', 'w') as f:
    f.write(content)
