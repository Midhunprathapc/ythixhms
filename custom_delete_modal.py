import re

with open('src/app/staff/properties/page.tsx', 'r') as f:
    content = f.read()

# 1. Add AlertTriangle to lucide-react imports if not there
if 'AlertTriangle' not in content:
    content = content.replace("import { Search, MapPin", "import { Search, MapPin, AlertTriangle")

# 2. Add state for propertyToDelete
state_addition = """
  const [editingPropertyId, setEditingPropertyId] = useState<number | null>(null);
  const [propertyToDelete, setPropertyToDelete] = useState<number | null>(null);"""
content = content.replace("  const [editingPropertyId, setEditingPropertyId] = useState<number | null>(null);", state_addition)

# 3. Rewrite handleDeleteProperty to open the modal, and add confirmDeleteProperty
new_delete_logic = """
  const handleDeleteProperty = (id: number) => {
    setPropertyToDelete(id);
  };

  const confirmDeleteProperty = () => {
    if (propertyToDelete === null) return;
    
    const property = properties.find(p => p.id === propertyToDelete);
    if (!property) {
      setPropertyToDelete(null);
      return;
    }
    
    const updatedProperties = properties.filter(p => p.id !== propertyToDelete);
    setProperties(updatedProperties);
    setSuccessMessage(`Property "${property.name}" deleted successfully!`);
    
    if (selectedPropertyId === propertyToDelete) {
      setSelectedPropertyId(updatedProperties[0]?.id || 0);
      setSelectedFloor(1);
    }
    
    setPropertyToDelete(null);
    
    setTimeout(() => {
      setSuccessMessage('');
    }, 4000);
  };
"""

# Replace old handleDeleteProperty block
content = re.sub(r"  const handleDeleteProperty = \(id: number\) => \{.*?  \};\n", new_delete_logic, content, flags=re.DOTALL)


# 4. Add the Custom Delete Modal UI at the end of the file, before the last </div>
delete_modal_ui = """
      {/* Delete Confirmation Modal */}
      {propertyToDelete !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 text-center space-y-4">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-900">Delete Property?</h3>
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete <span className="font-semibold text-gray-700">{properties.find(p => p.id === propertyToDelete)?.name}</span>? This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="p-4 bg-gray-50 flex gap-3">
              <button 
                onClick={() => setPropertyToDelete(null)}
                className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDeleteProperty}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
"""

content = content.replace("    </div>\n  );\n}", delete_modal_ui + "    </div>\n  );\n}")

with open('src/app/staff/properties/page.tsx', 'w') as f:
    f.write(content)
