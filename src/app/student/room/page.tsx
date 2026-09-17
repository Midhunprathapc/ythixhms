import { Bed, Users, Shield } from 'lucide-react';

export default function StudentRoom() {
  return (
    <div className="max-w-4xl space-y-8 pb-10">
      <div>
        <h1 className="font-display text-3xl font-medium mb-1">My Room</h1>
        <p className="text-muted-foreground text-sm">View your room layout and roommate details.</p>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-secondary/5 px-6 py-4 border-b border-border flex justify-between items-center">
          <div>
            <h2 className="font-display text-xl">The Grand Residence</h2>
            <p className="text-sm text-muted-foreground">Room 201</p>
          </div>
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
            Active Tenancy
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Visual Room Map */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-sm uppercase tracking-wider font-semibold text-muted-foreground mb-4">Room Layout</h3>
              <div className="border border-border rounded-xl p-4 bg-background grid grid-cols-2 gap-4 relative">
                
                {/* Bed A - You */}
                <div className="border-2 border-primary bg-primary/5 rounded-lg p-4 flex flex-col items-center justify-center text-center h-32 relative">
                  <div className="absolute -top-3 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full shadow-sm">You</div>
                  <Bed className="h-6 w-6 text-primary mb-2" />
                  <span className="font-semibold text-primary">Bed A</span>
                </div>

                {/* Bed B - Occupied */}
                <div className="border border-border bg-secondary/5 rounded-lg p-4 flex flex-col items-center justify-center text-center h-32">
                  <Bed className="h-6 w-6 text-muted-foreground mb-2" />
                  <span className="font-medium text-gray-700">Bed B</span>
                  <span className="text-xs text-muted-foreground mt-1">Michael S.</span>
                </div>

                {/* Bed C - Available */}
                <div className="border border-dashed border-green-300 bg-green-50 rounded-lg p-4 flex flex-col items-center justify-center text-center h-32 col-span-2">
                  <span className="text-xs text-green-600 font-semibold uppercase tracking-wider">Available</span>
                  <span className="text-xs text-green-600/70 mt-1">Bed C</span>
                </div>

              </div>
            </div>

            {/* Room Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm uppercase tracking-wider font-semibold text-muted-foreground mb-3">Roommates</h3>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <div className="font-medium">Michael Smith</div>
                    <div className="text-xs text-muted-foreground">Computer Science, Yr 2</div>
                  </div>
                </div>
              </div>

              <hr className="border-border" />

              <div>
                <h3 className="text-sm uppercase tracking-wider font-semibold text-muted-foreground mb-3">Room Access</h3>
                <div className="flex items-center gap-3 p-3 border border-border rounded-lg bg-background">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium text-sm">Digital Key</div>
                    <div className="text-xs text-muted-foreground">Active on your device</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
