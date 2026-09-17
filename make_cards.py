import re

with open('src/app/staff/properties/page.tsx', 'r') as f:
    content = f.read()

# 1. Increase modal size
content = content.replace(
    'className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200"',
    'className="bg-white rounded-xl shadow-xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-200"'
)

# 2. Update Beds & Occupants UI
old_ui = """                  <div className="pt-3 mt-2 border-t border-gray-100">
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

new_ui = """                  <div className="pt-4 mt-2 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-700 font-bold text-base">Beds & Occupants</span>
                      <div className="text-xs font-semibold flex gap-3">
                        <span className="flex items-center gap-1.5 text-green-700 bg-green-50 px-2 py-1 rounded border border-green-200"><div className="w-2 h-2 rounded-full bg-green-500"></div> Free: {selectedRoom.freeBeds}</span>
                        <span className="flex items-center gap-1.5 text-red-700 bg-red-50 px-2 py-1 rounded border border-red-200"><div className="w-2 h-2 rounded-full bg-red-500"></div> Filled: {selectedRoom.filledBeds}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[320px] overflow-y-auto pr-2 pb-2 custom-scrollbar">
                      {Array.from({ length: selectedRoom.beds }).map((_, idx) => {
                        const bedLabel = String.fromCharCode(65 + idx);
                        const isFilled = selectedRoom.bedStatuses ? selectedRoom.bedStatuses[idx] : idx < (selectedRoom.filledBeds || 0);
                        const mockStudentName = isFilled ? `Student ${selectedRoom.roomNum}-${bedLabel}` : null;
                        
                        return (
                          <div key={idx} className={`flex flex-col p-4 rounded-xl border transition-all duration-200 ${isFilled ? 'bg-white border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300' : 'bg-green-50/40 border-green-200 border-dashed hover:bg-green-50'}`}>
                            <div className="flex justify-between items-center mb-3 border-b border-gray-100/50 pb-2">
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${isFilled ? 'bg-red-500' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]'}`}></div>
                                <span className="font-bold text-gray-800 text-sm">Bed {bedLabel}</span>
                              </div>
                              {isFilled ? (
                                <span className="text-[9px] font-bold tracking-wider uppercase text-gray-500 bg-gray-100 px-2 py-1 rounded-md">Occupied</span>
                              ) : (
                                <span className="text-[9px] font-bold tracking-wider uppercase text-green-700 bg-green-100 px-2 py-1 rounded-md">Free</span>
                              )}
                            </div>
                            
                            {isFilled ? (
                              <div 
                                onClick={() => setSelectedStudent({ name: mockStudentName!, room: selectedRoom.roomNum, bed: bedLabel, phone: '+1 (555) 019-' + (1000 + idx * 42), course: 'B.Tech Computer Science' })}
                                className="flex items-center gap-3 mt-1 cursor-pointer group p-1.5 -mx-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                                  {mockStudentName!.charAt(0)}
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{mockStudentName}</span>
                                  <span className="text-xs text-gray-500 font-medium mt-0.5 group-hover:text-blue-500">View Details &rarr;</span>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center gap-3 mt-1 opacity-70 p-1.5 -mx-1.5">
                                <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                                <span className="text-sm font-semibold text-green-700">Ready for booking</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>"""

content = content.replace(old_ui, new_ui)

with open('src/app/staff/properties/page.tsx', 'w') as f:
    f.write(content)
