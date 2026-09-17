import { FileText, Download } from 'lucide-react';

export default function StudentDocuments() {
  const documents = [
    { id: 1, name: 'Passport Copy', status: 'Verified', date: 'Aug 15, 2026' },
    { id: 2, name: 'Student ID', status: 'Pending review', date: 'Sep 1, 2026' },
    { id: 3, name: 'University Offer Letter', status: 'Verified', date: 'Aug 15, 2026' },
  ];

  return (
    <div className="max-w-4xl space-y-8 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-display text-3xl font-medium mb-1">Documents</h1>
          <p className="text-muted-foreground text-sm">Manage your identification and enrollment documents.</p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90">
          Upload Document
        </button>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="divide-y divide-border">
          {documents.map((doc) => (
            <div key={doc.id} className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">{doc.name}</h3>
                  <p className="text-xs text-muted-foreground">Uploaded on {doc.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                  doc.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {doc.status}
                </span>
                <button className="text-muted-foreground hover:text-primary p-2">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
