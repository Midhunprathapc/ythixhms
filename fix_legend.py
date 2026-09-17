import re

with open('src/app/staff/properties/page.tsx', 'r') as f:
    content = f.read()

# Make the outer container relative
content = content.replace(
    """        <div className="lg:col-span-7 bg-white shadow-sm rounded-lg border border-gray-200 flex flex-col h-[600px]">""",
    """        <div className="lg:col-span-7 bg-white shadow-sm rounded-lg border border-gray-200 flex flex-col h-[600px] relative">"""
)

# Fix the inner container, remove relative, add pb-24
content = content.replace(
    """          <div className="p-6 bg-gray-50 flex-1 relative overflow-auto">""",
    """          <div className="p-6 bg-gray-50 flex-1 overflow-auto pb-24">"""
)

# We need to move the Legend OUT of the inner container and into the outer container.
# Find the end of the rooms map grid:
grid_end = """            </div>
            
            {/* Legend / Filters */}"""

# We want the inner container `</div>` to be closed BEFORE the Legend.
grid_end_new = """            </div>
          </div>
            
          {/* Legend / Filters */}"""

content = content.replace(grid_end, grid_end_new)

# Now we need to remove the closing `</div>` that was originally closing the inner container (which we just closed above)
# The old structure:
#           </div>
#         </div>
#       </div>
#
#       {/* Room Details Modal */}

# We need to replace:
#               </label>
#             </div>
#           </div>
#         </div>
#       </div>

old_tail = """              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Room Details Modal */}"""

new_tail = """              </label>
            </div>
        </div>
      </div>

      {/* Room Details Modal */}"""

content = content.replace(old_tail, new_tail)

with open('src/app/staff/properties/page.tsx', 'w') as f:
    f.write(content)
