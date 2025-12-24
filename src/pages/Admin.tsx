import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Download, Mail, Users, TrendingUp, LogOut, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface WaitlistSignup {
  id: string;
  email: string;
  referral_code: string;
  referral_count: number;
  created_at: string;
}

interface DesignFeedback {
  id: string;
  created_at: string;
  gender: string | null;
  outfit_type: string | null;
  fabric_type: string | null;
  fit_style: string | null;
  description: string | null;
  matched_mockup: string | null;
  matches_expectation: boolean | null;
  additional_feedback: string | null;
}

const Admin = () => {
  const [signups, setSignups] = useState<WaitlistSignup[]>([]);
  const [feedback, setFeedback] = useState<DesignFeedback[]>([]);
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
    fetchFeedback();
  };

  const fetchFeedback = async () => {
    try {
      const { data, error } = await supabase
        .from('design_feedback')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFeedback(data || []);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
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

  const feedbackStats = {
    total: feedback.length,
    positive: feedback.filter(f => f.matches_expectation === true).length,
    negative: feedback.filter(f => f.matches_expectation === false).length,
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
            <h1 className="font-headline text-5xl text-primary">BOOM Admin</h1>
            <p className="text-muted-foreground mt-2">Manage waitlist and design feedback</p>
          </div>
          <Button onClick={handleSignOut} size="lg" variant="outline" className="gap-2">
            <LogOut className="h-5 w-5" />
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="waitlist" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="waitlist" className="gap-2">
              <Users className="h-4 w-4" />
              Waitlist
            </TabsTrigger>
            <TabsTrigger value="feedback" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Design Feedback
            </TabsTrigger>
          </TabsList>

          {/* Waitlist Tab */}
          <TabsContent value="waitlist" className="space-y-6">
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

            {/* Waitlist Table */}
            <Card className="border-2">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-headline text-2xl">All Signups</h2>
                  <Button onClick={exportToCSV} size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export CSV
                  </Button>
                </div>
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
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-6">
            {/* Feedback Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 border-2 hover:shadow-[0_0_30px_rgba(255,102,51,0.2)] transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Feedback</p>
                    <p className="text-3xl font-bold text-foreground">{feedbackStats.total}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <ThumbsUp className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Matched Expectations</p>
                    <p className="text-3xl font-bold text-foreground">{feedbackStats.positive}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2 hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <ThumbsDown className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Did Not Match</p>
                    <p className="text-3xl font-bold text-foreground">{feedbackStats.negative}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Feedback Table */}
            <Card className="border-2">
              <div className="p-6">
                <h2 className="font-headline text-2xl mb-4">All Feedback</h2>
                {feedback.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No feedback yet</div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Gender</TableHead>
                          <TableHead>Outfit</TableHead>
                          <TableHead>Fabric</TableHead>
                          <TableHead>Fit</TableHead>
                          <TableHead>Matched Mockup</TableHead>
                          <TableHead className="text-center">Match?</TableHead>
                          <TableHead>Feedback</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {feedback.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="text-muted-foreground whitespace-nowrap">
                              {new Date(item.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </TableCell>
                            <TableCell className="capitalize">{item.gender || '-'}</TableCell>
                            <TableCell className="capitalize">{item.outfit_type?.replace(/_/g, ' ') || '-'}</TableCell>
                            <TableCell className="capitalize">{item.fabric_type || '-'}</TableCell>
                            <TableCell className="capitalize">{item.fit_style || '-'}</TableCell>
                            <TableCell>
                              <code className="text-xs bg-muted px-2 py-1 rounded">
                                {item.matched_mockup || '-'}
                              </code>
                            </TableCell>
                            <TableCell className="text-center">
                              {item.matches_expectation === true && (
                                <ThumbsUp className="h-4 w-4 text-green-500 mx-auto" />
                              )}
                              {item.matches_expectation === false && (
                                <ThumbsDown className="h-4 w-4 text-red-500 mx-auto" />
                              )}
                              {item.matches_expectation === null && '-'}
                            </TableCell>
                            <TableCell className="max-w-xs truncate" title={item.additional_feedback || ''}>
                              {item.additional_feedback || '-'}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
