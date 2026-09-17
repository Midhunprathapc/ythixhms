import re

with open('src/app/staff/properties/page.tsx', 'r') as f:
    content = f.read()

# 1. Add state and effect for availableStudents
state_add = """  const [searchQuery, setSearchQuery] = useState('');
  const [availableStudents, setAvailableStudents] = useState<any[]>(MOCK_STUDENTS);

  // Load real students from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('hms_students');
    if (saved) {
      try {
        setAvailableStudents(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);"""

content = content.replace("  const [searchQuery, setSearchQuery] = useState('');", state_add)

# 2. Update rendering logic
content = content.replace(
    "{MOCK_STUDENTS.filter(s => s.name.toLowerCase().includes(studentSearchQuery.toLowerCase())).map(student => (",
    "{availableStudents.filter(s => s.name.toLowerCase().includes(studentSearchQuery.toLowerCase())).map(student => ("
)

with open('src/app/staff/properties/page.tsx', 'w') as f:
    f.write(content)
