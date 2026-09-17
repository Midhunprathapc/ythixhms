import re

with open('src/app/staff/students/[id]/page.tsx', 'r') as f:
    content = f.read()

# 1. Import useSearchParams
content = content.replace(
    "import { useParams, useRouter } from 'next/navigation';",
    "import { useParams, useRouter, useSearchParams } from 'next/navigation';"
)

# 2. Add searchParams hook
content = content.replace(
    "  const studentId = params.id as string;",
    "  const studentId = params.id as string;\n  const searchParams = useSearchParams();\n  const from = searchParams.get('from');\n  const room = searchParams.get('room');\n  const backLink = (from === 'properties' && room) ? `/staff/properties?openRoom=${room}` : '/staff/students';"
)

# 3. Update the Link href
content = content.replace(
    '<Link href="/staff/students" className="p-2 hover:bg-gray-100 rounded-full transition-colors">',
    '<Link href={backLink} className="p-2 hover:bg-gray-100 rounded-full transition-colors">'
)

with open('src/app/staff/students/[id]/page.tsx', 'w') as f:
    f.write(content)
