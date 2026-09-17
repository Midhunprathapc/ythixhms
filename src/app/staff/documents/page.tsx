import { FileCheck } from 'lucide-react';

export default function AdminDocuments() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Documents</h1>
      </div>
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-8 text-center text-gray-500">
        <FileCheck className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <p>Pending document verifications and bulk approvals will be managed here.</p>
      </div>
    </div>
  );
}
