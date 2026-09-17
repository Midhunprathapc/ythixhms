import { User, Phone, Mail, MapPin, Shield } from 'lucide-react';

export default function StudentProfile() {
  return (
    <div className="max-w-4xl space-y-8 pb-10">
      <div>
        <h1 className="font-display text-3xl font-medium mb-1">My Profile</h1>
        <p className="text-muted-foreground text-sm">Manage your personal information and contact details.</p>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-secondary/5 px-6 py-4 border-b border-border flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          <h2 className="font-medium text-lg">Personal Details</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Full Name</label>
              <div className="font-medium">John Alexander Doe</div>
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Date of Birth</label>
              <div className="font-medium">May 15, 2004</div>
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Nationality</label>
              <div className="font-medium">International</div>
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Passport / ID Number</label>
              <div className="font-medium">P123456789</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-secondary/5 px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            <h2 className="font-medium text-lg">Contact Information</h2>
          </div>
          <button className="text-sm font-medium text-primary hover:underline">Edit</button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Phone Number</label>
              <input type="text" defaultValue="+1 234 567 8900" className="w-full p-2 border border-border rounded-lg bg-background outline-none focus:border-primary" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Email Address</label>
              <input type="email" defaultValue="john.doe@university.edu" className="w-full p-2 border border-border rounded-lg bg-background outline-none focus:border-primary" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-secondary/5 px-6 py-4 border-b border-border flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <h2 className="font-medium text-lg">Emergency Contact</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Name</label>
              <div className="font-medium">Jane Doe (Mother)</div>
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Phone</label>
              <div className="font-medium">+1 987 654 3210</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
