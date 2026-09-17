import re

with open('src/app/staff/properties/page.tsx', 'r') as f:
    content = f.read()

# Add Trash2 to imports
content = content.replace(
    "import { Search, MapPin, Building2, LayoutGrid, CheckCircle2, AlertCircle, X, Plus, Edit } from 'lucide-react';",
    "import { Search, MapPin, Building2, LayoutGrid, CheckCircle2, AlertCircle, X, Plus, Edit, Trash2 } from 'lucide-react';"
)

# Add handleDeleteProperty
handle_delete_str = """
  const handleDeleteProperty = (id: number) => {
    const propertyToDelete = properties.find(p => p.id === id);
    if (!propertyToDelete) return;
    
    if (window.confirm(`Are you sure you want to delete "${propertyToDelete.name}"?`)) {
      const updatedProperties = properties.filter(p => p.id !== id);
      setProperties(updatedProperties);
      setSuccessMessage(`Property "${propertyToDelete.name}" deleted successfully!`);
      
      if (selectedPropertyId === id) {
        setSelectedPropertyId(updatedProperties[0]?.id || 0);
        setSelectedFloor(1);
      }
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 4000);
    }
  };

  const handleUpdateProperty"""

content = content.replace("  const handleUpdateProperty", handle_delete_str)

# Add Delete button in UI
button_ui = """                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleEditPropertyStart(prop); }}
                        className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                        title="Edit Property"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDeleteProperty(prop.id); }}
                        className="text-gray-400 hover:text-red-600 transition-colors p-1"
                        title="Delete Property"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>"""

content = content.replace(
    """                    <button 
                      onClick={(e) => { e.stopPropagation(); handleEditPropertyStart(prop); }}
                      className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                      title="Edit Property"
                    >
                      <Edit className="h-4 w-4" />
                    </button>""",
    button_ui
)

with open('src/app/staff/properties/page.tsx', 'w') as f:
    f.write(content)
