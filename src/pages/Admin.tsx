import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Download, Mail, Users, TrendingUp, LogOut } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface WaitlistSignup {
  id: string;
  email: string;
  referral_code: string;
  referral_count: number;
  created_at: string;
}

const Admin = () => {
  const [signups, setSignups] = useState<WaitlistSignup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    // Check if user has admin role
    const { data: hasAdminRole, error } = await supabase.rpc('has_role', {
      _user_id: session.user.id,
      _role: 'admin'
    });
    
    if (error || !hasAdminRole) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    setIsAuthenticated(true);
    fetchSignups();
  };

  const fetchSignups = async () => {
    try {
      const { data, error } = await supabase
        .from('waitlist_signups')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSignups(data || []);
    } catch (error) {
      console.error('Error fetching signups:', error);
      toast({
        title: "Error loading data",
        description: "Failed to fetch waitlist signups.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = ['Email', 'Referral Code', 'Referrals', 'Signed Up Date'];
    const rows = signups.map(signup => [
      signup.email,
      signup.referral_code,
      signup.referral_count,
      new Date(signup.created_at).toLocaleString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `boom-waitlist-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export successful!",
      description: "Waitlist data downloaded as CSV.",
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const stats = {
    total: signups.length,
    withReferrals: signups.filter(s => s.referral_count > 0).length,
    totalReferrals: signups.reduce((sum, s) => sum + s.referral_count, 0),
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-headline text-5xl text-primary">BOOM Waitlist Admin</h1>
            <p className="text-muted-foreground mt-2">Manage and export waitlist signups</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={exportToCSV} size="lg" className="gap-2">
              <Download className="h-5 w-5" />
              Export to CSV
            </Button>
            <Button onClick={handleSignOut} size="lg" variant="outline" className="gap-2">
              <LogOut className="h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 border-2 hover:shadow-[0_0_30px_rgba(255,102,51,0.2)] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Signups</p>
                <p className="text-3xl font-bold text-foreground">{stats.total}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-2 hover:shadow-[0_0_30px_rgba(218,112,214,0.2)] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Users With Referrals</p>
                <p className="text-3xl font-bold text-foreground">{stats.withReferrals}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-2 hover:shadow-[0_0_30px_rgba(255,102,51,0.2)] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Referrals</p>
                <p className="text-3xl font-bold text-foreground">{stats.totalReferrals}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Data Table */}
        <Card className="border-2">
          <div className="p-6">
            <h2 className="font-headline text-2xl mb-4">All Signups</h2>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : signups.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No signups yet</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Referral Code</TableHead>
                      <TableHead className="text-center">Referrals</TableHead>
                      <TableHead>Signed Up</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {signups.map((signup) => (
                      <TableRow key={signup.id}>
                        <TableCell className="font-medium">{signup.email}</TableCell>
                        <TableCell>
                          <code className="text-sm bg-muted px-2 py-1 rounded">
                            {signup.referral_code}
                          </code>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={signup.referral_count > 0 ? "text-primary font-bold" : ""}>
                            {signup.referral_count}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(signup.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
