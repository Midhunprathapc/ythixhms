import re

with open('src/app/staff/students/page.tsx', 'r') as f:
    content = f.read()

# 1. Add Link import
content = content.replace(
    "import { Users, X, Search, Plus, Mail, Phone, Home } from 'lucide-react';",
    "import { Users, X, Search, Plus, Mail, Phone, Home } from 'lucide-react';\nimport Link from 'next/link';"
)

# 2. Change Button to Link
old_button = """        <button 
          onClick={() => setIsAddStudentModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 shadow-sm flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Student
        </button>"""
new_button = """        <Link 
          href="/staff/students/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 shadow-sm flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Student
        </Link>"""
content = content.replace(old_button, new_button)

# 3. Remove Modal JSX
# Since the modal is quite large, I'll use regex to remove it.
# It starts with {isAddStudentModalOpen && ( and ends before the {selectedStudent && ( block.
import re
modal_pattern = re.compile(r'\{isAddStudentModalOpen && \(\n\s*<div.*?</div>\n\s*\)\}\n', re.DOTALL)
content = modal_pattern.sub('', content)

with open('src/app/staff/students/page.tsx', 'w') as f:
    f.write(content)
