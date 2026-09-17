import re

with open('src/app/staff/students/page.tsx', 'r') as f:
    content = f.read()

# 1. Update INITIAL_STUDENTS
old_initial = """const INITIAL_STUDENTS = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 234 567 8900', room: '101A', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 234 567 8901', room: '102B', status: 'Active' },
];"""
new_initial = """const INITIAL_STUDENTS = [
  { 
    id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 234 567 8900', room: '101A', status: 'Active',
    dateOfBirth: '2001-05-15', gender: 'male', address: '123 College Ave, City', course: 'Computer Science', yearOfStudy: '3',
    emergencyName: 'Mary Doe', emergencyPhone: '+1 987 654 3210', emergencyRelation: 'Mother'
  },
  { 
    id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 234 567 8901', room: '102B', status: 'Active',
    dateOfBirth: '2002-11-20', gender: 'female', address: '456 University Blvd, City', course: 'Engineering', yearOfStudy: '2',
    emergencyName: 'Robert Smith', emergencyPhone: '+1 987 654 3211', emergencyRelation: 'Father'
  },
];"""
content = content.replace(old_initial, new_initial)

# 2. Add extra imports
content = content.replace(
    "import { Users, X, Search, Plus, Mail, Phone, Home } from 'lucide-react';",
    "import { Users, X, Search, Plus, Mail, Phone, Home, Calendar, MapPin, GraduationCap, HeartPulse } from 'lucide-react';"
)

# 3. Update Modal JSX
old_modal = """              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-500 font-medium">Email Address</div>
                    <div className="text-sm font-semibold text-gray-900">{selectedStudent.email}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-500 font-medium">Phone Number</div>
                    <div className="text-sm font-semibold text-gray-900">{selectedStudent.phone || 'N/A'}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <Home className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-500 font-medium">Assigned Room</div>
                    <div className="text-sm font-semibold text-gray-900">{selectedStudent.room || 'Unassigned'}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">"""

new_modal = """              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="text-xs text-gray-500 font-medium">Email Address</div>
                    <div className="text-sm font-semibold text-gray-900">{selectedStudent.email}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <Phone className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="text-xs text-gray-500 font-medium">Phone Number</div>
                    <div className="text-sm font-semibold text-gray-900">{selectedStudent.phone || 'N/A'}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <Home className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="text-xs text-gray-500 font-medium">Assigned Room</div>
                    <div className="text-sm font-semibold text-gray-900">{selectedStudent.room || 'Unassigned'}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="text-xs text-gray-500 font-medium">Date of Birth</div>
                    <div className="text-sm font-semibold text-gray-900">{selectedStudent.dateOfBirth || 'N/A'}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <GraduationCap className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="text-xs text-gray-500 font-medium">Course (Year)</div>
                    <div className="text-sm font-semibold text-gray-900">{selectedStudent.course || 'N/A'} {selectedStudent.yearOfStudy ? `(Yr ${selectedStudent.yearOfStudy})` : ''}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="text-xs text-gray-500 font-medium">Home Address</div>
                    <div className="text-sm font-semibold text-gray-900 truncate max-w-[150px]" title={selectedStudent.address}>{selectedStudent.address || 'N/A'}</div>
                  </div>
                </div>

                <div className="sm:col-span-2 flex flex-col gap-2 p-3 bg-red-50 rounded-lg border border-red-100 mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <HeartPulse className="h-4 w-4 text-red-500" />
                    <span className="text-xs font-bold text-red-700 uppercase tracking-wider">Emergency Contact</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-red-400 font-medium">Name & Relation</div>
                      <div className="text-sm font-semibold text-red-900">{selectedStudent.emergencyName || 'N/A'} {selectedStudent.emergencyRelation ? `(${selectedStudent.emergencyRelation})` : ''}</div>
                    </div>
                    <div>
                      <div className="text-xs text-red-400 font-medium">Phone</div>
                      <div className="text-sm font-semibold text-red-900">{selectedStudent.emergencyPhone || 'N/A'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">"""

content = content.replace(old_modal, new_modal)

# Also make the modal larger so it fits the grid
content = content.replace(
    'max-w-lg overflow-hidden',
    'max-w-2xl overflow-hidden'
)

with open('src/app/staff/students/page.tsx', 'w') as f:
    f.write(content)
