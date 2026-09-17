import re

with open('src/app/staff/students/page.tsx', 'r') as f:
    content = f.read()

# 1. Add state for studentToDelete
state_add = """  const [searchQuery, setSearchQuery] = useState('');
  const [studentToDelete, setStudentToDelete] = useState<number | null>(null);"""

content = content.replace("  const [searchQuery, setSearchQuery] = useState('');", state_add)

# 2. Update handleDeleteStudent and add confirmDeleteStudent
old_delete = """  const handleDeleteStudent = (id: number) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      const updatedStudents = students.filter(s => s.id !== id);
      setStudents(updatedStudents);
      localStorage.setItem('hms_students', JSON.stringify(updatedStudents));
    }
  };"""

new_delete = """  const handleDeleteStudent = (id: number) => {
    setStudentToDelete(id);
  };

  const confirmDeleteStudent = () => {
    if (studentToDelete !== null) {
      const updatedStudents = students.filter(s => s.id !== studentToDelete);
      setStudents(updatedStudents);
      localStorage.setItem('hms_students', JSON.stringify(updatedStudents));
      setStudentToDelete(null);
    }
  };"""

content = content.replace(old_delete, new_delete)

# 3. Import AlertTriangle and add the Modal JSX
content = content.replace("import { Users, X, Search, Plus, Mail, Phone, Home, Calendar, MapPin, GraduationCap, HeartPulse } from 'lucide-react';", "import { Users, X, Search, Plus, Mail, Phone, Home, Calendar, MapPin, GraduationCap, HeartPulse, AlertTriangle } from 'lucide-react';")

modal_jsx = """      </div>
      
      {/* Delete Confirmation Modal */}
      {studentToDelete !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Student</h3>
              <p className="text-gray-500 text-sm">
                Are you sure you want to delete <span className="font-semibold text-gray-700">{students.find(s => s.id === studentToDelete)?.name}</span>? This action cannot be undone and will remove all their records.
              </p>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-3 justify-end">
              <button 
                onClick={() => setStudentToDelete(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDeleteStudent}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}"""

content = content.replace("      </div>\n    </div>\n  );\n}", modal_jsx)

with open('src/app/staff/students/page.tsx', 'w') as f:
    f.write(content)
