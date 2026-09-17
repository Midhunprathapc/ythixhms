import re

with open('src/app/staff/properties/page.tsx', 'r') as f:
    content = f.read()

old_card_content = """                  <div className="font-bold text-gray-900">{roomNum}</div>
                  <div className="text-xs text-gray-500 mt-2 flex justify-between items-center">
                    <span>{beds} Bed{beds !== 1 ? 's' : ''}</span>
                    {status === 'occupied' ? <CheckCircle2 className="h-4 w-4 text-gray-400" /> :
                     status === 'maintenance' ? <AlertCircle className="h-4 w-4 text-red-500" /> :
                     <span className="text-green-600 font-semibold">Free</span>}
                  </div>"""

new_card_content = """                  <div className="flex justify-between items-start">
                    <div className="font-bold text-gray-900">{roomNum}</div>
                    {status === 'occupied' ? <CheckCircle2 className="h-4 w-4 text-gray-400" /> :
                     status === 'maintenance' ? <AlertCircle className="h-4 w-4 text-red-500" /> :
                     <span className="text-green-600 font-semibold text-xs">Free</span>}
                  </div>
                  <div className="mt-3 flex flex-col gap-1.5">
                    <div className="text-xs font-medium text-gray-500 border-b border-gray-100 pb-1">
                      {beds} Total Bed{beds !== 1 ? 's' : ''}
                    </div>
                    <div className="flex justify-between text-xs mt-0.5">
                      <span className="text-green-600 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        {freeBeds !== undefined ? freeBeds : '-'} Free
                      </span>
                      <span className="text-red-500 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                        {filledBeds !== undefined ? filledBeds : '-'} Filled
                      </span>
                    </div>
                  </div>"""

content = content.replace(old_card_content, new_card_content)

with open('src/app/staff/properties/page.tsx', 'w') as f:
    f.write(content)
